

/*
 # -----------------------------------------------------------------------------
 # ~/assets/themes/j1/adapter/js/YOUR_ADAPTER_NAME.js
 # J1 Adapter for YOUR_MODULE_NAME
 #
 # Product/Info:
 # https://jekyll.one
 #
 # Copyright (C) 2019 Juergen Adams
 # Copyright (C) YEAR YOUR NAME
 #
 # J1 Template is licensed under the MIT License.
 # For details, see https://jekyll.one
 # YOUR_MODULE_NAME is licensed under YOUR LICENSE
 # For details, see https://YOUR.SITE
 # -----------------------------------------------------------------------------
 # Adapter generated: 2019-09-12 16:11:10 +0200
 # -----------------------------------------------------------------------------
*/
'use strict';
j1.adapter['your_adapter'] = (function (j1, window) {
  var environment   = 'development';
  var moduleOptions = {};
  var _this;
  var logger;
  var logText;
  // ---------------------------------------------------------------------------
  // Helper functions
  // ---------------------------------------------------------------------------
  function executeFunctionByName(functionName, context /*, args */) {
    // See: https://stackoverflow.com/questions/359788/how-to-execute-a-javascript-function-when-i-have-its-name-as-a-string
    //
    var args = Array.prototype.slice.call(arguments, 2);
    var namespaces = functionName.split(".");
    var func = namespaces.pop();
    for(var i = 0; i < namespaces.length; i++) {
      context = context[namespaces[i]];
    }
    return context[func].apply(context, args);
  }
  // ---------------------------------------------------------------------------
  // Main object
  // ---------------------------------------------------------------------------
  return {
    // -------------------------------------------------------------------------
    // Initializer
    // -------------------------------------------------------------------------
    init: function (options) {
      // initialize state flag
      j1.adapter.your_adapter.state = 'pending';
      // -----------------------------------------------------------------------
      // Default module settings
      // -----------------------------------------------------------------------
      var settings = $.extend({
        module_name: 'j1.adapter.your_adapter',
        generated:   '2019-09-12 16:11:10 +0200'
      }, options);
      // Load  module DEFAULTS|CONFIG
      //
      // moduleOptions = $.extend({}, );
      //
      // if (typeof settings !== 'undefined') {
      //   moduleOptions = j1.mergeData(moduleOptions, settings);
      // }
      _this   = j1.adapter.custom;
      logger  = log4javascript.getLogger('j1.adapter.your_adapter');
      _this.setState('started');
      logger.info('state: ' + _this.getState());
      logger.info('module is being initialized');
      //
      // code to be implemented goes here
      //
      _this.setState('finished');
      logger.info('state: ' + _this.getState());
      logger.info('module initializing finished');
      return true;
    }, // END init
    // -------------------------------------------------------------------------
    // messageHandler: MessageHandler for J1 CookieConsent module
    // Manage messages send from other J1 modules
    // -------------------------------------------------------------------------
    messageHandler: function (sender, message) {
      var json_message = JSON.stringify(message, undefined, 2);
      logText = 'Received message from ' + sender + ': ' + json_message;
      logger.debug(logText);
      // -----------------------------------------------------------------------
      //  Process commands|actions
      // -----------------------------------------------------------------------
      if (message.type === 'command' && message.action === 'module_initialized') {
        //
        // Place handling of command|action here
        //
        logger.info(message.text);
      }
      //
      // Place handling of other command|action here
      //
      return true;
    }, // END messageHandler
    // -------------------------------------------------------------------------
    // setState
    // Set the current (processing) state of the module
    // -------------------------------------------------------------------------
    setState: function (stat) {
      j1.adapter.your_adapter.state = stat;
    }, // END setState
    // -------------------------------------------------------------------------
    // getState
    // Returns the current (processing) state of the module
    // -------------------------------------------------------------------------
    getState: function () {
      return j1.adapter.your_adapter.state;
    } // END state
  }; // END return
})(j1, window);


