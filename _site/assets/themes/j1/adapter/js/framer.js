

  /*
 # -----------------------------------------------------------------------------
 #  ~/assets/themes/j1/adapter/js/framer.js
 #  J1 Adapter for J1 iFrameResizer
 #
 #  Product/Info:
 #  https://jekyll.one
 #  http://davidjbradshaw.github.io/iframe-resizer/
 #
 #  Copyright (C) 2021 Juergen Adams
 #  Copyright (C) 2013-15 David J. Bradshaw
 #
 #  J1 Template is licensed under the MIT License.
 #  For details, see https://jekyll.one
 #  iFrameResizer is licensed under under the MIT License.
 #  For details, see http://davidjbradshaw.github.io/iframe-resizer/
 #
 # -----------------------------------------------------------------------------
 #  Adapter generated: 2021-01-10 14:02:01 +0000
 # -----------------------------------------------------------------------------
 */
'use strict';j1.adapter.framer=function(e){var t,i,a,n={};return{init:function(a){var r=setInterval(function(){if('finished'===e.getState()){t=e.adapter.framer,i=log4javascript.getLogger('j1.adapter.framer'),t.setState('started'),i.info('state: '+t.getState()),i.info('module is being initialized');var o=$.extend({module_name:'j1.adapter.example',generated:'2021-01-10 14:02:01 +0000'},a);return n=$.extend({},{enabled:!0,load:"sync",log:!1,autoResize:!0,bodyBackground:"",bodyMargin:0,checkOrigin:!0,inPageLinks:!1,interval:32,heightCalculationMethod:"bodyOffset",widthCalculationMethod:"scroll",maxHeight:1e8,minHeight:512,maxWidth:1e8,minWidth:0,resizeFrom:"parent",scrolling:!1,sizeHeight:!0,sizeWidth:!1,tolerance:0}),void 0!==o&&(n=e.mergeData(n,o)),iFrameResize({log:n.log,autoResize:n.autoResize,bodyBackground:n.bodyBackground,bodyMargin:n.bodyMargin,checkOrigin:n.checkOrigin,inPageLinks:n.inPageLinks,interval:n.interval,heightCalculationMethod:n.heightCalculationMethod,maxHeight:n.maxHeight,minWidth:n.minWidth,maxWidth:n.maxWidth,minHeight:n.minHeight,resizeFrom:n.resizeFrom,scrolling:n.scrolling,sizeHeight:n.sizeHeight,sizeWidth:n.sizeWidth,tolerance:n.tolerance,widthCalculationMethod:n.widthCalculationMethod,targetOrigin:n.checkOrigin}),t.setState('finished'),i.info('state: '+t.getState()),i.info('initializing module finished'),clearInterval(r),!0}},25)},messageHandler:function(e,t){var n=JSON.stringify(t,undefined,2);return a='received message from '+e+': '+n,i.debug(a),'command'===t.type&&'module_initialized'===t.action&&i.info(t.text),!0},setState:function(e){t.state=e},getState:function(){return e.adapter.navigator.state},setXhrState:function(t,i){e.adapter.navigator.xhrData[t]=i},getXhrState:function(t){return e.adapter.navigator.xhrData[t]}}}(j1,window);


