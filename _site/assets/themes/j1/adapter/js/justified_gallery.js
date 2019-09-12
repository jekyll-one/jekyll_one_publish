
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
 # Adapter generated: 2019-09-12 16:11:10 +0200
 # -----------------------------------------------------------------------------
*/
'use strict';
// j1.JustifiedGallery = (function (j1, window) {
j1.adapter['jf_gallery'] = (function (j1, window) {
  var environment   = 'development';
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
        generated:   '2019-09-12 16:11:10 +0200'
      }, options);
      // Load  module DEFAULTS|CONFIG
      //
      moduleOptions = $.extend({}, {"enabled":true, "xhr_data_path":"/assets/data/galleries.json", "instance_type":"multiple", "rowHeight":170, "galleries":[{"gallery":{"enabled":true, "type":"image", "id":"jg_live_demo", "show_delay":300, "css_classes":"mb-3", "images_path":"/assets/images/gallery/justified_gallery", "thumb_path":"/assets/images/gallery/justified_gallery", "images":["24096687789_c37d45712f_b.jpg", "23753792354_bd75d8dabc_b.jpg", "16961685188_f130144d60_b.jpg", "24014174029_2cfa940264_b.jpg", "13824674674_ca1e482394_b.jpg", "13824322785_104dc0968c_b.jpg", "8842312290_f310d491f4_b.jpg", "8811828736_88392f614a_b.jpg", "8400794773_932654a20e_b.jpg", "8157236803_78aa1698b6_b.jpg", "7948632554_01f6ae6b6f_b.jpg", "7822678460_ee98ff1f69_b.jpg", "7002395006_29fdc85f7a_b.jpg", "7062575651_b23918b11a_b.jpg", "6841267340_855273fd7e_b.jpg", "6791628438_affaa19e10_b.jpg", "6916180091_9c9559e463_b.jpg", "6880502467_d4b3c4b2a8_b.jpg", "6876412479_6268c6e2aa_b.jpg", "6840627709_92ed52fb41_b.jpg"], "captions_gallery":["Peace of mind", "Abu Dhabi", "Never stop climbing", "Terme", "Deep sea", "Above the World", "The Spring", "Cat firmness", "Into the Sea", "Bologna's T-Day", "Just in a dream Place", "Erice", "Freedom", "Maybe spring", "Love", "These are the colors I love", "The Hope", "Florence streets. Florence people.", "I Love You", "The painter in Florence"], "captions_lightbox":["<p>Peace of mind<p>", "Abu Dhabi", "Never stop climbing", "Terme", "Deep sea", "Above the World", "The Spring", "Cat firmness", "Into the Sea", "Bologna's T-Day", "Just in a dream Place", "Erice", "Freedom", "Maybe spring", "Love", "These are the colors I love", "The Hope", "Florence streets. Florence people.", "I Love You", "The painter in Florence"], "gallery_options":{"rowHeight":120, "margins":1}, "lightbox_options":{"lightbox":"lg", "mode":"lg-fade", "cssEasing":"cubic-bezier(0.25, 0, 0.25, 1)"}}}, {"gallery":{"enabled":true, "type":"image", "id":"jg_customizer", "show_delay":300, "css_classes":"mb-3", "images_path":"/assets/images/gallery/justified_gallery", "thumb_path":"/assets/images/gallery/justified_gallery", "images":["24096687789_c37d45712f_b.jpg", "23753792354_bd75d8dabc_b.jpg", "16961685188_f130144d60_b.jpg", "24014174029_2cfa940264_b.jpg", "13824674674_ca1e482394_b.jpg", "13824322785_104dc0968c_b.jpg", "8842312290_f310d491f4_b.jpg", "8811828736_88392f614a_b.jpg", "8400794773_932654a20e_b.jpg", "8157236803_78aa1698b6_b.jpg", "7948632554_01f6ae6b6f_b.jpg", "7822678460_ee98ff1f69_b.jpg", "7002395006_29fdc85f7a_b.jpg", "7062575651_b23918b11a_b.jpg", "6841267340_855273fd7e_b.jpg", "6791628438_affaa19e10_b.jpg", "6916180091_9c9559e463_b.jpg", "6880502467_d4b3c4b2a8_b.jpg", "6876412479_6268c6e2aa_b.jpg", "6840627709_92ed52fb41_b.jpg"], "captions_gallery":["Peace of mind", "Abu Dhabi", "Never stop climbing", "Terme", "Deep sea", "Above the World", "The Spring", "Cat firmness", "Into the Sea", "Bologna's T-Day", "Just in a dream Place", "Erice", "Freedom", "Maybe spring", "Love", "These are the colors I love", "The Hope", "Florence streets. Florence people.", "I Love You", "The painter in Florence"], "captions_lightbox":["<p>Peace of mind<p>", "Abu Dhabi", "Never stop climbing", "Terme", "Deep sea", "Above the World", "The Spring", "Cat firmness", "Into the Sea", "Bologna's T-Day", "Just in a dream Place", "Erice", "Freedom", "Maybe spring", "Love", "These are the colors I love", "The Hope", "Florence streets. Florence people.", "I Love You", "The painter in Florence"], "gallery_options":{"rowHeight":120, "margins":1}, "lightbox_options":{"lightbox":"lg", "mode":"lg-fade", "cssEasing":"cubic-bezier(0.25, 0, 0.25, 1)"}}}, {"gallery":{"enabled":true, "type":"image", "id":"jg_old_times", "show_delay":300, "title":"Grand Pa around the 1930th", "css_classes":"mb-5", "images_path":"/assets/images/old_times", "thumb_path":"/assets/images/old_times", "images":["image_01.jpg", "image_02.jpg", "image_03.jpg", "image_04.jpg"], "captions_gallery":["Grand Pa's 80th Birthday", "Grand Pa's 80th Birthday", "Grand Pa's annual journey", "Grand Pa's annual journey"], "captions_lightbox":["<p>Grand Pa's 80th Birthday</p><p>Collegues from the Painters Union</p>", "<p>Grand Pa's 80th Birthday</p><p>Family and Friends at the restaurant</p>", "<p>Grand Pa's annual journey</p><p>Down the Rhine</p>", "<p>Grand Pa's annual journey<p><p>Having some Wine</p>"], "gallery_options":{"rowHeight":200, "margins":5}, "lightbox_options":{"lightbox":"lg", "mode":"lg-fade", "cssEasing":"cubic-bezier(0.25, 0, 0.25, 1)"}}}]});
      if (typeof settings !== 'undefined') {
        moduleOptions = j1.mergeData(moduleOptions, settings);
      }
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
        _this.setState('running');
        logger.info('state: ' + _this.getState());
          // Create an gallery instance if id: jg_live_demo exists
          if ($('#jg_live_demo').length) {
            logText = 'Gallery on ID #jg_live_demo is being initialized';
            logger.info(logText);
          // Place HTML markup for the title
          $('#jg_live_demo').addClass("justifiedgallery ");
            // Collect image gallery data from data file (xhr_data_path)
            $.getJSON('/assets/data/galleries.json', function (data) {
              var content = '';
              var gallery_class = 'justified-gallery'
              gallery_class += ' light-gallery ';
              content += '<div id="jg_live_demo_div" class="' +gallery_class+ 'mb-3">' + '\n';
              for (var i in data["jg_live_demo"]) {
                var img               = data["jg_live_demo"][i].img;
                var captions_gallery  = data["jg_live_demo"][i].captions_gallery;
                var captions_lightbox = data["jg_live_demo"][i].captions_lightbox;
                var lightbox          = "lg";
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
              // Hide gallery container (until lightGallery is NOT initialized)
              // and place HTML markup
              $("#jg_live_demo").hide().html(content);
              // Initialize and run the gallery using individual gallery|lightbox options
                var gallery_selector = $("#jg_live_demo_div");
                if (options !== undefined) {
                  // lightbox initialized on COMPLETE event of justifiedGallery
                  gallery_selector.justifiedGallery().on('jg.complete', function () {
                    gallery_selector.lightGallery({
                    });
                    // Initialize instance variable of lightGallery (for later access)
                    j1["jg_live_demo_div"] = gallery_selector.data('lightGallery');
                    // Show gallery DIV element if jg has completed *and* the
                    // lightbox is initialized (delayed)
                    setTimeout(function() { $("#jg_live_demo").show(); }, 300);
                      logText = 'Gallery on ID #jg_live_demo initializing completed';
                      logger.info(logText);
                  });
                } else {
                  gallery_selector.justifiedGallery({
                    "rowHeight": 120,
                    "margins": 1,
                  }).on('jg.complete', function () {
                    // lightbox initialized on COMPLETE event of justifiedGallery
                    gallery_selector.lightGallery({
                    });
                    // Initialize instance variable of lightGallery (for later access)
                    j1["jg_live_demo_div"] = gallery_selector.data('lightGallery');
                    // Show gallery DIV element if jg has completed *and* the
                    // lightbox is initialized (delayed)
                    setTimeout(function() { $("#jg_live_demo").show(); }, 300);
                      logText = 'Gallery on ID #jg_live_demo initializing completed';
                      logger.info(logText);
                  });
                }
               // ENDIF lightbox "lg"
                // ENDIF lightbox "cb"
            }); // END getJSON
          } //end gallery
         // ENDIF gallery enabled
          // Create an gallery instance if id: jg_customizer exists
          if ($('#jg_customizer').length) {
            logText = 'Gallery on ID #jg_customizer is being initialized';
            logger.info(logText);
          // Place HTML markup for the title
          $('#jg_customizer').addClass("justifiedgallery ");
            // Collect image gallery data from data file (xhr_data_path)
            $.getJSON('/assets/data/galleries.json', function (data) {
              var content = '';
              var gallery_class = 'justified-gallery'
              gallery_class += ' light-gallery ';
              content += '<div id="jg_customizer_div" class="' +gallery_class+ 'mb-3">' + '\n';
              for (var i in data["jg_customizer"]) {
                var img               = data["jg_customizer"][i].img;
                var captions_gallery  = data["jg_customizer"][i].captions_gallery;
                var captions_lightbox = data["jg_customizer"][i].captions_lightbox;
                var lightbox          = "lg";
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
              // Hide gallery container (until lightGallery is NOT initialized)
              // and place HTML markup
              $("#jg_customizer").hide().html(content);
              // Initialize and run the gallery using individual gallery|lightbox options
                var gallery_selector = $("#jg_customizer_div");
                if (options !== undefined) {
                  // lightbox initialized on COMPLETE event of justifiedGallery
                  gallery_selector.justifiedGallery().on('jg.complete', function () {
                    gallery_selector.lightGallery({
                    });
                    // Initialize instance variable of lightGallery (for later access)
                    j1["jg_customizer_div"] = gallery_selector.data('lightGallery');
                    // Show gallery DIV element if jg has completed *and* the
                    // lightbox is initialized (delayed)
                    setTimeout(function() { $("#jg_customizer").show(); }, 300);
                      logText = 'Gallery on ID #jg_customizer initializing completed';
                      logger.info(logText);
                  });
                } else {
                  gallery_selector.justifiedGallery({
                    "rowHeight": 120,
                    "margins": 1,
                  }).on('jg.complete', function () {
                    // lightbox initialized on COMPLETE event of justifiedGallery
                    gallery_selector.lightGallery({
                    });
                    // Initialize instance variable of lightGallery (for later access)
                    j1["jg_customizer_div"] = gallery_selector.data('lightGallery');
                    // Show gallery DIV element if jg has completed *and* the
                    // lightbox is initialized (delayed)
                    setTimeout(function() { $("#jg_customizer").show(); }, 300);
                      logText = 'Gallery on ID #jg_customizer initializing completed';
                      logger.info(logText);
                  });
                }
               // ENDIF lightbox "lg"
                // ENDIF lightbox "cb"
            }); // END getJSON
          } //end gallery
         // ENDIF gallery enabled
          // Create an gallery instance if id: jg_old_times exists
          if ($('#jg_old_times').length) {
            logText = 'Gallery on ID #jg_old_times is being initialized';
            logger.info(logText);
          // Place HTML markup for the title
          var gallery_title = '<div class="jg-gallery-title">Grand Pa around the 1930th</div>';
          $('#jg_old_times').before(gallery_title);
          $('#jg_old_times').addClass("justifiedgallery ");
            // Collect image gallery data from data file (xhr_data_path)
            $.getJSON('/assets/data/galleries.json', function (data) {
              var content = '';
              var gallery_class = 'justified-gallery'
              gallery_class += ' light-gallery ';
              content += '<div id="jg_old_times_div" class="' +gallery_class+ 'mb-5">' + '\n';
              for (var i in data["jg_old_times"]) {
                var img               = data["jg_old_times"][i].img;
                var captions_gallery  = data["jg_old_times"][i].captions_gallery;
                var captions_lightbox = data["jg_old_times"][i].captions_lightbox;
                var lightbox          = "lg";
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
              // Hide gallery container (until lightGallery is NOT initialized)
              // and place HTML markup
              $("#jg_old_times").hide().html(content);
              // Initialize and run the gallery using individual gallery|lightbox options
                var gallery_selector = $("#jg_old_times_div");
                if (options !== undefined) {
                  // lightbox initialized on COMPLETE event of justifiedGallery
                  gallery_selector.justifiedGallery().on('jg.complete', function () {
                    gallery_selector.lightGallery({
                    });
                    // Initialize instance variable of lightGallery (for later access)
                    j1["jg_old_times_div"] = gallery_selector.data('lightGallery');
                    // Show gallery DIV element if jg has completed *and* the
                    // lightbox is initialized (delayed)
                    setTimeout(function() { $("#jg_old_times").show(); }, 300);
                      logText = 'Gallery on ID #jg_old_times initializing completed';
                      logger.info(logText);
                  });
                } else {
                  gallery_selector.justifiedGallery({
                    "rowHeight": 200,
                    "margins": 5,
                  }).on('jg.complete', function () {
                    // lightbox initialized on COMPLETE event of justifiedGallery
                    gallery_selector.lightGallery({
                    });
                    // Initialize instance variable of lightGallery (for later access)
                    j1["jg_old_times_div"] = gallery_selector.data('lightGallery');
                    // Show gallery DIV element if jg has completed *and* the
                    // lightbox is initialized (delayed)
                    setTimeout(function() { $("#jg_old_times").show(); }, 300);
                      logText = 'Gallery on ID #jg_old_times initializing completed';
                      logger.info(logText);
                  });
                }
               // ENDIF lightbox "lg"
                // ENDIF lightbox "cb"
            }); // END getJSON
          } //end gallery
         // ENDIF gallery enabled
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

