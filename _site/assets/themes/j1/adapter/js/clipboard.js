

  /*
 # -----------------------------------------------------------------------------
 # ~/assets/themes/j1/adapter/js/clipboard.js
 # JS Adapter for Clipboard
 #
 # Product/Info:
 # https://jekyll.one
 #
 # Copyright (C) 2021 Juergen Adams
 #
 # J1 Template is licensed under the MIT License.
 # For details, see https://jekyll.one
 # -----------------------------------------------------------------------------
 # NOTE:
 # -----------------------------------------------------------------------------
 # Adapter generated: 2021-01-10 14:02:01 +0000
 # -----------------------------------------------------------------------------
*/
'use strict';j1.adapter.clipboard=function(t){var i,e,o,a;return{init:function(n){o=t.adapter.clipboard,i=log4javascript.getLogger('j1.adapter.clipboard');$.extend({module_name:'j1.adapter.clipboard',generated:'2021-01-10 14:02:01 +0000'},n);o.state='started',e='initialization: started',i.info(e);var r=setInterval(function(){'finished'==t.getState()&&(e='create clipboard',i.info(e),a=new ClipboardJS('.btn-clipboard',{target:function(t){return t.parentNode.nextElementSibling}}),o.initClipButtons(),o.initEventHandler(a),clearInterval(r),i.info('met dependencies for: j1'),o.setState('finished'),i.info('state: '+o.getState()),i.info('module initialized successfully'))},25)},initClipButtons:function(){$('.highlight').each(function(){if(0==$(this).closest('.noclip').length){var t='<div class="j1-clipboard"><span class="btn-clipboard j1-tooltip" data-toggle="tooltip" data-placement="left" title="Copy to clipboard">Copy</span></div>';$(this).before(t),$('.btn-clipboard').tooltip()}})},initEventHandler:function(t){t.on('success',function(t){$(t.trigger).attr('title','copied!').tooltip('_fixTitle').tooltip('show').attr('title','Copy to clipboard').tooltip('_fixTitle');var i='initialization copy-to-clipboard sucessfull';log4javascript.getLogger('j1.initClipboard').debug(i);var e,o=t.text.split('\n');for(e=0;e<o.length;e++)o[e].replace(/^\s+\d+/,'');t.clearSelection()}),t.on('error',function(t){var o=/Mac/i.test(navigator.userAgent)?'press \u2318 to copy':'press ctrl-c to copy';i=log4javascript.getLogger('j1.initClipboard'),e='initialization copy-to-clipboard failed, fallback used.',i.warn(e),$(t.trigger).attr('title',o).tooltip('_fixTitle').tooltip('show').attr('title','copy to clipboard').tooltip('_fixTitle')})},messageHandler:function(t,o){var a=JSON.stringify(o);return e='received message from '+t+': '+a,i.debug(e),'command'===o.type&&'module_initialized'===o.action&&i.info(o.text),'command'===o.type&&'status'===o.action&&i.info('messageHandler: received - '+o.action),!0},setState:function(t){o.state=t},getState:function(){return o.state}}}(j1,window);


