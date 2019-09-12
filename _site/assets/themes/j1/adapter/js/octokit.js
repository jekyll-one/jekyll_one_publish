

/*
 # -----------------------------------------------------------------------------
 # ~/assets/themes/j1/adapter/js/octokit.js
 # J1 Adapter for GH WebHooks
 #
 # Product/Info:
 # https://jekyll.one
 #
 # Copyright (C) 2019 Juergen Adams
 #
 # J1 Template is licensed under the MIT License.
 # For details, see https://jekyll.one
 # -----------------------------------------------------------------------------
 # Adapter generated: 2019-09-12 16:11:10 +0200
 # -----------------------------------------------------------------------------
*/
'use strict';
j1.adapter['octokit'] = (function (j1, window) {
  var environment               = 'development';
  var moduleOptions             = {};
  var cookie_names              = j1.getCookieNames();
  var cookie_user_session_name  = cookie_names.user_session;
  var logger;
  var logText;
  var _this;
  var json_data;
  var success;
  // ---------------------------------------------------------------------------
  // Main object
  // ---------------------------------------------------------------------------
  return {
    // -------------------------------------------------------------------------
    // Initializer
    // -------------------------------------------------------------------------
    init: function () {
      // Set global variables
      _this   = j1.adapter.octokit;
      logger  = log4javascript.getLogger('j1.adapter.octokit');
      // Load  module DEFAULTS|CONFIG
      moduleOptions = $.extend({}, {"enabled":true, "xhr_container_id":"web_hook_modals", "xhr_data_path":"/assets/data/webhook/index.html", "commit_detection":{"modal_commit_detected":{"enabled":true, "autohide":false, "autohidden":5000}, "modal_pull_response":{"enabled":true, "autohide":false, "autohidden":5000}}, "utility_server":{"enabled":true, "port":44444, "origin":"localhost", "verbose":false, "oauth_client":{"enabled":true, "provider":"github", "url":"https://github.com", "token_path":"/login/oauth/access_token", "authorize_path":"/login/oauth/authorize"}, "git_client":{"enabled":true, "secret":"12ada70c0d34914d194f1a790c9b23bd", "payload_url":"https://smee.io/bzTe8lpQq1KeSJF", "pull":{"execute":true, "response_success":"The pull request to your local working copy finished successfully.", "response_failed":"The pull request to your local working copy has failed. Reason: "}}, "npm_client":{"enabled":true, "built":{"execute":false, "response_success":"The built request to your local site finished successfully.", "response_failed":"The built request to your local fite has failed. Reason: "}}, "logger_client":{"enabled":true, "payload_url_app":"https://app.jekyll.one/log2disk?request=write", "payload_url_web":"http://j1-docker:44444/log2disk?request=write", "log_folder":"log", "log_file_name":"messages", "log_file_ext":"log", "create_on_start":true, "reset_on_start":true, "rolling_files":false, "file_mode":"append"}}});
      if (j1.checkUserAgent('IE') || j1.checkUserAgent('Edge')) {
        moduleOptions.enabled = false;
        logger.warn('Browser does not support Server Side Events (SSE)');
        logger.warn('WebHooks disabled');
      }
      if (moduleOptions.enabled) {
        logger.info('WebHooks enabled, run initialization');
        _this.setState('started');
        logger.info('state: ' + _this.getState());
        logger.info('module is being initialized');
        // Load webhook modals
        logger.info('loading HTML data for modals');
        $.when (j1.xhrDATA('j1.adapter.octokit', moduleOptions , 'data_loaded'))
        .then (function (success) {
          if (success) {
            // Run initializers if webhook modals are LOADED
            var dependencies_met_modals_loaded = setInterval(function() {
              if (j1.adapter.octokit.getState() == 'data_loaded') {
                logger.info('loading data completed');
                // Run initializers
                j1.core.octokit.init(moduleOptions);
                j1.adapter.octokit.eventHandler(moduleOptions);
                _this.setState('finished');
                logger.info('state: ' + _this.getState());
                // clear interval checking
                clearInterval(dependencies_met_modals_loaded);
              }
            }, 25); // END 'dataLoaded'
          } else {
            _this.setState('finished');
            logger.info('state: ' + _this.getState());
            logger.error('Loading modal HTML data failed');
          }
        });
        return true;
      } else {
        _this.setState('finished');
        logger.info('state: ' + _this.getState());
        logger.info('WebHooks disabled. Initialization skipped');
        return false;
      } // END if moduleOptions enabled
    }, // END init
    // -------------------------------------------------------------------------
    // EventHandler for J1 Octotokit client
    // Manage button click events for all BS Modals
    // See: https://www.nickang.com/add-event-listener-for-loop-problem-in-javascript/
    // -------------------------------------------------------------------------
    eventHandler: function (options) {
      var message = {};
      var logText;
      var json_message;
      logText = 'eventHandler: register events';
      logger.debug(logText);
      var modalButtons = document.querySelectorAll('a.btn');
      if (modalButtons == 0) {
        logger.warn('eventHandler: no modal buttons found to register');
      }
      // Register button click events for WebHook modals
      // -------------------------------------------------------------------
      modalButtons.forEach(function(button, index) {
        button.addEventListener('click', function(e) {
          // acceptGitPullButton
          // ---------------------------------------------------------------
          if (this.id === 'acceptGitPullButton') {
            logger.info('User clicked acceptGitPullButton');
            $.when (j1.xhrAPI('http://localhost:41001/git?request=pull'))
            .then (function (response) {
              json_message = JSON.stringify(response, undefined, 2);
              logText = 'Response received: ' + json_message;
              logger.info(logText);
              if (response.status === 'success') {
                $('#gitPullSuccess').find('.pull-message').html(response.response);
                $('#gitPullSuccess').modal('show');
              }
            });
            // false == prevent further event propagation (bubble up)
            // like preventDefault()
            return false;
          }
          // declineGitPullButton
          // ---------------------------------------------------------------
          if (this.id === 'declineGitPullButton') {
            logger.info('User clicked declineGitPullButton');
            return false;
          }
          // acceptGitPullButton
          // ---------------------------------------------------------------
          if (this.id === 'acceptGitPullButton') {
            logger.info('User clicked acceptGitPullButton');
            // if (options.git.pull.enabled) {
            //   // Send commit message (silent mode)
            //   // -------------------------------------------------------------
            //   message.type    = 'command'
            //   message.action  = 'pull'
            //   message.text    = 'Run Git pull'
            //
            //   j1.sendMessage('j1.adapter.octokit', 'j1.core.octokit', message);
            // }
            return false;
          };
          // requestFailedOkButton
          // ---------------------------------------------------------------
          if (this.id === 'requestFailedOkButton') {
            logger.info('User clicked requestFailedOkButton');
            return false;
          }
        });
      });
      // Register pre/post events for modal 'webhookCommitDetected'
      // -------------------------------------------------------------------
      $(document).on('shown.bs.modal','#webhookCommitDetected',
        function (e) {
          logger.info('Display webhookCommitDetected');
          // Autohide modal if configured
          if (options.commit_detection.modal_commit_detected.autohide) {
            var timeout = setInterval(function() {
              $('#webhookCommitDetected').modal('hide');
              logger.info('Hide modal on timeout');
              // clear interval checking
              clearInterval(timeout);
            }, options.commit_detection.modal_commit_detected.autohidden);
          }
      }); // END shown modal 'webhookCommitDetected'
      $(document).on('hide.bs.modal','#webhookCommitDetected',
        function (e) {
          logger.info('Closed webhookCommitDetected');
      }); // END hide modal 'webhookCommitDetected'
      // Register pre/post events for modal 'gitPullSuccess'
      // -------------------------------------------------------------------
      $(document).on('shown.bs.modal','#gitPullSuccess',
        function () {
          logger.info('Display gitPullSuccess');
          // Autohide modal if configured
          if (options.commit_detection.modal_pull_response.autohide) {
            var timeout = setInterval(function() {
              $('#gitPullSuccess').modal('hide');
              logger.info('Hide modal on timeout');
              // clear interval checking
              clearInterval(timeout);
            }, options.commit_detection.modal_pull_response.autohidden);
          }
      }); // END shown modal 'gitPullSuccess'
      $(document).on('hidden.bs.modal','#gitPullSuccess',
        function () {
          logger.info('Post processing on gitPullSuccess');
          if (options.utility_server.npm_client.enabled) {
            if (options.utility_server.npm_client.built.execute) {
            // Send commit message (silent mode)
            // -------------------------------------------------------------
            message.type    = 'command'
            message.action  = 'built'
            message.text    = 'Run NPM built'
            j1.sendMessage('j1.adapter.octokit', 'j1.core.octokit', message);
          }
        }
      }); // END hidden modal 'gitPullSuccess'
      // Register pre/post events for modal 'npmScriptSuccess'
      // -------------------------------------------------------------------
      $(document).on('shown.bs.modal','#npmScriptSuccess',
        function () {
          logger.info('Display npmScriptSuccess');
          // Autohide modal if configured
          if (options.commit_detection.modal_pull_response.autohide) {
            var timeout = setInterval(function() {
              $('#npmScriptSuccess').modal('hide');
              logger.info('Hide modal on timeout');
              // clear interval checking
              clearInterval(timeout);
            }, options.commit_detection.modal_pull_response.autohidden);
          }
      }); // END shown modal 'npmScriptSuccess'
      $(document).on('hidden.bs.modal','#npmScriptSuccess',
        function () {
          logger.info('Post processing on npmScriptSuccess');
      }); // END hidden modal 'npmScriptSuccess'
      logText = 'eventHandler: events registered';
      logger.debug(logText);
      return true;
    }, // END eventHandler
    // -------------------------------------------------------------------------
    // messageHandler
    // Manage messages send from other J1 modules
    // -------------------------------------------------------------------------
    messageHandler: function (sender, message) {
      var json_message = JSON.stringify(message, undefined, 2);
      logText = 'Received message from ' + sender + ': ' + json_message;
      logger.debug(logText);
      // -----------------------------------------------------------------------
      //  Process commands|actions
      // -----------------------------------------------------------------------
      // -----------------------------------------------------------------------
      //  Command message (action), type 'module_initialized'
      if (message.type === 'command' && message.action === 'module_initialized') {
        //
        // Place handling of command|action here
        //
        logger.info(message.text);
      }
      // -----------------------------------------------------------------------
      //  Command message (action), type (Git) 'pull'
      if (message.type === 'command' && message.action === 'pull') {
        var url = 'http://localhost:41001/git?request=pull';
        logText = 'Processing message from ' + sender + ', type: ' + message.type + ', action: ' + message.action;
        logger.info(logText);
        $.when (j1.xhrAPI(url))
        .then (function(response) {
          json_message = JSON.stringify(response, undefined, 2);
          logText = 'Response from xhrAPI received: ' + json_message;
          logger.info(logText);
          if (response.status === 'success') {
            $('#gitPullSuccess').find('.pull-message').html(response.response);
            $('#gitPullSuccess').modal('show');
          }
          if (response.status === 'failed') {
            $('#requestFailed').find('.pull-message').html(response.response + response.error);
            $('#requestFailed').modal('show');
          }
        });
      } // ENDIF message action 'pull'
      // -----------------------------------------------------------------------
      //  Process command message (action), type (NPM) 'built'
      if (message.type === 'command' && message.action === 'built') {
        //var url = 'http://localhost:41001/npm?request=get_version';
        var url = 'http://localhost:41001/npm?request=rebuilt';
        logText = 'Processing message from ' + sender + ', type: ' + message.type + ', action: ' + message.action;
        logger.info(logText);
        $.when (j1.xhrAPI(url))
        .then (function(response) {
          json_message = JSON.stringify(response, undefined, 2);
          logText = 'Response from xhrAPI received: ' + json_message;
          logger.info(logText);
          if (response.status === 'success') {
            $('#npmScriptSuccess').find('.pull-message').html(response.response);
            $('#npmScriptSuccess').modal('show');
          }
          if (response.status === 'failed') {
            $('#requestFailed').find('.pull-message').html(response.response + response.error);
            $('#requestFailed').modal('show');
          }
        });
      } // END message action 'pull'
      //
      // Place handling of other command|action here
      //
      return true;
    }, // END messageHandler
    // -------------------------------------------------------------------------
    //  Set the current (processing) state of the module
    // -------------------------------------------------------------------------
    setState: function (stat) {
      j1.adapter.octokit.state = stat;
    }, // END setState
    // -------------------------------------------------------------------------
    //  Returns the current (processing) state of the module
    // -------------------------------------------------------------------------
    getState: function () {
      return j1.adapter.octokit.state;
    } // END state
  }; // END return
})(j1, window);


