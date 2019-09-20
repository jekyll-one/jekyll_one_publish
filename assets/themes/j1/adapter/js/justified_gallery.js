---
regenerate:                             false
---

{% capture cache %}

{% comment %}
 # -----------------------------------------------------------------------------
 # ~/assets/themes/j1/adapter/js/justified_gallery.js
 # Liquid template to create the J1 Adapter for Justified Gallery
 #
 # Product/Info:
 # https://jekyll.one
 #
 # Copyright (C) 2019 Juergen Adams
 #
 # J1 Template is licensed under the MIT License.
 # See: https://github.com/jekyll-one-org/j1-template/blob/master/LICENSE
 # -----------------------------------------------------------------------------
{% endcomment %}

{% comment %} Liquid procedures
-------------------------------------------------------------------------------- {% endcomment %}

{% comment %} Set global settings
-------------------------------------------------------------------------------- {% endcomment %}
{% assign environment           = site.environment %}
{% assign template_version      = site.version %}

{% comment %} Process YML config data
================================================================================ {% endcomment %}

{% comment %} Set config files
-------------------------------------------------------------------------------- {% endcomment %}
{% assign template_config       = site.data.template_settings %}
{% assign apps                  = site.data.apps %}

{% comment %} Set config data
-------------------------------------------------------------------------------- {% endcomment %}
{% assign jf_gallery_defaults   = apps.defaults.justified_gallery.defaults %}
{% assign jf_gallery_settings   = apps.justified_gallery.settings %}

{% comment %} Set config options
-------------------------------------------------------------------------------- {% endcomment %}
{% assign jf_gallery_options    = jf_gallery_defaults | merge: jf_gallery_settings %}

/*
 # -----------------------------------------------------------------------------
 # ~/assets/themes/j1/adapter/js/justified_gallery.js
 # JS Adapter for JustifiedGallery
 #
 # Product/Info:
 # https://jekyll.one
 # https://github.com/miromannino/Justified-Gallery
 #
 # Copyright (C) 2019 Juergen Adams
 # Copyright (C) 2016 Miro Mannino
 #
 # J1 Template is licensed under the MIT License.
 # See: https://github.com/jekyll-one-org/j1-template/blob/master/LICENSE
 # Justified Gallery is licensed under the MIT license
 # See: https://github.com/miromannino/Justified-Gallery
 # -----------------------------------------------------------------------------
 # Adapter generated: {{site.time}}
 # -----------------------------------------------------------------------------
*/
'use strict';

{% comment %} Main
-------------------------------------------------------------------------------- {% endcomment %}
// j1.JustifiedGallery = (function (j1, window) {
j1.adapter['jf_gallery'] = (function (j1, window) {

  {% comment %} Global variables
  ------------------------------------------------------------------------------ {% endcomment %}
  var environment   = '{{environment}}';
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
      // initialize state flag
      j1.adapter.jf_gallery.state = 'pending';


      // -----------------------------------------------------------------------
      // Default module settings
      // -----------------------------------------------------------------------
      var settings = $.extend({
        module_name: 'j1.adapter.jf_gallery',
        generated:   '{{site.time}}'
      }, options);

      {% comment %} Load module config from yml data
      -------------------------------------------------------------------------- {% endcomment %}
      // Load  module DEFAULTS|CONFIG
      //
      moduleOptions = $.extend({}, {{jf_gallery_options | replace: '=>', ':' | replace: 'nil', '""'}});

      if (typeof settings !== 'undefined') {
        moduleOptions = j1.mergeData(moduleOptions, settings);
      }

      {% comment %} Set global variables
      -------------------------------------------------------------------------- {% endcomment %}
      _this = j1.adapter.jf_gallery;
      logger = log4javascript.getLogger('j1.adapter.jf_gallery');

      _this.setState('started');
      logger.info('state: ' + _this.getState());
      logger.info('module is being initialized');

      _this.load(moduleOptions);

      return true;
    },

    // -----------------------------------------------------------------------
    // Load AJAX data and initialize the jg gallery
    // -----------------------------------------------------------------------
    load: function (options) {
      logger = log4javascript.getLogger('j1.adapter.jf_gallery.load');

      {% if environment == 'development' %}
        _this.setState('running');
        logger.info('state: ' + _this.getState());
      {% endif %}

      {% for item in jf_gallery_options.galleries %}
        {% if item.gallery.enabled %}

          {% assign lb_options        	  = item.gallery.lightbox_options %}
          {% assign jg_options            = item.gallery.gallery_options  %}
          {% assign gallery_title         = item.gallery.title %}
          {% assign gallery_type          = item.gallery.type %}
          {% assign lightbox              = item.gallery.lightbox_options.lightbox %}
          {% assign css_classes           = item.gallery.css_classes %}
          {% assign show_delay        	  = 250 %}

          {% if lightbox == "lg" %}
            {% assign lb_mode             = "lg-fade" %}
            {% assign lb_cssEasing        = "cubic-bezier(0.25, 0, 0.25, 1)" %}
            {% assign lb_thumbnails       = true  %}
            {% assign lb_autoplay         = false %}
            {% assign lb_fullscreen       = true  %}
            {% assign lb_pager            = true  %}
            {% assign lb_zoomer           = true  %}
            {% assign lb_hash             = true  %}
            {% assign lb_video            = false %}
            {% assign lb_video_html5      = false %}
            {% assign lb_video_online     = false %}
            {% assign lb_share            = false %}
            {% assign lb_share_facebook   = false %}
            {% assign lb_share_twitter    = false %}
            {% assign lb_share_googleplus = false %}
            {% assign lb_share_pinterest  = false %}
          {% endif %}

          {% assign container_id = item.gallery.id %}
          {% capture gallery_id %}{{item.gallery.id}}_div{% endcapture %}

          {% if item.gallery.show_delay %}  {% assign show_delay    = item.gallery.show_delay %}  {% endif %}
          {% if lb_options.mode %}          {% assign lb_mode       = lb_options.mode %}          {% endif %}
          {% if lb_options.cssEasing %}     {% assign lb_cssEasing  = lb_options.cssEasing %}     {% endif %}
          {% if lb_options.thumbnails %}    {% assign lb_thumbnails = lb_options.thumbnails %}    {% endif %}
          {% if lb_options.autoplay %}      {% assign lb_autoplay   = lb_options.autoplay %}      {% endif %}
          {% if lb_options.fullscreen %}    {% assign lb_fullscreen = lb_options.fullscreen %}    {% endif %}
          {% if lb_options.pager %}         {% assign lb_pager      = lb_options.pager %}         {% endif %}
          {% if lb_options.zoomer %}        {% assign lb_zoomer     = lb_options.zoomer %}        {% endif %}
          {% if lb_options.video.enabled %} {% assign lb_video      = lb_options.video.enabled %} {% endif %}

          {% if lb_options.video.enabled %}
            logText = 'Video not supported';
            logger.error(logText);
          {% endif %}

          // Create an gallery instance if id: {{ container_id }} exists
          if ($('#{{ container_id }}').length) {

          {% if environment == 'development' %}
            logText = 'Gallery on ID #{{ container_id }} is being initialized';
            logger.info(logText);
          {% endif %}

          // Place HTML markup for the title
          {% if gallery_title %}
          var gallery_title = '<div class="jg-gallery-title">{{ gallery_title }}</div>';
          $('#{{ container_id }}').before(gallery_title);
          {% endif %}

          $('#{{ container_id }}').addClass("justifiedgallery ");

          {% if gallery_type == "image" %}
            // Collect image gallery data from data file (xhr_data_path)
            $.getJSON('{{jf_gallery_options.xhr_data_path}}', function (data) {
              var content = '';
              var gallery_class = 'justified-gallery'
              {% if lightbox == "lg" %}
              gallery_class += ' light-gallery ';
              {% endif %}
              content += '<div id="{{ gallery_id }}" class="' +gallery_class+ '{{ css_classes }}">' + '\n';

              for (var i in data["{{item.gallery.id}}"]) {
                var img               = data["{{item.gallery.id}}"][i].img;
                var captions_gallery  = data["{{item.gallery.id}}"][i].captions_gallery;
                var captions_lightbox = data["{{item.gallery.id}}"][i].captions_lightbox;
                var lightbox          = "{{ lightbox }}";

                if (captions_lightbox != null && lightbox == 'lg') {
                  content +=  '<a data-sub-html="' +captions_lightbox+ '" ';
                  content +=  'href="' +img+ '">' + '\n';
                } else {
                  content +=  '<a href="' +img+ '">' + '\n';
                }
                  content +=  '  <img src="' +img+ '" img alt="' +captions_gallery+ '">' + '\n';
                  //content +=  '  <img class="img-overlay" src="/assets/themes/j1/modules/lightboxes/light_gallery/img/icons/zoom.png">' + '\n';
                  content +=  '</a>' + '\n';

              } // END for
              content += '</div>';
          {% endif %}
              // Hide gallery container (until lightGallery is NOT initialized)
              // and place HTML markup
              $("#{{ container_id }}").hide().html(content);
              // Initialize and run the gallery using individual gallery|lightbox options
              {% if lightbox == "lg" %}
                var gallery_selector = $("#{{ gallery_id }}");
                if (options !== undefined) {
                  // lightbox initialized on COMPLETE event of justifiedGallery
                  gallery_selector.justifiedGallery().on('jg.complete', function () {
                    gallery_selector.lightGallery({
                      {% for option in item.gallery.jg_options %}
                      {{ option[0] | json }}: {{ option[1] | json }},
                      {% endfor %}
                    });
                    // Initialize instance variable of lightGallery (for later access)
                    j1["{{gallery_id}}"] = gallery_selector.data('lightGallery');
                    // Show gallery DIV element if jg has completed *and* the
                    // lightbox is initialized (delayed)
                    setTimeout(function() { $("#{{ container_id }}").show(); }, {{ show_delay }});

                    {% if environment == 'development' %}
                      logText = 'Gallery on ID #{{ container_id }} initializing completed';
                      logger.info(logText);
                    {% endif %}

                  });
                } else {
                  gallery_selector.justifiedGallery({
                    {% for option in item.gallery.gallery_options %}
                    {{ option[0] | json }}: {{ option[1] | json }},
                    {% endfor %}
                  }).on('jg.complete', function () {
                    // lightbox initialized on COMPLETE event of justifiedGallery
                    gallery_selector.lightGallery({
                      {% for option in item.gallery.jg_options %}
                      {{ option[0] | json }}: {{ option[1] | json }},
                      {% endfor %}
                    });
                    // Initialize instance variable of lightGallery (for later access)
                    j1["{{gallery_id}}"] = gallery_selector.data('lightGallery');
                    // Show gallery DIV element if jg has completed *and* the
                    // lightbox is initialized (delayed)
                    setTimeout(function() { $("#{{ container_id }}").show(); }, {{ show_delay }});

                    {% if environment == 'development' %}
                      logText = 'Gallery on ID #{{ container_id }} initializing completed';
                      logger.info(logText);
                    {% endif %}

                  });
                }
              {% endif %} // ENDIF lightbox "lg"

              {% if lightbox == "cb" %}
                // $(this).find('a').colorbox();
              {% endif %}  // ENDIF lightbox "cb"

            }); // END getJSON
          } //end gallery
        {% endif %} // ENDIF gallery enabled
      {% endfor %}
    }, // END function load

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
        _this.setState('finished');
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
      j1.adapter.jf_gallery.state = stat;
    }, // END setState

    // -------------------------------------------------------------------------
    // getState
    // Returns the current (processing) state of the module
    // -------------------------------------------------------------------------
    getState: function () {
      return j1.adapter.jf_gallery.state;
    } // END state

  }; // END return
})(j1, window);

{% endcapture %}
{{ cache | strip_empty_lines }}
{% assign cache = nil %}