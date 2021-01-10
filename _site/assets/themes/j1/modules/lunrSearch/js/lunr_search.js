/*
 # -----------------------------------------------------------------------------
 # ~/assets/themes/j1/modules/lunr/js/lunr.search.js
 # jQuery plugin to use with J1LunrSearch
 #
 # Product/Info:
 # https://jekyll.one
 #
 # Copyright (C) 2021 Juergen Adams
 #
 # J1 Template is licensed under the MIT License.
 # See: https://github.com/jekyll-one-org/J1 Template/blob/master/LICENSE
 # -----------------------------------------------------------------------------
 # TODO:
 # -----------------------------------------------------------------------------
*/
'use strict';

(function($) {

  var debounce = function(fn) {
    var timeout;
    var slice = Array.prototype.slice;

    return function() {
      var args = slice.call(arguments),
          ctx = this;

      clearTimeout(timeout);

      timeout = setTimeout(function () {
        fn.apply(ctx, args);
      }, 100);
    };
  };

  // parse a date in yyyy-mm-dd format
  var parseDate = function(input) {
    var parts = input.match(/(\d+)/g);
    return new Date(parts[0], parts[1]-1, parts[2]); // months are 0-based
  };

  var LunrSearch = (function() {
    function LunrSearch(elem, options) {
      this.$elem              = elem;
      this.$results           = $(options.results);
      this.indexData          = options.index_file;
      this.template           = this.compileTemplate($(options.template));
      this.titleMsg           = options.titleMsg;
      this.emptyMsg           = options.emptyMsg;
      this.onAfterResultShow  = options.onAfterResultShow;

      this.initialize();
    }

    LunrSearch.prototype.initialize = function() {
      var self = this;

      this.loadIndexData(function(data) {
        self.docs = $.map(data.docs, self.createEntry);
        self.index = lunr.Index.load(data.index);
        self.populateSearchFromQuery();
        self.bindKeypress();
      });
    };

    // compile search results template
    LunrSearch.prototype.compileTemplate = function($template) {
      var template = $template.text();
      Mustache.parse(template);
      return function (view, partials) {
        return Mustache.render(template, view, partials);
      };
    };

    // load the search index data
    LunrSearch.prototype.loadIndexData = function(callback) {
      $.getJSON(this.indexData, callback);
    };

    LunrSearch.prototype.createEntry = function(raw, index) {
      var entry = $.extend({
        id: index + 1
      }, raw);

      // include pub date for posts
      if (raw.date) {
        $.extend(entry, {
          date: parseDate(raw.date),
          pubdate: function() {
            // HTML5 pubdate
            return dateFormat(parseDate(raw.date), 'yyyy-mm-dd');
          },
          displaydate: function() {
            // only for posts (e.g. Oct 12, 2012)
            return dateFormat(parseDate(raw.date), 'mmm dd, yyyy');
          }
        });
      }

      return entry;
    };

    LunrSearch.prototype.bindKeypress = function() {
      var self = this;
      var oldValue = this.$elem.val();

      this.$elem.bind('keyup', debounce(function() {
        var newValue = self.$elem.val();
        if (newValue !== oldValue) {
          self.search(newValue);
        }

        oldValue = newValue;
      }));
    };

    LunrSearch.prototype.search = function(query) {
      var docs = this.docs;

      if (query.length < 3) {
        this.$results.hide().empty();
      } else {
        var results = $.map(this.index.search(query), function(result) {
          return $.grep(docs, function(entry) {
            return entry.id === parseInt(result.ref, 10); })[0];
        });

        this.displayResults(results);
        this.onAfterResultShow();
      }
    };

    LunrSearch.prototype.displayResults = function(docs) {
      var $results = this.$results;

      $results.empty();

      if (docs.length === 0) {
        $results.append( this.emptyMsg );
      } else {
        if (this.titleMsg && 0 !== this.titleMsg.length) {
          $results.append( this.titleMsg );
        }
        $results.append(this.template({docs: docs}));
      }

      $results.show();
    };

    // Populate the search input with 'q' querystring parameter if set
    LunrSearch.prototype.populateSearchFromQuery = function() {
      var uri = new URI(window.location.search.toString());
      var queryString = uri.search(true);

      if (queryString.hasOwnProperty('q')) {
        this.$elem.val(queryString.q);
        this.search(queryString.q.toString());
      }
    };

    return LunrSearch;
  })();

  $.fn.lunrSearch = function(options) {
    // apply default options
    options = $.extend({}, $.fn.lunrSearch.defaults, options);

    // create search object
    new LunrSearch(this, options);

    return this;
  };

  // configuration defaults
  $.fn.lunrSearch.defaults = {
    index_file: '     /assets/data/lunr-index.json',                            // url for the .json file containing search index data
    results:          '#search-results',                                        // selector for containing search results element
    template:         '#search-results-template',                               // selector for Mustache.js template
    titleMsg:         '<h1>Search results<h1>',                                 // message attached in front of results
    emptyMsg:         '<p>Nothing found.</p>',                                  // shown message if search returns no results
    onAfterResultShow: function() {}                                            // a hook to process the page after the search results have been shown
  };
})(jQuery);
