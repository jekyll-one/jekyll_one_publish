/*
 # -----------------------------------------------------------------------------
 #  ~/extensions/cookiebar/js/cookiebar.js
 #  Provides Javascript functions for jQuery cookiebar
 #
 #  Product/Info:
 #  http://jekyll.one
 #  http://www.primebox.co.uk/projects/jquery-cookiebar/
 #
 #  Copyright (C) 2019 Juergen Adams
 #  Copyright (C) 2016 Ant Parsons (primebox.co.uk)
 #
 #  J1 Template is licensed under the MIT License.
 #  See: https://github.com/jekyll-one/j1-template/blob/master/LICENSE
 #  cookiebar is licensed under Creative Commons Attribution 3.0 Unported License.
 #  See: http://creativecommons.org/licenses/by/3.0/
 #
 # -----------------------------------------------------------------------------
 #  NOTE:
 #  cb cookie disabled. Instead, j1 user state cookie is used.
 # -----------------------------------------------------------------------------
 #  TODO:
 #  Module needs to be rewritten to use j1 native BS modals.
 # -----------------------------------------------------------------------------
*/

// -----------------------------------------------------------------------------
// ESLint shimming
// -----------------------------------------------------------------------------
/* eslint no-unused-vars: "off"                                               */
/* eslint no-undef: "off"                                                     */
/* eslint no-redeclare: "off"                                                 */
/* global window                                                              */

// TODO:

// -----------------------------------------------------------------------------
// cookiebar plugin registered as 'cookieBar' (window|root)
// -----------------------------------------------------------------------------

module.exports = ( function ($) {

  $.cookieBar = function (options,val) {

    if (options=='cookies') {
      var doReturn = 'cookies';
    } else if (options=='set') {
      var doReturn = 'set';
    } else {
      var doReturn = false;
    }

    var defaults = {
      message:            'We use cookies to track usage and preferences.', //Message displayed on bar
      acceptButton:       true, //Set to true to show accept/enable button
      acceptText:         'I Understand', //Text on accept/enable button
      acceptFunction:     function(cookieValue){if(cookieValue!='enabled' && cookieValue!='accepted') window.location = window.location.href;}, //Function to run after accept
      declineButton:      false, //Set to true to show decline/disable button
      declineText:        'Disable Cookies', //Text on decline/disable button
      declineFunction:    function(cookieValue){if(cookieValue=='enabled' || cookieValue=='accepted') window.location = window.location.href;}, //Function to run after decline
      policyButton:       false, //Set to true to show Privacy Policy button
      policyText:         'Privacy Policy', //Text on Privacy Policy button
      policyURL:          '/privacy-policy/', //URL of Privacy Policy
      autoEnable:         true, //Set to true for cookies to be accepted automatically. Banner still shows
      acceptOnContinue:   false, //Set to true to accept cookies when visitor moves to another page
      acceptOnScroll:     false, //Set to true to accept cookies when visitor scrolls X pixels up or down
      acceptAnyClick:     false, //Set to true to accept cookies when visitor clicks anywhere on the page
      expireDays:         365, //Number of days for cookiebar cookie to be stored for
      renewOnVisit:       false, //Renew the cookie upon revisit to website
      forceShow:          false, //Force cookiebar to show regardless of user cookie preference
      effect:             'slide', //Options: slide, fade, hide
      element:            'body', //Element to append/prepend cookiebar to. Remember "." for class or "#" for id.
      append:             false, //Set to true for cookiebar HTML to be placed at base of website. Actual position may change according to CSS
      fixed:              false, //Set to true to add the class "fixed" to the cookie bar. Default CSS should fix the position
      bottom:             false, //Force CSS when fixed, so bar appears at bottom of website
      zindex:             '', //Can be set in CSS, although some may prefer to set here
      domain:             String(window.location.hostname), //Location of privacy policy
      referrer:           String(document.referrer) //Where visitor has come from
    };

    var options                     = $.extend(defaults,options);
    var logger                      = log4javascript.getLogger('j1.Cookiebar');
    var cookie_names                = j1.getCookieNames();
    const cookie_user_session_name  = cookie_names.user_session;
    var user_session                  = {};

    // Set|Detect J1 UserState
    user_session_detected = j1.core.existsCookie (cookie_user_session_name);
    if ( user_session_detected ) {
      logger.info('User state cookie found');
  //  user_session = j1.getUserState();
      user_session = j1.core.readCookie(cookie_user_session_name);
    } else {
      logger.error('User state NOT cookie found');
    }

    // Sets expiration date for cookie
    var expireDate = new Date();
    expireDate.setTime(expireDate.getTime()+(options.expireDays*86400000));
    expireDate = expireDate.toGMTString();

    var cookieEntry = 'cb-enabled={value}; expires='+expireDate+'; path=/';

    // Retrieves current cookie preference
    var i,
      cookieValue = '',
      aCookie,
      aCookies = document.cookie.split('; ');

    for (i=0; i<aCookies.length; i++) {
      aCookie = aCookies[i].split('=');
      if (aCookie[0] == 'cb-enabled') {
        cookieValue = aCookie[1];
      } else {
        cookieValue = typeof user_session.cookies_accepted == 'undefined' ? '' : user_session.cookies_accepted;
        // cookieValue = '';
      }
    }

    // Set up default cookie preference if not already set
    if (cookieValue == '' && doReturn != 'cookies' && options.autoEnable) {
      cookieValue = 'enabled';
      // jadams: disabled cb cookie
      // document.cookie = cookieEntry.replace('{value}','enabled');
    } else if ((cookieValue == 'accepted' || cookieValue == 'declined') && doReturn != 'cookies' && options.renewOnVisit) {
      // jadams: disabled cb cookie
      // document.cookie = cookieEntry.replace('{value}',cookieValue);

    }
    // Update user state cookie
    user_session.cookies_accepted  = cookieValue;
    // j1.setUserState( user_session );
    j1.core.writeCookie({
      name: cookie_user_session_name, 
      data: user_session
    });

    if (options.acceptOnContinue) {
      if (options.referrer.indexOf(options.domain) >= 0 && String(window.location.href).indexOf(options.policyURL) == -1 && doReturn != 'cookies' && doReturn != 'set' && cookieValue != 'accepted' && cookieValue != 'declined') {
        doReturn  = 'set';
        val       = 'accepted';
      }
    }

    if (doReturn == 'cookies') {
      //Returns true if cookies are enabled, false otherwise
      if (cookieValue == 'enabled' || cookieValue == 'accepted') {
        return true;
      } else {
        return false;
      }
    } else if (doReturn == 'set' && (val == 'accepted' || val == 'declined')) {
      // Sets value of cookie to 'accepted' or 'declined'
      // jadams: disabled cb cookie
      // document.cookie = cookieEntry.replace('{value}',val);
      // Update user state cookie
      user_session.cookies_accepted  = val;
      // j1.setUserState( user_session );
      j1.core.writeCookie({
        name: cookie_user_session_name, 
        data: user_session
      });

      if (val == 'accepted') {
        return true;
      } else {
        return false;
      }
    } else {
      // Set up enable/accept button if required
      var message = options.message.replace('{policy_url}', options.policyURL);

      if(options.acceptButton){
        var acceptButton = '<a href="" class="cb-enable">' +options.acceptText+ '</a>';
      } else {
        var acceptButton = '';
      }
      // Set up disable/decline button if required
      if (options.declineButton) {
        var declineButton = '<a href="" class="cb-disable">'  +options.declineText+'</a>';
      } else {
        var declineButton = '';
      }
      // Set up privacy policy button if required
      if(options.policyButton) {
        var policyButton = '<a href="' +options.policyURL+ '" class="cb-policy">' +options.policyText+ '</a>';
      } else {
        var policyButton = '';
      }
      // Whether to add "fixed" class to cookie bar
      if (options.fixed) {
        if (options.bottom){
          var fixed = ' class="fixed bottom"';
        } else {
          var fixed = ' class="fixed"';
        }
      } else {
        var fixed = '';
      }
      if (options.zindex != '') {
        var zindex = ' style="z-index:' +options.zindex+ ';"';
      } else {
        var zindex = '';
      }

      // Displays the cookie bar if arguments met
      // jadams, 2017-11-24: Added "stop-scrolling"
      if (options.forceShow || cookieValue == 'enabled' || cookieValue == '') {
        if (options.append) {
          $(options.element).append('<div id="cookie-bar"' +fixed+zindex+ '><p>' +message+acceptButton+declineButton+policyButton+ '</p></div>');
          if (options.stopScrolling){ $('body').addClass('stop-scrolling'); }
        } else {
          $(options.element).prepend('<div id="cookie-bar"' +fixed+zindex+ '><p>' +message+acceptButton+declineButton+policyButton+ '</p></div>');
          if (options.stopScrolling) { $('body').addClass('stop-scrolling'); }
        }
      }

      var removeBar = function (func) {
        if (options.acceptOnScroll) $(document).off('scroll');
        if (typeof(func) === 'function') func (cookieValue);
        if (options.effect=='slide') {
          $('#cookie-bar').slideUp(300, function(){$('#cookie-bar').remove();});
          if(options.stopScrolling){ $('body').removeClass('stop-scrolling'); }
        } else if (options.effect=='fade') {
          $('#cookie-bar').fadeOut(300,function(){$('#cookie-bar').remove();});
          if (options.stopScrolling) { $('body').removeClass('stop-scrolling'); }
        } else {
          $('#cookie-bar').hide(0,function(){$('#cookie-bar').remove();});
          if (options.stopScrolling) { $('body').removeClass('stop-scrolling'); }
        }
        $(document).unbind('click', anyClick);
      };

      var cookieAccept = function() {
        // jadams: disabled cb cookie
        // document.cookie = cookieEntry.replace('{value}','accepted');
        // Update user state cookie
        user_session.cookies_accepted  = 'accepted';
        // j1.setUserState( user_session );
        j1.core.writeCookie({
          name: cookie_user_session_name, 
          data: user_session
        });
        removeBar(options.acceptFunction);
      };

      var cookieDecline = function(){
        var deleteDate = new Date();
        deleteDate.setTime(deleteDate.getTime()-(864000000));
        deleteDate = deleteDate.toGMTString();
        aCookies=document.cookie.split('; ');
        for (i=0; i<aCookies.length; i++) {
          aCookie = aCookies[i].split('=');
          if (aCookie[0].indexOf('_') >= 0) {
            // jadams: disabled cb cookie
            // document.cookie = aCookie[0] +'=0; expires=' +deleteDate+ '; domain=' +options.domain.replace('www','')+ '; path=/';
          } else {
            // jadams: disabled cb cookie
            // document.cookie = aCookie[0] +'=0; expires=' +deleteDate+ '; path=/';
          }
        }
        // jadams: disabled cb cookie
        // document.cookie = cookieEntry.replace('{value}','declined');
        removeBar(options.declineFunction);
      };

      var anyClick = function(e) {
        if (!$(e.target).hasClass('cb-policy')) cookieAccept();
      };

      $('#cookie-bar .cb-enable').click(function(){cookieAccept();return false;});
      $('#cookie-bar .cb-disable').click(function(){cookieDecline();return false;});

      if(options.acceptOnScroll){
        var scrollStart = $(document).scrollTop(), scrollNew, scrollDiff;
        $(document).on('scroll',function(){
          scrollNew = $(document).scrollTop();
          if (scrollNew >  scrollStart){
            scrollDiff = scrollNew - scrollStart;
          } else {
            scrollDiff = scrollStart - scrollNew;
          }
          if (scrollDiff >= Math.round(options.acceptOnScroll)) cookieAccept();
        });
      }
      if (options.acceptAnyClick) {
        $(document).bind('click',anyClick);
      }
    }

  };
})( jQuery );

