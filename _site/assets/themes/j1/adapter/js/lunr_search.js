

  /*
 # -----------------------------------------------------------------------------
 # ~/assets/themes/j1/adapter/js/lunr_search.js
 # J1 Adapter for lunr_search
 #
 # Product/Info:
 # https://jekyll.one
 #
 # Copyright (C) 2021 Juergen Adams
 #
 # J1 Template is licensed under the MIT License.
 # For details, see https://jekyll.one
 # -----------------------------------------------------------------------------
 #  Adapter generated: 2021-01-10 14:02:01 +0000
 # -----------------------------------------------------------------------------
*/
'use strict';j1.adapter.lunr_search=function(e){var t,s,a,n={};return{init:function(a){t=e.adapter.lunr_search,s=log4javascript.getLogger('j1.adapter.lunr_search'),t.setState('started'),s.info('state: '+t.getState()),s.info('module is being initialized');$.extend({module_name:'j1.adapter.lunr_search',generated:'2021-01-10 14:02:01 +0000'},a);n=$.extend({},{enabled:!0,placement:"navbar",target:"_blank",excludes:["/assets/*","/apps/*","/log/*","/node_modules/*","/*\\.htm*/"],stopwords:"/assets/themes/j1/modules/lunrSearch/stopwords.txt",stopwords_locale:"de",strip_index_html:!1,min_length:3,date_format:"mmm dd, yyyy",module_dir:"/assets/themes/j1/modules/lunrSearch/js",index_dir:"/assets/data",index_name:"lunr-index.json",index_file:"/assets/data/lunr-index.json",search_input:"#search-query",results:"#search-results",template:"#search-results-template",titleMsg:"",emptyMsg:""});var r='module is being initialized';s.info(r);var i=setInterval(function(){'finished'==e.getState()&&($(n.search_input).lunrSearch({index_file:n.index_file,results:n.results,template:n.template,titleMsg:n.titleMsg,emptyMsg:n.emptyMsg}),t.setState('finished'),s.info('state: '+t.getState()),clearInterval(i))},25);t.eventHandler()},eventHandler:function(){$('#clear-topsearch').on('click',function(){$(this).addClass('d-none').prevAll(':input').val(''),$('#search-results').hide(),$('#search-results').html('')})},messageHandler:function(e,t){var n=JSON.stringify(t,undefined,2);return a='received message from '+e+': '+n,s.debug(a),'command'===t.type&&'module_initialized'===t.action&&s.info(t.text),!0},setState:function(e){t.state=e},getState:function(){return t.state}}}(j1,window);


