
/*
 # -----------------------------------------------------------------------------
 # ~/assets/themes/j1/adapter/js/navigator.js
 # JS Adapter for J1 Navigator
 #
 # Product/Info:
 # 
 #
 # Copyright (C) 2021 Juergen Adams
 #
 # J1 Template is licensed under the MIT License.
 # For details, see 
 # -----------------------------------------------------------------------------
 # NOTE: For AJAX (XHR) loads see
 #  https://stackoverflow.com/questions/3709597/wait-until-all-jquery-ajax-requests-are-done
 # -----------------------------------------------------------------------------
 # NOTE: For getStyleValue helper see
 #  https://stackoverflow.com/questions/16965515/how-to-get-a-style-attribute-from-a-css-class-by-javascript-jquery
 # -----------------------------------------------------------------------------
 # Adapter generated: 2021-01-10 14:02:01 +0000
 # -----------------------------------------------------------------------------
*/
// -----------------------------------------------------------------------------
// ESLint shimming
// -----------------------------------------------------------------------------
/* eslint indent: "off"                                                       */
// -----------------------------------------------------------------------------
'use strict';
j1.adapter['navigator'] = (function (j1, window) {
  // ---------------------------------------------------------------------------
  // globals
  // ---------------------------------------------------------------------------
  var environment                 = 'production';
  var dclFinished                 = false;
  var moduleOptions               = {};
  var nav_menu_id                 = '';
  var nav_quicklinks_id           = '';
  var authclient_modals_id        = '';
  var colors_data_path            = '';
  var font_size_data_path         = '';
  var nav_menu_data_path          = '';
  var nav_quicklinks_data_path    = '';
  var authclient_modals_data_path = '/assets/data/authclient/index.html';
  var cookie_names                = j1.getCookieNames();
  var cookie_user_session_name    = cookie_names.user_session;
  var user_session                = {};
  var user_session_merged         = {};
  var session_state               = {};
  var themerEnabled               = true;                 //was (test): false;
  var authClientEnabled;
  var appDetected;
  var json_data;
  var _this;
  var logger;
  var logText;
  // ---------------------------------------------------------------------------
  // helper functions
  // ---------------------------------------------------------------------------
  // ---------------------------------------------------------------------------
  // main object
  // ---------------------------------------------------------------------------
  return {
    // -------------------------------------------------------------------------
    // module initializer
    // -------------------------------------------------------------------------
    init: function (options) {
      // -----------------------------------------------------------------------
      // globals
      // -----------------------------------------------------------------------
      _this         = j1.adapter.navigator;
      logger        = log4javascript.getLogger('j1.adapter.navigator');
      // initialize state flag
      _this.setState('started');
      logger.info('state: ' + _this.getState());
      logger.info('module is being initialized');
      // -----------------------------------------------------------------------
      // defaults
      // -----------------------------------------------------------------------
      var settings  = $.extend({
        module_name: 'j1.adapter.navigator',
        generated:   '2021-01-10 14:02:01 +0000'
      }, options);
      // -----------------------------------------------------------------------
      // options loader
      // -----------------------------------------------------------------------
      /* eslint-disable */
      var authConfig                                = {};
      var navDefaults                               = {};
      var navBarConfig                              = {};
      var navMenuConfig                             = {};
      var navQuicklinksConfig                       = {};
      var navTopsearchConfig                        = {};
      var navAuthClientConfig                       = {};
      var navBarOptions                             = {};
      var navMenuOptions                            = {};
      var navQuicklinksOptions                      = {};
      var navTopsearchOptions                       = {};
      var navAuthClientOptions                      = {};
      var navAuthMAnagerConfig                      = {};
      var themerOptions                             = {};
      navDefaults                                   = $.extend({}, {"icon_family":"MDI", "icon_style":"mdi", "icon_color":"mdi-grey", "icon_size":"mdi-sm", "nav_primary_color":"#2196F3", "nav_bar":{"enabled":false, "xhr_container_id":"navigator_nav_navbar", "media_breakpoint":"lg", "brand_position":"right", "brand_type":"image", "brand_type_collapsed":"text", "fixed":true, "style":"overlay", "color":"light", "position":"left", "bottom_line_height":1, "bottom_line_color":"#EEEEEE", "background_color_full":"rgba(0, 0, 0, 0.4)", "background_color_collapsed":"#2196F3", "background_color_scrolled":"#2196F3"}, "nav_mmenu":{"enabled":false, "mmenu_plugin":{"node":"null", "mediaQuery":"all", "max_width":100000}, "mmenu_navigator":{"selected":"Selected", "slidingSubmenus":true, "title":"Navigation", "theme":"dark"}, "mmenu_drawer":{"position":"right"}}, "nav_menu":{"enabled":false, "xhr_container_id":"navigator_nav_menu", "xhr_data_path":"/assets/data/menu/index.html", "raised_level":5, "delay_menu_open":200, "max_height":550, "menu_font_size":"larger", "megamenu_font_size":"small", "icon_family":"MDI", "icon_style":"mdi", "icon_color":"#9E9E9E", "icon_size":"mdi-sm", "menu_item_color":"rgba(255, 255, 255, 0.5)", "menu_item_color_hover":"rgba(255, 255, 255, 0.9)", "dropdown_style":"raised", "dropdown_item_style":"flat", "dropdown_animate":false, "dropdown_animate_in":"slideInDown", "dropdown_animate_out":"fadeOutDown", "dropdown_animate_duration":0.75, "dropdown_item_min_width":15, "dropdown_menu_max_height":35, "dropdown_font_size":"small", "dropdown_padding_x":18, "dropdown_padding_y":10, "dropdown_item_color":"#212121", "dropdown_border_color":"#3f51b5", "dropdown_border_top":0, "dropdown_border_radius":0, "dropdown_background_color_hover":"#ECEFF1", "dropdown_background_color_active":"#CFD8DC"}, "nav_quicklinks":{"enabled":false, "xhr_container_id":"navigator_nav_quicklinks", "xhr_data_path":"/assets/data/quicklinks/index.html", "icon_family":"MDI", "icon_color":"rgba(255, 255, 255, 0.5)", "icon_color_hover":"rgba(255, 255, 255, 0.9)", "icon_size":"mdi-2x", "cookies_icon":"cookie", "top_search_icon":"magnify", "translator_icon":"flag-variant", "toc_icon":"wrap", "home_icon":"home-variant", "home_url":"none", "r_text_sizer":false, "r_text_icon":"format-text", "back_icon":"subdirectory-arrow-left", "back_url":"none", "disqus_icon":"disqus", "disqus_url":"none", "github_icon":"github-circle", "github_url":"none", "patreon_icon":"patreon", "patreon_url":"none", "facebook_icon":"facebook", "facebook_url":"none", "twitter_icon":"twitter", "twitter_url":"none"}, "nav_topsearch":{"enabled":false, "xhr_container_id":"navigator_nav_topsearch", "type":"quicksearch", "icon_family":"MDI", "icon_color":"#FFFFFF", "icon_size":"mdi-2x", "search_icon":"magnify", "close_icon":"close", "clear_icon":"format-clear", "input_color":"rgba(0, 0, 0, 0.7)", "background_color":"#FAFAFA", "placeholder":"QuickSearch", "search_heading_lead":"", "result_heading_lead":""}});
      navBarConfig                                  = $.extend({}, {"enabled":true, "xhr_container_id":"navigator_nav_navbar", "media_breakpoint":"lg", "brand_position":"right", "brand_type":"image", "brand_type_collapsed":"text", "fixed":true, "style":"overlay", "color":"light", "position":"left", "bottom_line_height":1, "bottom_line_color":"#EEEEEE", "background_color_full":"rgba(0, 0, 0, 0.4)", "background_color_collapsed":"#2196F3", "background_color_scrolled":"#2196F3"});
      navMenuConfig                                 = $.extend({}, {"enabled":true, "xhr_container_id":"navigator_nav_menu", "xhr_data_path":"/assets/data/menu/index.html", "raised_level":5, "delay_menu_open":200, "max_height":550, "menu_font_size":"larger", "megamenu_font_size":"small", "icon_family":"MDI", "icon_style":"mdi", "icon_color":"#9E9E9E", "icon_size":"mdi-sm", "menu_item_color":"rgba(255, 255, 255, 0.5)", "menu_item_color_hover":"rgba(255, 255, 255, 0.9)", "dropdown_style":"raised", "dropdown_item_style":"flat", "dropdown_animate":false, "dropdown_animate_in":"slideInDown", "dropdown_animate_out":"fadeOutDown", "dropdown_animate_duration":0.75, "dropdown_item_min_width":15, "dropdown_menu_max_height":35, "dropdown_font_size":"small", "dropdown_padding_x":18, "dropdown_padding_y":10, "dropdown_item_color":"#212121", "dropdown_border_color":"#3f51b5", "dropdown_border_top":0, "dropdown_border_radius":0, "dropdown_background_color_hover":"#ECEFF1", "dropdown_background_color_active":"#CFD8DC", "delay_open_menu":250});
      navQuicklinksConfig                           = $.extend({}, {"enabled":true, "xhr_container_id":"navigator_nav_quicklinks", "xhr_data_path":"/assets/data/quicklinks/index.html", "icon_family":"MDI", "icon_color":"rgba(255, 255, 255, 0.5)", "icon_color_hover":"rgba(255, 255, 255, 0.9)", "icon_size":"mdi-2x", "cookies_icon":"cookie", "top_search_icon":"magnify", "translator_icon":"flag-variant", "toc_icon":"wrap", "home_icon":"home-variant", "home_url":"https://preview.jekyll.one/", "r_text_sizer":false, "r_text_icon":"format-text", "back_icon":"subdirectory-arrow-left", "back_url":"https://jekyll.one/", "disqus_icon":"disqus", "disqus_url":"none", "github_icon":"github-circle", "github_url":"none", "patreon_icon":"patreon", "patreon_url":"none", "facebook_icon":"facebook", "facebook_url":"none", "twitter_icon":"twitter", "twitter_url":"none"});
      navTopsearchConfig                            = $.extend({}, {"enabled":true, "xhr_container_id":"navigator_nav_topsearch", "type":"quicksearch", "icon_family":"MDI", "icon_color":"#FFFFFF", "icon_size":"mdi-2x", "search_icon":"magnify", "close_icon":"close", "clear_icon":"format-clear", "input_color":"rgba(0, 0, 0, 0.7)", "background_color":"#FAFAFA", "placeholder":"QuickSearch", "search_heading_lead":"", "result_heading_lead":""});
      navAuthClientConfig                           = $.extend({}, {"enabled":true, "xhr_container_id":"authclient_modals", "xhr_data_path":"/assets/data/authclient/index.html", "signin_modal_id":"modalOmniSignIn", "hide_on_cookies_declined":true, "icon_family":"MDI", "signin_icon":"login", "signout_icon":"logout", "auth_signin_modal":{"title":"SignIn", "body_text":"In order to get *signed in*, check one of the options below and mark a provider for authentication. You'll be *redirected* to authenticate with the provider *selected*. If signed in *successfully*, you get back to this site for the page requested.\n\nNOTE: To get access to secured pages of this site, authentication with a provider is needed only *once*.\n"}, "auth_disqus":{"id":1, "title":"Disqus", "text":"SignIn to Disqus. Get access to all *PROTECTED* content pages of this site.\n"}, "auth_facebook":{"id":2, "title":"Facebook", "text":"SignIn to Facebook. Get access to all *PROTECTED* content pages of this site.\n"}, "auth_github":{"id":3, "title":"Github", "text":"SignIn to Github. Get access to all *PROTECTED* content pages of this site.\n"}, "auth_patreon":{"id":4, "title":"Patreon", "text":"SignIn to Patreon. Get access to all *PROTECTED* and *PRIVATE* content pages of this site.\n"}, "auth_twitter":{"id":5, "title":"Twitter", "text":"SignIn to Twitter. Get access to all *PROTECTED* content pages of this site.\n"}, "auth_signout_modal":{"title":"SignOut", "body_text":"After signing out from this site, you'll be *redirected* to the *provider* you're currently authenticated. From your home page at the *provider*, you can *sign out* completely.\n\nNOTE: In order to signing out *completely*, check the switch below to *on*.\n"}});
      navAuthMAnagerConfig                          = $.extend({}, {"j1_auth":{"enabled":false, "ssl":false, "content":{"public":["\\W*((?i)assets(?-i))\\W*", "\\W*((?i)public(?-i))\\W*"], "protected":["\\W*((?i)protected(?-i))\\W*"], "private":["\\W*((?i)private(?-i))\\W*"]}, "providers":{"activated":["github", "disqus"], "disqus":{"provider_url":"https://disqus.com", "strategy":"member", "scope":[], "users":["all"], "permissions":["protected"], "data_fields":[], "conditions":{"protected":{"enabled":true, "users":{"blacklist":[]}}, "private":{"enabled":false, "users":{"whitelist":["all"], "blacklist":[]}}}}, "github":{"provider_url":"https://github.com", "strategy":"member", "scope":[], "users":["all"], "permissions":["protected", "private"], "data_fields":[], "conditions":{"protected":{"enabled":true, "users":{"blacklist":[]}}, "private":{"enabled":true, "users":{"whitelist":["all"], "blacklist":[]}}}}}}, "auth_client":{"enabled":true, "auth_signin_modal":{"title":"SignIn", "body_text":"In order to get *signed in*, check one of the options below and mark a provider for authentication. You'll be *redirected* to authenticate with the provider *selected*. If signed in *successfully*, you get back to this site for the page requested.\n\nNOTE: To get access to secured pages of this site, authentication with a provider is needed only *once*.\n"}, "auth_disqus":{"id":1, "title":"Disqus", "text":"SignIn to Disqus. Get access to all *PROTECTED* content pages of this site.\n"}, "auth_facebook":{"id":2, "title":"Facebook", "text":"SignIn to Facebook. Get access to all *PROTECTED* content pages of this site.\n"}, "auth_github":{"id":3, "title":"Github", "text":"SignIn to Github. Get access to all *PROTECTED* content pages of this site.\n"}, "auth_patreon":{"id":4, "title":"Patreon", "text":"SignIn to Patreon. Get access to all *PROTECTED* and *PRIVATE* content pages of this site.\n"}, "auth_twitter":{"id":5, "title":"Twitter", "text":"SignIn to Twitter. Get access to all *PROTECTED* content pages of this site.\n"}, "auth_signout_modal":{"title":"SignOut", "body_text":"After signing out from this site, you'll be *redirected* to the *provider* you're currently authenticated. From your home page at the *provider*, you can *sign out* completely.\n\nNOTE: In order to signing out *completely*, check the switch below to *on*.\n"}}});
      authClientEnabled                             = navAuthMAnagerConfig.enabled;
      themerOptions                                 = $.extend({}, {"enabled":true, "saveToCookie":true, "debug":false, "preview_page":"/pages/public/previewer/theme/", "menu_icon_family":"MDI", "menu_icon_color":"#9E9E9E", "menu_icon_size":"mdi-sm", "cssThemeLink":"bootstrapTheme", "defaultCssFile":"https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css", "bootswatchApiUrl":"https://bootswatch.com/api", "bootswatchApiVersion":4, "loadFromBootswatch":true, "localThemes":"/assets/data/themes.json", "excludeBootswatch":"Default, default, Lux, Sketchy", "includeBootswatch":"", "skipIncludeBootswatch":""});
      // Merge|Overload module CONFIG by DEFAULTS
      //
      navBarOptions                                 = j1.mergeData(navBarConfig, navDefaults.nav_bar);
      navMenuOptions                                = j1.mergeData(navMenuConfig, navDefaults.nav_menu);
      navQuicklinksOptions                          = j1.mergeData(navQuicklinksConfig, navDefaults.nav_quicklinks);
      navTopsearchOptions                           = j1.mergeData(navTopsearchConfig, navDefaults.nav_topsearch);
      navAuthClientConfig                           = j1.mergeData(navAuthClientConfig, navDefaults.nav_authclient);
      // save config settings into the adapter object for global access
      //
      _this['navDefaults']           = navDefaults;
      _this['navBarOptions']         = navBarOptions;
      _this['navMenuOptions']        = navMenuOptions;
      _this['navQuicklinksOptions']  = navQuicklinksOptions;
      _this['navTopsearchOptions']   = navTopsearchOptions;
      _this['navAuthClientConfig']   = navAuthClientConfig;
      _this['navAuthManagerConfig']  = navAuthMAnagerConfig;
      // Load (individual) frontmatter options (currently NOT used)
      if (options  != null) { var frontmatterOptions = $.extend({}, options) }
      /* eslint-enable */
      // -----------------------------------------------------------------------
      // Load HTML data (AJAX)
      // -----------------------------------------------------------------------
      // jadams, 202-06-24: Promise (chain) if $.when seems NOT to work correctly.
      // It seems a chain using .then will be a better solution to make it sure
      // that the last Deferred set the state to 'data_loaded'.
      // Found the final state randomly set to 'null' what prevent the module
      // to run mmenuInitializer.
      // Workaround: Set 'data_loaded' to be returned by all Deferred in
      // the chain.
      // See: https://stackoverflow.com/questions/5436327/jquery-deferreds-and-promises-then-vs-done
      //
      // -----------------------------------------------------------------------
      // data loader
      // -----------------------------------------------------------------------
      j1.xhrData({
        xhr_container_id: navQuicklinksOptions.xhr_container_id,
        xhr_data_path:    navQuicklinksOptions.xhr_data_path },
        'j1.adapter.navigator',
        null);
      j1.xhrData({
        xhr_container_id: navAuthClientConfig.xhr_container_id,
        xhr_data_path:    navAuthClientConfig.xhr_data_path },
        'j1.adapter.navigator',
        null);
      j1.xhrData({
        xhr_container_id: navMenuOptions.xhr_container_id,
        xhr_data_path:    navMenuOptions.xhr_data_path },
        'j1.adapter.navigator',
        'null');
      var dependencies_met_load_menu_finished = setInterval (function () {
        if (j1.xhrDOMState['#'+navQuicklinksOptions.xhr_container_id] == 'not loaded' ||
            j1.xhrDOMState['#'+navAuthClientConfig.xhr_container_id] == 'not loaded' ||
            j1.xhrDOMState['#'+navMenuOptions.xhr_container_id] == 'not loaded' ){
          logger.error('load HTML data (AJAX): failed');
          _this.setState('finished');
          logger.info('state: ' + _this.getState());
          logger.info('initializing module: failed');
          logger.info('met dependencies for: xhrData');
          clearInterval(dependencies_met_load_menu_finished);
        }
        // continue if all AJAX loads (xhrData) has finished
        if (j1.xhrDOMState['#'+navQuicklinksOptions.xhr_container_id] == 'success' &&
            j1.xhrDOMState['#'+navAuthClientConfig.xhr_container_id] == 'success' &&
            j1.xhrDOMState['#'+navMenuOptions.xhr_container_id] == 'success' ){
          _this.setState('processing');
          logger.info('status: ' + _this.getState());
          logger.info('initialize navigator core');
          // Detect|Set J1 App status
          appDetected       = j1.appDetected();
          authClientEnabled = j1.authEnabled();
          logger.info('application status detected: ' + appDetected);
          j1.core.navigator.init (
            _this.navDefaults,
            _this.navMenuOptions
          );
          // _this.delayShowMenu( 200 );
          // cast text-based booleans
          // themerEnabled = (true === 'true');
          // load themes (to menu) if themer is enabled|finished
          if (themerEnabled) {
            var dependencies_met_page_finished = setInterval(function() {
              // jadams, 2020-10-03: NOT needed to wait for j1 finished
//            if (j1.getState() == 'finished') {
              if (j1.adapter.themer.getState() == 'finished') {
                // initialize theme switcher menus
                logText = 'theme switcher detect: enabled';
                logger.info(logText);
                // load remote themes (Bootswatch API)
                logText = 'load remote themes (Bootswatch API)';
                logger.info(logText);
                $('#remote_themes').bootstrapThemeSwitcher({localFeed: ''});
                // load local themes (json file)
                logText = 'load local themes (json file)';
                logger.info(logText);
                $('#local_themes').bootstrapThemeSwitcher({localFeed: themerOptions.localThemes});
                clearInterval(dependencies_met_page_finished);
              }
              _this.setState('initialized');
            }, 25); // END 'dependencies_met_page_finished'
          } else {
            logText = 'theme switcher detected as: disabled';
            logger.info(logText);
          }
          // -----------------------------------------------------------------
          // event handler|css styles
          // -----------------------------------------------------------------
          // continue if Theme CSS is applied
          var dependencies_met_themer_finished = setInterval(function() {
            if (themerEnabled) {
              if (j1.adapter.themer.getState() === 'finished') {
                _this.setState('processing');
                logger.info('initialize eventHandler');
                j1.core.navigator.eventHandler();
                var dependencies_met_page_finished = setInterval(function() {
                  if (j1.getState() == 'finished') {
                    // set general|global theme colors
                    logger.info('initializing dynamic CSS styles: started');
                    _this.setCSS (
                      navDefaults, navBarOptions, navMenuOptions,
                      navQuicklinksOptions, navTopsearchOptions
                    );
                    clearInterval(dependencies_met_page_finished);
                  }
                  logger.info('initializing dynamic CSS styles: finished');
                }, 25); // END 'dependencies_met_page_finished'
                logger.info('init auth client');
                _this.initAuthClient(_this.navAuthManagerConfig);
                _this.setState('finished');
                logger.info('state: ' + _this.getState());
                logger.info('module initialized successfully');
                logger.info('met dependencies for: j1');
                clearInterval(dependencies_met_themer_finished);
              }
            } else {
              _this.setState('processing');
              logger.info('initialize eventHandler');
              j1.core.navigator.eventHandler();
              // set general|global theme colors
              logger.info('apply dynamic CSS styles');
              _this.setCSS (
                navDefaults, navBarOptions, navMenuOptions,
                navQuicklinksOptions, navTopsearchOptions
              );
              logger.info('init auth client');
              _this.initAuthClient(_this.navAuthManagerConfig);
              _this.setState('finished');
              logger.info('state: ' + _this.getState());
              clearInterval(dependencies_met_themer_finished);
            }
          }, 25); // END 'dependencies_met_themer_finished'
          logger.info('met dependencies for: themer');
          clearInterval(dependencies_met_load_menu_finished);
        }
      }, 25); // END 'dependencies_met_load_menu_finished'
      // --------------------------------------------------------------------
      // Register event 'reset on resize' to call j1.core.navigator on
      // manageDropdownMenu to manage the (current) NAV menu for
      // desktop or mobile
      // ---------------------------------------------------------------------
      $(window).on('resize', function() {
        j1.core.navigator.manageDropdownMenu(navDefaults, navMenuOptions);
        // jadams, 2020-07-10: cause severe trouble on mobile devices if
        // OnScreen Kbd comes up and reduces the window size (resize event)
        // DISABLED
        // -------------------------------------------------------------------
        // Hide|Close topSearch on resize event
        // $('.top-search').slideUp();
        // Manage sticky NAV bars
        setTimeout (function() {
          j1.core.navigator.navbarSticky();
        }, 500);
        // Scroll the page one pixel back and forth to get
        // the right position for Toccer (trigger) and SSM
        $(window).scrollTop($(window).scrollTop()+1);
        $(window).scrollTop($(window).scrollTop()-1);
        // jadams, 2020-06-21: unclear|forgotten what I'm doing here!
        // Looks like the old BS3 implementation
        //
        // $('.navbar-collapse').removeClass('in');
        // $('.navbar-collapse').removeClass('on');
        // $('.navbar-collapse').removeClass('bounceIn');
      });
    }, // END init
    // -------------------------------------------------------------------------
    // initialize JS portion for the dialogs (modals) used by J1AuthClient
    // NOTE: Currently cookie updates NOT processed at the NAV module
    //       All updates on Cookies are managed by Cookie Consent.
    //       To be considered to re-add cookie updates for the auth state
    // -------------------------------------------------------------------------
    initAuthClient: function(auth_config) {
      var logger        = log4javascript.getLogger('j1.adapter.navigator.initAuthClient');
      var user_session  = j1.readCookie(cookie_user_session_name);
      _this.modalEventHandler(auth_config);
      if (j1.appDetected() && j1.authEnabled()) {
        // Toggle/Set SignIn/SignOut icon|link in QuickLinks
        // See: https://stackoverflow.com/questions/13524107/how-to-set-data-attributes-in-html-elements
        if (user_session.authenticated === 'true') {
          // Set SignOut
          $('#navLinkSignInOut').attr('data-target', '#modalOmniSignOut');
          $('#iconSignInOut').removeClass('mdi-login').addClass('mdi-logout');
        } else {
          // Set SignIn
          $('#navLinkSignInOut').attr('data-target', '#modalOmniSignIn');
          $('#iconSignInOut').removeClass('mdi-logout').addClass('mdi-login');
        }
      }
      return true;
    }, // END initAuthClient
    // -------------------------------------------------------------------------
    // modalEventHandler
    // Manage button click events for all BS Modals
    // See: https://www.nickang.com/add-event-listener-for-loop-problem-in-javascript/
    // -------------------------------------------------------------------------
    modalEventHandler: function (options) {
      // var logger      = log4javascript.getLogger('j1.adapter.navigator.EventHandler');
      var authConfig  = options.j1_auth;
      var route;
      var provider;
      var provider_url;
      var allowed_users;
      var logText;
      var signIn = {
        provider:         authConfig.providers.activated[0],
        users:            authConfig.providers[authConfig.providers['activated'][0]]['users'],
        do:               false
      };
      var signOut = {
        provider:         authConfig.providers.activated[0],
        providerSignOut:  false,
        do:               false
      };
      logText = 'initialize button click events';
      logger.info(logText);
      // Manage button click events for modal "signInOutButton"
      // -----------------------------------------------------------------------
      $('ul.nav-pills > li').click(function (e) {
        e.preventDefault();
        // jadams, 2019-07-30: To be checked if needed
        signIn.provider       = $(this).text().trim();
        signIn.provider       = signIn.provider.toLowerCase();
        signIn.allowed_users  = signIn.users.toString();
      });
      $('a.btn').click(function() {
        if (this.id === 'signInButton') {
          signIn.do = true;
        } else {
          signIn.do = false;
        }
        if (this.id === 'signOutButton') {
          signOut.do = true;
        } else {
          signOut.do = false;
        }
      });
      $('input:checkbox[name="providerSignOut"]').on('click', function (e) {
        e.stopPropagation();
        signOut.providerSignOut = $('input:checkbox[name="providerSignOut"]').is(':checked');
        if(environment === 'development') {
          logText = 'provider signout set to: ' + signOut.providerSignOut;
          logger.info(logText);
        }
      });
      // Manage pre events on modal "modalOmniSignIn"
      // -----------------------------------------------------------------------
      $('#modalOmniSignOut').on('show.bs.modal', function() {
          var modal = $(this);
          logger.info('place current user data');
          user_session = j1.readCookie(cookie_user_session_name);
          modal.find('.user-info').text('You are signed in to provider: ' + user_session.provider);
      }); // END SHOW modalOmniSignOut
      // Manage post events on modal "modalOmniSignIn"
      // -----------------------------------------------------------------------
      $('#modalOmniSignIn').on('hidden.bs.modal', function() {
        if (signIn.do == true) {
          provider      = signIn.provider.toLowerCase();
          allowed_users = signIn.users.toString();
          logText       = 'provider detected: ' + provider;
          logger.info(logText);
          var route = '/authentication?request=signin&provider=' +provider+ '&allowed_users=' +allowed_users;
          logText = 'call middleware for signin on route: ' + route;
          logger.info(logText);
          window.location.href = route;
        } else {
          provider = signIn.provider.toLowerCase();
          logText = 'provider detected: ' + provider;
          logger.info(logText);
          logText = 'login declined for provider: ' +provider;
          logger.info(logText);
        }
      }); // END post events "modalOmniSignIn"
      // Manage post events on modal "modalOmniSignOut"
      // -----------------------------------------------------------------------
      $('#modalOmniSignOut').on('hidden.bs.modal', function() {
        if (signOut.do == true) {
          logger.info('load active provider from cookie: ' + cookie_user_session_name);
          user_session  = j1.readCookie(cookie_user_session_name);
          provider      = user_session.provider;
          provider_url  = user_session.provider_site_url;
          logText = 'provider detected: ' + provider;
          logger.info(logText);
          logText = 'initiate signout for provider: ' +provider;
          logger.info(logText);
          var route = '/authentication?request=signout&provider=' + provider + '&provider_signout=' + signOut.providerSignOut; // + '/logout/';
          logText = 'call middleware on route : ' +route;
          logger.info(logText);
          window.location.href = route;
        } else {
          provider = signOut.provider.toLowerCase();
          logText = 'provider detected: ' + provider;
          logger.info(logText);
          logText = 'signout declined for provider: ' +provider ;
          logger.info(logText);
        }
      }); // END post events "modalSignOut"
      logText = 'initialize button click events completed';
      logger.info(logText);
      return true;
    }, // END modalEventHandler
    // -------------------------------------------------------------------------
    // setCSS
    // Set dynamic CSS styles
    // -------------------------------------------------------------------------
    setCSS: function (navDefaults, navBarOptions, navMenuOptions, navQuicklinksOptions, navTopsearchOptions) {
      var logger              = log4javascript.getLogger('j1.adapter.navigator.setCSS');
      var gridBreakpoint_lg   = '992px';
      var gridBreakpoint_md   = '768px';
      var gridBreakpoint_sm   = '576px';
      var navPrimaryColor     = navDefaults.nav_primary_color;
      navMenuOptions.dropdown_font_size               = navMenuOptions.dropdown_font_size;
      navMenuOptions.megamenu_font_size               = navMenuOptions.megamenu_font_size;
      navBarOptions.background_color_full             = navBarOptions.background_color_full;
      navMenuOptions.menu_item_color                  = navMenuOptions.menu_item_color;
      navMenuOptions.menu_item_color_hover            = navMenuOptions.menu_item_color_hover;
      navMenuOptions.menu_item_dropdown_color         = navMenuOptions.menu_item_dropdown_color;
      navMenuOptions.dropdown_item_color              = navMenuOptions.dropdown_item_color;
      navMenuOptions.dropdown_background_color_hover  = navMenuOptions.dropdown_background_color_hover;
      navMenuOptions.dropdown_background_color_active = navMenuOptions.dropdown_background_color_active;
      navMenuOptions.dropdown_border_color            = navMenuOptions.dropdown_border_color;
      navQuicklinksOptions.icon_color                 = navQuicklinksOptions.icon_color;
      navQuicklinksOptions.icon_color_hover           = navQuicklinksOptions.icon_color_hover;
      navQuicklinksOptions.background_color           = navQuicklinksOptions.background_color;
      navTopsearchOptions.input_color                 = navTopsearchOptions.input_color;
      navTopsearchOptions.background_color            = navTopsearchOptions.background_color;
      // $('nav-primary').css({"background-color": "navPrimaryColor"});
      var bg_primary    = j1.getStyleValue('bg-primary', 'background-color');
      var bg_scrolled   = bg_primary;
      var bg_collapsed  = bg_primary;
      $('head').append('<style>.mdi-bg-primary {color: ' +bg_scrolled+ ';}</style>');
      // Size of brand image
      $('head').append('<style>.navbar-brand > img { height: 48px !important; }</style>');
      // Navbar transparent-light (light)
      $('head').append('<style>@media (min-width: ' +gridBreakpoint_lg+ ') { nav.navbar.navigator.navbar-transparent.light { background-color: ' +navBarOptions.background_color_full+ ' !important; border-bottom: solid 0px !important; } }</style>');
      $('head').append('<style>@media (min-width: ' +gridBreakpoint_lg+ ') { nav.navbar.navigator.navbar-scrolled.light { background-color: ' +bg_scrolled+ ' !important; } }</style>');
      $('head').append('<style id="dynNav">@media (max-width: ' +gridBreakpoint_md+ ') { nav.navbar.navigator.navbar-transparent.light { background-color: ' +navBarOptions.background_color_full+ ' !important; border-bottom: solid 0px !important; } }</style>');
      $('head').append('<style id="dynNav">@media (max-width: ' +gridBreakpoint_md+ ') { nav.navbar.navigator.navbar-scrolled.light { background-color: ' +bg_scrolled+ ' !important; } }</style>');
      $('head').append('<style id="dynNav">@media (min-width: ' +gridBreakpoint_md+ ') { nav.navbar.navigator.navbar-transparent.light { background-color: ' +navBarOptions.background_color_full+ ' !important; border-bottom: solid 0px !important; } }</style>');
      $('head').append('<style id="dynNav">@media (min-width: ' +gridBreakpoint_md+ ') { nav.navbar.navigator.navbar-scrolled.light { background-color: ' +bg_scrolled+ ' !important; } }</style>');
      $('head').append('<style id="dynNav">@media (max-width: ' +gridBreakpoint_sm+ ') { nav.navbar.navigator.navbar-transparent.light { background-color: ' +navBarOptions.background_color_full+ ' !important; border-bottom: solid 0px !important; } }</style>');
      $('head').append('<style id="dynNav">@media (max-width: ' +gridBreakpoint_sm+ ') { nav.navbar.navigator.navbar-scrolled.light { background-color: ' +bg_scrolled+ ' !important; } }</style>');
      $('head').append('<style>.attr-nav> ul > li > a { color: ' +navQuicklinksOptions.icon_color+ ' !important; }</style>');
      $('head').append('<style>.attr-nav> ul > li > a:hover { color: ' +navQuicklinksOptions.icon_color_hover+ ' !important; }</style>');
      // Remove background for anchor
      $('head').append('<style>.dropdown-menu > .active > a { background-color: transparent !important; }</style>');
      // hover menu-item|menu-sub-item
      $('head').append('<style>@media (min-width: ' +gridBreakpoint_lg+ ') { nav.navbar.navigator .dropdown-item:focus, nav.navbar.navigator .dropdown-item:hover, nav.navbar.navigator .nav-sub-item:focus, nav.navbar.navigator .nav-sub-item:hover { background: ' +navMenuOptions.dropdown_background_color_hover+ ' !important; }}</style>');
      // Limit 1st dropdown item width
      $('head').append('<style>@media (min-width: ' +gridBreakpoint_lg+ ') { nav.navbar.navigator ul.nav.navbar-right .dropdown-menu .dropdown-menu { left: -' +navMenuOptions.dropdown_item_min_width+ 'rem !important; } }</style>');
      // Limit last (2nd) dropdown in height (nav.navbar.navigator li.dropdown ul.dropdown-menu ul.dropdown-menu)
      $('head').append('<style>@media (min-width: ' +gridBreakpoint_lg+ ') { nav.navbar.navigator li.dropdown ul.dropdown-menu ul.dropdown-menu  { top: -' +navMenuOptions.dropdown_border_top+ 'px !important; max-height: ' +navMenuOptions.dropdown_menu_max_height+ 'em !important; } }</style>');
      //  Set dropdown item colors
      $('head').append('<style>@media (min-width: ' +gridBreakpoint_lg+ ') { nav.navbar.navigator ul.nav > li > a { color: ' +navMenuOptions.menu_item_color+ ' !important; } }</style>');
      $('head').append('<style>@media (min-width: ' +gridBreakpoint_lg+ ') { nav.navbar.navigator ul.nav > li > a:hover { color: ' +navMenuOptions.menu_item_color_hover+ ' !important; } }</style>');
      // Dropdown menu styles
      // jadams, 2017-11-30: removed left padding from dropdown mwenu (for new j1nav style based on Navigator|Slate)
      $('head').append('<style>@media (min-width: ' +gridBreakpoint_lg+ ') { nav.navbar.navigator li.dropdown ul.dropdown-menu { animation-duration: ' +navMenuOptions.dropdown_animate_duration+ 's !important; color: ' +bg_scrolled+ ' !important; min-width: ' +navMenuOptions.dropdown_item_min_width+ 'rem !important; border-top: solid ' +navMenuOptions.dropdown_border_top+ 'px !important; border-radius: ' +navMenuOptions.dropdown_border_radius+ 'px !important; left: 0; } }</style>');
      // jadams, 2017-11-22: configure dropdown_font_size|color
      $('head').append('<style>@media (min-width: ' +gridBreakpoint_lg+ ') { nav.navbar.navigator li.dropdown ul.dropdown-menu > li > a { color: ' +navMenuOptions.dropdown_item_color+ ' !important; font-size: ' +navMenuOptions.dropdown_font_size+ ' !important; font-weight: 400; } }</style>');
      $('head').append('<style>@media (min-width: ' +gridBreakpoint_lg+ ') { nav.navbar.navigator ul.dropdown-menu.megamenu-content .content ul.menu-col li a { color: ' +navMenuOptions.dropdown_item_color+ ' !important; font-size: ' +navMenuOptions.megamenu_font_size+ ' !important; font-weight: 400; } }</style>');
//    jadams, 2020-07-08: disabled because colors for icons set by the icon font settings
//    $('head').append('<style>.top-search .input-group-addon { color: ' +navTopsearchOptions.input_color+ ' !important; }</style>');
      $('head').append('<style>.top-search { background-color: ' +navTopsearchOptions.background_color+ ' !important; }</style>');
      $('head').append('<style>.top-search input.form-control { color: ' +navTopsearchOptions.input_color+ ' !important; }</style>');
  	  $('head').append('<style>.timeline > li > .timeline-panel:after {border-right-color: ' +bg_scrolled+ '; border-left-color: ' +bg_scrolled+ ';}</style>');
      $('head').append('<style>.tmicon {background: ' +bg_scrolled+ ';}</style>');
      $('head').append('<style>.heading:after {background: ' +bg_scrolled+ ' !important;}</style>');
      $('head').append('<style>.tag-cloud ul li a {background-color: ' +bg_scrolled+ ' !important;}</style>');
      // $('head').append('<style>.tag-cloud ul li a:hover {background-color: #212121 !important;}</style>');
      $('head').append('<style>.is-active-link::before {background-color: ' +bg_scrolled+ ' !important;}</style>');
      $('head').append('<style>.modal-dialog.modal-notify.modal-primary .modal-header {background-color: ' +bg_scrolled+ ';}</style>');
      $('head').append('<style>.nav-pills .nav-link.active, .nav-pills .show > .nav-link {background-color: ' +bg_scrolled+ ' !important;}</style>');
      return true;
    }, // END setCSS
    // -------------------------------------------------------------------------
    //  delayShowMenu
    //  delay all dropdown menu to open for "delay" time
    //  See: http://jsfiddle.net/AndreasPizsa/NzvKC/
    // -------------------------------------------------------------------------
    delayShowMenu: function ( menuOpenDelay ) {
      var logger      = log4javascript.getLogger('j1.adapter.navigator.delayShowMenu');
      var theTimer = 0;
      var theElement = null;
      var theLastPosition = {x:0,y:0};
      logText ='entered delayShowMenu';
      logger.info(logText);
      // $('#navigator_nav_menu')
      //   .find('li.dropdown.nav-item')
      $('[data-toggle]').closest('li')
      .on('mouseenter', function (inEvent) {
        if (theElement) theElement.removeClass('open');
        window.clearTimeout(theTimer);
        theElement = $(this);
        theTimer = window.setTimeout(function () {
          theElement.addClass('open');
        }, menuOpenDelay);
      })
      .on('mousemove', function (inEvent) {
        if(Math.abs(theLastPosition.x - inEvent.ScreenX) > 4 ||
           Math.abs(theLastPosition.y - inEvent.ScreenY) > 4) {
          theLastPosition.x = inEvent.ScreenX;
          theLastPosition.y = inEvent.ScreenY;
          return;
        }
        if (theElement.hasClass('open')) return;
        window.clearTimeout(theTimer);
        theTimer = window.setTimeout(function () {
          theElement.addClass('open');
        }, menuOpenDelay);
      })
      .on('mouseleave', function (inEvent) {
        window.clearTimeout(theTimer);
        theElement = $(this);
        theTimer = window.setTimeout(function () {
          theElement.removeClass('open');
        }, menuOpenDelay);
      });
      return true;
    }, // END delayShowMenu
    // -------------------------------------------------------------------------
    // messageHandler
    // Manage messages (paylods) send from other J1 modules
    // -------------------------------------------------------------------------
    messageHandler: function (sender, message) {
      // var json_message = JSON.stringify(message, undefined, 2);              // multiline
      var json_message = JSON.stringify(message);
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
      if (message.type === 'command' && message.action === 'status') {
        logger.info('messageHandler: received - ' + message.action);
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


