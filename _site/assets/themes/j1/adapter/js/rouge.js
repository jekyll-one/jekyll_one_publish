

  /*
 # -----------------------------------------------------------------------------
 # ~/assets/themes/j1/adapter/js/rouge.js
 # J1 Adapter for rouge
 #
 # Product/Info:
 # https://jekyll.one
 #
 # Copyright (C) 2021 Juergen Adams
 #
 # J1 Template is licensed under the MIT License.
 # For details, see https://jekyll.one
 # -----------------------------------------------------------------------------
 # Note:
 #  https://github.com/jirutka/asciidoctor-rouge/issues/9
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
j1.adapter['rouge'] = (function (j1, window) {
  // ---------------------------------------------------------------------------
  // globals
  // ---------------------------------------------------------------------------
  var environment             = 'production';
  var moduleOptions           = {};
  var user_state              = {};
  var cookie_names            = j1.getCookieNames();
  var cookie_user_state_name  = cookie_names.user_state;
  var user_state_detected;
  var themeCss;
  var _this;
  var logger;
  var logText;
  var templateOptions = $.extend({}, {"theme":{"name":"Uno light", "author":"J1 Team", "author_url":"https://jekyll.one/"}, "css":{"custom_scss":false, "custom_css":false}, "typography":{"rtext":true, "rtext_size":300}, "asset_path":"/assets/themes/j1", "app_path":"/assets/apps", "image_path":"/assets/images", "archive_path":"/builder/posts/timeline", "categories_path":"/builder/categories", "tags_path":"/builder/tags", "about-site-url":"/pages/public/about/site/", "user_info_url":"/pages/public/legal/en/privacy/", "theme_author_url":"https://jekyll.one", "runtime_data_path":"/assets/data/runtime-data.yml", "message_catalog_data_path":"/assets/data/messages.yml", "colors_data_path":"/assets/data/colors.json", "font_size_data_path":"/assets/data/font_sizes.json", "country_data_path":"/assets/data/countries.json", "cookies":{"app_session":"j1.app.session", "user_session":"j1.user.session", "user_state":"j1.user.state"}, "flicker_timeout":250, "prettify":true, "user":{"provider":"j1", "provider_site_url":"https://jekyll.one", "provider_home_url":"https://jekyll.one", "provider_blog_url":"/pages/public/blog/navigator/", "provider_member_url":"/pages/public/learn/whats_up/", "provider_privacy_url":"/pages/public/legal/en/privacy/", "user_name":"guest", "status":"active", "provider_membership":"guest", "provider_permissions":["public"]}, "bootstrap":{"default_theme":"bootstrap", "cards":{"card_deck":{"break_on_sm":1, "break_on_md":2, "break_on_lg":3, "break_on_xl":3}}, "tooltips":{"enabled":true, "trigger":"hover"}, "popovers":{"enabled":true, "trigger":"hover"}}, "rouge":{"theme_light":"igorpro", "theme_dark":"monokai.sublime"}, "preload":{"font":{"preload":false, "cors":"crossorigin", "fonts":[]}, "css":{"preload":true, "css":["/assets/themes/j1/core/css/themes/uno-light/bootstrap", "/assets/themes/j1/core/css/vendor"], "files":[]}, "js":{"preload":true, "js":["/assets/themes/j1/modules/bmd/js/bootstrap-material-design", "/assets/themes/j1/modules/backstretch/js/backstretch", "/assets/themes/j1/core/js/template"], "files":["/assets/themes/j1/adapter/js/attic.js", "/assets/themes/j1/adapter/js/logger.js", "/assets/themes/j1/adapter/js/bmd.js", "/assets/themes/j1/adapter/js/navigator.js"]}, "image":{"preload":false, "files":["/assets/images/modules/icons/j1/j1-512x512.png"]}}, "preconnect":{"enabled":true, "urls":["https://bootswatch.com"]}, "fa":{"color":"default"}, "body":{"scrollbar":false, "background-color":"md_gray_50", "font-color":"md_gray_900", "font-size":"1em", "font-weight":400, "line-height":1.5}, "comments":{"enabled":true, "provider":"disqus", "disqus":{"short_name":"jekyll-one"}}, "analytics":{"enabled":false, "provider":"google", "google":{"tracking_id":"UA-138160879-1"}, "custom":{"custom_data":null}}, "advertising":{"enabled":true, "provider":"custom", "google":{"publisher_id":"ca-pub-6537273267695855"}, "custom":{"custom_data":null}}, "translation":{"enabled":false, "provider":"google", "google":{"layout":"default", "meta_data":["google-translate-customization"], "page_language":"en", "translation_languages":["all"]}}});
  // ---------------------------------------------------------------------------
  // Helper functions
  // ---------------------------------------------------------------------------
  // ---------------------------------------------------------------------------
  // Main object
  // ---------------------------------------------------------------------------
  return {
    // -------------------------------------------------------------------------
    // helper functions
    // -------------------------------------------------------------------------
    // -------------------------------------------------------------------------
    // Initializer
    // -------------------------------------------------------------------------
    init: function (options) {
      // -----------------------------------------------------------------------
      // globals
      // -----------------------------------------------------------------------
      _this   = j1.adapter.rouge;
      logger  = log4javascript.getLogger('j1.adapter.rouge');
      // initialize state flag
      _this.setState('started');
      logger.info('state: ' + _this.getState());
      logger.info('module is being initialized');
      // -----------------------------------------------------------------------
      // Default module settings
      // -----------------------------------------------------------------------
      var settings = $.extend({
        module_name: 'j1.adapter.rouge',
        generated:   '2021-01-10 14:02:01 +0000'
      }, options);
      // -----------------------------------------------------------------------
      // rouge initializer
      // -----------------------------------------------------------------------
      var log_text = 'Rouge is being initialized';
      logger.info(log_text);
      // Detect|Set J1 UserState
      user_state_detected = j1.existsCookie(cookie_user_state_name);
      if (user_state_detected) {
        user_state            = j1.readCookie(cookie_user_state_name);
        themeCss              = user_state.theme_css;
        var darkTheme         = themeCss.includes('dark') ||
                                themeCss.includes('cyborg') ||
                                themeCss.includes('darkly') ||
                                themeCss.includes('slate') ||
                                themeCss.includes('superhero');
      } else {
        log_text = 'user_state cookie not found';
        logger.warn(log_text);
      }
      var dependencies_met_j1_finished = setInterval(function() {
        if (j1.getState() == 'finished') {
         $('.dropdown-menu a').click(function(){
            $('#selected').html("Current Selection: <div class='bg-primary mt-1 p-2'>"+$(this).text()+"</div>");
         });
          _this.setState('finished');
          logger.info('state: ' + _this.getState());
          clearInterval(dependencies_met_j1_finished);
        } // END dependencies_met_j1_finished
      }, 25);
      var dependencies_met_rouge_theme_loaded = setInterval (function () {
        if (j1.adapter.rouge.getState() === 'finished') {
          if ( darkTheme ) {
            j1.adapter.rouge.reaplyStyles(templateOptions.rouge.theme_dark);
          } else {
            j1.adapter.rouge.reaplyStyles(templateOptions.rouge.theme_light);
          }
          clearInterval(dependencies_met_rouge_theme_loaded);
        }
      }, 25); // END 'dependencies_met_rouge_theme_loaded'
    }, // END init
    // -------------------------------------------------------------------------
    // load|apply new rouge theme
    // -------------------------------------------------------------------------
    reaplyStyles: function (themename) {
      _this.removeAllRougeStyles();
      _this.addStyle(themename);
      return true;
    },
    // -------------------------------------------------------------------------
    // remove existing rouge theme CSS (from section <head>)
    // -------------------------------------------------------------------------
    removeAllRougeStyles: function () {
      $('link[rel=stylesheet][href*="/assets/themes/j1/modules/rouge"]').remove();
    },
    // -------------------------------------------------------------------------
    // add rouge theme CSS (to section <head>)
    // -------------------------------------------------------------------------
    addStyle: function (themename) {
      $('<link>').attr('rel','stylesheet')
      .attr('type','text/css')
      .attr('href','/assets/themes/j1/modules/rouge/css/' +themename+ '/theme.css')
      .appendTo('head');
    },
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



