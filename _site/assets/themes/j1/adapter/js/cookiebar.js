
/*
 # -----------------------------------------------------------------------------
 # ~/assets/themes/j1/adapter/js/cookiebar.js
 # JS Adapter for Cookiebar
 #
 # Product/Info:
 # http://jekyll.one
 # http://www.primebox.co.uk/projects/jquery-cookiebar/
 #
 # Copyright (C) 2021 Juergen Adams
 # Copyright (C) 2016 Ant Parsons (primebox.co.uk)
 #
 # J1 Template is licensed under the MIT License.
 # For details, see https://jekyll.one
 # jQuery Cookibar is licensed under Creative Commons Attribution 3.0 Unported License.
 # For details, see http://www.primebox.co.uk/projects/jquery-cookiebar/
 #
 # -----------------------------------------------------------------------------
 #  Adapter generated: 2021-01-10 14:02:01 +0000
 # -----------------------------------------------------------------------------
*/
// -----------------------------------------------------------------------------
// ESLint shimming
// -----------------------------------------------------------------------------
/* eslint indent: "off"                                                       */
/* eslint quotes: "off"                                                       */
// -----------------------------------------------------------------------------
'use strict';
j1.adapter['cookiebar'] = (function (j1, window) {
  var environment   = 'production';
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
    init: function (options) {
      // -----------------------------------------------------------------------
      // Default module settings
      // -----------------------------------------------------------------------
      var settings = $.extend({
        module_name: 'j1.adapter.algolia',
        generated:   '2021-01-10 14:02:01 +0000'
      }, options);
      // Load  module DEFAULTS|CONFIG
      /* eslint-disable */
      moduleOptions = $.extend({}, {"enabled":true, "xhr_container_id":"cookiebar_modals", "xhr_data_path":"/assets/data/cookiebar/index.html", "modal_type":"full", "modal_position":"top", "consent_modal_id":"cookiebar_consent_modals", "consent_modals_title":"Privacy", "show_cookie_icon":true, "expireDays":365, "renewOnVisit":false, "forceShow":false, "referrer":"www.example.com", "strict":false, "show_consent_icon":true, "show_consent_on_pending":false, "delete_cookies_on_decline":false, "whitelisted_pages":[], "categories":{"enabled":true, "category_title":"Cookie usage by category", "category_description":"Usage Information", "category_description_text":"Cookies are used for content pages if marked", "category_session":"Session", "category_persistent":"Persistent", "category_first_party":"1st Party", "category_second_party":"2nd Party"}, "buttons":{"policy_button":false, "policy_button_text":"Cookie Policy", "accept_button":true, "accept_button_text":"Yes, I accept cookies", "decline_button":true, "decline_button_text":"No, I refuse cookies", "revoke_button_text":"Yes, please revoke cookie consent", "do_nothing_button_text":"No, please do nothing"}, "policy_about":"This website uses cookies to ensure vistors get the best experience on our content, presented user-friendly, more effective and safer.\n", "cookie_policy_title":"Cookie Policy", "cookie_policy_tagline":"Based on EU legislation on cookies. See http://eur-lex.europa.eu/LexUriServ/LexUriServ.do?uri=CELEX:32009L0136:EN:NOT[Directive 2009/136/EC, window=\"_blank\"] (ePrivacy Directive), https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32018R1725[Regulation (EU) 2018/1725, window=\"_blank\"] (Data protection) for more details\n", "cookie_policy_text":"The operators of this website take protection of your personal data extremely seriously. We treat your personal data as confidential and comply with the data protection legislation and this privacy policy.\n\nA cookie is a commonly used automated data collection tool. Cookies are small text files that are placed on your computer or device by websites that you visit in order to make websites work, or work more efficiently.\n\nNOTE: If you do not wish to receive cookies you may be able to refuse them by adjusting your browser settings to reject cookies. If you do so, we may be unable to offer you some of our functionalities, services or support. If you have previously visited our websites, you may also have to delete any existing cookies from your browser.\n\nWe, may our partners, make use of cookies, web beacons, pixel tags, scripts or other similar technologies on our websites to improve the browsing experience of our pages. We use different kinds of cookies.\n\nCookies are classified by its *lifespan* and the *domain* to which it belongs.\n\nSession Cookie:: Classified by *lifespan*. Necessary to provide you with services and features available through our websites. Without these cookies, services you may need, such as shopping carts or e-billing, cannot be provided.\n\nPersistent Cookie:: Classified by *lifespan*. Necessary to provide you with services and features available through our websites. Without these cookies, services you may need, such as shopping carts or e-billing, cannot be provided.\n\nFirst-party Cookie:: Classified by the *domain*. Collect information that is either used in aggregate form to help us understand how the website is being used or how effective our marketing campaigns are, or to help us customize the website for you.\n\nSecond-party Cookie:: Classified by the *domain*. Used to make advertising messages more relevant to you.\n"});
      /* eslint-enable */
      if (typeof settings !== 'undefined') {
        moduleOptions = j1.mergeData(moduleOptions, settings);
      }
      // -----------------------------------------------------------------------
      // initializer
      // -----------------------------------------------------------------------
      _this   = j1.adapter.cookiebar;
      logger  = log4javascript.getLogger('j1.adapter.cookiebar');
      _this.setState('started');
      logger.info('state: ' + _this.getState());
      logger.info('module is being initialized');
      j1.core.cookiebar.init({
        expireDays:             365,
        renewOnVisit:           false,
        forceShow:              false,
        domain:                 null,
        referrer:               "www.example.com"
      });
      j1.xhrData(moduleOptions, 'j1.adapter.cookiebar', 'data_loaded');
      // ---------------------------------------------------------------------
      // Initialize events if all modals loaded
      // ---------------------------------------------------------------------
      var dependencies_met_modals_loaded = setInterval (function () {
        if (j1.xhrDataState['#cookiebar_modals'] == 'success') {
          logger.info('load HTML data (AJAX): finished');
          j1.core.cookiebar.eventHandler(moduleOptions);
          _this.setState('finished');
          logger.info('state: ' + _this.getState());
          logger.info('initializing module finished');
          clearInterval(dependencies_met_modals_loaded);
          logger.info('met dependencies for: xhrData');
        }
        if (j1.xhrDataState['#cookiebar_modals'] == 'not loaded') {
          logger.error('load HTML data (AJAX): failed');
          _this.setState('finished');
          logger.info('state: ' + _this.getState());
          logger.info('initializing module finished');
          clearInterval(dependencies_met_modals_loaded);
        }
      }, 25); // END dependencies_met_modals_loaded
    }, // END init
    // -------------------------------------------------------------------------
    // messageHandler: MessageHandler for J1 CookieConsent module
    // Manage messages send from other J1 modules
    // -------------------------------------------------------------------------
    messageHandler: function (sender, message) {
      var json_message = JSON.stringify(message, undefined, 2);
      logText = 'received message from ' + sender + ': ' + json_message;
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
    // setState()
    // Sets the current (processing) state of the module
    // -------------------------------------------------------------------------
    setState: function (stat) {
      _this.state = stat;
    }, // END setState
    // -------------------------------------------------------------------------
    // getState()
    // Returns the current (processing) state of the module
    // -------------------------------------------------------------------------
    getState: function () {
      return _this.state;
    } // END getState
  }; // END return
})(j1, window);


