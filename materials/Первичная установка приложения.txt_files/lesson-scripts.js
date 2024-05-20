(()=>{

if (window.PageChecker.isChatium) loadLessonScripts();
else $(()=>{ loadLessonScripts(); });
function loadLessonScripts(){setTimeout(()=>{
   
   // Формируем шапку урока 
   let $breadcrumb = $('.gc-main-content > .container > .standard-page-content > .breadcrumb');
   let $breadcrumbs = $('.gc-main-content > .page-full-block > .main-page-block > .container > .breadcrumbs');
   $breadcrumbs.find('a').wrap('<li />').parent().after(document.createTextNode(" "));
   $breadcrumbs.contents().filter(function() {
     return this.nodeType == 3; //Node.TEXT_NODE
   }).remove();
   $breadcrumbs.find('li').after(document.createTextNode(" "));
   $breadcrumbs.replaceWith('<ul class="breadcrumb">' + $breadcrumbs.html() +'</ul>');
   $breadcrumbs = $('.gc-main-content > .page-full-block > .main-page-block > .container > .breadcrumb'); 
   $breadcrumb.add($breadcrumbs).wrapAll('<div class="header-box" />');

   // Убираем <br> из хлебных крошек
   $('.header-box .breadcrumb a').each((i,el)=>{
     $(el).html($(el).html().replace('<br>', ' ')) 
   });

   $('.xdget-lessonTitle').addClass('header-view');
   $('.xdget-lessonTitle h2').addClass('lesson-title-value');
   if(typeof $('.xdget-lessonTitle h2')[0] !== "undefined" && $('.xdget-lessonTitle h2')[0].nextSibling.nodeType == 3) {
     $($('.xdget-lessonTitle h2')[0].nextSibling).wrapAll('<span class="lesson-description-value" />');
   }
   $('.xdget-lessonNavigation').addClass('lesson-navigation');
   $('.xdget-lessonTitle, .xdget-lessonNavigation').wrapAll('<div class="lesson-header-block" />');
   $('.header-box').append($('.lesson-header-block'));
   $('.header-box .lesson-header-block h2').parent().append($('.page-header .page-actions')); 
   $('.header-box .breadcrumb').append('<li>'+$('.page-header > h1').html()+'</li>'); 

   // Выпадающее меню перемещаем в другую сторону
   $('.header-box .dropdown-menu.pull-right').removeClass('pull-right').addClass('pull-left');
   
   $('.header-box').insertBefore($('.gc-main-content > .container, .main-page-block > .container').eq(0));

   // Добавляем имя пользователя в блок задания и комментариев
   $('.lesson-mission-wrapper .answer-form .user-profile-image, .lt-lesson-comment-block .new-comment .user-image').after(
     '<div class="username">'+window.accountSafeUserName+'</div>'
   );

   // Ресайзим бейджики
   $('.user-answer .title img[src*="/14x/"]').each((i,el)=> {
    $(el).attr('src',$(el).attr('src').replace("/14x/","/16x16/"));
   });

   // Перемещаем дату коммента в другое место
   $('.comment .comment-time > .value').each((i,el)=> {
     let comment_title = $(el).parents('.comment').find('.title');
     let comment_title_pl = $(comment_title).find('.pseudo-link').eq(0);
     if($(comment_title_pl).length) $(comment_title_pl).before($(el));
     else $(comment_title).append($(el));
   });

   // Добавляем заголовок к блоку комментариев, когда комментариев нет
   if($('.lt-lesson-comment-block .new-comment').length) {
     $('.lt-lesson-comment-block > .lt-block-wrapper > .container > .row > div:not(:has(.lesson-answers-title))')
       .before('<div class="lesson-answers-title"><h3 style="margin-bottom: 20px;">Комментарии</h3></div>');
   } else if(!$('.lt-lesson-comment-block .other-answers.answers-list > *').length) {
     $('.lt-lesson-comment-block').remove();
   }

   // Добавляем доп блок для стилизации чекбоксов и радиокнопок
   setTimeout(()=>{
    $('.custom-field.type-select input[type="radio"]').after('<'+'span class="tick-icon" />');
    $('.custom-field.type-multi_select input[type="checkbox"]').after('<'+'span class="tick-icon" />');
   });

   $('.addfield-type-checkbox').each((i,el)=>{
     let input = $(el).find('input[type="checkbox"]');
     let label = $(input).next('label');
     if(input.length && label.length) {
       input.attr('id', label.attr('for'));
     }
   })

   // Отмечаем выбранный ответ в тестировании, если стоит опция "не показывать правильный ответ".
   $(document).ajaxSend((e,xhr,settings) => {
    if (settings.url == "/pl/teach/questionary-public/do-question-answer") {
      let s = (new URLSearchParams(settings.data)).get("answerValue");
      s !== null ? s : false;
      if(s) $('.testing-widget .btn-send-variant').filter((i,el)=>{
        return $(el).html().indexOf(s) > -1;
      }).addClass('btn-answered');
    }
   });

   // Изменяем отображание номеров вопросов тестирования
   $(()=>{replaceQuestionNumberView()});
   $(document).ajaxSuccess((e,xhr,settings) => {
     if (settings.url.indexOf("/pl/teach/questionary-public/testing?id=") > -1) {
       replaceQuestionNumberView()
     }
   });
   function replaceQuestionNumberView(){
     setTimeout(()=>{
       $('.question-number').html((i,h)=>{
         let parts = h.split(" из ");
         let n1 = parts[0].replace(/\D+/g,'');
         let n2 = parts[1].replace(/\D+/g,'');
         return `${n1}<span>/${n2}</span>`;
       });
       // Jquery плагин для определения размера фоновой картинки
       let t_imgs = $('.testing-widget .question-answer-block .button-list .image-wrapper .image');
       if(t_imgs) {
         !function(t){var i=/px/,e=/%/,s=/url\(['"]*(.*?)['"]*\)/g;t.fn.getBackgroundSize=function(t){var h,n,r=new Image,a=this.css("background-size").split(" ");return i.test(a[0])&&(h=parseInt(a[0])),e.test(a[0])&&(h=this.parent().width()*(parseInt(a[0])/100)),i.test(a[1])&&(n=parseInt(a[1])),e.test(a[1])&&(n=this.parent().height()*(parseInt(a[0])/100)),void 0!==h&&void 0!==n?(t({width:h,height:n}),this):(r.onload=function(){void 0===h&&(h=this.width),void 0===n&&(n=this.height),t({width:h,height:n})},r.src=this.css("background-image").replace(s,"$1"),this)}}(jQuery);
         $(t_imgs).each((i,el)=>{
           $(el).attr('style', $(el).attr('style').replace('330x','500x'));
           $(el).getBackgroundSize((size)=>{
             $(el).css('padding-bottom', (size.height*100/size.width)+"%");
           })
         });
       }
     })
   }

   // Убираем лишний символ из даты ответа
   $('.lesson-mission-wrapper .answer-date .text-muted').each((i,el)=>{
     $(el).html($(el).html().replace(' • ',''));
   });

   // Cмена темы плеера
   $('link[href*="/public/jplayer-2.9.2/skin/pink.flag"]')
    .after('<link href="/fileservice/file/download/a/447724/sc/330/h/c803ce4c0a93dc3d9f545bc0cad9812d.css" rel="stylesheet" type="text/css">')
    .remove();

});};

})();