$(function() {
if ($('.isLessonPage').length<1) {
$('.lt-form button[type="submit"]').on('click', function (e) {
        var inputs = $('.lt-form input[type="text"]');
        inputs.removeClass("blink");
        var isemptyinput = false;
        inputs.each(function(i, input_el) {
            if(!$(input_el).val()) {
               $(input_el).addClass("blink");
               isemptyinput = true;
            }
        });
        if(isemptyinput) {
           e.preventDefault();
           e.stopImmediatePropagation();
           if(!e.isDefaultPrevented()){
               e.returnValue = false;
           }
           setTimeout(function(){
               inputs.removeClass("blink");
           },1500)
           return false;
        }
        else return true;
    });
  let mailRules = {
    "gmail.con" : "gmail.com",
    "gmal.com"  : "gmail.com",
    "gmil.com"  : "gmail.com",
    "gmail.ru"  : "gmail.com",
    "gemail.com": "gmail.com",
    "gmaii.com" : "gmail.com",
    "gmall.con" : "gmail.com",
    "gmai.com" : "gmail.com",
    "gmal.com"  : "gmail.com",
    "gmil.com"  : "gmail.com",
    "gmail.ru"  : "gmail.com",
    "gemail.com": "gmail.com",
    "gmaii.com" : "gmail.com",
    "gmall.con" : "gmail.com",
    "msil.con"  : "mail.ru",
    "mai.ru"   : "mail.ru",
    "mal.con"   : "mail.ru",
    "maik.ru"   : "mail.ru",
    "lisr.ru"   : "list.ru",
    "yadex.ru"  : "yandex.ru",
    "yande.ru"  : "yandex.ru",
    "yanex.ru"  : "yandex.ru",
    "ayndex.ru" : "yandex.ru",
    "yandex.eu" : "yandex.ru",
    "tambler.ru": "rambler.ru",
    "indox.ru"  : "inbox.ru",
   "msil.con"  : "mail.ru",
    "mai.ru"   : "mail.ru",
    "mal.con"   : "mail.ru",
    "mail.ri"   : "mail.ru",
    "maik.ru"   : "mail.ru",
    "lisr.ru"   : "list.ru",
    "yadex.ru"  : "yandex.ru",
    "yande.ru"  : "yandex.ru",
    "yanex.ru"  : "yandex.ru",
    "ayndex.ru" : "yandex.ru",
    "yandex.eu" : "yandex.ru",
    "yandex.ri" : "yandex.ru",
    "jandex.ru" : "yandex.ru",
    "ya.ru" : "yandex.ru",
    "tambler.ru": "rambler.ru",
    "indox.ru"  : "inbox.ru",
  };

  $('form.lt-form').each((i,f)=>{
    $(f).find('button[type="submit"]').on('click', (e)=>{
      var $input = $(f).find('input[name="formParams[email]"]');
      $.each(mailRules, (e_domain,t_domain)=>{
        if($input.val().indexOf("@"+e_domain) > -1) {
          $input.val($input.val().replace("@"+e_domain, "@"+t_domain));
        }
      });
      return true;
    });
  });
}
})