/*
 # -----------------------------------------------------------------------------
 # ~/assets/themes/j1/modules/bsThemeSwitcher/js/switcher.js
 # Provides Javascript functions for Bootstrap ThemeSwitcher
 #
 # Product/Info:
 # https://jekyll.one
 # https://github.com/jguadagno/bootstrapThemeSwitcher
 #
 # Copyright (C) 2021 Juergen Adams
 # Copyright (C) 2014 Joseph Guadagno
 #
 # J1 Template is licensed under the MIT License.
 # See: https://github.com/jekyll-one-org/J1 Template/blob/master/LICENSE
 # Bootstrap Theme Switcher is licensed under the MIT License.
 # See: https://github.com/jguadagno/bootstrapThemeSwitcher
 # -----------------------------------------------------------------------------
*/
'use strict';

// -----------------------------------------------------------------------------
// ESLint shimming
// -----------------------------------------------------------------------------
/* eslint indent: "off"                                                       */
/* eslint no-console: ["error", { allow: ["log", "warn", "error"] }]          */
/* eslint no-unused-vars: "off"                                               */
/* eslint no-undef: "off"                                                     */
/* eslint no-useless-escape: "off"                                            */
/* eslint no-prototype-builtins: "off"                                        */
/* eslint no-shadow-restricted-names: "off"                                   */
/* global jQuery                                                              */
/* global Cookies                                                             */
// -----------------------------------------------------------------------------

/**
* jQuery Twitter Bootstrap Theme Switcher v1.1.5
* https://github.com/jguadagno/bootstrapThemeSwitcher
*
* Copyright 2014, Joseph Guadagno
* Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
*/

(function ($, window, document, undefined) {

  var old = $.fn.bootstrapThemeSwitcher;

  var cookie_names              = j1.getCookieNames();
  const user_state_cookie_name  = cookie_names.user_state;

  var logger = log4javascript.getLogger('j1.core.switcher');
  var logText;

  var user_state_detected;
  var j1_user_state = {};
  var j1_user_state_json;
  var j1_user_state_cookie;

  // Constructor
  // ---------------------------------------------------------------------------
  var BootstrapThemeSwitcher = function (element, options) {

    this.$element = $(element);
    this.settings = $.extend({}, $.fn.bootstrapThemeSwitcher.defaults, options);
    this.themesList = [];

    // $.when (
    //   this.getThemes()
    // )
    // .then(function(data) {
    //   logger.info('loading local themes (json) finished');
    // })
    // .catch(function(error) {
    //   logger.error('loading local themes (json) failed: ' + error);
    // });

    this.getThemes();
    return this;
  };

  // Prototype
  // ---------------------------------------------------------------------------
  BootstrapThemeSwitcher.prototype = {
    clear: function () {
      logger.debug('bootstrapThemeSwitcher.clear');
      return this.$element.each(function () {
        this.$element.empty();
      });
    },
    update: function () {
      logger.debug('bootstrapThemeSwitcher.update');
      this.getThemes();
    },

    // -------------------------------------------------------------------------
    //  checkStyleSheetByName
    // -------------------------------------------------------------------------
    checkStyleSheetByName: function (name) {
      var found  = false;
      var test = '\/' + name + '\/';
      var re     = new RegExp(test, 'i');

      for(var i = 0; i < document.styleSheets.length; i++){
        if(re.test(document.styleSheets[i].href)){
          found=true;
          break;
        }
      }
      return found;
    },

    // -------------------------------------------------------------------------
    //  switchTheme
    // -------------------------------------------------------------------------
    // NOTE:
    // For J1 template, switchTheme set only the cookies contents. The theme
    // switch is done by a page reload. The reload triggers the theme_generator
    // to load theme CSS from cookies, finally.
    // -------------------------------------------------------------------------
    switchTheme: function (name, cssFile) {

      var $this             = $(this);
      var settings          = $.extend({}, $.fn.bootstrapThemeSwitcher.defaults, $this.data('bootstrapThemeSwitcher'));
      var themeName;
      var theme_css;
      var theme_extension_css;

      var id                = settings.cssThemeLink;
      var debug             = settings.debug;
      var includeCSS        = this.settings.includeBootswatch;

      // Detect|Set J1 UserState
      user_state_detected = j1.existsCookie ( 'j1.user.state' );
      if ( user_state_detected ) {
        logger.debug('user state cookie found');
        j1_user_state = j1.readCookie(user_state_cookie_name);
      } else {
        logger.error('user state NOT cookie found');
      }

      themeName           = j1_user_state.theme_name;
      theme_css           = j1_user_state.theme_css;
      theme_extension_css = j1_user_state.theme_extension_css;

      if ( cssFile === undefined ) { cssFile = this.settings.defaultCssFile; }
      if ( name === undefined ) { name = cssFile; }
      // Clear 'includeCSS' if NO theme extension CSS is needed
      if ( name === this.settings.skipIncludeBootswatch ) { includeCSS = ''; }

      // check if theme is to be saved to cookie
      if ( settings.saveToCookie ) {
        if ( Cookies === undefined ) {
          if ( debug === 'true' ) {
            logger.error('saveToCookie is set to true but Cookies library is not present');
          }
          return false;
        }

        j1_user_state.theme_name  = name;
        j1_user_state.theme_css   = cssFile;

        if (!(j1_user_state.theme_name.includes('Uno') || j1_user_state.theme_name == 'Bootstrap')) {
          j1_user_state.theme_author = 'Bootswatch';
          j1_user_state.theme_author_url   = 'https://bootswatch.com/';
        } else {
          j1_user_state.theme_author = 'J1 Team';
          j1_user_state.theme_author_url   = 'https://jekyll.one/';
        }

        j1.writeCookie({
          name: user_state_cookie_name,
          data: j1_user_state
        });
        // force reload the page from the server (skip cache)
        // and detect selected theme from cookie
        location.reload(true);
      } else {
        logger.warn('write to cookie : disabled');
        logger.warn('selected theme not activated: ' + name);
      } // END if saveToCookie

    }, // END switchTheme

    // -------------------------------------------------------------------------
    //  loadThemeFromCookie
    // -------------------------------------------------------------------------
    loadThemeFromCookie: function (options) {

      if ( Cookies === undefined ) {
        logger.error('loadThemeFromCookie was called but Cookies library is not present');
        return false;
      }

      var settings = $.extend({}, $.fn.bootstrapThemeSwitcher.defaults, options);

      // Detect|Set J1 UserState
      user_state_detected = j1.existsCookie ( 'j1.user.state' );
      if ( user_state_detected ) {
        logger.info('User state cookie found');
        j1_user_state = j1.readCookie(user_state_cookie_name);
      } else {
        logger.error('User state NOT cookie found');
      }

      var themeName = j1_user_state.theme_name;
      var themeCss  = j1_user_state.theme_css;
      this.switchTheme(themeName, themeCss);

    }, // END loadThemeFromCookie

    // -------------------------------------------------------------------------
    //  addTheme
    // -------------------------------------------------------------------------
    addTheme: function(name, cssFile, start, deleteCount) {
      if (start === undefined) { start = 0; }
      if (deleteCount === undefined) { deleteCount = 0; }
      this.themesList.splice(start, deleteCount, {name: name, css: cssFile});
      this.addThemesToControl();
    }, // END addTheme

    // -------------------------------------------------------------------------
    //  addThemesToControl
    // -------------------------------------------------------------------------
    addThemesToControl: function() {
      if (this.$element === undefined) {
        logger.error('bootstrapThemeSelector|addThemesToControl: Element is undefined');
        return false;
      }
      if (this.themesList === undefined) {
        logger.error('bootstrapThemeSelector|addThemesToControl: Themes is undefined');
        return false;
      }

      // if BootSwatch excludes are set
      if(this.settings.excludeBootswatch){
        var excludeBootswatchs;
        // split the string on ,
        if(this.settings.excludeBootswatch.indexOf(',') !== -1){
          excludeBootswatchs = this.settings.excludeBootswatch.replace(/ /g, '').split(',');
        } else {
          excludeBootswatchs = [];
          excludeBootswatchs.push(this.settings.excludeBootswatch);
        }

        var tempThemeList = this.themesList;
        $.each(tempThemeList, function (i, value) {
          if(value && value.name){
            if( $.inArray( value.name, excludeBootswatchs ) !== -1 ){
              tempThemeList.splice(i,1);
            }
          }
        });
        this.themesList = tempThemeList;
      }

      var base = this;

      if (this.$element.is('ul')) {
        var $this             = $(this);
        var settings          = $.extend({}, $.fn.bootstrapThemeSwitcher.defaults, $this.data('bootstrapThemeSwitcher'));
        var id                = settings.cssThemeLink;
        var themeName;
        var debug             = settings.debug;

        // Detect|Set J1 UserState
        user_state_detected = j1.existsCookie ( 'j1.user.state' );
        if ( user_state_detected ) {
          logger.debug('User state cookie found');
          j1_user_state = j1.readCookie(user_state_cookie_name);
        } else {
          logger.error('User state NOT cookie found');
        }

        themeName = j1_user_state.theme_name;

        if ( debug === 'true' ) {
          logger.debug('bootstrapThemeSelector: UL element selected');
        }
        this.$element.empty();

        var cssClass;
        var iconColor = '#9E9E9E';
        $.each(this.themesList, function (i, value) {
          // Use DIFFERENT class for MobileMenu
          if (base.$element[0].id.includes('MMenu')) {
            cssClass = 'mmenu-item';
          } else {
            cssClass = 'dropdown-item';
          }
          // Add class "active" to the current theme selected
          if ( value.name === themeName ) {
            if (base.$element[0].id.includes('MMenu')) {
              cssClass = 'mmenu-item active';
            } else {
              cssClass = 'dropdown-item active';
            }
          }
          var li = $('<li />')
              .attr('class',cssClass)
              .append('<a href="#"><i class="mdi mdi-view-quilt mdi-18px mr-2" style="color: ' +iconColor+ '"></i>' +value.name+ '</a>')
              .on('click', function () {
                if (settings.loadFromBootswatch) {
                  base.switchTheme(value.name, value.css);
                } else {
                  base.switchTheme(value.name, value.cssCdn);
                }
                //Remove previous "active" class and apply to latest clicked element
                $(this).parent().find('li').removeClass('active');
                $(this).addClass('active');
              });
          base.$element.append(li);
        });

      } else if (this.$element.is('select')) {
        logger.debug('bootstrapThemeSelector: SELECT element selected');
        this.$element.empty();

        var optionSelectedMarker;
        $.each(this.themesList, function (i, value) {
          optionSelectedMarker = null;
          if ( value.name === themeName ) {
            optionSelectedMarker = 'selected';
          }
          if (settings.loadFromBootswatch) {
            base.$element.append('<option ' + optionSelectedMarker + ' value=\'' + value.css + '\'>' + value.name + '</option>');
          } else {
            base.$element.append('<option ' + optionSelectedMarker + ' value=\'' + value.cssCdn + '\'>' + value.name + '</option>');
          }
        });
        this.$element.on('change', function () {
          var optionSelected = $('option:selected', this);
          base.switchTheme(optionSelected.text(), optionSelected.val());
        });

      } else {
        // no container found to add Theme list
        logger.info('bootstrapThemeSelector: no UL or SELECT element found');
        logger.error('bootstrapThemeSelector: failed');
        // console.warn('bootstrapThemeSelector only works with ul or select elements');
      }
    }, // END addThemesToControl

    // -------------------------------------------------------------------------
    //  getThemes
    // -------------------------------------------------------------------------
    getThemes: function() {
      var base = this;

      if (this.settings.localFeed !== null && this.settings.localFeed !== '') {
        // Deferred loading themes from local themes (json file)
        $.ajax({
          url: this.settings.localFeed,
          // jadams 2016-10-10: removed the setting for sychronous XMLHttpRequest
          // because deprecated by jQuery on the MAIN thread. Because the Theme Manager
          // is initialized very early, no blocking (sychronous) AJAX call is needed
          // async: false,
          dataType: 'json',
          success: function (data) {
            base.themesList = data.themes;
            base.addThemesToControl();
          },
          error: function (jqXHR, textStatus, errorThrown) {
            logger.error('Failed to retrieve the local feed from: \'' + base.settings.localFeed + '\'');
          }
        });
      } else {
        // Deferred loading remote themes from Bootswatch API
        // -----------------------------------------------------------------------
        $.ajax({
          url: this.settings.bootswatchApiUrl + '/' + this.settings.bootswatchApiVersion + '.json',
          // jadams 2016-10-10: removed the setting for sychronous XMLHttpRequest
          // because deprecated by jQuery on the main thread. Because the Theme Manager
          // is initialized very early, no blocking|sychronous AJAX call is needed
          // async: false,
          dataType: 'json',
          success: function (data) {
            if (data.themes === undefined) {
              return null;
            }
            base.themesList = data.themes;
            base.themesList.splice(0,0, {name: 'default', css: base.settings.defaultCssFile});
            base.addThemesToControl();
          }
        });
      }
    }, // END getThemes

    // -------------------------------------------------------------------------
    //  themes
    // -------------------------------------------------------------------------
    themes : function (newThemeList) {
      if (newThemeList === undefined) {
        return this.themesList;
      }
      else {
        // TODO: Set the associated control.
        this.themesList = newThemeList;
      }
    } // END themes

  }; // END prototype

  // Plugin definition
  // ---------------------------------------------------------------------------
  $.fn.bootstrapThemeSwitcher = function (option) {
    var methodReturn;
    var args      = Array.prototype.slice.call(arguments, 1);
    var $this     = $(this);
    var data      = $this.data('bootstrapThemeSwitcher');
    var options   = typeof option === 'object' && option;

    if (!data) {
      $this.data('bootstrapThemeSwitcher', (data = new BootstrapThemeSwitcher(this, options) ));
    }
    if (typeof option === 'string') {
      methodReturn = data[ option ].apply(data, args);
    }
    return ( methodReturn === undefined ) ? $this : methodReturn;
  };

  $.fn.bootstrapThemeSwitcher.defaults = {
    debug:                  false,
    saveToCookie:           true,
    cssThemeLink:           'bootstrapTheme',
    cookieThemeName:        'bootstrapTheme.name',
    cookieThemeCss:         'boostrapTheme.css',
    cookieExpiration:       7,
    cookiePath:             '/',
    defaultCssFile:         'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css',
    bootswatchApiUrl:       'https://bootswatch.com/api/',
    bootswatchApiVersion:   '3',
    loadFromBootswatch:     true,
    localFeed:              '',
    excludeBootswatch:      ''
  };

  $.fn.bootstrapThemeSwitcher.Constructor = BootstrapThemeSwitcher;

  $.fn.bootstrapThemeSwitcher.noConflict = function () {
    $.fn.BootstrapThemeSwitcher = old;
    return this;
  };

})(jQuery, window, document);
