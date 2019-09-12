

/*
 # -----------------------------------------------------------------------------
 # ~/assets/themes/j1/adapter/js/cookie_bar.js
 # JS Adapter for J1 Cookiebar
 #
 # Product/Info:
 # http://jekyll.one
 # http://www.primebox.co.uk/projects/jquery-cookiebar/
 #
 # Copyright (C) 2019 Juergen Adams
 # Copyright (C) 2016 Ant Parsons (primebox.co.uk)
 #
 # J1 Template is licensed under the MIT License.
 # For details, see https://jekyll.one
 # jQuery Cookibar is licensed under Creative Commons Attribution 3.0 Unported License.
 # For details, see http://www.primebox.co.uk/projects/jquery-cookiebar/
 #
 # -----------------------------------------------------------------------------
 #  Adapter generated: 2019-09-12 16:11:10 +0200
 # -----------------------------------------------------------------------------
*/
'use strict';
j1.adapter['cookie_bar'] = (function (j1, window) {
  var environment   = '';
  var moduleOptions = {};
  var _this;
  var logger;
  var logText;
  // ---------------------------------------------------------------------------
  // Helper functions
  // ---------------------------------------------------------------------------
  // ---------------------------------------------------------------------------
  // Main object
  // ---------------------------------------------------------------------------
  return {
    // -------------------------------------------------------------------------
    // Initializer
    // -------------------------------------------------------------------------
    init: function () {
      // initialize state flag
      j1.adapter.cookie_bar.state = 'pending';
      _this   = j1.adapter.cookie_bar;
      logger  = log4javascript.getLogger('j1.adapter.cookie_bar');
      _this.setState('started');
      logger.info('state: ' + _this.getState());
      logger.info('module is being initialized');
      $.cookieBar ({
        stopScrolling:          null,
        autoEnable:             null,
        message:                null,
        acceptButton:           null,
        acceptText:             null,
        acceptFunction:         null,
        declineButton:          null,
        declineText:            null,
        declineFunction:        null,
        policyButton:           null,
        policyText:             null,
        policyURL:              null,
        acceptOnContinue:       null,
        acceptOnScroll:         null,
        acceptAnyClick:         null,
        expireDays:             null,
        renewOnVisit:           null,
        forceShow:              null,
        effect:                 null,
        element:                null,
        append:                 null,
        fixed:                  null,
        bottom:                 null,
        zindex:                 null,
        domain:                 null,
        referrer:               null
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
      j1.adapter.cookie_bar.state = stat;
    }, // END setState
    // -------------------------------------------------------------------------
    // getState
    // Returns the current (processing) state of the module
    // -------------------------------------------------------------------------
    getState: function () {
      return j1.adapter.cookie_bar.state;
    } // END state
  }; // END return
})(j1, window);


