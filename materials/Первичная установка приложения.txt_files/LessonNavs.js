	

$(function() {
	$('body').append(`<div onclick="scrollToTop(3000);"><svg class="upper" width="134" height="134" viewBox="0 0 134 134" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="67" cy="67" r="65" fill="black" stroke="white" stroke-width="4" stroke-linejoin="round"/><path d="M68.7678 48.2322C67.7915 47.2559 66.2085 47.2559 65.2322 48.2322L49.3223 64.1421C48.346 65.1184 48.346 66.7014 49.3223 67.6777C50.2986 68.654 51.8816 68.654 52.8579 67.6777L67 53.5355L81.1421 67.6777C82.1184 68.654 83.7014 68.654 84.6777 67.6777C85.654 66.7014 85.654 65.1184 84.6777 64.1421L68.7678 48.2322ZM69.5 84V50H64.5V84H69.5Z" fill="white"/></svg></div><style>
   .upper {
      cursor: pointer;
      width:60px;
      height:60px;
        position: fixed;
        bottom: 130px;
        right: 25px;
        z-index: 1000;
    }
  .upper circle {
stroke-dashoffset: 520;
    stroke-dasharray: 500;
fill: #C2C2C2;
    stroke: var(--color-3);
transition: .3s;
}
.upper:hover circle {
fill: #AFAFAF;
}
.dark-theme .upper circle {
 fill: var(--black-main-color);
   stroke: var(--color-0);
}
.dark-theme .upper:hover circle {
fill: var(--body-black);
}
.lesson-navigation {
overflow:visible!important;
}
.dropdown-el {
  width: 350px;
  position: absolute;
  display: block;
  margin-left:auto;
    right: 0;
    left: 0;
  margin-right: auto;
  min-height: 36px;
  max-height: 36px;
  overflow: hidden;
z-index:10;
  cursor: pointer;
  text-align: left;
  white-space: nowrap;
  color: #444;
  outline: none;
  border: 0.7px solid rgba(51, 51, 51, 0.3);
      border-radius: 20px;
  background-color: transparent;
  transition: 0.3s all ease-in-out;
padding-right:0px;
}
.dark-theme .dropdown-el {
border: 1px solid var(--black-border);
color: var(--color-1);
transition: .1s;
}

.dropdown-el:hover {
border: 0.7px solid var(--color-3);
}
.dark-theme .dropdown-el:hover {
border: 1px solid var(--color-0);
}

@media (min-width: 768px) and (max-width:1000px) {
.dropdown-el {
 width: 300px;
}
}
.header-box .lesson-navigation td.text-center.hidden-xs {
display: flex!important;
    position: relative;
    height: 36px;
    justify-content: center;
    width: 100%;
}
.dropdown-el>a {
padding: 8px 0!important;
padding-left:18px!important;
border:none!important;
border-radius:0!important;
display: block!important;
max-width: 100%!important;
}
.dropdown-el>a span {
max-width: 90%!important;
    white-space: nowrap;
    overflow: hidden;
margin-right: auto;
    text-overflow: ellipsis;
    display: block;
}
.dropdown-el::after {
content: "";
background: url("data:image/svg+xml,%3Csvg width='24' height='14' viewBox='0 0 24 14' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10.9393 13.0607C11.5251 13.6464 12.4749 13.6464 13.0607 13.0607L22.6066 3.51472C23.1924 2.92893 23.1924 1.97918 22.6066 1.3934C22.0208 0.807612 21.0711 0.807612 20.4853 1.3934L12 9.87868L3.51472 1.3934C2.92893 0.807612 1.97918 0.807612 1.3934 1.3934C0.807612 1.97918 0.807612 2.92893 1.3934 3.51472L10.9393 13.0607ZM10.5 11V12H13.5V11H10.5Z' fill='black'/%3E%3C/svg%3E%0A");
background-size: 100% 100%;
width: 11px;
height: 6px;
position: absolute;
  right: 0.8em;
  top: 15px;
  transition: 0.4s all ease-in-out;
filter: invert(1) brightness(0.5);
}
.dropdown-el.expanded {
  border: 1px solid var(--color-0);
  background: #fff;
  border-radius: 6px;
  padding: 0;
  max-height: 10em;
overflow-y: auto;
padding-right:0px;
}

.dropdown-el::-webkit-scrollbar { width: 4px; border-radius: 16px;}
.dropdown-el::-webkit-scrollbar-button {  background-color: transparent; height: 20px;}
.dropdown-el::-webkit-scrollbar-track {  background: var(--color-0);}
.dropdown-el::-webkit-scrollbar-track-piece { background-color: var(--body-back);}
.dropdown-el::-webkit-scrollbar-thumb { background-color: var(--color-0); border-radius: 16px;}
.dropdown-el::-webkit-scrollbar-corner { background-color: var(--color-0); border-radius: 16px;}
.dropdown-el::-webkit-resizer { background-color: var(--color-0);}
body.isLessonPage .header-box .lesson-navigation td .dropdown-el.expanded a {
color: black!important;
}
body:not(.dark-theme) .dropdown-el::-webkit-scrollbar { width: 4px; border-radius: 16px;}
body:not(.dark-theme) .dropdown-el::-webkit-scrollbar-button {  background-color: transparent; height: 20px;}
body:not(.dark-theme) .dropdown-el::-webkit-scrollbar-track {  background: #f7f7f7;}
body:not(.dark-theme) .dropdown-el::-webkit-scrollbar-track-piece { background-color: var(--body-back);}
body:not(.dark-theme) .dropdown-el::-webkit-scrollbar-thumb { background-color: #C2C2C2; border-radius: 16px;}
body:not(.dark-theme) .dropdown-el::-webkit-scrollbar-corner { background-color: var(--color-0); border-radius: 16px;}
body:not(.dark-theme) .dropdown-el::-webkit-resizer { background-color: var(--color-0);}

body:not(.dark-theme) .dropdown-el.expanded {
border: 1px solid var(--color-3);
}
body.dark-theme .dropdown-el.expanded {
background: var(--body-back);
}
body.dark-theme.isLessonPage .header-box .lesson-navigation td .dropdown-el.expanded a {
color: var(--color-1)!important;
}
.dropdown-el.expanded::after {
  transform: rotate(-180deg);
  top: 0.55em;
}
body.isLessonPage .header-box .lesson-navigation td a {
    max-width: 245px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.dropdown-el.expanded>a:hover {
background-color: #f7f7f7;
}
.dark-theme .dropdown-el.expanded>a:hover {
background-color: #313131;
}
@media (max-width:1000px) {
.lesson-navigation tr {
    display: flex;
    flex-direction: column;
}
.header-box .lesson-navigation td.text-center.hidden-xs {
height: 60px;

}
.dropdown-el {
width:300px;
margin:auto;
}
}
@media (min-width:1000px) and (max-width: 1320px) {
  .lesson-navigation tr {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap:15px;
    justify-items:center;
  }
  .lesson-navigation tr td:nth-child(2) {
    grid-row: 1/2;
    grid-column:span 2;
  }
  .lesson-navigation tr td:nth-child(1) {
    padding-left:0px!important;
  }
  .lesson-navigation tr td {
    display:flex;
    width:100%;
    justify-content:center;
  }
}
</style>`)
   window.addEventListener("scroll", () => {
      var totalscroll = document.body.scrollHeight - window.innerHeight;
var currentscroll = window.scrollY;
      var circled = 580 - (500 * (currentscroll/totalscroll))
document.querySelector(".upper circle").style.strokeDashoffset = circled;
        var upper = document.querySelector('.upper');
  if (window.scrollY < 1000) {
    upper.style.display = "none";
  } else {
    upper.style.display = "block";
  }
});

});  

   function scrollToTop(scrollDuration) {
  var scrollStep = -window.scrollY / (scrollDuration / 300),
    scrollInterval = setInterval(function(){
    if ( window.scrollY != 0 ) {
        window.scrollBy( 0, scrollStep );
    }
    else clearInterval(scrollInterval); 
 },15);
}




document.querySelector('.lesson-navigation td:nth-child(2)').innerHTML = '<span class="dropdown-el"></span>'
		let link = document.querySelector('h1 a').href
document.querySelector('.dropdown-el').innerHTML = '<a><span>'+document.querySelector('h2').innerHTML+'</span></a>'
	var url = new URL(window.location.href);
var id = url.searchParams.get("id");
	fetch(link).then(function (response) {
 return response.text();
}).then(function (html) {
 var parser = new DOMParser();
 var doc = parser.parseFromString(html, 'text/html');

Array.from(doc.querySelectorAll('.lesson-list li')).map((otherLessons) => {
let idcheck = otherLessons.getAttribute('data-lesson-id')
if (idcheck.indexOf(id) ==-1) {
	let textWithoutThisDamnedSpan = otherLessons.querySelector('.link.title').textContent.replace(otherLessons.querySelector('.link.title span').textContent, '')
$('.dropdown-el').append('<a href="'+otherLessons.querySelector('a').href+'"><span>'+textWithoutThisDamnedSpan+'</span></a>')
}
else {
	extremeModule(otherLessons)
}
})

}).catch(function (err) {
 // There was an error
 console.warn('Something went wrong.', err);
});


$('.dropdown-el').click(function(e) {
 
  e.stopPropagation();
  $(this).toggleClass('expanded');

});
$(document).click(function() {
     $('.dropdown-el').scrollTop(0);
  $('.dropdown-el').removeClass('expanded');
});




function extremeModule(el) {
	let header = document.querySelector('h1').textContent.trim()
if (el.nextElementSibling ==null) {

let link = document.querySelector('.breadcrumb li:nth-last-child(2) a').href

	fetch(link).then(function (response) {
 return response.text();
}).then(function (html) {
 var parser = new DOMParser();
 var doc = parser.parseFromString(html, 'text/html');

Array.from(doc.querySelectorAll('.stream-table tr')).map((modules) => {
	
if (modules.querySelector('.stream-title').textContent.indexOf(header)>-1) {
findLesson(modules)
}
})

}).catch(function (err) {
 // There was an error
 console.warn('Something went wrong.', err);
});

}
if (el.previousElementSibling ==null) {

let link = document.querySelector('.breadcrumb li:nth-last-child(2) a').href

	fetch(link).then(function (response) {
 return response.text();
}).then(function (html) {
 var parser = new DOMParser();
 var doc = parser.parseFromString(html, 'text/html');

Array.from(doc.querySelectorAll('.stream-table tr')).map((modules) => {
	
if (modules.querySelector('.stream-title').textContent.indexOf(header)>-1) {
findPassLesson(modules)
}
})

}).catch(function (err) {
 // There was an error
 console.warn('Something went wrong.', err);
});

}



}
function findLesson(el) {
let link = el.nextElementSibling.querySelector('a').href	
let header = el.nextElementSibling.querySelector('.stream-title').textContent
	fetch(link).then(function (response) {
 return response.text();
}).then(function (html) {
 var parser = new DOMParser();
 var doc = parser.parseFromString(html, 'text/html');
        if (doc.querySelector('.lesson-list li a') !==null) {
//document.querySelector('.header-box .lesson-navigation td:nth-last-child(1)').innerHTML = '<a href="'+doc.querySelector('.lesson-list li a').href+'">'+header+'</a>'
document.querySelector('.header-box .lesson-navigation td:nth-last-child(1)').innerHTML = '<a href="'+link+'">'+header+'</a>'
}
}).catch(function (err) {
 // There was an error
 console.warn('Something went wrong.', err);
});

}

function findPassLesson(el) {
let link = el.previousElementSibling.querySelector('a').href	
let header = el.previousElementSibling.querySelector('.stream-title').textContent
if (link!==null){
	fetch(link).then(function (response) {
 return response.text();
}).then(function (html) {
 var parser = new DOMParser();
 var doc = parser.parseFromString(html, 'text/html');
if (doc.querySelector('.lesson-list li:nth-last-child(1) a') !==null) {
//document.querySelector('.header-box .lesson-navigation td:first-child').innerHTML = '<a href="'+doc.querySelector('.lesson-list li:nth-last-child(1) a').href+'">'+header+'</a>'
document.querySelector('.header-box .lesson-navigation td:first-child').innerHTML = '<a href="'+link+'">'+header+'</a>'
}
}).catch(function (err) {
 // There was an error
 console.warn('Something went wrong.', err);
});
}
}


      if (window.location.href.indexOf('/lesson')!==-1&&$('.o-lt-lesson-mission-block').length) {
let width = getComputedStyle(document.querySelector('.lite-page.block-set>div .modal-block-content')).width
let marginLeft = getComputedStyle(document.querySelector('.lite-page.block-set>div .modal-block-content')).marginLeft
let marginRight = getComputedStyle(document.querySelector('.lite-page.block-set>div .modal-block-content')).marginRight
document.querySelector('.o-lt-lesson-comment-block .lt-block-wrapper').style.setProperty('width', width, 'important')
document.querySelector('.o-lt-lesson-comment-block .lt-block-wrapper').style.setProperty('margin-left', marginLeft, 'important')
document.querySelector('.o-lt-lesson-comment-block .lt-block-wrapper').style.setProperty('margin-right', marginRight, 'important')
document.querySelector('.o-lt-lesson-mission-block .lt-block-wrapper').style.setProperty('width', width, 'important')
document.querySelector('.o-lt-lesson-mission-block .lt-block-wrapper').style.setProperty('margin-left', marginLeft, 'important')
document.querySelector('.o-lt-lesson-mission-block .lt-block-wrapper').style.setProperty('margin-right', marginRight, 'important')
    }
Array.from(document.querySelectorAll('.answer-content')).map((element) => {if (element.querySelector('.answer-status')!==null) {element.querySelector('.b-like-and-subscribe-notifications').append(element.querySelector('.answer-status'))}})


