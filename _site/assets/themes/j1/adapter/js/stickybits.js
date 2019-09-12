

/*
 # -----------------------------------------------------------------------------
 # ~/assets/themes/j1/adapter/js/stickybits.js
 # JS Adapter for J1 Stickybits
 #
 # Product/Info:
 # https://jekyll.one
 # https://github.com/dollarshaveclub/stickybits
 #
 # Copyright (C) 2019 Juergen Adams
 # Copyright (C) 2016 Dollar Shave Club, Inc.
 #
 # J1 Template is licensed under the MIT License.
 # For details, see https://jekyll.one
 # -----------------------------------------------------------------------------
 # Adapter generated: 2019-09-12 16:11:10 +0200
 # -----------------------------------------------------------------------------
*/
'use strict';
j1.adapter['stickybits'] = (function () {
  var environment   = 'development'; // Set environment
  var moduleOptions = {};
  var _this;
  var logger;
  var logText;
  var stickybitsInstance;
  // ---------------------------------------------------------------------------
  // Main object
  // ---------------------------------------------------------------------------
  return {
    // -------------------------------------------------------------------------
    // Initializer
    // -------------------------------------------------------------------------
    init: function () {
      // initialize state flag
      j1.adapter.stickybits.state = 'pending';
      _this   = j1.adapter.stickybits;
      logger  = log4javascript.getLogger('j1.adapter.stickybits');
      _this.setState('started');
      logger.info('state: ' + _this.getState());
      logger.info('Module is being initialized');
      stickybitsInstance = stickybits('.sticky', {
        useStickyClasses:       ,
        stickyBitStickyOffset:  "px"
      });
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
      logger.info(logText);
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
      j1.adapter.stickybits.state = stat;
    }, // END setState
    // -------------------------------------------------------------------------
    // getState
    // Returns the current (processing) state of the module
    // -------------------------------------------------------------------------
    getState: function () {
      return j1.adapter.stickybits.state;
    } // END state
  }; // END return
})(j1, window);


