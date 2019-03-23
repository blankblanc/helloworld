$(window).on('load', function(){
/* ==============================
	common	
============================== */
// body fix/static
function bodyFix(){
	var sct = - $(window).scrollTop();
	$('body').addClass('lyrOpen');
	$('#page').css('top',sct);
}
function bodyStatic(){
	var osc = - $('#page').position().top;
	$('body').removeClass('lyrOpen');
	$(window).scrollTop(osc);
};

// dim bg 
function dimBg(){
	$('body').append('<div id="dim_bg"></div>');
}
function dimBgRemove(){
	$('#dim_bg').remove();
}

// Header&Toolbar auto hide
var wrap = $('body');
var scrolling = false,
	previousTop = 0,
	currentTop = 0,
	scrollDelta = 5,
	scrollOffset = 50;

$(window).on('scroll', function(){
	if( !scrolling ) {
		scrolling = true;
		(!window.requestAnimationFrame)
			? setTimeout(autoHideFixed, 200)
			: requestAnimationFrame(autoHideFixed);
	}
});
function autoHideFixed() {
	var currentTop = $(window).scrollTop();
	checkScroll(currentTop);
	previousTop = currentTop;
	scrolling = false;
}
function checkScroll(currentTop) {
	if (previousTop - currentTop > scrollDelta) {
		//if scrolling up
		wrap.removeClass('scrDown').addClass('scrUp');
	} else if( currentTop - previousTop > scrollDelta && currentTop > scrollOffset) {
		//if scrolling down
		wrap.removeClass('scrUp').addClass('scrDown');
	}
}

// LNB open/close
$('.btn_lnb_open').click(function(){
	bodyFix();
	dimBg();
	$('#lnb_wrp').css('left','0%');
});

$('.btn_lnb_cls').click(function(){
	bodyStatic();
	dimBgRemove();
	$('#lnb_wrp').css('left','-100%');
});

// gnb toggle
$('.gnb').each(function(){
	var gnbMenu = $(this).find('.gnbmenu');
	var subMenu = $(this).find('.sub');
	gnbMenu.click(function(){
		var thisSub = $(this).next('.sub');
		if(thisSub.css('display')=='none'){
			subMenu.slideUp(200);
			thisSub.slideDown(200);
		}else{
			thisSub.slideUp(200);
		}
	});
});

// footer 상세보기
$('#footer .company_info').each(function(){
	var ui = $(this);
	var btn = $(this).find('.btn_view_info');
	var con = $(this).find('.toggle_con');
	btn.click(function(){
		ui.toggleClass('active');
		con.slideToggle();
	});
});

// scroll events
$(window).scroll(function(){ 
	goTop();
});

// go to top
function goTop(){
	var sct = $(window).scrollTop();
	if( 10 < sct ){
		$('#btn_top').fadeIn(300);
	}else{
		$('#btn_top').fadeOut(300);
	};

	$('#btn_top a').on('click',function(){
		$('html,body').stop().animate({scrollTop:0},300);
		return false;
	});
};
goTop();

// toolbar > 큐레이션팝업 open
$('.btn_MyLikeItems').click(function(){
	$('#MyLikeItems').click();
});
$('.btn_todayHistory').click(function(){
	$('#todayHistory').click();
});


/* ==============================
	컴포넌트	
============================== */
//좋아요♡
function like_fill(){
	var i_Like = $('.btn-like-count')
		i_Like.click(function(){
		$(this).toggleClass('active');
	});
}
like_fill();

//accordions
$('.accordions').find('.accordion-trigger').on('click', function(e){
	e.preventDefault();
	if($(this).hasClass('active')){
		$(this).removeClass('active').next('.accordion-contents').stop().slideUp(300);
	}else{
		$(this).closest('.accordions').find('.accordion-trigger').removeClass('active');
		$(this).closest('.accordions').find('.accordion-contents').stop().slideUp(300);
		$(this).addClass('active').next('.accordion-contents').stop().slideDown(300);
	}
});

// 탭 메뉴 - 일반형
$("[data-ui=TabMenu]").each(function() {
	var $ui = $(this);
	var $menu = $ui.find("[data-content=menu]");
	var $content = $ui.find("[data-content=content]");

	$menu.on("click", function(_e) {
		_e.preventDefault();
		var index = $menu.index(this);
		$menu.removeClass("active").removeAttr("title").eq(index).addClass("active").attr("title", "선택됨");
		$content.removeClass("active").eq(index).addClass("active");
	});
});

//layers popup
function popupLayer(obj){
	var self = $(obj);
	var	target = $($(obj).attr("href"));
	//var dimmH = $('html,body').height();
	//var targetH = $($(obj).attr("href")).height();
	$('html,body').css('overflow-y', 'hidden');
	target.wrap('<div class="popup-dim">');
	target.attr("tabindex", "0").stop().fadeIn(500).focus();		
	//target.css({'margin-top': '-' + Math.ceil(target.height() / 2) +'px' , 'margin-left' : '-' + target.width() / 2 + 'px','z-index' : '1500'})
	
	/*
	if ( targetH - 1 > dimmH)
	{
		target.parent().addClass('layer-scroll');
	}
	*/
	
	target.find(".layer-close button, .btn-cancel").click(function(){
		$('html,body').css('overflow-y', 'visible');
		//target.css({'z-index' : '10'})
		$('.popup-dim').children('.layers[id*="popup-"], .layers[id*="pop-view-"]').unwrap();
		target.stop().fadeOut(300);
		self.focus();
	});

}
$('a[href*="#popup-"]').on('click', function(e){
	e.preventDefault();
	popupLayer(this);
});

$('a[href*="#pop-view-"]').on('click', function(e){ //campaign view
	e.preventDefault();
	popupLayer(this);
	$('.popup-dim').addClass('view-type');
	$('.view_slider, .thumb_slider').slick('refresh');
});

//레이어 스크롤
/*
function layer_scroll (){
	var layer_height = $('.popup-dim .layers').height();
	var fixed_dimmH = $('html,body').height();

	if ( layer_height > fixed_dimmH )
	{
		$('.popup-dim').addClass('layer-scroll');
	} else {
		$('.popup-dim').removeClass('layer-scroll');
	}
}
$(window).on('resize', function(){
	layer_scroll();
});
*/

//파일 첨부
var fileTarget = $('.filebox .upload-hidden');

fileTarget.on('change', function(){  // 값이 변경되면
	if(window.FileReader){  // modern browser
	  var filename = $(this)[0].files[0].name;
	} 
	else {  // old IE
	  var filename = $(this).val().split('/').pop().split('\\').pop();  // 파일명만 추출
	}
	
	// 추출한 파일명 삽입
	$(this).siblings('.upload-nm').val(filename);
});

//이미지 첨부
var imgTarget = $('.filebox .upload-hidden');

imgTarget.on('change', function(){
	var parent = $(this).parent();
	parent.children('.upload-display').remove();

	if(window.FileReader){
		//image 파일만
		if (!$(this)[0].files[0].type.match(/image\//)) return;
		
		var reader = new FileReader();
		reader.onload = function(e){
			var src = e.target.result;
			parent.prepend('<div class="upload-display"><div class="upload-thumb-wrap"><img src="'+src+'" class="upload-thumb"></div></div>');
			parent.children('.photoBox').addClass('after');
		}
		reader.readAsDataURL($(this)[0].files[0]);
	}

	else {
		$(this)[0].select();
		$(this)[0].blur();
		var imgSrc = document.selection.createRange().text;
		parent.prepend('<div class="upload-display"><div class="upload-thumb-wrap"><img class="upload-thumb"></div></div>');
		parent.children('.photoBox').addClass('after');

		var img = $(this).siblings('.upload-display').find('img');
		img[0].style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(enable='true',sizingMethod='scale',src=\""+imgSrc+"\")";
	}
});

//Attention
$('.attention .show').click(function(){
	$(this).parent().parent().toggleClass('active');
	$(this).parent().next().slideToggle();
})

//select
jQuery(function($){
	// Common
	var select_root = $('div.select');
	var select_value = $('.my_value');
	var select_a = $('div.select>ul>li>a');
	var select_input = $('div.select>ul>li>input[type=radio]');
	var select_label = $('div.select>ul>li>label');
	
	// Radio Default Value
	$('div.my_value').each(function(){
		var default_value = $(this).next('.i_list').find('input[checked]').next('label').text();
		$(this).append(default_value);
	});
	
	// Line
	select_value.bind('focusin',function(){$(this).addClass('outLine')});
	select_value.bind('focusout',function(){$(this).removeClass('outLine')});
	select_input.bind('focusin',function(){$(this).parents('div.select').children('div.my_value').addClass('outLine')});
	select_input.bind('focusout',function(){$(this).parents('div.select').children('div.my_value').removeClass('outLine')});
	
	// Show
	function show_option(){
		$(this).parents('div.select:first').toggleClass('open');
	}
	
	// Hover
	function i_hover(){
		$(this).parents('ul:first').children('li').removeClass('hover');
		$(this).parents('li:first').toggleClass('hover');
	}
	
	// Hide
	function hide_option(){
		var t = $(this);
		setTimeout(function(){
			t.parents('div.select:first').removeClass('open');
		}, 1);
	}
	
	// Set Input
	function set_label(){
		var v = $(this).next('label').text();
		$(this).parents('ul:first').prev('.my_value').text('').append(v);
		$(this).parents('ul:first').prev('.my_value').addClass('selected');
	}
	
	// Set Anchor
	function set_anchor(){
		var v = $(this).text();
		$(this).parents('ul:first').prev('.my_value').text('').append(v);
		$(this).parents('ul:first').prev('.my_value').addClass('selected');
	}

	// Anchor Focus Out
	$('*:not("div.select a")').focus(function(){
		$('.a_list').parent('.select').removeClass('open');
	});
			
	select_value.click(show_option);
	select_root.removeClass('open');
	select_root.mouseleave(function(){$(this).removeClass('open')});
	select_a.click(set_anchor).click(hide_option).focus(i_hover).hover(i_hover);
	select_input.change(set_label).focus(set_label);
	select_label.hover(i_hover).click(hide_option);
	
});

// tooltip close
$('.tooltip.mcenter').each(function(){
	var cover = $(this).find('.cover');
	var btnOpen = $(this).find('.icon-how-use');
	var btnCls = $(this).find('.btn-close');
	btnOpen.click(function(){
		cover.show();
	});
	btnCls.click(function(){
		cover.hide();
	});
});


/* ==============================
	content
============================== */
// myapge > 주문배송조회 기간 설정버튼
$('.area-month-check li').click(function(){
	$(this).siblings().removeClass('active');
	$(this).addClass('active');
})

// 고객센터 > 자주묻는질문 toggle
$('.faq_toggle').each(function(){
	var btn = $(this).find('.a_control');
	var sbUi = $(this).children('li');
	var sbA = $(this).find('.a_area');
	
	sbUi.first().addClass('on').find('.a_area').show();

	btn.click(function(){
		var ui = $(this).parents('li');
		var aArea = ui.find('.a_area');

		if( aArea.css('display') == 'none' ){
			sbA.slideUp(200);
			sbUi.removeClass('on');
			aArea.slideDown(200);
			ui.addClass('on');
		}else{
			aArea.slideUp(200);
			ui.removeClass('on');
		}
	});
});

});