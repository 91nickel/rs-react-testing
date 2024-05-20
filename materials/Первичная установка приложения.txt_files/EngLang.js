

$(document).on('remake-left-menu-ready',()=>{
  $(document).ajaxStop(()=>{
    setTimeout(()=>{
    	 if( $('a[data-title="Website"]').length > 0)
{
    	Array.from(document.querySelectorAll('.user-coins span')).map((element) => {
    		element.textContent = element.textContent.replace('рублей','rubles').replace('монет','coins')
    		
    	})
    	 $('body').addClass('eng')
 $('body').append('<style> .eng #gcAccountUserMenu .gc-account-user-menu li.menu-item-notifications_button_small > a:not([data-username]):before {content: "Notifications";}.eng #gcAccountUserMenu {--m-custom-btn-text: "Support";}</style>')
 document.querySelector('.custom-btns-wrapper .menutoggle-btn span').innerHTML = 'close'
}
       
    });
  });
});