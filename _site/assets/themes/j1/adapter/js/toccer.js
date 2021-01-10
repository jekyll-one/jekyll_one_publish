

  /*
 # -----------------------------------------------------------------------------
 # ~/assets/themes/j1/adapter/js/toccer.js
 # JS Adapter for J1 Toccer
 #
 # Product/Info:
 # https://jekyll.one
 # https://tscanlin.github.io/tocbot
 #
 # Copyright (C) 2021 Juergen Adams
 #
 # J1 Template is licensed under the MIT License.
 # For details, see https://jekyll.one
 # Tocbot is licensed under under the MIT License.
 # For details, see https://tscanlin.github.io/tocbot
 # -----------------------------------------------------------------------------
 # Adapter generated: 2021-01-10 14:02:01 +0000
 # -----------------------------------------------------------------------------
*/
'use strict';j1.adapter.toccer=function(){var e,t,o,i={},l={};return{init:function(o){e=j1.adapter.toccer,t=log4javascript.getLogger('j1.adapter.toccer'),e.setState('started'),t.info('state: '+e.getState()),t.info('Module is being initialized');var n=null!=o?$.extend({},o):{};$.extend({module_name:'j1.adapter.toccer',generated:'2021-01-10 14:02:01 +0000'},o);l=$.extend({},{enabled:!0,log:!1,tocSelector:".js-toc",contentSelector:".js-toc-content",headingSelector:"h2, h3, h4, h5, h6",ignoreSelector:".notoc",collapseDepth:3,activeLinkColor:"#f44336",throttleTimeout:150,scrollSmooth:!0,scrollSmoothDuration:300,scrollSmoothOffset:-90,scrollContainer:null,delay:400}),null!=o&&(n=$.extend({},o)),void 0!==n&&(i=j1.mergeData(n,l)),e.moduleOptions=i;var a='true'===i.toc;i.comments;if(i.collapseDepth===undefined&&(i.collapseDepth=3),a)var s=setInterval(function(){if('finished'==j1.getState()){var o=j1.adapter.toccer.moduleOptions,i=$('.attic'),l=$('nav.navbar'),n=$('#adblock'),a=l.hasClass('navbar-fixed')?'fixed':'scrolled',r=$('body').css('font-size').replace('px',''),c=(window.pageYOffset,parseInt(r)),d=i.length?i.height():0,f=l.length?l.height():0,h=n.length?n.height():0,u='fixed'==a?-1*(f+h+c):-1*(d+f+h+c);o.scrollSmoothOffset=u,e.initToccerCore(o),e.setState('finished'),t.info('state: '+e.getState()),t.info('module initialized successfully'),t.info('met dependencies for: j1'),clearInterval(s)}},25)},initToccerCore:function(o){if(o!==undefined)$.extend({},o);else;e.setState('running'),t.info('state: '+e.getState());var l=setInterval(function(){$('#toc_mmenu').length&&(tocbot.init({log:i.log,activeLinkColor:i.activeLinkColor,tocSelector:i.tocSelector,headingSelector:i.headingSelector,ignoreSelector:i.ignoreSelector,contentSelector:i.contentSelector,collapseDepth:i.collapseDepth,throttleTimeout:i.throttleTimeout,hasInnerContainers:!1,includeHtml:!1,linkClass:'toc-link',extraLinkClasses:'',activeLinkClass:'is-active-link',listClass:'toc-list',extraListClasses:'',isCollapsedClass:'is-collapsed',collapsibleClass:'is-collapsible',listItemClass:'toc-list-item',positionFixedSelector:'',positionFixedClass:'is-position-fixed',fixedSidebarOffset:'auto',scrollContainer:null,scrollSmooth:i.scrollSmooth,scrollSmoothDuration:i.scrollSmoothDuration,scrollSmoothOffset:i.scrollSmoothOffset,headingsOffset:1,throttleTimeout:i.throttleTimeout}),t.info('met dependencies for: xhrData'),clearInterval(l))},25)},messageHandler:function(e,i){var l=JSON.stringify(i,undefined,2);return o='received message from '+e+': '+l,t.debug(o),'command'===i.type&&'module_initialized'===i.action&&t.info(i.text),!0},setState:function(t){e.state=t},getState:function(){return e.state}}}(j1,window);


