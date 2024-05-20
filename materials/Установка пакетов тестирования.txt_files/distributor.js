const remakeXFiles = {
  "distributor": "/pl/layout/13749/0/distributor.js",
  "script": "/pl/layout/13749/1/script.js",
  "styles": "/pl/layout/13749/2/styles.css",
  "chatium-scripts": "/pl/layout/13749/3/chatium-scripts.js",
  "chatium-sytles": "/pl/layout/13749/4/chatium-sytles.css",
  "chatium-iframe-scripts": "/pl/layout/13749/5/chatium-iframe-scripts.js",
  "chatium-iframe-styles": "/pl/layout/13749/6/chatium-iframe-styles.css",
  "contact-us-scripts": "/pl/layout/13749/7/contact-us-scripts.js",
  "contact-us-styles": "/pl/layout/13749/8/contact-us-styles.css",
  "conversation-scripts": "/pl/layout/13749/9/conversation-scripts.js",
  "conversation-styles": "/pl/layout/13749/10/conversation-styles.css",
  "left-menu-filler-script": "/pl/layout/13749/11/left-menu-filler-script.js",
  "jquery.sticky-sidebar.min": "/pl/layout/13749/12/jquery.sticky-sidebar.min.js",
  "ResizeSensor": "/pl/layout/13749/13/ResizeSensor.js",
  "left-menu-scripts": "/pl/layout/13749/14/left-menu-scripts.js",
  "left-menu-styles": "/pl/layout/13749/15/left-menu-styles.css",
  "left-menu-to-fullsize": "/pl/layout/13749/16/left-menu-to-fullsize.css",
  "lesson-scripts": "/pl/layout/13749/17/lesson-scripts.js",
  "lesson-styles": "/pl/layout/13749/18/lesson-styles.css",
  "login-scripts": "/pl/layout/13749/19/login-scripts.js",
  "login-styles": "/pl/layout/13749/20/login-styles.css",
  "my-purchases-scripts": "/pl/layout/13749/21/my-purchases-scripts.js",
  "my-purchases-styles": "/pl/layout/13749/22/my-purchases-styles.css",
  "notifications-scripts": "/pl/layout/13749/23/notifications-scripts.js",
  "notifications-styles": "/pl/layout/13749/24/notifications-styles.css",
  "notifications-all-scripts": "/pl/layout/13749/25/notifications-all-scripts.js",
  "notifications-all-styles": "/pl/layout/13749/26/notifications-all-styles.css",
  "password-scripts": "/pl/layout/13749/27/password-scripts.js",
  "password-styles": "/pl/layout/13749/28/password-styles.css",
  "password-iframe-scripts": "/pl/layout/13749/29/password-iframe-scripts.js",
  "password-iframe-styles": "/pl/layout/13749/30/password-iframe-styles.css",
  "payment-scripts": "/pl/layout/13749/31/payment-scripts.js",
  "payment-styles": "/pl/layout/13749/32/payment-styles.css",
  "payment-success-scripts": "/pl/layout/13749/33/payment-success-scripts.js",
  "payment-success-styles": "/pl/layout/13749/34/payment-success-styles.css",
  "profile-scripts": "/pl/layout/13749/35/profile-scripts.js",
  "profile-styles": "/pl/layout/13749/36/profile-styles.css",
  "profile-iframe-scripts": "/pl/layout/13749/37/profile-iframe-scripts.js",
  "profile-iframe-styles": "/pl/layout/13749/38/profile-iframe-styles.css",
  "schedule-scripts": "/pl/layout/13749/39/schedule-scripts.js",
  "schedule-styles": "/pl/layout/13749/40/schedule-styles.css",
  "training-scripts": "/pl/layout/13749/41/training-scripts.js",
  "training-styles": "/pl/layout/13749/42/training-styles.css",
  "webinar-scripts": "/pl/layout/13749/43/webinar-scripts.js",
  "webinar-styles": "/pl/layout/13749/44/webinar-styles.css",
  "webinar-vars": "/pl/layout/13749/45/webinar-vars.css",
  "webinar-teaser-scripts": "/pl/layout/13749/46/webinar-teaser-scripts.js",
  "webinar-teaser-styles": "/pl/layout/13749/47/webinar-teaser-styles.css",
  "my-accounts-styles": "/pl/layout/13749/48/my-accounts-styles.css",
  "my-accounts-scripts": "/pl/layout/13749/49/my-accounts-scripts.js",
  "my-answers-styles": "/pl/layout/13749/50/my-answers-styles.css",
  "my-answers-scripts": "/pl/layout/13749/51/my-answers-scripts.js",
  "open-profile-styles": "/pl/layout/13749/52/open-profile-styles.css",
  "open-profile-scripts": "/pl/layout/13749/53/open-profile-scripts.js",
};

(function(){  
  PageCheckerX();
  if (!$('#gcAccountUserMenu').length && (window.PageChecker.isLoginPage || window.PageChecker.isSuccessPaymentPage || window.PageChecker.isContactUsPage)) {
     JSinjection(remakeProxyX+remakeXFiles["left-menu-filler-script"]);
  }
  if(window.PageChecker.isTrainingsPage || window.PageChecker.isOneTrainingPage) {
     CSSinjection(remakeProxyX+remakeXFiles["styles"]); 
     JSinjection(remakeProxyX+remakeXFiles["script"]); 
     CSSinjection(remakeProxyX+remakeXFiles["training-styles"]); 
     JSinjection(remakeProxyX+remakeXFiles["training-scripts"]); 
     if(window.PageChecker.isTrainingsPage) $(()=>{ $('body').addClass('isTrainingsPage') });
     if(window.PageChecker.isOneTrainingPage) $(()=>{ $('body').addClass('isOneTrainingPage') });
  }
  else if(window.PageChecker.isLessonPage) {
     CSSinjection(remakeProxyX+remakeXFiles["styles"]); 
     JSinjection(remakeProxyX+remakeXFiles["script"]); 
     CSSinjection(remakeProxyX+remakeXFiles["lesson-styles"]); 
     JSinjection(remakeProxyX+remakeXFiles["lesson-scripts"]); 
     $(()=>{ $('body').addClass('isLessonPage') });
  }
  else if(window.PageChecker.isMyPurchasesPage) {
     CSSinjection(remakeProxyX+remakeXFiles["styles"]); 
     JSinjection(remakeProxyX+remakeXFiles["script"]); 
     CSSinjection(remakeProxyX+remakeXFiles["my-purchases-styles"]); 
     JSinjection(remakeProxyX+remakeXFiles["my-purchases-scripts"]); 
     $(()=>{ $('body').addClass('isMyPurchasesPage') });
  }
  else if(window.PageChecker.isNotificationsPage) {
     CSSinjection(remakeProxyX+remakeXFiles["styles"]); 
     JSinjection(remakeProxyX+remakeXFiles["script"]); 
     CSSinjection(remakeProxyX+remakeXFiles["notifications-styles"]); 
     JSinjection(remakeProxyX+remakeXFiles["notifications-scripts"]); 
     $(()=>{ $('body').addClass('isNotificationsPage') });
  }
  else if(window.PageChecker.isNotificationsAllPage) {
     CSSinjection(remakeProxyX+remakeXFiles["styles"]); 
     JSinjection(remakeProxyX+remakeXFiles["script"]); 
     CSSinjection(remakeProxyX+remakeXFiles["notifications-all-styles"]); 
     JSinjection(remakeProxyX+remakeXFiles["notifications-all-scripts"]); 
     $(()=>{ $('body').addClass('isNotificationsAllPage') });
  }
  else if(window.PageChecker.isLoginPage) {
     CSSinjection(remakeProxyX+remakeXFiles["styles"]); 
     JSinjection(remakeProxyX+remakeXFiles["script"]); 
     CSSinjection(remakeProxyX+remakeXFiles["login-styles"]); 
     JSinjection(remakeProxyX+remakeXFiles["login-scripts"]); 
     $(()=>{ $('body').addClass('isLoginPage') });
  }
  else if(window.PageChecker.isSchedulePage) {
     CSSinjection(remakeProxyX+remakeXFiles["styles"]); 
     JSinjection(remakeProxyX+remakeXFiles["script"]); 
     CSSinjection(remakeProxyX+remakeXFiles["schedule-styles"]); 
     JSinjection(remakeProxyX+remakeXFiles["schedule-scripts"]); 
     $(()=>{ $('body').addClass('isSchedulePage') });
  }
  else if(window.PageChecker.isProfilePage) {
     CSSinjection(remakeProxyX+remakeXFiles["styles"]); 
     JSinjection(remakeProxyX+remakeXFiles["script"]); 
     CSSinjection(remakeProxyX+remakeXFiles["profile-styles"]); 
     JSinjection(remakeProxyX+remakeXFiles["profile-scripts"]); 
     injectCustomStyles(customStyleSheetX);
     $(()=>{ $('body').addClass('isProfilePage') });
  }
  else if(window.PageChecker.isPasswordPage) {
     CSSinjection(remakeProxyX+remakeXFiles["styles"]); 
     JSinjection(remakeProxyX+remakeXFiles["script"]); 
     CSSinjection(remakeProxyX+remakeXFiles["password-styles"]); 
     JSinjection(remakeProxyX+remakeXFiles["password-scripts"]); 
     injectCustomStyles(customStyleSheetX);
     $(()=>{ $('body').addClass('isPasswordPage') });
  }
  else if(window.PageChecker.isChatiumPage) {
     CSSinjection(remakeProxyX+remakeXFiles["styles"]); 
     JSinjection(remakeProxyX+remakeXFiles["script"]); 
     CSSinjection(remakeProxyX+remakeXFiles["chatium-sytles"]); 
     JSinjection(remakeProxyX+remakeXFiles["chatium-scripts"]); 
     injectCustomStyles(customStyleSheetX);
     $(()=>{ $('body').addClass('isChatiumPage') });
  }
  else if(window.PageChecker.isPaymentsPage) {
     CSSinjection(remakeProxyX+remakeXFiles["styles"]); 
     JSinjection(remakeProxyX+remakeXFiles["script"]); 
     CSSinjection(remakeProxyX+remakeXFiles["payment-styles"]); 
     JSinjection(remakeProxyX+remakeXFiles["payment-scripts"]); 
     $(()=>{ $('body').addClass('isPaymentsPage') });
  }
  else if(window.PageChecker.isSuccessPaymentPage) {
     CSSinjection(remakeProxyX+remakeXFiles["styles"]); 
     JSinjection(remakeProxyX+remakeXFiles["script"]); 
     CSSinjection(remakeProxyX+remakeXFiles["payment-success-styles"]); 
     JSinjection(remakeProxyX+remakeXFiles["payment-success-scripts"]); 
     $(()=>{ $('body').addClass('isSuccessPaymentPage') });
  }
  else if(window.PageChecker.isContactUsPage) {
     CSSinjection(remakeProxyX+remakeXFiles["styles"]); 
     JSinjection(remakeProxyX+remakeXFiles["script"]); 
     CSSinjection(remakeProxyX+remakeXFiles["contact-us-styles"]); 
     JSinjection(remakeProxyX+remakeXFiles["contact-us-scripts"]); 
     $(()=>{ $('body').addClass('isContactUsPage') });
  }
  else if(window.PageChecker.isConversationPage) {
     CSSinjection(remakeProxyX+remakeXFiles["styles"]); 
     JSinjection(remakeProxyX+remakeXFiles["script"]); 
     CSSinjection(remakeProxyX+remakeXFiles["conversation-styles"]); 
     JSinjection(remakeProxyX+remakeXFiles["conversation-scripts"]);
     $(()=>{ $('body').addClass('isConversationPage') });
  }
  else if(window.PageChecker.isWebinarPage) {
     CSSinjection(remakeProxyX+remakeXFiles["styles"]); 
     JSinjection(remakeProxyX+remakeXFiles["script"]); 
     CSSinjection(remakeProxyX+remakeXFiles["webinar-vars"]); 
     JSinjection(remakeProxyX+remakeXFiles["webinar-scripts"]); 
     $(()=>{ $('body').addClass('isWebinarPage') });
  }
  else if(window.PageChecker.isMyAccountsPage) {
     CSSinjection(remakeProxyX+remakeXFiles["styles"]); 
     JSinjection(remakeProxyX+remakeXFiles["script"]); 
     CSSinjection(remakeProxyX+remakeXFiles["my-accounts-styles"]); 
     JSinjection(remakeProxyX+remakeXFiles["my-accounts-scripts"]); 
     $(()=>{ $('body').addClass('isMyAccountsPage') });
  }
  else if(window.PageChecker.isMyAnswersPage) {
     CSSinjection(remakeProxyX+remakeXFiles["styles"]); 
     JSinjection(remakeProxyX+remakeXFiles["script"]); 
     CSSinjection(remakeProxyX+remakeXFiles["my-answers-styles"]); 
     JSinjection(remakeProxyX+remakeXFiles["my-answers-scripts"]); 
     $(()=>{ $('body').addClass('isMyAnswersPage') });
  }
  else if(window.PageChecker.isOpenProfilePage) {
     CSSinjection(remakeProxyX+remakeXFiles["styles"]); 
     JSinjection(remakeProxyX+remakeXFiles["script"]); 
     CSSinjection(remakeProxyX+remakeXFiles["training-styles"]); 
     JSinjection(remakeProxyX+remakeXFiles["training-scripts"]); 
     CSSinjection(remakeProxyX+remakeXFiles["open-profile-styles"]); 
     JSinjection(remakeProxyX+remakeXFiles["open-profile-scripts"]); 
     $(()=>{ $('body').addClass('isOpenProfilePage') });
  }
  else if(window.PageChecker.isPurchasePage) {
     CSSinjection(remakeProxyX+remakeXFiles["styles"]); 
     JSinjection(remakeProxyX+remakeXFiles["script"]); 
     $(()=>{ $('body').addClass('isPurchasePage') });
  }
  else if(window.PageChecker.isMyBalancePage) {
     CSSinjection(remakeProxyX+remakeXFiles["styles"]); 
     JSinjection(remakeProxyX+remakeXFiles["script"]); 
     $(()=>{ $('body').addClass('isMyBalancePage') });
  }
  else if(window.PageChecker.isQuestionaryPage) {
     CSSinjection(remakeProxyX+remakeXFiles["styles"]); 
     JSinjection(remakeProxyX+remakeXFiles["script"]); 
     $(()=>{ $('body').addClass('isQuestionaryPage') });
  }
  else if(window.PageChecker.toFullSize) {
     $('body').addClass('compact-menu compact-menu-by-default');
     CSSinjection(remakeProxyX+remakeXFiles["left-menu-to-fullsize"]);
  }
 
function PageCheckerX(){
  window.PageChecker = {};
  window.PageChecker.isChatium = (!!$('script[src="https://chatium.com/static/getcourse_webview.js"]').length);
  window.PageChecker.isWorker = $('.gc-main-content:not(.gc-user-user):not(.gc-user-guest)').length > 0;
  window.PageChecker.isUser = $('.gc-main-content.gc-user-user, .gc-main-content.gc-user-guest').length > 0;
  window.PageChecker.isTrainingsPage = 
    checkTruePage({ notMode: 0, strict: 1,
      pages: [
       '/teach/control', 
       '/teach/control/stream',
       '/teach/control/stream/index'
      ],
    });
  window.PageChecker.isOneTrainingPage = 
    checkTruePage({ notMode: 0, strict: 0,
      pages: [
       '/teach/control/stream/view'
      ],
    });
  window.PageChecker.isLessonPage = 
    checkTruePage({ notMode: 0, strict: 0,
      pages: [
       '/teach/control/lesson/view',
       '/pl/teach/control/lesson/webview',
       '/c/s/lesson/'
      ],
    }) && checkTruePage({ notMode: 1, strict: 0,
      pages: [
       '/chatium'
      ],
    });
  window.PageChecker.isMyPurchasesPage = 
    checkTruePage({ notMode: 0, strict: 0,
      pages: [
       '/sales/control/userProduct/my'
      ],
    });
  window.PageChecker.isNotificationsPage = 
    checkTruePage({ notMode: 0, strict: 0,
      pages: [
       '/notifications/settings/my'
      ],
    });
  window.PageChecker.isNotificationsAllPage = 
    checkTruePage({ notMode: 0, strict: 0,
      pages: [
       '/notifications/notifications/all'
      ],
    });
  window.PageChecker.isLoginPage = 
    checkTruePage({ notMode: 0, strict: 0,
      pages: [
       '/cms/system/login'
      ],
    });
  window.PageChecker.isContactUsPage = 
    checkTruePage({ notMode: 0, strict: 0,
      pages: [
       '/cms/system/contact'
      ],
    });
  window.PageChecker.isProfilePage = 
    checkTruePage({ notMode: 0, strict: 1,
      pages: [
       '/profile'
      ],
    });
  window.PageChecker.isPasswordPage = 
    checkTruePage({ notMode: 0, strict: 1,
      pages: [
       '/change-password'
      ],
    });
  window.PageChecker.isChatiumPage = 
    checkTruePage({ notMode: 0, strict: 1,
      pages: [
       '/chatium'
      ],
    }) ||
    checkTruePage({ notMode: 0, strict: 0,
      pages: [
       '/chatium?path='
      ],
    });
  window.PageChecker.isPaymentsPage = 
    checkTruePage({ notMode: 0, strict: 0,
      pages: [
       '/sales/shop/dealPay'
      ],
    });
  window.PageChecker.isSuccessPaymentPage = 
    checkTruePage({ notMode: 0, strict: 0,
      pages: [
       '/sales/shop/dealPaid'
      ],
    });
  window.PageChecker.isWebinarPage = 
    checkTruePage({ notMode: 0, strict: 0,
      pages: [
       '/pl/webinar/show', 
      ],
    });
  window.PageChecker.isSchedulePage = 
    checkTruePage({ notMode: 0, strict: 0,
      pages: [
       '/teach/control/schedule', 
      ],
    });
  window.PageChecker.isConversationPage =
    checkTruePage({ notMode: 0, strict: 0,
      pages: [
       '/pl/talks/conversation', 
      ],
    });
  window.PageChecker.isMyAccountsPage =
    checkTruePage({ notMode: 0, strict: 0,
      pages: [
       '/pl/help/launcher', 
      ],
    });
  window.PageChecker.isMyAnswersPage =
    checkTruePage({ notMode: 0, strict: 0,
      pages: [
       '/teach/control/answers/my', 
      ],
    });
  window.PageChecker.isPurchasePage =
    checkTruePage({ notMode: 0, strict: 0,
      pages: [
       '/sales/control/userProduct/update/id/', 
      ],
    });
  window.PageChecker.isMyBalancePage =
    checkTruePage({ notMode: 0, strict: 0,
      pages: [
       '/pl/sales/user-balance-row/my', 
      ],
    });
  window.PageChecker.isQuestionaryPage =
    checkTruePage({ notMode: 0, strict: 0,
      pages: [
       '/user/control/user/questionary', 
      ],
    });
  window.PageChecker.isOpenProfilePage = 
    /\/pl\/(\d+|my|user\/profile\/my)$/.test(location.pathname);

  window.PageChecker.toFullSize = 
    checkTruePage({ notMode: 0, strict: 0,
      pages: [
       '/saas/',
       '/fileservice/control/account',
       '/pl/cms/',
       '/pl/user/',
       '/user/control',
       '/pl/lite/widget',
       '/webinar/control',
       '/pl/webinar/broadcast',
       '/pl/webinar/block',
       '/pl/webinar/video',
       '/pl/webinar/presentation',
       '/pl/metrika',
       '/pl/stat',
       '/teach/questionary',
       '/teach/control/diploma',
       '/teach/goal',
       '/teach/control/stat',
       '/teach/control/answers',
       '/pl/teach/check-answers',
       '/user/control/user', 
       '/pl/sales',
       '/sales/control/',
       '/pl/logic/funnel',
       '/notifications/control',
       '/pl/notifications/',
       '/pl/talks/',
       '/pl/tasks/',
       '/pl/vk/control',
       '/pl/whatsapp/control',
       '/pl/viber/control',
      ],
    });
}
function checkTruePage(opt) {
 let i=false; 
 let u = window.location.href;
 let d = location.protocol+'//'+location.hostname;
 opt.pages.forEach(p => {
   if (opt.strict) {if(u==p||u==d+p)i=true;}
   else if(u.indexOf(p)>-1)i=true;
 });
 return opt.notMode ? !i : i ;
}
function injectCustomStyles(customCSS){ 
  $(()=>{
    let waitframe = setInterval(()=>{
      if(!$('#orig-page').length) return;
      let iframe = $('#orig-page')[0];
      $(iframe).on('load', ()=>{ afterLoading(iframe); }); 
      clearInterval(waitframe);
    },10);
  });
  function afterLoading(iframe){
    $(iframe).contents().find("body").append(`
        <${''}link type="text/css" rel="stylesheet" href="${customCSS}"><${''}/link>
    `);
  }
}


})();