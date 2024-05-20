 if($('script[src="https://chatium.com/static/getcourse_webview.js"]').length || 
   (window.location.pathname.indexOf('/pl/teach/control/lesson/webview') > -1)) {
   	
	async function UpdateField() {
  const response = await fetch('/addField');
  const html = await response.text();
   var parser = new DOMParser();
 var doc = parser.parseFromString(html, 'text/html');
 var theme = doc.querySelector('input[name="formParams[userCustomFields][1234657]"]').value
 if (theme.length == 0) {theme = 'light'}
  return theme;
}

UpdateField().then(theme => {
if (theme == 'dark') {document.cookie = 'theme=darkTheme; max-age=31536000; path=/';$('body').addClass('dark-theme');$('body').append('<link id="darktheme" href="/pl/cms/layout/css?id=17573&hash=f0ceb039d3ae4045c83b54a0762dfa84&bundle=1" rel="stylesheet">')}
$('body').append(`<div class="theme-toggle" onclick="colorThemeField(this)"><input type="checkbox" id="toggle" /><label for="toggle"></label></div><style>
.theme-toggle {
	position: fixed;
    top: 27px;
    left: 50%;
    transform: translateX(-50%);
    z-index:1000;
display:none;
}
.theme-toggle input[type=checkbox] {
	display: none;
}

.theme-toggle label {
	background-color: #777;
	border: 1px solid #555;
	border-radius: 50px;
	cursor: pointer;
	display: inline-block;
	position: relative;
	transition: all ease-in-out 0.3s;
	width: 38px;
	height: 20px;
}

.theme-toggle label::after {
    box-shadow: inset 0px 0px 10px rgb(0 0 0 / 40%);
	background-image: url(https://fs.getcourse.ru/fileservice/file/download/a/177331/sc/190/h/07ff28ce93df342b011ce82eae080881.svg);
	background-position: center;
	background-size: contain;
	border-radius: 50%;
	content: ' ';
	cursor: pointer;
	display: inline-block;
	position: absolute;
	left: 2px;
	top: 2px;
	transition: all ease-in-out 0.3s;
	width: 15px;
	height: 15px;
}

.theme-toggle input[type=checkbox]:checked ~ label {
	background-color: var(--color-0);

}

.theme-toggle input[type=checkbox]:checked ~ label::after {
    box-shadow: inset 0px 0px 10px rgb(0 0 0 / 40%);
		background-image: url(https://fs.getcourse.ru/fileservice/file/download/a/177331/sc/45/h/1845d0d338714aae74377d04b2e582d2.svg);
		background-position: center;
	background-size: contain;
transform: translateX(100%);
}@media (max-width:1000px) {.theme-toggle {
    position: fixed;
    top: auto;
    left: 5px;
    bottom: 20px;
    right: auto;
    transform: none;
    z-index: 1000;
}}</style>`)

	if (theme.indexOf('dark')>-1) {document.querySelector('#toggle').checked = true}
else {document.querySelector('#toggle').checked = false}


	})

function colorThemeField(el) {
el.addEventListener('input', (e) => {
	const isChecked = e.target.checked;

	if(isChecked) {
        $.ajax({
  type: "POST",
  url: "/pl/lite/block-public/process?id=1454875944",
  dataType: "json",
  data: { 
    "formParams[userCustomFields][1234657]": "dark",
    "fromUrl": window.location.href,
    "requestTime": window.requestTime,
    "requestSimpleSign": window.requestSimpleSign
  },
  complete: function(e, xhr, settings){

  }
});
        
		$('body').addClass('dark-theme');
		$('body').append('<link id="darktheme" href="/pl/cms/layout/css?id=17573&hash=f0ceb039d3ae4045c83b54a0762dfa84&bundle=1" rel="stylesheet">')

	} else {
        $.ajax({
  type: "POST",
  url: "/pl/lite/block-public/process?id=1454875944",
  dataType: "json",
  data: { 
    "formParams[userCustomFields][1234657]": "light",
    "fromUrl": window.location.href,
    "requestTime": window.requestTime,
    "requestSimpleSign": window.requestSimpleSign
  },
  complete: function(e, xhr, settings){

  }
});
        
		$('body').removeClass('dark-theme');
		$('#darktheme').remove()

	}
});
}

   	
   }
   else {
if (document.cookie.indexOf('theme') == -1) {
    document.cookie = 'theme=lightTheme; max-age=31536000; path=/';
    //если кукисы пустые
	async function UpdateField() {
  const response = await fetch('/addField');
  const html = await response.text();
   var parser = new DOMParser();
 var doc = parser.parseFromString(html, 'text/html');
 var theme = doc.querySelector('input[name="formParams[userCustomFields][1234657]"]').value
 if (theme.length == 0) {theme = 'light'}
  return theme;
}

UpdateField().then(theme => {
if (theme == 'dark') {document.cookie = 'theme=darkTheme; max-age=31536000; path=/';$('body').addClass('dark-theme');$('body').append('<link id="darktheme" href="/pl/cms/layout/css?id=17573&hash=f0ceb039d3ae4045c83b54a0762dfa84&bundle=1" rel="stylesheet">')}

	})
//если кукисы пустые
}
if (document.cookie.indexOf('darkTheme')>-1) {$('body').addClass('dark-theme');$('body').append('<link id="darktheme" href="/pl/cms/layout/css?id=17573&hash=f0ceb039d3ae4045c83b54a0762dfa84&bundle=1" rel="stylesheet">')}
$('body').append(`<div class="theme-toggle" onclick="colorThemeCookies(this)"><input type="checkbox" id="toggle" /><label for="toggle"></label></div><style>
.theme-toggle {
	position: fixed;
    top: 27px;
    left: 50%;
    transform: translateX(-50%);
    z-index:1000;
display:none;
}
.theme-toggle input[type=checkbox] {
	display: none;
}

.theme-toggle label {
	background-color: #777;
	border: 1px solid #555;
	border-radius: 50px;
	cursor: pointer;
	display: inline-block;
	position: relative;
	transition: all ease-in-out 0.3s;
	width: 38px;
	height: 20px;
}

.theme-toggle label::after {
    box-shadow: inset 0px 0px 10px rgb(0 0 0 / 40%);
	background-image: url(https://fs.getcourse.ru/fileservice/file/download/a/177331/sc/190/h/07ff28ce93df342b011ce82eae080881.svg);
	background-position: center;
	background-size: contain;
	border-radius: 50%;
	content: ' ';
	cursor: pointer;
	display: inline-block;
	position: absolute;
	left: 2px;
	top: 2px;
	transition: all ease-in-out 0.3s;
	width: 15px;
	height: 15px;
}

.theme-toggle input[type=checkbox]:checked ~ label {
	background-color: var(--color-0);

}

.theme-toggle input[type=checkbox]:checked ~ label::after {
    box-shadow: inset 0px 0px 10px rgb(0 0 0 / 40%);
		background-image: url(https://fs.getcourse.ru/fileservice/file/download/a/177331/sc/45/h/1845d0d338714aae74377d04b2e582d2.svg);
		background-position: center;
	background-size: contain;
transform: translateX(100%);
}</style>`)
if (document.cookie.indexOf('darkTheme')>-1) {document.querySelector('#toggle').checked = true}
else {document.querySelector('#toggle').checked = false}
	
function colorThemeCookies(el) {
el.addEventListener('input', (e) => {
	const isChecked = e.target.checked;

	if(isChecked) {
		$('body').addClass('dark-theme');
		$('body').append('<link id="darktheme" href="/pl/cms/layout/css?id=17573&hash=f0ceb039d3ae4045c83b54a0762dfa84&bundle=1" rel="stylesheet">')
		document.cookie = 'theme=darkTheme; max-age=31536000; path=/';
           var $iframe = $('iframe');
    $iframe.ready(function() {
        $iframe.contents().find("body").append('<link id="darktheme" href="/pl/cms/layout/css?id=17573&hash=f0ceb039d3ae4045c83b54a0762dfa84&bundle=1" rel="stylesheet">');
$iframe.contents().find("body").addClass('dark-theme'); 
$iframe.contents().find("#color-theme").html('<option value="Темная">Темная</option><option value="Светлая">Светлая</option>');
    });

	} else {
		$('body').removeClass('dark-theme');
		$('#darktheme').remove()
		document.cookie = 'theme=lightTheme; max-age=31536000; path=/';
           var $iframe = $('iframe');
    $iframe.ready(function() {
        $iframe.contents().find("#darktheme").remove()
        $iframe.contents().find("body").removeClass('dark-theme'); 
        $iframe.contents().find("#color-theme").html('<option value="Светлая">Светлая</option><option value="Темная">Темная</option>');
    });
	}
});
}
   	
   	
   }

if (window.location.pathname.indexOf('unanswered') >-1) {
	$('body').append(`<style>/*Answers*/ 
.dark-theme h3, .dark-theme.filter-block:before  {
  color: var(--color-0);
}
.dark-theme .answer-content div {
  color: var(--color-0);
}
.dark-theme .answers-list {
  color: var(--color-1);
}
.dark-theme .user-answer .answer-text,.dark-theme .user-answer .comment .text-content {
  color: var(--color-1);
}
.dark-theme .text-muted,.dark-theme .show-lesson-link {
  color: var(--color-17);
}
.dark-theme .answer-content div:nth-last-child(1), .dark-theme .badge {
  color: var(--color-1);
}
.dark-theme .container a {
  color:var(--color-17)!important;
}
.dark-theme .selected a {
  color:var(--color-1)!important;
}
.dark-theme .key-value-table td {
    border-bottom: 1px solid var(--black-border);
}
.dark-theme textarea::placeholder {
  color: var(--color-0);
}
.dark-theme textarea {
  color: var(--color-1);
  border: 1px solid var(--black-border)!important;
  outline-color: var(--color-0);
}
.dark-theme ul.yiiPager .selected a {
    background: var(--color-17);
    color: #FFFFFF;
 color:var(--color-1)!important;
}
.dark-theme .badge {
  background: var(--color-3);
  color: var(--color-1)!important;
}

.dark-theme .lt-lesson-feedback-block textarea, .dark-theme .lesson-mission-wrapper .answer-form textarea, .dark-theme .lesson-mission-wrapper .answer-form input[type="text"], .simple-answer .new-comment-textarea,.dark-theme .emoji-wysiwyg-editor, .dark-theme .comment-form-wrapper .new-comment-textarea, .dark-theme .new-comment-textarea.edited-comment-text,.dark-theme .filter-block .filter-list > li > a  {
    background: var(--black-main-color);
}

.dark-theme a.dotted-link {
border-color: var(--color-17);
}
.dark-theme .btn.dropdown-toggle {
      background: none;
    border: 2px solid var(--black-border);
  color: var(--color-1)!important;
}
.dark-theme .btn-primary {
  background-color: var(--color-17);
  border:none;
}
.dark-theme input.text-center::placeholder {
  color:var(--black-main-color);
}
.dark-theme  label[style="display: inner-block; margin-right: 10px;"] {
  color: var(--color-1)
;}
.dark-theme .b-like-and-subscribe-notifications {display:none;}
.dark-theme .lesson-answer-comment {
    background: var(--black-main-color);

}
.dark-theme div[style="font-size:14px"], .dark-theme div[style="overflow: hidden"] {
  color: var(--color-1);
}
</style>`)
	
}
