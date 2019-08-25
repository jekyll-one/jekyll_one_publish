---
regenerate:                             false
---

{% capture cache %}

{% comment %}
 # -----------------------------------------------------------------------------
 # ~/assets/themes/j1/adapter/js/logger.js
 # Liquid template to adapt Log4Javascript Core functions
 #
 # Product/Info:
 # https://jekyll.one
 #
 # Copyright (C) 2019 Juergen Adams
 #
 # J1 Template is licensed under the MIT License.
 # For details, see https://jekyll.one
 # -----------------------------------------------------------------------------
 # Test data:
 #  {{ liquid_var | debug }}
 # -----------------------------------------------------------------------------
{% endcomment %}


{% comment %} Liquid procedures
-------------------------------------------------------------------------------- {% endcomment %}

{% comment %} Set global settings
-------------------------------------------------------------------------------- {% endcomment %}
{% assign environment       = site.environment %}
{% assign template_version  = site.version %}

{% comment %} Process YML config data
================================================================================ {% endcomment %}

{% comment %} Set config files
-------------------------------------------------------------------------------- {% endcomment %}
{% assign template_config   = site.data.template_settings %}
{% assign modules           = site.data.modules %}

{% comment %} Set config data
-------------------------------------------------------------------------------- {% endcomment %}
{% assign logger_defaults   = modules.defaults.log4javascript.defaults %}
{% assign logger_settings   = modules.log4javascript.settings %}

{% comment %} Set config options
-------------------------------------------------------------------------------- {% endcomment %}
{% assign logger_options    = logger_defaults | merge: logger_settings %}

/*
 # -----------------------------------------------------------------------------
 # ~/assets/themes/j1/adapter/js/logger.js
 # JS Adapter for for J1 Logger (log4javascript)
 #
 # Product/Info:
 # https://jekyll.one
 #
 # Copyright (C) 2019 Juergen Adams
 #
 # J1 Template is licensed under the MIT License.
 # For details, see https://jekyll.one
 # -----------------------------------------------------------------------------
 # Adapter generated: {{site.time}}
 # -----------------------------------------------------------------------------
*/
'use strict';

{% comment %} Main
-------------------------------------------------------------------------------- {% endcomment %}
j1.adapter['logger'] = (function (j1, window) {

  {% comment %} Set global variables
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
  // getCustomData
  // Throw a fake exception to retrieve the stack trace and analyze
  // to find the line from which this function was called
  // ---------------------------------------------------------------------------
  var getCustomData = function(layout, loggingReference) {
    var customData = [];

    try {(0)()} catch (e) {
      var pattern = /^(.+?) ?\(?((?:file|https?|chrome-extension):.*?):(\d+)(?::(\d+))?\)?\s*$/ig;
      // Split the stack trace
      var output = e.stack.replace(/^.*?\n/,'').replace(/(?:\n@:0)?\s+$/m,'').replace(/^\(/gm,'{anon}(').split('\n');
      // The last trace in the array is the line this function was called
      var logger_trace = output.pop();
      // Extract the full path:line number from this trace
      var path = logger_trace.replace(pattern, '$2:$3');
      // Extract the filename and line number from this trace
      var logger_location = logger_trace.split(':');
      var file = logger_location[logger_location.length - 3];
      var splitString = file.split('/');
      // The filename is (in array) at position length - 1
      file = splitString[splitString.length - 1];
      // If no file(name) found in the array, the file is the index document
      if (file == '') file = '(index)';
      var line = logger_location[logger_location.length - 2];
      // Push resulting fields on an Object|Array to identify
      // the first custom field (%f{1}) by index [0]
      customData.push( { 'name':'file', 'value':file } );
      customData.push( { 'name':  'line', 'value': line } );
      customData.push( { 'name':  'path', 'value': path } );
    }

    // Set all custom fields > %f{1}
    for (var i = 1, len = layout.customFields.length; i < len; i++) {
      var name = layout.customFields[i].name;
      //var result = customData[i].name;
      if (customData[i].value) layout.customFields[i].value = customData[i].value;
    }

    // return custom field %f{1}
    return customData[0].value
  }

  // ---------------------------------------------------------------------------
  // Main object
  // ---------------------------------------------------------------------------
  return {

    // -------------------------------------------------------------------------
    // Initializer
    // -------------------------------------------------------------------------
    init: function () {
      // initialize state flag
      j1.adapter.logger.state = 'pending';

      {% comment %} Set global variables
      -------------------------------------------------------------------------- {% endcomment %}
      _this   = j1.adapter.logger;
      logger  = log4javascript.getLogger('j1.adapter.logger');

      _this.setState('started');
      logger.info('state: ' + _this.getState());

      // Create a console consoleAppender inherited by all (client) loggers
      var consoleAppender = new log4javascript.BrowserConsoleAppender();
      consoleAppender.setThreshold(log4javascript.Level.DEBUG);

      // Setup the root logger and appender
      log4javascript.getRootLogger().addAppender(consoleAppender);

      // Set a PatternLayout with custom fields created by function getCustomData()
      var patternLayout = new log4javascript.PatternLayout('[%d{HH:mm:ss.SSS}] [%-5p] [%-35c] [%f{1}:%f{2}] [%m]%n                       [%f{3}]');

      // Use the method getLineNumber() as the value for the 0th custom field
      patternLayout.setCustomField('file',   getCustomData);
      patternLayout.setCustomField('line',   getCustomData);
      patternLayout.setCustomField('path',   getCustomData);
      consoleAppender.setLayout(patternLayout);

      // Set logging levels for all template (parent|child) logger
      if (environment == 'production') {
        log4javascript.getLogger('j1').setLevel(log4javascript.Level.WARN);
      }
      if (environment == 'development' || environment == 'devel' || environment == 'dev' || environment == 'test') {
        log4javascript.getLogger('j1').setLevel(log4javascript.Level.DEBUG);
      } else {
        // fallback settings
        log4javascript.getLogger('j1').setLevel(log4javascript.Level.WARN);
      }

      _this.setState('finished');
      logger.info('state: ' + _this.getState());

      return true;
    }, // END init

    // -------------------------------------------------------------------------
    // messageHandler: MessageHandler for J1 NAV module
    // Manage messages (paylods) send from other J1 modules
    // -------------------------------------------------------------------------
    messageHandler: function ( sender, message ) {
      var json_message = JSON.stringify(message, undefined, 2);

      logText = 'Received message from ' + sender + ': ' + json_message;
      logger.debug(logText);

      // -----------------------------------------------------------------------
      //  Process commands|actions
      // -----------------------------------------------------------------------
      if ( message.type === 'command' && message.action === 'module_initialized' ) {
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
      j1.adapter.logger.state = stat;
    }, // END setState

    // -------------------------------------------------------------------------
    // getState
    // Returns the current (processing) state of the module
    // -------------------------------------------------------------------------
    getState: function () {
      return j1.adapter.logger.state;
    } // END state

  }; // END return
})(j1, window);

{% endcapture %}

{{ cache | strip_empty_lines }}
{% assign cache = nil %}
