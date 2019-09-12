
/*
 # -----------------------------------------------------------------------------
 # ~/assets/themes/j1/adapter/js/bootstrap_gallery.js
 # JS Adapter for LightGallery
 #
 # Product/Info:
 # https://jekyll.one
 #
 # Copyright (C) 2019 Juergen Adams
 #
 # J1 Template is licensed under the MIT License.
 # For details, see https://jekyll.one
 # -----------------------------------------------------------------------------
 #  Adapter generated: 2019-09-12 16:11:10 +0200
 # -----------------------------------------------------------------------------
*/
'use strict';
//j1.BsGallery = (function (j1, window) {
j1.adapter['bs_gallery'] = (function (j1, window) {
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
      j1.adapter.bs_gallery.state = 'pending';
      // -----------------------------------------------------------------------
      // Default module settings
      // -----------------------------------------------------------------------
      var settings = $.extend({
        module_name: 'j1.adapter.bs_gallery',
        generated:   '2019-09-12 16:11:10 +0200'
      }, options);
      _this   = j1.adapter.bs_gallery;
      logger  = log4javascript.getLogger('j1.adapter.bs_gallery');
      // Load  module DEFAULTS|CONFIG
      //
      // moduleOptions = $.extend({}, );
      //
      // if (typeof settings !== 'undefined') {
      //   moduleOptions = j1.mergeData(moduleOptions, settings);
      // }
      _this.setState('started');
      logger.info('state: ' + _this.getState());
      logger.info('module is being initialized');
      _this.bgInit();
      return true;
    }, // END init
    // -------------------------------------------------------------------------
    // Load AJAX data and initialize the gallery
    // -------------------------------------------------------------------------
    bgInit: function () {
      logger = log4javascript.getLogger("j1.adapter.bs_gallery.bgInit");
          // Create an gallery instance if bg_old_times exists
          if ($('#bg_old_times').length) {
            logText = 'gallery on ID #bg_old_times is being initialized';
            _this.setState('running');
            logger.info('state: ' + _this.getState());
            logger.info(logText);
            // Place HTML markup for the title
            $('#bg_old_times').addClass("lightgallery ");
            // Add animation
            $('#bg_old_times').addClass("lg-animate");
            // $('#bg_old_times').removeClass("lg-animate");
            // Calculate individual CSS styles for gallery thumbnails
            var style = '';
            style += '<style> \n';
                style += 'a.lg-thumbnail-bg_old_times{margin-left: 5px;margin-bottom: 5px;} \n';
                style += 'a.lg-thumbnail-bg_old_times:hover,a.lg-thumbnail-bg_old_times:focus,a.lg-thumbnail-bg_old_times.active{border-color:#204a87} \n';
                style += '.lg-thumbnail-bg_old_times>img,.lg-thumbnail-bg_old_times a>img{display:block;max-width:100%;height:auto} \n';
                style += '.img-lg-thumbnail-bg_old_times{padding:4px;line-height:1.42857143;background-color:#fff;border:1px solid #ddd;border-radius:2px;-webkit-transition:all .2s ease-in-out;-o-transition:all .2s ease-in-out;transition:all .2s ease-in-out;display:inline-block;max-width:100%;height:auto} \n';
                style += '.lg-thumbnail-bg_old_times{display:block;padding:4px;margin-bottom:20px;line-height:1.42857143;background-color:#fff;border:1px solid #ddd;border-radius:2px;-webkit-transition:border .2s ease-in-out;-o-transition:border .2s ease-in-out;transition:border .2s ease-in-out} \n';
                style += '.lg-thumbnail-bg_old_times>img,.lg-thumbnail-bg_old_times a>img{margin-left:auto;margin-right:auto} \n';
                style += '</style> \n';
            $('head').append(style);
            // Collect image gallery data from data file (xhr_data_path)
            $.getJSON('/assets/data/galleries.json', function (data) {
              var content = '';
              //content += '<ul id="bg_old_times_ul" class="row mb-3 bs-gallery-gutter list-unstyled">' + '\n';
              content += '<ul id="bg_old_times_ul" class="row bs-gallery mb-3 bs-gallery-gutter list-unstyled">' + '\n';
              for (var i in data["bg_old_times"]) {
                var img       = data["bg_old_times"][i].img;
                var caption   = data["bg_old_times"][i].caption;
                content +=  '<li class="col-xs-6 col-sm-4 col-md-6" ' +
                                'data-src="' +img+ '" ' +
                                'data-sub-html="' +caption+ '">' +
                              '<a href="#" class="lg-thumbnail-bg_old_times">' +
                                '<img class="img-fluid j1-lg-magnifier" src="' +img+ '">' +
                              '</a>' +
                            '</li>'
              } // END for
              content += '</ul> </div> </div>';
                // Place HTML markup
                $("#bg_old_times").html(content);
                // Initialize|Run the gallery using individual gallery options
                $("#bg_old_times_ul").lightGallery({
                  "mode": "lg-fade",
                  "cssEasing": "cubic-bezier(0.25, 0, 0.25, 1)",
                });
                //Run bsGallery (delayed:  ms)
                setTimeout(function() {
                  // Hide HTML markup while bsGallery is rendering
                  //$("#bg_old_times_ul").hide();
                  $('ul.bsg_bg_old_times').bsGallery({
                    "classes" : "col-md-6",
                    "hasModal" : false
                  });
                  //$("#bg_old_times_ul").show();
                }, );
                // Initialize instance variable of lightGallery  (for later access)
                j1["bg_old_times_ul"] = $('#bg_old_times_ul').data('lightGallery');
                logText = 'LightGallery on ID #bg_old_times initializing finished';
                _this.setState('finished');
                logger.info('state: ' + _this.getState());
                logger.info(logText);
            });
          } //end gallery
          // Create an gallery instance if bg_video_html5 exists
          if ($('#bg_video_html5').length) {
            logText = 'gallery on ID #bg_video_html5 is being initialized';
            _this.setState('running');
            logger.info('state: ' + _this.getState());
            logger.info(logText);
            // Place HTML markup for the title
            $('#bg_video_html5').addClass("lightgallery ");
            // Add animation
            $('#bg_video_html5').addClass("lg-animate");
            // $('#bg_video_html5').removeClass("lg-animate");
            // Calculate individual CSS styles for gallery thumbnails
            var style = '';
            style += '<style> \n';
                style += 'a.lg-thumbnail-bg_video_html5{margin-left: 5px;margin-bottom: 5px;} \n';
                style += 'a.lg-thumbnail-bg_video_html5:hover,a.lg-thumbnail-bg_video_html5:focus,a.lg-thumbnail-bg_video_html5.active{border-color:#204a87} \n';
                style += '.lg-thumbnail-bg_video_html5>img,.lg-thumbnail-bg_video_html5 a>img{display:block;max-width:100%;height:auto} \n';
                style += '.img-lg-thumbnail-bg_video_html5{padding:4px;line-height:1.42857143;background-color:#fff;border:1px solid #ddd;border-radius:2px;-webkit-transition:all .2s ease-in-out;-o-transition:all .2s ease-in-out;transition:all .2s ease-in-out;display:inline-block;max-width:100%;height:auto} \n';
                style += '.lg-thumbnail-bg_video_html5{display:block;padding:4px;margin-bottom:20px;line-height:1.42857143;background-color:#fff;border:1px solid #ddd;border-radius:2px;-webkit-transition:border .2s ease-in-out;-o-transition:border .2s ease-in-out;transition:border .2s ease-in-out} \n';
                style += '.lg-thumbnail-bg_video_html5>img,.lg-thumbnail-bg_video_html5 a>img{margin-left:auto;margin-right:auto} \n';
                style += '</style> \n';
            $('head').append(style);
            var play_button = '/assets/themes/j1/extensions/light_gallery/img/icons/play-button.png';
            // Collect html5 video gallery data from data file (xhr_data_path)
            $.getJSON('/assets/data/galleries.json', function (data) {
              var hidden_video_div = '';
              for (var i in data["bg_video_html5"]) {
                var video        = data["bg_video_html5"][i].video_path + '/' + data["bg_video_html5"][i].video;
                var poster       = data["bg_video_html5"][i].image_path + '/' + data["bg_video_html5"][i].poster;
                var caption      = data["bg_video_html5"][i].captions_lightbox;
                var video_id     = data["bg_video_html5"][i].video_id;
                var video_type   = video.substr(video.lastIndexOf('.') + 1);
                hidden_video_div += '<div style="display:none;" id="' +video_id+ '">' + '\n';
                hidden_video_div += '  <video class="lg-video-object lg-html5 video-js vjs-default-skin"' + '\n';
                hidden_video_div += '         poster="' +poster+ '" controls="" preload="none">' + '\n';
                hidden_video_div += '    <source src="' +video+ '" type="video/' +video_type+ '">' + '\n';
                hidden_video_div += '    Your browser does not support HTML5 video.' + '\n';
                hidden_video_div += '  </video>' + '\n';
                hidden_video_div += '</div>' + '\n';
              }
              $('#bg_video_html5').before(hidden_video_div);
              //var content = '<ul id="bg_video_html5_ul" class="row mb-3 bs-gallery-gutter list-unstyled">' + '\n';
              var content = '<ul id="bg_video_html5_ul" class="bsg_bg_video_html5 row mb-3 bs-gallery-gutter list-unstyled">' + '\n';
              for (var i in data["bg_video_html5"]) {
                var video_id = data["bg_video_html5"][i].video_id;
                var poster   = data["bg_video_html5"][i].image_path + '/' + data["bg_video_html5"][i].poster;
                var caption  = data["bg_video_html5"][i].captions_lightbox;
                //content += '  <li class="col-xs-6 col-sm-4 col-md-6" ' + '\n';
                content += '  <li class="lightgallery"' + '\n';
                content += '    data-sub-html="' +caption+ '" ' + '\n';
                content += '    data-poster="' +poster+ '" ' + '\n';
                content += '    data-html="#' +video_id+ '">' + '\n';
                content += '    <a href="#" class="lg-thumbnail-bg_video_html5">' + '\n';
                content += '      <img class="img-gallery" src="' +poster+ '">' + '\n';
                content += '      <img class="img-overlay" src="' +play_button+ '">' + '\n';
                content += '    </a>' + '\n';
                content += '  </li>' + '\n';
              }
              content += '</ul>';
                // Place HTML markup
                $("#bg_video_html5").html(content);
                // Initialize|Run the gallery using individual gallery options
                $("#bg_video_html5_ul").lightGallery({
                });
                //Run bsGallery (delayed:  ms)
                setTimeout(function() {
                  // Hide HTML markup while bsGallery is rendering
                  //$("#bg_video_html5_ul").hide();
                  $('ul.bsg_bg_video_html5').bsGallery({
                    "classes" : "col-md-6",
                    "hasModal" : false
                  });
                  //$("#bg_video_html5_ul").show();
                }, );
                // Initialize instance variable of lightGallery  (for later access)
                j1["bg_video_html5_ul"] = $('#bg_video_html5_ul').data('lightGallery');
                logText = 'LightGallery on ID #bg_video_html5 initializing finished';
                _this.setState('finished');
                logger.info('state: ' + _this.getState());
                logger.info(logText);
            });
          } //end gallery
          // Create an gallery instance if bg_video_online exists
          if ($('#bg_video_online').length) {
            logText = 'gallery on ID #bg_video_online is being initialized';
            _this.setState('running');
            logger.info('state: ' + _this.getState());
            logger.info(logText);
            // Place HTML markup for the title
            $('#bg_video_online').addClass("lightgallery ");
            // Add animation
            $('#bg_video_online').addClass("lg-animate");
            // $('#bg_video_online').removeClass("lg-animate");
            // Calculate individual CSS styles for gallery thumbnails
            var style = '';
            style += '<style> \n';
                style += 'a.lg-thumbnail-bg_video_online{margin-left: 5px;margin-bottom: 5px;} \n';
                style += 'a.lg-thumbnail-bg_video_online:hover,a.lg-thumbnail-bg_video_online:focus,a.lg-thumbnail-bg_video_online.active{border-color:#204a87} \n';
                style += '.lg-thumbnail-bg_video_online>img,.lg-thumbnail-bg_video_online a>img{display:block;max-width:100%;height:auto} \n';
                style += '.img-lg-thumbnail-bg_video_online{padding:4px;line-height:1.42857143;background-color:#fff;border:1px solid #ddd;border-radius:2px;-webkit-transition:all .2s ease-in-out;-o-transition:all .2s ease-in-out;transition:all .2s ease-in-out;display:inline-block;max-width:100%;height:auto} \n';
                style += '.lg-thumbnail-bg_video_online{display:block;padding:4px;margin-bottom:20px;line-height:1.42857143;background-color:#fff;border:1px solid #ddd;border-radius:2px;-webkit-transition:border .2s ease-in-out;-o-transition:border .2s ease-in-out;transition:border .2s ease-in-out} \n';
                style += '.lg-thumbnail-bg_video_online>img,.lg-thumbnail-bg_video_online a>img{margin-left:auto;margin-right:auto} \n';
                style += '</style> \n';
            $('head').append(style);
            var play_button = '/assets/themes/j1/extensions/light_gallery/img/icons/play-button.png';
            // Collect html5 video gallery data from data file (xhr_data_path)
            $.getJSON('/assets/data/galleries.json', function (data) {
              //var content = '<ul id="bg_video_online_ul" class="row mb-3 bs-gallery-gutter list-unstyled">' + '\n';
              var content = '<ul id="bg_video_online_ul" class="bsg_bg_video_online row mb-3 bs-gallery-gutter list-unstyled">' + '\n';
              for (var i in data["bg_video_online"]) {
                var video    = data["bg_video_online"][i].video;
                var poster   = data["bg_video_online"][i].image_path + '/' + data["bg_video_online"][i].poster;
                var caption  = data["bg_video_online"][i].captions_lightbox;
                //content += '  <li class="col-xs-6 col-sm-4 col-md-6" ' + '\n';
                content += '  <li class="lightgallery"' + '\n';
                content += '    data-sub-html="' +caption+ '" ' + '\n';
                content += '    data-poster="' +poster+ '" ' + '\n';
                content += '    data-src="' +video+ '">' + '\n';
                content += '    <a href="#" class="lg-thumbnail-bg_video_online">' + '\n';
                content += '      <img class="img-gallery" src="' +poster+ '">' + '\n';
                content += '      <img class="img-overlay" src="' +play_button+ '">' + '\n';
                content += '    </a>' + '\n';
                content += '  </li>' + '\n';
              }
              content += '</ul>';
                // Place HTML markup
                $("#bg_video_online").html(content);
                // Initialize|Run the gallery using individual gallery options
                $("#bg_video_online_ul").lightGallery({
                });
                //Run bsGallery (delayed:  ms)
                setTimeout(function() {
                  // Hide HTML markup while bsGallery is rendering
                  //$("#bg_video_online_ul").hide();
                  $('ul.bsg_bg_video_online').bsGallery({
                    "classes" : "col-md-6",
                    "hasModal" : false
                  });
                  //$("#bg_video_online_ul").show();
                }, );
                // Initialize instance variable of lightGallery  (for later access)
                j1["bg_video_online_ul"] = $('#bg_video_online_ul').data('lightGallery');
                logText = 'LightGallery on ID #bg_video_online initializing finished';
                _this.setState('finished');
                logger.info('state: ' + _this.getState());
                logger.info(logText);
            });
          } //end gallery
      return true;
    }, // END bgInit
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
      j1.adapter.scroller.state = stat;
    }, // END setState
    // -------------------------------------------------------------------------
    // getState
    // Returns the current (processing) state of the module
    // -------------------------------------------------------------------------
    getState: function () {
      return j1.adapter.scroller.state;
    } // END state
  }; // END return
})(j1, window);

