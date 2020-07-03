---
regenerate:                             true
---

{% capture cache %}

{% comment %}
 # -----------------------------------------------------------------------------
 # ~/assets/themes/j1/adapter/js/ssm.js
 # Liquid template to adapt SSM Core functions
 #
 # Product/Info:
 # https://jekyll.one
 #
 # Copyright (C) 2020 Juergen Adams
 #
 # J1 Template is licensed under the MIT License.
 # For details, see https://jekyll.one
 # -----------------------------------------------------------------------------
 # Test data:
 #  {{ liquid_var | debug }}
 # -----------------------------------------------------------------------------
{% endcomment %}

{% comment %} Liquid var initialization
-------------------------------------------------------------------------------- {% endcomment %}

{% comment %} Set config files
-------------------------------------------------------------------------------- {% endcomment %}
{% assign site_config     = site %}
{% assign template_config = site.data.template_settings %}
{% assign modules         = site.data.modules %}

{% comment %} Set config data
-------------------------------------------------------------------------------- {% endcomment %}
{% assign ssm_settings    = modules.ssm.settings %}
{% assign ssm_defaults    = modules.defaults.ssm.defaults %}

{% comment %} Set config options
-------------------------------------------------------------------------------- {% endcomment %}
{% assign ssm_options     = ssm_defaults | merge: ssm_settings %}

/*
 # -----------------------------------------------------------------------------
 # ~/assets/themes/j1/adapter/js/ssm.js
 # JS Adapter for J1 SSM (Sticky Side Menu)
 #
 # Product/Info:
 # {{site.data.template_settings.theme_author_url}}
 #
 # Copyright (C) 2020 Juergen Adams
 #
 # J1 Template is licensed under the MIT License.
 # For details, see {{site.data.template_settings.theme_author_url}}
 # -----------------------------------------------------------------------------
 # Adapter generated: {{site.time}}
 # -----------------------------------------------------------------------------
*/
'use strict';

j1.adapter['ssm'] = (function (j1, window) {

  // ---------------------------------------------------------------------------
  // globals
  // ---------------------------------------------------------------------------
  var environment         = '{{environment}}';
  var dclFinished         = false;
  var moduleOptions       = {};
  var cookie_names        = j1.getCookieNames();
  var user_state;
  var user_session;
  var user_data;
  var sect1Nodes;
  var sect12Nodes;
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

      // create seetings object from frontmatterOptions
      var frontmatterOptions = options != null ? $.extend({}, options) : {};

      // initialize state flag
      j1.adapter.ssm.state = 'pending';

      // -----------------------------------------------------------------------
      // defaults
      // -----------------------------------------------------------------------
      var settings  = $.extend({
        module_name: 'j1.adapter.ssm',
        generated:   '{{site.time}}'
      }, options);

      // -----------------------------------------------------------------------
      // globals
      // -----------------------------------------------------------------------
      _this         = j1.adapter.ssm;
      logger        = log4javascript.getLogger('j1.adapter.ssm');
      sect12Nodes   = $("[class$='sect1'],[class$='sect2'");
      sect1Nodes    = $("[class$='sect1']");

      // -----------------------------------------------------------------------
      // options loader
      // -----------------------------------------------------------------------
      var ssmMenuOptions = $.extend({}, {{nav_ssm_options | replace: '=>', ':' }});
      var ssmOptions = $.extend({}, {{ssm_options | replace: 'nil', 'null' | replace: '=>', ':' }});
      var xhr_data_path;
      var menu_id;

      // Load (individual) frontmatter options (currently NOT used)
      //
      if (options != null) { var frontmatterOptions = $.extend({}, options) }

      if (typeof frontmatterOptions !== 'undefined') {
        moduleOptions = j1.mergeData(ssmOptions, frontmatterOptions);
      }

      // save config settings into the mmenu object for global access
      //
      j1.adapter.ssm['moduleOptions'] = moduleOptions;

      _this.setState('started');
      logger.info('state: ' + _this.getState());
      logger.info('module is being initialized');

      // jadams, 2020-06-24: Set max_count to 100 what cause to wait 2.5s
      // for J1 Navigator to finish (init)
      //
      var interval_count = 0;
      var max_count      = 100;

      var dependencies_met_navigator = setInterval(function() {
        interval_count += 1;
        if ( j1.adapter.navigator.getState() == 'finished' ) {
          logger.info('dependencies of module navigator met for: mmenu');
          logger.info('dependencies of module navigator met after: ' + interval_count * 25 + ' ms');
          j1.core.ssm.init (moduleOptions);
          _this.ssmLoader(moduleOptions);
          clearInterval(dependencies_met_navigator);
        }
        if (interval_count > max_count) {
          logger.warn('dependency check failed for module: navigator');
          logger.warn('dependencies of module navigator met after: ' + interval_count * 25 + ' ms');
          j1.core.ssm.init (moduleOptions);
          _this.ssmLoader(moduleOptions);
          clearInterval(dependencies_met_navigator);
        }
      }, 25);

    }, // END init

    // -------------------------------------------------------------------------
    // SSM Loader
    // -------------------------------------------------------------------------
    ssmLoader: function (ssmOptions) {
      var menu_id;
      var xhr_data_path;

      _this.setState('loading');
      logger.info('status: ' + _this.getState());
      logger.info('load HTML data for ssm');

      {% assign id_list = "" %}

      $.when (
        {% assign menu_id       = ssm_options.xhr_container_id %}
        {% assign xhr_data_path = ssm_options.xhr_data_path %}
        j1.xhrData (
          'j1.adapter.ssm', {
          xhr_container_id: "{{menu_id}}",
          xhr_data_path:    "{{xhr_data_path}}" },
          'data_loaded')
      ).done (function (ssm) {
        // ---------------------------------------------------------------------
        // Initialize MMenu Navs and Drawers
        // ---------------------------------------------------------------------
        var dependencies_met_mmenu_initialized = setInterval (function () {
          if (ssm) {
           if (j1.getState() === 'finished') {
//         if ( j1.adapter.navigator.getState() == 'finished' ) {
              logger.info('load HTML data (AJAX): finished');
              _this.setState('processing');
              logger.info('status: ' + _this.getState());
              logger.info('initialize ssm menu');
              if ( ssmOptions.mode === 'icon') {
                logger.info('icon mode detected');
              }
              _this.scrollSpy(ssmOptions);
              _this.buttonInitializer(ssmOptions);
              clearInterval(dependencies_met_mmenu_initialized);
            }
          } else {
            logger.error('initialize ssm failed, HTML data NOT loaded');
          }
        }, 25); // END dependencies_met_mmenu_loaded
      }); // END done
    }, // END dataLoader

    // -------------------------------------------------------------------------
    // Button Initializer
    // -------------------------------------------------------------------------
    buttonInitializer: function (ssmOptions) {
      var eventHandler;

      {% for item in ssm_options.items %} {% if item.enabled %}

      {% comment %} Identify the menu (item) type
      -------------------------------------------------------------------------- {% endcomment %}
      {% if item.sublevel %}
        {% assign menu_type = 'sublevel_menu' %}
      {% else %}
        {% assign menu_type = 'top_level_item' %}
      {% endif %}

      {% if menu_type ==  'top_level_item' %}
      {% assign button_id = item.id %}

      // Create an eventhandler instance if id exists: {{button_id}}
      if ($('#{{button_id}}').length) {
        eventHandler = "{{item.event_handler}}"

        // check if eventhandler configured is a SINGLE word
        if (eventHandler.split(" ").length == 1) {
          logger.info('register pre-configured eventhandler {{item.event_handler}} on id: {{button_id}}');
          $('#{{button_id}}').each(function(e) {
            var $this = $(this);
            $this.on('click', function(e) {
              j1.adapter.ssm.{{item.event_handler}}(sect1Nodes);
            });
          });
        } else {
          logger.info('register custom eventhandler on id: {{button_id}}');
        }

      } // END items (buttons)
      {% endif %} // menu_type 'top_level_item'
      {% endif %} // ENDIF button_id enabled
      {% endfor %} // ENDFOR items
    }, // END buttonInitializer

    // -------------------------------------------------------------------------
    // Eventhandler

    // -------------------------------------------------------------------------
    // open mobile menu
    // -------------------------------------------------------------------------
    open_mmenu: function (id) {
      logger.info('eventhandler fired on id: ' + id );
    }, // END open_mmenu

    // -------------------------------------------------------------------------
    // scroll to previous section
    // -------------------------------------------------------------------------
    scroll_previous_section: function (nodes) {
      var previous_header_id;
      var currentNode;
      var prev_node;

      var index             = 0;
      var maxNode           = $(nodes).length - 1;
      var $toc              = $("#sidebar");
      var current_header_id = $toc.find(".is-active-link").attr('href');

      // logger.info('eventhandler fired on id: ' + id );

      nodes.each(function() {
        currentNode = $(this).find(current_header_id);
        if (currentNode.length) {
          if (index > maxNode) {
            return false
          } else {
            prev_node = (index > 0) ? nodes[index-1] : nodes[index];
            previous_header_id = $(prev_node).find(":header").first()[0].id;
            $('a[href*="' + current_header_id + '"]').removeClass('is-active-link');
            $('a[href*="' + previous_header_id + '"]').addClass('is-active-link');
            var dest = $('body').scrollTop() + $('#' + previous_header_id).offset().top - 100;
            $('html, body').animate({
              scrollTop: dest
            }, 500);
            return false;
          }
        }
        (index < maxNode) ? index++ : index;
        // (index = 0) ? index : index++;
      });
    }, // END scroll_previous_section

    // -------------------------------------------------------------------------
    // scroll to next section
    // -------------------------------------------------------------------------
    scroll_next_section: function (nodes) {
      var next_header_id;
      var currentNode;
      var nextNode;

      var index             = 0;
      var maxNode           = $(nodes).length -1;
      var $toc              = $("#sidebar");
      var current_header_id = $toc.find(".is-active-link").attr('href');

      // logger.info('eventhandler fired on id: ' + id );

      nodes.each(function() {
        // currentNode = $(this).find(current_header_id);
        currentNode = $(this).find(current_header_id);
        if (currentNode.length) {
          if (index == maxNode) {
            return false
          } else {
            nextNode = nodes[index+1];
            next_header_id = $(nextNode).closest().find(":header").first();
            next_header_id = $(nextNode).find(":header").first()[0].id;

            $('a[href*="' + current_header_id + '"]').removeClass('is-active-link');
            $('a[href*="' + next_header_id + '"]').addClass('is-active-link');

            var dest = $('body').scrollTop() + $('#' + next_header_id).offset().top - 100;
            $('html, body').animate({
              scrollTop: dest
            }, 500);
            return false;
          }
        }
        (index < maxNode) ? index++ : index;
      });
    }, // END scroll_next_section

    // -------------------------------------------------------------------------
    // scroll to top
    // -------------------------------------------------------------------------
    scroll_to_top: function () {
      var dest = 0;

      // logger.info('eventhandler fired on id: ' + id );

      $('html, body').animate({
        scrollTop: dest
      }, 500);
    }, // END scroll_top

    // -------------------------------------------------------------------------
    // scroll to bottom
    // -------------------------------------------------------------------------
    scroll_to_bottom: function () {
      var $page           = $(document);
      var $footer         = $('#j1_footer');
      var f               = $footer.length ? $footer.outerHeight() : 0;
      var pageHeight      = $page.height() - f - 400;
      var pageHeightOuter = $page.outerHeight()

      // logger.info('eventhandler fired on id: ' + id );

      $('html, body').animate({
        scrollTop: pageHeight
      }, 500);
    }, // END scroll_bottom

    // -------------------------------------------------------------------------
    // scroll to comments (Disqus)
    // -------------------------------------------------------------------------
    scroll_to_comments: function () {
      // logger.info('eventhandler fired on id: ' + id );
    }, // END scroll_comments

    // -------------------------------------------------------------------------
    // create generic alert
    // -------------------------------------------------------------------------
    alert_me: function (id) {
      // logger.info('eventhandler fired on id: ' + id );
      alert ("Hello world!");
    }, // END alert_me
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
    // setState
    // Set the current (processing) state of the module
    // -------------------------------------------------------------------------
    setState: function (stat) {
      j1.adapter.ssm.state = stat;
    }, // END setState

    // -------------------------------------------------------------------------
    // getState
    // Returns the current (processing) state of the module
    // -------------------------------------------------------------------------
    getState: function () {
      return j1.adapter.ssm.state;
    }, // END state

    // -------------------------------------------------------------------------
    // Manage (top) position and sizes (@media breakpoints) of the
    // SSM container depending on the size of the page header (attic)
    // -------------------------------------------------------------------------
    scrollSpy: function (options) {
      logger = log4javascript.getLogger('j1.adapter.ssm.scrollSpy');

      $(window).scroll(function(event){
        var $navbar         = $('nav.navbar');
        var $pagehead       = $('.attic');
        var $main_content   = $('.js-toc-content');
        var $adblock        = $('#adblock');
        var $footer         = $('#j1_footer');
        var $ssmContainer   = $('#ssm-container');
        var $page           = $(document);

        var offset          = 0;
        var pageOffset      = -120;
        var scrollPos       = $(document).scrollTop();
        var pageHeight      = $page.height()
        var pageHeightOuter = $page.outerHeight()

//      var m               = parseInt(pagehead.css('margin-bottom'), 10);
        var m               = $main_content.offset().top;
        var s               = $ssmContainer.length ? $ssmContainer.height() : 0;
        var f               = $footer.length   ? $footer.outerHeight() : 0;
        var n               = $navbar.length   ? $navbar.height() : 0;
//      var h               = $pagehead.length ? $pagehead.outerHeight() : 0;
        var a               = $adblock.length  ? $adblock.outerHeight() : 0;

//      var o               = n + h + a + offset;
//      var o               = n + m + offset;
        var o               = n + offset;

        // space above the (fixed) ssm container
        var showSsmPos      = m + pageOffset;

        // space below the (fixed) ssm container
        var hideSsmPos      = pageHeight - s - f + pageOffset;

        // set the top position of ssm container for navbar modes
        // e.g. "sticky" (navbar-fixed)
        if($navbar.hasClass('navbar-fixed')){
          $('#ssm-container').css('top', o);
        } else {
          $('#ssm-container').css('top', m);
        }

        // show|hide ssm container on scroll position in page
        //
        ( scrollPos >= showSsmPos ) && ( scrollPos <= hideSsmPos )
          ? $ssmContainer.css('display','block')
          : $ssmContainer.css('display','none');

        logger.debug('content pos detected as: ' + m + 'px');
        logger.debug('scroll pos detected as: ' + scrollPos + 'px');
      }); // END setTop on scroll

    } // END scrollSpy

  }; // END return
})(j1, window);

{% endcapture %}
{{ cache | strip_empty_lines }}
{% assign cache = nil %}
