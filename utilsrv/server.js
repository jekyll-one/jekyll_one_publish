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
 # Copyright (C) 2019 Juergen Adams
 # Copyright (C) 2019 Václav Klecanda
 #
 #  J1 Template is licensed under the MIT License.
 #  See: https://github.com/jekyll-one-org/j1_template/blob/master/LICENSE
 #  Netlify-cms-github-oauth-provider is licensed under UNKNOWN License.
 #  See: https://github.com/vencax/netlify-cms-github-oauth-provider/blob/master/README.md
 # -----------------------------------------------------------------------------
 # NOTE:
 # To fix Webstorm NodeJS API issue
 # see: https://stackoverflow.com/questions/19532660/webstorm-7-cannot-recognize-node-api-methods
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
// LIBRARIES
// -----------------------------------------------------------------------------
const dotenv            = require('dotenv');
const express           = require('express');
const fs                = require('fs');
const yaml              = require('js-yaml');
const path              = require('path');
const randomstring      = require('randomstring');
const gitP              = require('simple-git/promise');
const simpleOauthModule = require('simple-oauth2');
const util              = require('util');
const exec              = util.promisify(require('child_process').exec);
const moment            = require('moment');

// =============================================================================
// RUNTIME settings
// -----------------------------------------------------------------------------

// -----------------------------------------------------------------------------
// Date settings
//
moment().format('YYYY-MM-DD hh:mm:ss');

// -----------------------------------------------------------------------------
// Base settings
//
const daemon_home=path.resolve(__dirname);
var   dataPrefix;

// -----------------------------------------------------------------------------
// Environment settings
//
const dotEnv        = dotenv.config({path: daemon_home + '/.env', silent: true});
const json_data     = JSON.stringify( dotEnv, null, 2 ); // JSON pretty print
const pathToProject = dotEnv.PATH_TO_PROJECT || path.resolve('../');
const verbose       = JSON.parse(process.env.UTILSRV_VERBOSE);

if (dotEnv.ENV === 'development') {
  dataPrefix = pathToProject + '/400_template_site/_data';
} else {
  dataPrefix = pathToProject + '/_data';
}

if (verbose) {
  console.log('Daemon path set to:  '         + daemon_home);
  console.log('Daemon verbosity set to: '     + process.env.UTILSRV_VERBOSE);
  console.log('Environment detected as: '     + dotEnv.ENV);
  console.log('Project path set to: '         + pathToProject);
  console.log('Data path set to:    '         + dataPrefix);
  console.log('DotEnv settings detected as: ' + json_data);
}

// =============================================================================
// LOAD configuration data (WebHook)
// -----------------------------------------------------------------------------

const modules_settings            = dataPrefix + '/modules';
const modules_defaults            = modules_settings + '/defaults';
const webhook_defaults_file       = modules_defaults + '/' + 'webhook.yml';
const webhook_settings_file       = modules_settings + '/' + 'webhook.yml';
let webhook_options;

try {
  const webhook_defaults          = yaml.safeLoad(fs.readFileSync(webhook_defaults_file, 'utf8'));
  const webhook_settings          = yaml.safeLoad(fs.readFileSync(webhook_settings_file, 'utf8'));
  webhook_options                 = mergeData( webhook_defaults.defaults, webhook_settings.settings);
} catch (e) {
  console.log(e);
}

// -----------------------------------------------------------------------------
// Utility Server (daemon) settings
//
const port                        = webhook_options.utility_server.port || 3000;
const origin                      = webhook_options.utility_server.origin || localhost;

// -----------------------------------------------------------------------------
// OAuth client settings
//
const loginAuthTarget             = process.env.AUTH_TARGET || '_self';
const oauthProvider               = webhook_options.utility_server.oauth_client.provider || 'github';
const oauthProviderUrl            = webhook_options.utility_server.oauth_client.url || 'https://github.com';
const oauthProviderTokenPath      = webhook_options.utility_server.oauth_client.token_path || '/login/oauth/access_token';
const oauthProviderAuthorizePath  = webhook_options.utility_server.oauth_client.authorize_path.url || '/login/oauth/authorize';

// -----------------------------------------------------------------------------
// GIT client settings
//

// -----------------------------------------------------------------------------
// NPM client settings
//


// =============================================================================
// INITIALIZE libraries
// -----------------------------------------------------------------------------
const app               = express();
const oauth2            = simpleOauthModule.create({
  client: {
    id: process.env.OAUTH_CLIENT_ID,
    secret: process.env.OAUTH_CLIENT_SECRET
  },
  auth: {
    // Supply oauthProviderUrl for enterprise github installs
    tokenHost: oauthProviderUrl,
    tokenPath: oauthProviderTokenPath,
    authorizePath: oauthProviderAuthorizePath
  }
});

// Check origin settings
//
const originPattern = origin || '';
if (('').match(originPattern)) {
  console.warn('Insecure ORIGIN pattern used. This can give unauthorized users access to your repository.');
  if (process.env.NODE_ENV === 'production') {
    console.error('Utility Server: Will not run without a safe ORIGIN pattern in production.');
    process.exit;
  }
}

// Authorization uri definition
//
const authorizationUri = oauth2.authorizationCode.authorizeURL({
  redirect_uri: process.env.REDIRECT_URL,
  scope: process.env.SCOPE || 'repo, user',
  state: randomstring.generate(32)
});


// =============================================================================
// API ENDPOINTS
// -----------------------------------------------------------------------------

//  ENDPOINT auth (/auth)
//  initial page redirect to Github
//  ----------------------------------------------------------------------------
app.get('/auth', (req, res) => {

  if (verbose) console.log('Utility Server: Endpoint /auth entered');
  if (verbose) console.log('Utility Server: authorization URL: ' + authorizationUri);
  res.redirect(authorizationUri);

}); // END ENDPOINT callback


//  ENDPOINT callback (/callback)
//  parsing the authorization token and asking for the access token
//  ----------------------------------------------------------------------------
app.get('/callback', (req, res) => {

  const code = req.query.code;
  let options = {
    code: code
  };

  if (verbose) console.log('Utility Server: Endpoint /callback entered');

  if (oauthProvider === 'gitlab') {
    options.client_id = process.env.OAUTH_CLIENT_ID;
    options.client_secret = process.env.OAUTH_CLIENT_SECRET;
    options.grant_type = 'authorization_code';
    options.redirect_uri = process.env.REDIRECT_URL;
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

    // http://localhost:13000/callback?code=4b8e9d5a9b39b5194ce7&state=5dXYm5RwdH3FsHlBtZtArPZM4jGIDstc
    // See: http://usefulangle.com/post/4/javascript-communication-parent-child-window
    //
    const script = `
    <script>
    (function() {

      // Register an event handler to listen for messages for the child window
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
        } // END invalid origin

        // send message to main (parent) window (Netlify CMS App)
        // 'authorization:github:success:{"token":"12345678908f0719d7ae1bf94f379876543210","provider":"github"}'
        window.opener.postMessage(
          'authorization:${oauthProvider}:${mess}:${JSON.stringify(content)}',
          e.origin
        )
      } // END receiveMessage

    })()
    </script>`;

    if (verbose) console.log('Utility Server: Send script (IIF) to main (parent) window (Netlify CMS App): ' + script);
    return res.send(script);
  });

}); // END ENDPOINT callback


//  ENDPOINT success (/success)
//  ???
//  ----------------------------------------------------------------------------
app.get('/success', (req, res) => {

  if (verbose) console.log('Utility Server: Endpoint /success entered');
  res.send('');

}); // END ENDPOINT success


//  ENDPOINT git (/git)
//  Git client
// -----------------------------------------------------------------------------
// noinspection JSUnusedLocalSymbols
let git = app.get('/git', (req, res) => {

  // -----------------------------------------------------------------------------
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

  if (verbose) console.log('Utility Server: Endpoint /git entered');
  if (verbose) console.log('Utility Server: Processing request: ' + req.query.request);

  // See: https://dzone.com/articles/cors-in-node
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

  // Pull the repo (async)
  if ( req.query.request === 'pull' ) {
    pull(pathToProject)
      .then(pull => console.log('Utility Server: Pull request done. Status: ' + response_message.status))
      .then(function() {
        if ( response_message.status === 'failed') {
          response_message.response = webhook_options.utility_server.git_client.pull.response_failed;
        } else {
          response_message.status   = 'success';
          response_message.response = webhook_options.utility_server.git_client.pull.response_success;
        }
        response = JSON.stringify(response_message);
        if (verbose) console.log('Utility Server: Send response: ' + response);
        res.send(response);
      });
  } // END pull


}); // END ENDPOINT git


//  ENDPOINT git (/git)
//  Git client
// -----------------------------------------------------------------------------
app.get('/npm', (req, res) => {

  // -----------------------------------------------------------------------------
  // API response message
  //
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

  if (process.env.NODE_ENV === 'development') {
    projectFolder = pathToProject + '\\' + devPrefix;
  } else {
    projectFolder = pathToProject;
  }

  shellCmd = pkgManager + ' --prefix ' + projectFolder + ' run ' + req.query.request;

  if (verbose) console.log('Utility Server: Endpoint /npm entered. Request: ' + req.query.request);
  if (verbose) console.log('Utility Server: Processing NPM call: ' + shellCmd);

  // if (req.query.request === 'version') {
  //   let re = /.*(jekyll \w+\.\w+\.\w+)/;
  // }
  //
  // if (req.query.request === 'built') {
  //   let re = /.*/;
  // }

  // See: https://dzone.com/articles/cors-in-node
  res.header("Access-Control-Allow-Origin", "*");

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

  // Built the requested site (async)
  npm(pathToProject)
    .then(npm => console.log('Utility Server: NPM script done. Status: ' + response_message.status))
    .then(function() {
      if ( response_message.status === 'failed') {
        response_message.response = webhook_options.utility_server.npm_client.built.response_failed;
      } else {
        response_message.status   = 'success';
        response_message.response = webhook_options.utility_server.npm_client.built.response_success;
      }
      response = JSON.stringify(response_message);
      if (verbose) console.log('Utility Server: Send response: ' + response);
      res.send(response);
    });

});

// ENDPOINT root (/) - Present SignIn page
// -----------------------------------------------------------------------------
app.get('/', (req, res) => {

  res.send(`Utility Server<br>
    <a href="/auth" target="${loginAuthTarget}">
      SignIn with provider: ${oauthProvider.toUpperCase()}
    </a>`);

}); // END ENDPOINT root


// =============================================================================
// Helper functions
// -----------------------------------------------------------------------------

// -----------------------------------------------------------------------------
// mergeData: Merge 2 hashes
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
// MAIN
// -----------------------------------------------------------------------------

app.listen(port, () => {
  console.log("Utility Server is listening on port: " + port);
});
