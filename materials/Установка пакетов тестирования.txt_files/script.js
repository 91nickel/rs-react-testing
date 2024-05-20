(function(){  

$(function(){
  
  // Fix для ссылки на страницу Профиля
  $('a[href*="/user/my/profile"]').attr("href","/profile");
  setTimeout(()=>{
    $(".edit-profile-popup-btn").off().click(function(e) {
      e.stopPropagation();
      window.open('/profile', '_parent');
    });
  });

  // Fix для Настроек вида
  $('a[href*="'+window.location.pathname+'"][href$="/editMode/1"]').each((i,el)=>{
    $(el).attr('href', $(el).attr('href').replace('/editMode/1','?editMode=1'));
  });

  // Fix для главного контейнера в Настройках вида
  if(typeof window.PageChecker != "undefined" && (
      window.PageChecker.isTrainingsPage || 
      window.PageChecker.isOneTrainingPage ||
      window.PageChecker.isOpenProfilePage || 
      window.PageChecker.isPaymentsPage ||
      window.PageChecker.isSuccessPaymentPage ||
      window.PageChecker.isLoginPage ||
      window.PageChecker.isContactUsPage ||
      window.location.href.indexOf('/teach/control') > -1 ||
      window.location.href.indexOf('/teach/control/stream') > -1 ||
      window.location.href.indexOf('/teach/control/stream/index') > -1 
  )) {
    let url = window.location.href;
    if(url.indexOf('/editMode/1') > -1 || url.indexOf('?editMode=1') > -1) {
      $('body').addClass('compact-menu').append(`
        <style>
          @media (min-width: 769px) {
            body #gcAccountUserMenu~.gc-main-content.with-left-menu {
              margin-left: 90px!important;
              width: calc(100% - 390px)!important;
            }
            #gcAccountUserMenu ~ .gc-main-content.with-left-menu > .container, 
            #gcAccountUserMenu ~ .gc-main-content.with-left-menu > .page-full-block > .main-page-block > .container {
              width: 100%!important;
            }
          }
        </style>
      `);
    }
  }

  // Fix видео во всплывающем окне
  $(document).on('click', '.gc-modal', (e)=> {
   if(!$(e.target).is('.modal-dialog') && !$(e.target).parents('.modal-dialog').length) {
    let curr_modal = $(e.target).closest('.gc-modal');
    if(curr_modal.length) {
      let videobox = $(curr_modal).find('.vhi-root').eq(0);
      let iframe = $(videobox).find('iframe'); 
      iframe.remove();
      videobox.append(iframe);
    }
   }
  });

  // Fix предложений в форме
  $('.form-position').each((i,el)=>{
   $(el).find('input:not([type=text])').off('change').change((e)=>{ 
    if ($(e.target).prop('checked') ) {
      $(e.target).parents('form').find('.selected:not(:has(:checked))').removeClass("selected"); 
      $(e.target).parents('.form-position').addClass('selected');
    } else $(e.target).parents('.form-position').removeClass('selected');
   });
  })

  // Fix Stripo
  if(window.location.href.indexOf('/notifications/control/mailings/update/id/') > -1) {
    let bodyObserver = new MutationObserver(function(mutations) {
      if($('#stripoPluginIFrame').length > 0) {
        let stripoPluginIFrameChecker = setInterval(()=>{
          let stripoTable = $('#stripoPluginIFrame').contents().find('.stripoTable'); 
          if(stripoTable.length > 0) {
            clearInterval(stripoPluginIFrameChecker);
            stripoTable.css({'left':'auto','right':0,'width':'100%'});
          }
        });
      }
    }).observe($('body')[0], { attributes: false, childList: true, characterData: false, subtree: false });
    $('body').append(`
      <style>
        #stripoPluginIFrame {
          right: 0!important;
          left: auto!important;
          width: calc(100% - 300px)!important;
          transition: width .3s;
        }
        body.compact-menu #stripoPluginIFrame {
          width: calc(100% - 90px)!important;
        }
      </style>
    `);
  }

  // Fix для Ленты ответов
  if(window.location.href.indexOf('/teach/control/answers') > -1) {
    $(`#gcAccountUserMenu~.gc-main-content.with-left-menu>.container, 
       #gcAccountUserMenu~.gc-main-content.with-left-menu>.page-full-block>.main-page-block>.container`)
      .css('max-width', 'calc(100vw - 10px)');
  }

  // Fix для поиска по коду письма в рассылках
  $('.note-editor').off('focusout');

  // Подсветка JS-кода в Темах
  if(window.location.href.indexOf('/pl/cms/layout/update') > -1) {
    $('#content-javascript').attr('data-mode','javascript');
  }

  // Переход сразу в редактор по Ctrl+Click
  if($('.gc-main-content.gc-user-admin').length){
    $(`.trainings-tree .dd-item a, 
       .xdget-trainingList .stream-table tr a, 
       .xdget-lessonList .lesson-list li .item-a`).on('click', (e)=>{
          if(e.ctrlKey){
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            window.open($(e.currentTarget).attr('href')+"?editMode=1");
          }
    });
  }

  // Добавляет возможность перетаскивать блоки настроек в редакторе страниц
  if(window.location.pathname.indexOf("/pl/cms/page/editor") > -1) {
    $( document ).ajaxSuccess(function( event, xhr, settings ) {
      if ( settings.url.indexOf("/pl/lite/block/get-setting") > -1 ) {
        setTimeout(()=>{
          $('.setting-editor-popover')
            .draggable({ handle: '.popover-title', cancel: '.btn, input' })
            .find('.popover-title').css({'cursor':'move'});
        });
      }
    });
  }

  //Fix высоты чата. ГКшная функция
  setTimeout(()=>{
    $('.activated-talks-widget').data('gc-talksWidget').adoptSize = function() {
		var headerHeight = this.headerEl.height() + 12;
		var height = this.bodyBlock.parent().height() - headerHeight - $('.main-nav-list').height();
		this.bodyBlock.height( height - 30 );
		if ( this.isFullMode() ) {
			//this.talksWindow.css( "left", "70px" );
			this.toggleMainMenuAdopt();
			this.talksWindow.css( "width", ($(document.body).width() - this.talksWindow.position().left ) + "px" );
		}
		this.conversationsList.height( (this.conversationsListBlock.height() - this.conversationListFooter.height()  - 20) + "px" );
		//this.conversationsBlock.height( 100 )
    }
  });
  
});

})();