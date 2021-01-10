/*
 # -----------------------------------------------------------------------------
 # ~/packages/910_template_utils/100_util_server/server.js
 #
 # Provides services for e.g. an external OAuth Client used by
 # NetlifyCMS for GH authentication
 #
 # Product/Info:
 # https://jekyll.one
 # http://www.vxk.cz/tips/2017/05/18/netlify-cms/
 #
 # Copyright (C) 2021 Juergen Adams
 # Copyright (C) 2020 Václav Klecanda
 #
 # J1 Template is licensed under the MIT License.
 # See: https://github.com/jekyll-one-org/J1 Template/blob/master/LICENSE
 # Netlify-cms-github-oauth-provider is licensed under UNKNOWN License.
 # See: https://github.com/vencax/netlify-cms-github-oauth-provider/blob/master/README.md
 # -----------------------------------------------------------------------------
 # NOTE:  
 #  To fix Webstorm NodeJS API issue see:
 #  https://stackoverflow.com/questions/19532660/webstorm-7-cannot-recognize-node-api-methods
 # -----------------------------------------------------------------------------
*/
'use strict';

// -----------------------------------------------------------------------------
// ESLint shimming
// -----------------------------------------------------------------------------
// noinspection DuplicatedCode
// noinspection ES6ConvertRequireIntoImport
// noinspection ES6ConvertVarToLetConst
// noinspection ES6ModulesDependencies
// noinspection JSCheckFunctionSignatures
// noinspection JSIgnoredPromiseFromCall
// noinspection JSJoinVariableDeclarationAndAssignment
// noinspection JSUnfilteredForInLoop
// noinspection JSUnresolvedFunction
// noinspection JSUnresolvedVariable
// noinspection JSUnusedLocalSymbols
// noinspection JSValidateTypes
// noinspection NodeJsCodingAssistanceForCoreModules
// noinspection SpellCheckingInspection

// =============================================================================
// libraries
// -----------------------------------------------------------------------------
const express           = require('express');
const bodyParser        = require("body-parser");
const cors              = require('cors');
const parseURL          = require('lite-url');
const fs                = require('fs');
const touch             = require("touch");
const yaml              = require('js-yaml');
const path              = require('path');
const randomstring      = require('randomstring');
const gitP              = require('simple-git/promise');
const simpleOauthModule = require('simple-oauth2');
const util              = require('util');
const exec              = util.promisify(require('child_process').exec);
const moment            = require('moment');
const sprintf           = require('sprintf-js').sprintf;
const vsprintf          = require('sprintf-js').vsprintf;

// =============================================================================
// base settings
// -----------------------------------------------------------------------------
const daemon_home   = path.resolve(__dirname);
const environment   = daemon_home.indexOf('packages') !== -1 ? 'dev' : 'prod';
const current_date  = moment().format('YYYY-MM-DD');
// let dotenv_home;
let config_home;
let project_home;
let log_home;
let utilsrv_options;
let log4javascript_options;
let private_data;
let logStream;

// timestamp settings
//
moment().format('YYYY-MM-DD hh:mm:ss.SSS');

// =============================================================================
// environment settings
// -----------------------------------------------------------------------------
if (environment === 'dev') {
  project_home    = daemon_home + '/../400_template_site';
  config_home     = daemon_home + '/../400_template_site/_data';
//dotenv_home     = daemon_home + '/../400_template_site';
  log_home        = daemon_home + '/../..';
} else {
  project_home    = daemon_home + '/..';
  config_home     = daemon_home + '/../_data';
//dotenv_home     = daemon_home + '/..';
  log_home        = daemon_home + '/..';
}

// const dotenv      = require('dotenv').config({ path: dotenv_home + '/.env', silent: true });
// const dotenv_json = JSON.stringify( dotenv, null, 2 );                          // JSON pretty print

// =============================================================================
// load configuration data
// -----------------------------------------------------------------------------

const util_settings                 = config_home + '/utilities';
const util_defaults                 = util_settings + '/defaults';

const modules_settings              = config_home + '/modules';
const modules_defaults              = modules_settings + '/defaults';

const private_data_file             = config_home + '/' + 'private.yml';

const log4javascript_defaults_file  = modules_defaults + '/' + 'log4javascript.yml';
const log4javascript_settings_file  = modules_settings + '/' + 'log4javascript.yml';

const utilsrv_defaults_file         = util_defaults + '/' + 'util_srv.yml';
const utilsrv_settings_file         = util_settings + '/' + 'util_srv.yml';

try {
  const log4javascript_defaults     = yaml.safeLoad(fs.readFileSync(log4javascript_defaults_file, 'utf8'));
  const log4javascript_settings     = yaml.safeLoad(fs.readFileSync(log4javascript_settings_file, 'utf8'));
  const utilsrv_defaults            = yaml.safeLoad(fs.readFileSync(utilsrv_defaults_file, 'utf8'));
  const utilsrv_settings            = yaml.safeLoad(fs.readFileSync(utilsrv_settings_file, 'utf8'));
  const private_data_settings       = yaml.safeLoad(fs.readFileSync(private_data_file, 'utf8'));

  private_data                      = private_data_settings.util_srv;
  log4javascript_options            = mergeData(log4javascript_defaults.defaults, log4javascript_settings_file.settings);
  utilsrv_options                   = mergeData(utilsrv_defaults.defaults, utilsrv_settings.settings);

} catch (e) {
  console.log(e);
}
const ajaxAppenderOptions           = log4javascript_options.appenders[1].appender;

// -----------------------------------------------------------------------------
// utility server (daemon) settings
//
const ssl             = utilsrv_options.ssl || false;
const port            = utilsrv_options.port || 44444;
const origin          = utilsrv_options.origin || 'localhost';
const hostName        = utilsrv_options.host_name || '0.0.0.0';
const verbose         = utilsrv_options.verbose || false;
const logFileName     = ajaxAppenderOptions.log_file_name  + '_' + current_date || 'messages' + '_' + current_date;
const logFileExt      = ajaxAppenderOptions.log_file_ext || 'log';
const logFolder       = ajaxAppenderOptions.log_folder || 'log';
const logFileNamePath = log_home + '/' + logFolder + '/' + logFileName + '.' +  logFileExt;
const util_srv_url    = ssl ? 'https://' +  origin + ':' +  port : 'http://' +  origin + ':' +  port;

// -----------------------------------------------------------------------------
// print utility server issue
//
if (environment === 'dev') {
  console.log('Environment detected as: ' + environment);
  console.log('Daemon path set to:      ' + daemon_home);
  console.log('Daemon verbosity set to: ' + verbose);
  console.log('Project path set to:     ' + project_home);
  console.log('Data path set to:        ' + config_home);
  console.log('Log file set to:         ' + logFileNamePath);
}

// -----------------------------------------------------------------------------
// initialize log client
// fs.writeFile(logFileNamePath, '',  function(){console.log('Reset file: ' +logFileNamePath)});
//

if ( ajaxAppenderOptions.create_on_start === 'true') {
  touch(logFileNamePath);
} else {
  touch(logFileNamePath);
}

if ( ajaxAppenderOptions.reset_on_start === 'true') {
  fs.truncate(logFileNamePath, 0, function(){console.log('Reset file: ' + logFileNamePath)});
}

if ( ajaxAppenderOptions.mode === 'append') {
  logStream = fs.createWriteStream(logFileNamePath, {'flags': 'a'});
} else {
  logStream = fs.createWriteStream(logFileNamePath, {'flags': 'a'});
}

// -----------------------------------------------------------------------------
// Github OAuth client settings (used for CC)
//
const loginAuthTarget             = '_self';
const oauthProvider               = 'github';
const oauthProviderUrl            = 'https://github.com';
const oauthProviderTokenPath      = '/login/oauth/access_token';
const oauthProviderAuthorizePath  = '/login/oauth/authorize';
const oauthProviderRedirectUrl    = private_data.oauth.site_redirect_url;
const oauthProviderClientScope    = private_data.oauth.client_scope;
const oauthProviderClientId       = private_data.oauth.client_id;
const oauthProviderClientSecret   = private_data.oauth.client_secret;


// -----------------------------------------------------------------------------
// cors settings
//
var corsSettings = {
  origin:               '*',
  optionsSuccessStatus: 200                                                     // Some legacy browsers (IE11, various SmartTVs) choke on 204
}

// -----------------------------------------------------------------------------
// git client settings
//

// -----------------------------------------------------------------------------
// npm client settings
//

// =============================================================================
// initialize libraries
// -----------------------------------------------------------------------------
const app    = express();
const oauth2 = simpleOauthModule.create({
  client: {
    id: oauthProviderClientId,
    secret: oauthProviderClientSecret
  },
  auth: {
    // Supply oauthProviderUrl for enterprise github installs
    tokenHost: oauthProviderUrl,
    tokenPath: oauthProviderTokenPath,
    authorizePath: oauthProviderAuthorizePath
  }
});

// check origin settings
//
const originPattern = origin || '';
if (('').match(originPattern)) {
  console.warn('Insecure ORIGIN pattern used. This can give unauthorized users access to your repository.');
  if (environment === 'prod') {
    console.error('Utility Server: Will not run without a safe ORIGIN pattern in production.');
    process.exit;
  }
}

// authorization uri definition
//
const authorizationUri = oauth2.authorizationCode.authorizeURL({
  redirect_uri: oauthProviderRedirectUrl,
  scope:        oauthProviderClientScope || 'repo, user',
  state:        randomstring.generate(32)
});

// =============================================================================
// cors settings (all routes)
// see: https://expressjs.com/en/resources/middleware/cors.html
// -----------------------------------------------------------------------------
app.use(cors(corsSettings));

// =============================================================================
// initialize body parser to extract data from POST requests
// -----------------------------------------------------------------------------
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// =============================================================================
// api endpoints
// -----------------------------------------------------------------------------

// endpoint 'root'
// present simple sign-in page for e.g. testing
// -----------------------------------------------------------------------------
app.get('/', (req, res) => {

  res.send(`Utility Server<br>
    <a href="/auth" target="${loginAuthTarget}">
      SignIn with provider: ${oauthProvider.toUpperCase()}
    </a>`);

}); // end endpoint root

//  endpoint 'auth' (auth redirect)
//  initial page redirect to Github
//  ----------------------------------------------------------------------------
app.get('/auth', (req, res) => {

  if (environment === 'dev') console.log('Utility Server: endpoint /auth entered');
  if (environment === 'dev') console.log('Utility Server: authorization URL: ' + authorizationUri);
  res.redirect(authorizationUri);

}); // end endpoint auth


//  endpoint '/auth/github/callback' (auth callback)
//  parsing the authorization token, asking for the access token
//  ----------------------------------------------------------------------------
app.get('/auth/github/callback', (req, res) => {

  const code = req.query.code;
  let options = {
    code: code
  };

  if (environment === 'dev') console.log('Utility Server: auth redirect entered: /auth/github/callback');

  if (oauthProvider === 'gitlab') {
    options.client_id = process.env.UTIL_SRV_GITHUB_CLIENT_ID;
    options.client_secret = process.env.UTIL_SRV_GITHUB_CLIENT_SECRET;
    options.grant_type = 'authorization_code';
    options.redirect_uri = process.env.REDIRECT_URL || '/auth/github/callback';
  }

  oauth2.authorizationCode.getToken(options, (error, result) => {
    let mess, content;

    if (error) {
      console.error('Utility Server: Access Token Error - ', error.message);
      mess = 'error';
      content = JSON.stringify(error)
    } else {
      const token = oauth2.accessToken.create(result);
      mess = 'success';
      content = {
        token: token.token.access_token,
        provider: oauthProvider
      }
    }

    // see: http://usefulangle.com/post/4/javascript-communication-parent-child-window
    const script = `
    <script>
    (function() {

      // Register an event handler to listen for messages of the child window
      window.addEventListener("message", receiveMessage, false);

      // Post a authorizing message to the parent window (Netlify CMS App)
      // as a handshake with the parent window
      console.log("Sending message: %o", "${oauthProvider}");
      window.opener.postMessage("authorizing:${oauthProvider}", "*");

      function receiveMessage(e) {
        console.log("receiveMessage %o", e);
        if (!e.origin.match(${JSON.stringify(originPattern)})) {
          console.log('Invalid origin: %s', e.origin);
          return;
        } // end invalid origin

        // send message to main (parent) window (Netlify CMS App)
        // 'authorization:github:success:{"token":"12345678908f0719d7ae1bf94f379876543210","provider":"github"}'
        window.opener.postMessage(
          'authorization:${oauthProvider}:${mess}:${JSON.stringify(content)}',
          e.origin
        )
      } // end receiveMessage

    })()
    </script>`;

    if (environment === 'dev') console.log('Utility Server: Send script (IIF) to main (parent) window (Netlify CMS App): ' + script);
    return res.send(script);
  });

}); // end endpoint callback


// endpoint 'success' (/success)
// currently NOT used (placeholder)
// -----------------------------------------------------------------------------
app.get('/success', (req, res) => {

  if (verbose) console.log('Utility Server: endpoint /success entered');
  res.send('');

}); // end endpoint success


// endpoint 'git' (git client)
// run git cli commands locally on the host
// -----------------------------------------------------------------------------
// noinspection JSUnusedLocalSymbols
//let git = app.get('/git', (req, res) => {
app.get('/git', (req, res) => {

  // ---------------------------------------------------------------------------
  // API response message
  //

  let time = moment();
  let response;

  let response_message  = {
    timestamp: time,
    request: '',
    response: '',
    status: '',
    error: ''
  };
  response_message.request = req.query.request;

  if (verbose) console.log('Utility Server: endpoint /git entered');
  if (verbose) console.log('Utility Server: Processing request: ' + req.query.request);

  // see: https://dzone.com/articles/cors-in-node
  res.header("Access-Control-Allow-Origin", "*");

  async function pull (workingDir) {
    // noinspection UnnecessaryLocalVariableJS
    const git = gitP;

    try {
      await git(workingDir).pull();
      response_message.status = 'success';
    }
    catch (e) {
      // handle error
      console.log('Utility Server: Error on repository at ' + workingDir + ' - ' + e.message );
      response_message.status = 'failed';
      response_message.error = e.message;
      console.log('Utility Server: Send response: ' + response);
    }
  }

  // pull the repo (async)
  if ( req.query.request === 'pull' ) {
    pull(project_home)
      .then(pull => console.log('Utility Server: pull request done. Status: ' + response_message.status))
      .then(function() {
        if ( response_message.status === 'failed') {
          response_message.response = response_message.status;
        } else {
          response_message.status   = 'success';
          response_message.response = response_message.status;
        }
        response = JSON.stringify(response_message);
        if (verbose) console.log('Utility Server: Send response: ' + response);
        res.send(response);
      });
  } // end pull


}); // end endpoint git


// endpoint 'npm' (npm client)
// run npm commands locally on the host
// -----------------------------------------------------------------------------
app.get('/npm', (req, res) => {

  // ---------------------------------------------------------------------------
  // api response message
  let projectFolder;
  let shellCmd;
  let response;
  let devPrefix         = 'packages\\400_template_site';
  let pkgManager        = 'npm';
  let time              = moment();

  let response_message  = {
    timestamp: time,
    request: '',
    response: '',
    status: '',
    error: ''
  };
  response_message.request = req.query.request;

  // let versionRe = /.*(site.\w+\.\w+\.\w+).*(jekyll \w+\.\w+\.\w+)/;
  // let re = /.*(jekyll \w+\.\w+\.\w+)/;

  if (environment === 'dev') {
    projectFolder = project_home + '\\' + devPrefix;
  } else {
    projectFolder = project_home;
  }

  shellCmd = pkgManager + ' --prefix ' + projectFolder + ' run ' + req.query.request;

  if (verbose) console.log('Utility Server: endpoint /npm entered. Request: ' + req.query.request);
  if (verbose) console.log('Utility Server: Processing NPM call: ' + shellCmd);

  // if (req.query.request === 'version') {
  //   let re = /.*(jekyll \w+\.\w+\.\w+)/;
  // }
  //
  // if (req.query.request === 'built') {
  //   let re = /.*/;
  // }

  async function npm (workingDir) {
    try {
      const { stdout, stderr } = await exec(shellCmd);
      response_message.response = stdout;
      response_message.status = 'success';
      return response_message;
    }
    catch (e) {
      // handle error
      console.log('Utility Server: Error detected at ' + workingDir + ' - ' + e.message );
      response_message.status = 'failed';
      response_message.error = e.message;
      return response_message;
    }
  }

  // built the requested site (async)
  npm(project_home)
    .then(npm => console.log('Utility Server: NPM script done. Status: ' + response_message.status))
    .then(function() {
      if ( response_message.status === 'failed') {
        response_message.response = utilsrv_options.npm_client.built.response_failed;
      } else {
        response_message.status   = 'success';
        response_message.response = utilsrv_options.npm_client.built.response_success;
      }
      response = JSON.stringify(response_message);
      if (verbose) console.log('Utility Server: Send response: ' + response);
      res.send(response);
    });

});

// endpoint 'log2disk' (log message writer)
// process log data received from POST request, write to disk|file
// -----------------------------------------------------------------------------
// noinspection JSUnusedLocalSymbols
// let logger = app.post('/log2disk', (req, res) => {
app.post('/log2disk', (req, res) => {
  // ---------------------------------------------------------------------------
  // globals
  let pageID   = req.headers['x-page-id'];
  let logLine;
  let msgDate2Int;
  let timestamp;
  let url;
  let path;

  // ---------------------------------------------------------------------------
  // process the POST response body
  if (req.body.layout === 'XmlLayout') {
    logLine = req.body.data;
  } else if (req.body.layout === 'JsonLayout' || req.body.layout === 'PatternLayout' || req.body.layout === 'SimpleLayout' || req.body.layout === 'NullLayout') {
    logLine = req.body.data + '\n';
  } else if (req.body.layout === 'HttpPostDataLayout') {
    url = new parseURL(req.body.url);
    path = url.pathname;
    msgDate2Int = parseInt(req.body.timestamp, 10);                              // ISOString: ±YYYY-MM-DDTHH:mm:ss.sssZ
    timestamp   = new Date(msgDate2Int).toISOString().slice(0, 23).replace('T', ' ');
    // [10:05:12.666] [INFO ] [j1.logger.writer                   ] [logger.js:154] [state: finished]
    // [http://localhost:41000/assets/themes/j1/adapter/js/logger.js:154]
    logLine     = sprintf('[%s] [%s] [%-5s] [%-25s] [%-35s] %s\n', timestamp, pageID, req.body.level, path, req.body.logger, req.body.message);
  } else {
    logLine = req.body + '\n';
  }

  // if (verbose) console.log('Utility Server: endpoint /log2disk entered');
  // if (verbose) console.log('Utility Server: processing request: ' + req.query.request);
  if (verbose) console.log('Utility Server: write message: ' + logLine);
  logStream.write(logLine);
  res.send('');

}); // end endpoint 'log2disk'


// =============================================================================
// helper functions
// -----------------------------------------------------------------------------

// -----------------------------------------------------------------------------
// mergeData:
// merge 2 hashes
//
function mergeData () {
  let a = [].slice.call(arguments), o = a.shift();

  for(let i=0,l=a.length; i<l; i++){
    for(let p in a[i]){
      o[p] = a[i][p];
    }
  }

  return o;
}


// =============================================================================
// main
// -----------------------------------------------------------------------------

// catch startup errors
process.on('uncaughtException', function(err) {
  if(err.errno === 'EADDRINUSE') {
    console.log('Port already in use :' + port );
    console.log('Utility server seems already running. Exiting ...');
  } else {
    console.log('Initializing the utility server failed. Exiting ...');
    console.log(err);
  }
  process.exit;
});

// run the daemon (use IPV4, all interfaces)
// see https://github.com/expressjs/express/issues/3528
app.listen(port, hostName, () => {
  console.log("Utility Server is listening on port: " + port);
});
