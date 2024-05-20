let curLayoutID;
if ((curLayoutID = /\/layout\/(\d+)\//.exec(document.currentScript.src)) !== null) curLayoutID = curLayoutID[1];

CSSinjection(remakeProxyX+"/pl/layout/"+curLayoutID+"/2/styles.css");
JSinjection(remakeProxyX+"/pl/layout/"+curLayoutID+"/1/script.js");

$(()=>{setTimeout(()=>{


  if(typeof window.gcAccountUserMenu == "undefined" || !window.gcAccountUserMenu) return;

  $(window).on('load resize', ()=>{
    if($('#gcAccountUserMenu').is(':visible')) {
      $('body').css('min-height',$('#gcAccountUserMenu .inner-wrapper-sticky').height());
    }
  });

  $.each(window.gcAccountUserMenu.items, (i,el)=>{
    $('.menu-item-'+el.id).append('<div class="submenu-wrapper"/>');
    if(typeof el.subitems !== "undefined" && el.subitems.length > 0) {
      if(el.subitems.length > 1) {
        $('.menu-item-'+el.id+' a').append('<div class="submenu-arrow" />')
        $.each(el.subitems, (i2,el2)=>{
          el2.url = el2.url == "/user/my/profile" ? "/profile" : el2.url;
          el2.url = el2.url == "/user/my/changePassword" ? "/change-password" : el2.url;
          el2.url = el2.url.indexOf("/pl/chatium/school/enter") > -1 ? el2.url.replace("/pl/chatium/school/enter", "/chatium") : el2.url;
          $('.menu-item-'+el.id+' .submenu-wrapper').append(`
           <a href="${el2.url}" class="submenu-item submenu-item-${el2.id}">
             <span>${el2.label}</span>
             <span class="submenu-notify-count"></span>
           </a>
          `);
        });
      } else {
        el.subitems[0].url = el.subitems[0].url == "/user/my/profile" ? "/profile" : el.subitems[0].url;
        el.subitems[0].url = el.subitems[0].url == "/user/my/changePassword" ? "/change-password" : el.subitems[0].url;
        el.subitems[0].url = el.subitems[0].url == "/pl/chatium/school/enter" ? "/chatium" : el.subitems[0].url;
        $('.menu-item-'+el.id+' a').attr('href', el.subitems[0].url);
      }
    }
    $('#gcAccountUserMenu').addClass('menu-ready');
  });

  let m_profile = $('#gcAccountUserMenu .gc-account-user-menu li.menu-item-profile');
  $(m_profile).find('a .menu-item-icon[src="/public/img/default_profile_50.png"]').wrapAll('<div class="defaut-img-wrapper" />');
  $(m_profile).children('a').attr('data-username', window.accountSafeUserName);
  $.getJSON( "/c/sa/user/profile/"+window.accountUserId, function( userdata ) {
     if(typeof userdata.success !== "undefined" && userdata.success === true) { 
       $.each(userdata.data.blocks, (i,bl)=>{
         if(typeof bl.title !== "undefined" && /(.+)@(.+){2,}\.(.+){2,}/.test(bl.title)) {
           $(m_profile).children('a').attr('data-username', window.accountSafeUserName).attr('data-email', bl.title);
         }
       });
     }
  });

  $(document).click((e)=>{ 

    // Если были открыты уведомления, то при клике вне их, закрыть их.
    var $target = $(e.target);
    let submenu = '#gcAccountUserMenu .gc-account-user-submenu-bar';
    let except_btn = '#gcAccountUserMenu .gc-account-leftbar .gc-account-user-menu li.menu-item-notifications_button_small';
    if(!$target.closest(submenu+", "+except_btn).length) $(submenu).hide();  

    // Если было развёрнуто меню из компактного режима, то, при клике вне меню, свернуть обратно в компактный.  
    if(!$('body').hasClass('compact-menu') && 
       (Cookies.get('compact-menu') === "true" || $('body').hasClass('compact-menu-by-default')) && 
       !$(e.target).closest('#gcAccountUserMenu').length) {
      $('body').addClass('compact-menu');   
      $('#gcAccountUserMenu .gc-account-leftbar .gc-account-user-menu li > a').removeClass('selected').nextAll('.submenu-wrapper:visible').slideUp('fast');
      m_updateStickyInterval(); 
    } 

  });
  $('#gcAccountUserMenu .gc-account-leftbar .gc-account-user-menu li.menu-item-notifications_button_small').click((e)=>{ 
    if(window.matchMedia("(max-width: 768px)").matches) {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation(); 
      window.location.href = "/notifications/notifications/all";
    }       
  });
  $('#gcAccountUserMenu .gc-account-leftbar .gc-account-user-menu li:not(.menu-item-notifications_button_small) > a').off();
  $(document).on('click touchend', '#gcAccountUserMenu .gc-account-leftbar .gc-account-user-menu li:not(.menu-item-notifications_button_small) > a', (e)=> {
    if (
         window.matchMedia("(max-width: 768px)").matches &&
         $(e.target).is('#gcAccountUserMenu .gc-account-leftbar.expanded .gc-account-user-menu li.menu-item-profile .submenu-arrow')
    ) {
      hideMobMenu(e);
      return false;
    }
    let submenu_wrapper = $(e.currentTarget).nextAll('.submenu-wrapper:not(:empty)');
    if ($(submenu_wrapper).length > 0) {
      if($('body').hasClass('compact-menu')) {
        $('body').removeClass('compact-menu');
        setTimeout(()=> { 
          $(e.currentTarget).toggleClass('selected');
          $(submenu_wrapper).stop().slideToggle();
        }, 300);
      } else {
          $('#gcAccountUserMenu .gc-account-leftbar .gc-account-user-menu li > a').not(e.currentTarget).removeClass('selected');
          $('.submenu-wrapper').stop().slideUp();
          setTimeout(()=>{
            $(e.currentTarget).toggleClass('selected');
            $(submenu_wrapper).stop().slideToggle();
          });
      }
      m_updateStickyInterval();
      return false;
    }
  });
  $('#gcAccountUserMenu .gc-account-user-menu').after(`
    <div class="custom-btns-wrapper">
      <a class="custom-btn" href="javascript:void(0)" onclick="m_custom_btn_click()"><span></span></a>
      <a class="menutoggle-btn" href="javascript:void(0)"><span>cвернуть меню</span></a>
    </div>
  `);
   if(
      window.location.href.indexOf('/pl/tasks/resp') > -1 && 
      (["", `"javascript://$('.activated-talks-widget').data('gc-talksWidget').showTalksWindow()"`]
        .indexOf(getComputedStyle($('#gcAccountUserMenu')[0]).getPropertyValue('--m-custom-btn-url').trim()) > -1)
      ) {
        $("#gcAccountUserMenu .custom-btns-wrapper .custom-btn").hide();
   }


  $('#gcAccountUserMenu .menutoggle-btn').on('click touchend', (e)=> {
    if($('.gc-account-leftbar').is('.expanded')) {
      hideMobMenu(e);
      return false;
    }
    if($('body').hasClass('compact-menu')) {
      Cookies.set('compact-menu', false, { expires: 10000, path: '/' });
    } else {
      Cookies.set('compact-menu', true, { expires: 10000, path: '/' });
      $('#gcAccountUserMenu .gc-account-leftbar').animate({top: 0},300);
    }
    $('body').toggleClass('compact-menu');
    $('#gcAccountUserMenu .gc-account-leftbar .gc-account-user-menu li > a').removeClass('selected').nextAll('.submenu-wrapper:visible').slideUp('fast');
    m_updateStickyInterval();
    return false;
  });

  // Fix для Safari
  if($('.gc-account-leftbar').length) {
    $('.gc-account-leftbar')[0].addEventListener('affixed.top.stickySidebar', ()=>{
      $('.gc-account-leftbar .inner-wrapper-sticky').css({'transform':''});
    });
  }

  $('#gcAccountUserMenu .gc-account-user-menu li.menu-item > a').each((i,el)=>{
    let title = $(el).attr("title");    
    title = title == "Служба поддержки" ? "Сообщения" : title;
    $(el).removeAttr("title"); 
    $(el).attr("data-title", title);    
  })

  $(document).trigger('remake-left-menu-ready');

})});
function hideMobMenu(e){
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation(); 
    $('#gcAccountUserMenu .gc-account-leftbar').removeClass("expanded").find('.gc-account-user-menu').hide();
    $('html').removeClass('open-menu');
}
function showMobMenu(e){
    e = e || window.event;
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation(); 
    $('#gcAccountUserMenu .gc-account-leftbar').addClass("expanded").find('.gc-account-user-menu').show();
    $('html').addClass('open-menu');
    $('#gcAccountUserMenu .gc-account-leftbar>.inner-wrapper-sticky').scrollTop(0);
}
function m_custom_btn_click() {
    let btn_action = getComputedStyle($('#gcAccountUserMenu')[0]).getPropertyValue('--m-custom-btn-url');
    if(btn_action != "") {
      btn_action = btn_action.replace(/^\s*?"|^\s*?'|"\s*?$|'\s*?$/g, ''); // очищаем от кавычек в начале и в конце
      if(btn_action.indexOf('javascript://') > -1) {
        $.globalEval( btn_action.replace('javascript://',''));
      } else {
        location.href = btn_action;
      }
    }
    else $('.activated-talks-widget').data('gc-talksWidget').showTalksWindow();
}
function m_updateStickyInterval() {
  let updateStickyInterval_i = 0;
  let updateStickyInterval = setInterval(()=>{
    $('.gc-account-leftbar').stickySidebar("updateSticky");
    updateStickyInterval_i++;
    if(updateStickyInterval_i >= 30) {
      clearInterval(updateStickyInterval);
      updateStickyInterval_i = 0;
    }
  },10);
}

function addRemakeSubmenuBtn(section, position, name, url, class_name) {
  let new_node = `<a href="${url}" class="submenu-item ${class_name}"><span>${name}</span></a>`;
  let $submenu_wrp = $(`#gcAccountUserMenu .${section} .submenu-wrapper`);
  if(position <= $submenu_wrp.find('.submenu-item').length){
    $submenu_wrp.find('.submenu-item').eq(position-1).before(new_node);
  } else {
    $submenu_wrp.append(new_node);
  }
}

function addRemakeMenuBtn(position, name, url, class_name) {
  let new_node = `
    <li class="menu-item ${class_name}">
      <a href="${(url? url : 'javascript:void(0)')}" data-title="${name}"></a>
      <div class="submenu-wrapper"></div>
    </li>`;
  let $menu_wrp = $(`#gcAccountUserMenu .gc-account-user-menu`);
  if(position <= $menu_wrp.find('.menu-item').length){
    $menu_wrp.find('.menu-item').eq(position-1).before(new_node);
  } else {
    $menu_wrp.append(new_node);
  }
}
function subloginMenuBtn(id){
    $.ajax({
      type: "POST",
      url: "/user/control/user/update/id/"+id,
      data: {"action":"sublogin"},
      success: ()=>{
        window.location.reload();      
      }    
    })  
}


/**
 * Copyright Marc J. Schmidt. See the LICENSE file at the top-level
 * directory of this distribution and at
 * https://github.com/marcj/css-element-queries/blob/master/LICENSE.
 */

"use strict";(function(a,b){if(typeof define==="function"&&define.amd){define(b)}else{if(typeof exports==="object"){module.exports=b()}else{a.ResizeSensor=b()}}}(typeof window!=="undefined"?window:this,function(){if(typeof window==="undefined"){return null}var b=typeof window!="undefined"&&window.Math==Math?window:typeof self!="undefined"&&self.Math==Math?self:Function("return this")();var h=b.requestAnimationFrame||b.mozRequestAnimationFrame||b.webkitRequestAnimationFrame||function(i){return b.setTimeout(i,20)};var g=b.cancelAnimationFrame||b.mozCancelAnimationFrame||b.webkitCancelAnimationFrame||function(i){b.clearTimeout(i)};function f(n,p){var m=Object.prototype.toString.call(n);var o=("[object Array]"===m||("[object NodeList]"===m)||("[object HTMLCollection]"===m)||("[object Object]"===m)||("undefined"!==typeof jQuery&&n instanceof jQuery)||("undefined"!==typeof Elements&&n instanceof Elements));var l=0,k=n.length;if(o){for(;l<k;l++){p(n[l])}}else{p(n)}}function c(i){if(!i.getBoundingClientRect){return{width:i.offsetWidth,height:i.offsetHeight}}var j=i.getBoundingClientRect();return{width:Math.round(j.width),height:Math.round(j.height)}}function e(i,j){Object.keys(j).forEach(function(k){i.style[k]=j[k]})}var d=function(i,m){var k=0;function l(){var p=[];this.add=function(q){p.push(q)};var o,n;this.call=function(q){for(o=0,n=p.length;o<n;o++){p[o].call(this,q)}};this.remove=function(r){var q=[];for(o=0,n=p.length;o<n;o++){if(p[o]!==r){q.push(p[o])}}p=q};this.length=function(){return p.length}}function j(p,D){if(!p){return}if(p.resizedAttached){p.resizedAttached.add(D);return}p.resizedAttached=new l();p.resizedAttached.add(D);p.resizeSensor=document.createElement("div");p.resizeSensor.dir="ltr";p.resizeSensor.className="resize-sensor";var B={pointerEvents:"none",position:"absolute",left:"0px",top:"0px",right:"0px",bottom:"0px",overflow:"hidden",zIndex:"-1",visibility:"hidden",maxWidth:"100%"};var r={position:"absolute",left:"0px",top:"0px",transition:"0s"};e(p.resizeSensor,B);var n=document.createElement("div");n.className="resize-sensor-expand";e(n,B);var y=document.createElement("div");e(y,r);n.appendChild(y);var x=document.createElement("div");x.className="resize-sensor-shrink";e(x,B);var E=document.createElement("div");e(E,r);e(E,{width:"200%",height:"200%"});x.appendChild(E);p.resizeSensor.appendChild(n);p.resizeSensor.appendChild(x);p.appendChild(p.resizeSensor);var u=window.getComputedStyle(p);var H=u?u.getPropertyValue("position"):null;if("absolute"!==H&&"relative"!==H&&"fixed"!==H&&"sticky"!==H){p.style.position="relative"}var v=false;var G=0;var z=c(p);var q=0;var C=0;var t=true;k=0;var o=function(){var J=p.offsetWidth;var I=p.offsetHeight;y.style.width=(J+10)+"px";y.style.height=(I+10)+"px";n.scrollLeft=J+10;n.scrollTop=I+10;x.scrollLeft=J+10;x.scrollTop=I+10};var F=function(){if(t){var I=p.offsetWidth===0&&p.offsetHeight===0;if(I){if(!k){k=h(function(){k=0;F()})}return}else{t=false}}o()};p.resizeSensor.resetSensor=F;var s=function(){G=0;if(!v){return}q=z.width;C=z.height;if(p.resizedAttached){p.resizedAttached.call(z)}};var w=function(){z=c(p);v=z.width!==q||z.height!==C;if(v&&!G){G=h(s)}F()};var A=function(K,J,I){if(K.attachEvent){K.attachEvent("on"+J,I)}else{K.addEventListener(J,I)}};A(n,"scroll",w);A(x,"scroll",w);k=h(function(){k=0;F()})}f(i,function(n){j(n,m)});this.detach=function(n){if(!k){g(k);k=0}d.detach(i,n)};this.reset=function(){i.resizeSensor.resetSensor()}};d.reset=function(i){f(i,function(j){j.resizeSensor.resetSensor()})};d.detach=function(i,j){f(i,function(k){if(!k){return}if(k.resizedAttached&&typeof j==="function"){k.resizedAttached.remove(j);if(k.resizedAttached.length()){return}}if(k.resizeSensor){if(k.contains(k.resizeSensor)){k.removeChild(k.resizeSensor)}delete k.resizeSensor;delete k.resizedAttached}})};if(typeof MutationObserver!=="undefined"){var a=new MutationObserver(function(k){for(var n in k){if(k.hasOwnProperty(n)){var l=k[n].addedNodes;for(var m=0;m<l.length;m++){if(l[m].resizeSensor){d.reset(l[m])}}}}});document.addEventListener("DOMContentLoaded",function(i){a.observe(document.body,{childList:true,subtree:true})})}return d}));

/**
 * sticky-sidebar - A JavaScript plugin for making smart and high performance.
 * @version v3.3.1
 * @link https://github.com/abouolia/sticky-sidebar
 * @author Ahmed Bouhuolia
 * @license The MIT License (MIT)
**/
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e():"function"==typeof define&&define.amd?define(e):e()}(0,function(){"use strict";function t(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var e=function(){function t(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,i,n){return i&&t(e.prototype,i),n&&t(e,n),e}}(),i=function(){var i=".stickySidebar",n={topSpacing:0,bottomSpacing:0,containerSelector:!1,innerWrapperSelector:".inner-wrapper-sticky",stickyClass:"is-affixed",resizeSensor:!0,minWidth:!1};return function(){function s(e){var i=this,o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(t(this,s),this.options=s.extend(n,o),this.sidebar="string"==typeof e?document.querySelector(e):e,void 0===this.sidebar)throw new Error("There is no specific sidebar element.");this.sidebarInner=!1,this.container=this.sidebar.parentElement,this.affixedType="STATIC",this.direction="down",this.support={transform:!1,transform3d:!1},this._initialized=!1,this._reStyle=!1,this._breakpoint=!1,this._resizeListeners=[],this.dimensions={translateY:0,topSpacing:0,lastTopSpacing:0,bottomSpacing:0,lastBottomSpacing:0,sidebarHeight:0,sidebarWidth:0,containerTop:0,containerHeight:0,viewportHeight:0,viewportTop:0,lastViewportTop:0},["handleEvent"].forEach(function(t){i[t]=i[t].bind(i)}),this.initialize()}return e(s,[{key:"initialize",value:function(){var t=this;if(this._setSupportFeatures(),this.options.innerWrapperSelector&&(this.sidebarInner=this.sidebar.querySelector(this.options.innerWrapperSelector),null===this.sidebarInner&&(this.sidebarInner=!1)),!this.sidebarInner){var e=document.createElement("div");for(e.setAttribute("class","inner-wrapper-sticky"),this.sidebar.appendChild(e);this.sidebar.firstChild!=e;)e.appendChild(this.sidebar.firstChild);this.sidebarInner=this.sidebar.querySelector(".inner-wrapper-sticky")}if(this.options.containerSelector){var i=document.querySelectorAll(this.options.containerSelector);if((i=Array.prototype.slice.call(i)).forEach(function(e,i){e.contains(t.sidebar)&&(t.container=e)}),!i.length)throw new Error("The container does not contains on the sidebar.")}"function"!=typeof this.options.topSpacing&&(this.options.topSpacing=parseInt(this.options.topSpacing)||0),"function"!=typeof this.options.bottomSpacing&&(this.options.bottomSpacing=parseInt(this.options.bottomSpacing)||0),this._widthBreakpoint(),this.calcDimensions(),this.stickyPosition(),this.bindEvents(),this._initialized=!0}},{key:"bindEvents",value:function(){window.addEventListener("resize",this,{passive:!0,capture:!1}),window.addEventListener("scroll",this,{passive:!0,capture:!1}),this.sidebar.addEventListener("update"+i,this),this.options.resizeSensor&&"undefined"!=typeof ResizeSensor&&(new ResizeSensor(this.sidebarInner,this.handleEvent),new ResizeSensor(this.container,this.handleEvent))}},{key:"handleEvent",value:function(t){this.updateSticky(t)}},{key:"calcDimensions",value:function(){if(!this._breakpoint){var t=this.dimensions;t.containerTop=s.offsetRelative(this.container).top,t.containerHeight=this.container.clientHeight,t.containerBottom=t.containerTop+t.containerHeight,t.sidebarHeight=this.sidebarInner.offsetHeight,t.sidebarWidth=this.sidebar.offsetWidth,t.viewportHeight=window.innerHeight,this._calcDimensionsWithScroll()}}},{key:"_calcDimensionsWithScroll",value:function(){var t=this.dimensions;t.sidebarLeft=s.offsetRelative(this.sidebar).left,t.viewportTop=document.documentElement.scrollTop||document.body.scrollTop,t.viewportBottom=t.viewportTop+t.viewportHeight,t.viewportLeft=document.documentElement.scrollLeft||document.body.scrollLeft,t.topSpacing=this.options.topSpacing,t.bottomSpacing=this.options.bottomSpacing,"function"==typeof t.topSpacing&&(t.topSpacing=parseInt(t.topSpacing(this.sidebar))||0),"function"==typeof t.bottomSpacing&&(t.bottomSpacing=parseInt(t.bottomSpacing(this.sidebar))||0),"VIEWPORT-TOP"===this.affixedType?t.topSpacing<t.lastTopSpacing&&(t.translateY+=t.lastTopSpacing-t.topSpacing,this._reStyle=!0):"VIEWPORT-BOTTOM"===this.affixedType&&t.bottomSpacing<t.lastBottomSpacing&&(t.translateY+=t.lastBottomSpacing-t.bottomSpacing,this._reStyle=!0),t.lastTopSpacing=t.topSpacing,t.lastBottomSpacing=t.bottomSpacing}},{key:"isSidebarFitsViewport",value:function(){return this.dimensions.sidebarHeight<this.dimensions.viewportHeight}},{key:"observeScrollDir",value:function(){var t=this.dimensions;if(t.lastViewportTop!==t.viewportTop){var e="down"===this.direction?Math.min:Math.max;t.viewportTop===e(t.viewportTop,t.lastViewportTop)&&(this.direction="down"===this.direction?"up":"down")}}},{key:"getAffixType",value:function(){var t=this.dimensions,e=!1;this._calcDimensionsWithScroll();var i=t.sidebarHeight+t.containerTop,n=t.viewportTop+t.topSpacing,s=t.viewportBottom-t.bottomSpacing;return"up"===this.direction?n<=t.containerTop?(t.translateY=0,e="STATIC"):n<=t.translateY+t.containerTop?(t.translateY=n-t.containerTop,e="VIEWPORT-TOP"):!this.isSidebarFitsViewport()&&t.containerTop<=n&&(e="VIEWPORT-UNBOTTOM"):this.isSidebarFitsViewport()?t.sidebarHeight+n>=t.containerBottom?(t.translateY=t.containerBottom-i,e="CONTAINER-BOTTOM"):n>=t.containerTop&&(t.translateY=n-t.containerTop,e="VIEWPORT-TOP"):t.containerBottom<=s?(t.translateY=t.containerBottom-i,e="CONTAINER-BOTTOM"):i+t.translateY<=s?(t.translateY=s-i,e="VIEWPORT-BOTTOM"):t.containerTop+t.translateY<=n&&(e="VIEWPORT-UNBOTTOM"),t.translateY=Math.max(0,t.translateY),t.translateY=Math.min(t.containerHeight,t.translateY),t.lastViewportTop=t.viewportTop,e}},{key:"_getStyle",value:function(t){if(void 0!==t){var e={inner:{},outer:{}},i=this.dimensions;switch(t){case"VIEWPORT-TOP":e.inner={position:"fixed",top:i.topSpacing,left:i.sidebarLeft-i.viewportLeft,width:i.sidebarWidth};break;case"VIEWPORT-BOTTOM":e.inner={position:"fixed",top:"auto",left:i.sidebarLeft,bottom:i.bottomSpacing,width:i.sidebarWidth};break;case"CONTAINER-BOTTOM":case"VIEWPORT-UNBOTTOM":var n=this._getTranslate(0,i.translateY+"px");e.inner=n?{transform:n}:{position:"absolute",top:i.translateY,width:i.sidebarWidth}}switch(t){case"VIEWPORT-TOP":case"VIEWPORT-BOTTOM":case"VIEWPORT-UNBOTTOM":case"CONTAINER-BOTTOM":e.outer={height:i.sidebarHeight,position:"relative"}}return e.outer=s.extend({height:"",position:""},e.outer),e.inner=s.extend({position:"relative",top:"",left:"",bottom:"",width:"",transform:this._getTranslate()},e.inner),e}}},{key:"stickyPosition",value:function(t){if(!this._breakpoint){t=this._reStyle||t||!1;var e=this.getAffixType(),n=this._getStyle(e);if((this.affixedType!=e||t)&&e){var o="affix."+e.toLowerCase().replace("viewport-","")+i;s.eventTrigger(this.sidebar,o),"STATIC"===e?s.removeClass(this.sidebar,this.options.stickyClass):s.addClass(this.sidebar,this.options.stickyClass);for(var r in n.outer)this.sidebar.style[r]=n.outer[r];for(var a in n.inner){var c="number"==typeof n.inner[a]?"px":"";this.sidebarInner.style[a]=n.inner[a]+c}var p="affixed."+e.toLowerCase().replace("viewport-","")+i;s.eventTrigger(this.sidebar,p)}else this._initialized&&(this.sidebarInner.style.left=n.inner.left);this.affixedType=e}}},{key:"_widthBreakpoint",value:function(){window.innerWidth<=this.options.minWidth?(this._breakpoint=!0,this.affixedType="STATIC",this.sidebar.removeAttribute("style"),s.removeClass(this.sidebar,this.options.stickyClass),this.sidebarInner.removeAttribute("style")):this._breakpoint=!1}},{key:"updateSticky",value:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};this._running||(this._running=!0,function(e){requestAnimationFrame(function(){switch(e){case"scroll":t._calcDimensionsWithScroll(),t.observeScrollDir(),t.stickyPosition();break;case"resize":default:t._widthBreakpoint(),t.calcDimensions(),t.stickyPosition(!0)}t._running=!1})}(e.type))}},{key:"_setSupportFeatures",value:function(){var t=this.support;t.transform=s.supportTransform(),t.transform3d=s.supportTransform(!0)}},{key:"_getTranslate",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;return this.support.transform3d?"translate3d("+t+", "+e+", "+i+")":!!this.support.translate&&"translate("+t+", "+e+")"}},{key:"destroy",value:function(){window.removeEventListener("resize",this,{caption:!1}),window.removeEventListener("scroll",this,{caption:!1}),this.sidebar.classList.remove(this.options.stickyClass),this.sidebar.style.minHeight="",this.sidebar.removeEventListener("update"+i,this);var t={inner:{},outer:{}};t.inner={position:"",top:"",left:"",bottom:"",width:"",transform:""},t.outer={height:"",position:""};for(var e in t.outer)this.sidebar.style[e]=t.outer[e];for(var n in t.inner)this.sidebarInner.style[n]=t.inner[n];this.options.resizeSensor&&"undefined"!=typeof ResizeSensor&&(ResizeSensor.detach(this.sidebarInner,this.handleEvent),ResizeSensor.detach(this.container,this.handleEvent))}}],[{key:"supportTransform",value:function(t){var e=!1,i=t?"perspective":"transform",n=i.charAt(0).toUpperCase()+i.slice(1),s=["Webkit","Moz","O","ms"],o=document.createElement("support").style;return(i+" "+s.join(n+" ")+n).split(" ").forEach(function(t,i){if(void 0!==o[t])return e=t,!1}),e}},{key:"eventTrigger",value:function(t,e,i){try{var n=new CustomEvent(e,{detail:i})}catch(t){(n=document.createEvent("CustomEvent")).initCustomEvent(e,!0,!0,i)}t.dispatchEvent(n)}},{key:"extend",value:function(t,e){var i={};for(var n in t)void 0!==e[n]?i[n]=e[n]:i[n]=t[n];return i}},{key:"offsetRelative",value:function(t){var e={left:0,top:0};do{var i=t.offsetTop,n=t.offsetLeft;isNaN(i)||(e.top+=i),isNaN(n)||(e.left+=n),t="BODY"===t.tagName?t.parentElement:t.offsetParent}while(t);return e}},{key:"addClass",value:function(t,e){s.hasClass(t,e)||(t.classList?t.classList.add(e):t.className+=" "+e)}},{key:"removeClass",value:function(t,e){s.hasClass(t,e)&&(t.classList?t.classList.remove(e):t.className=t.className.replace(new RegExp("(^|\\b)"+e.split(" ").join("|")+"(\\b|$)","gi")," "))}},{key:"hasClass",value:function(t,e){return t.classList?t.classList.contains(e):new RegExp("(^| )"+e+"( |$)","gi").test(t.className)}}]),s}()}();window.StickySidebar=i,function(){if("undefined"!=typeof window){var t=window.$||window.jQuery||window.Zepto;if(t){t.fn.stickySidebar=function(e){return this.each(function(){var n=t(this),s=t(this).data("stickySidebar");if(s||(s=new i(this,"object"==typeof e&&e),n.data("stickySidebar",s)),"string"==typeof e){if(void 0===s[e]&&-1===["destroy","updateSticky"].indexOf(e))throw new Error('No method named "'+e+'"');s[e]()}})},t.fn.stickySidebar.Constructor=i;var e=t.fn.stickySidebar;t.fn.stickySidebar.noConflict=function(){return t.fn.stickySidebar=e,this}}}}()});