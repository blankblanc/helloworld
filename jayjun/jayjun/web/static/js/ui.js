$(document).ready(function(){ 
	/* ==============================
		common	
	============================== */
	//바디 고정,해제
	function bodyFix(){
		$('html,body').css('overflow-y','hidden');
	}
	function bodyStatic(){
		$('html,body').css('overflow-y','auto');
	}

	// gnb hover
	var delay = 150, setTimeoutConst;
	$('.gnb_menu > li').hover(function() { 
		var ui = $(this),
			subWrp = $(this).find('.subwrp'),
			subH = autoH(subWrp);
		setTimeoutConst = setTimeout(function() { 
			ui.addClass('on');
			subWrp.stop(!0).show().animate({
				'height':subH+'px'
			}, 350);
		}, delay); 
	}, function() { 
		var ui = $(this),
			subWrp = $(this).find('.subwrp');
		clearTimeout(setTimeoutConst); 
		ui.removeClass('on');
		subWrp.stop(!0).animate({
			'height':'0px'
		}, 350, function(){
			subWrp.hide();
		});
	});
	function autoH(el){
		var elH = el.css({'display':'block','height':'auto'}).outerHeight();
		el.css({'display':'none','height':'0px'});
		return elH;
	}
	$(window).load(function(){
		var gnbW = $('.hdwrp .gnbwrp').outerWidth();
		$('.hdwrp .sub_menu_wrp').css('width',gnbW-58);
	});

	// header on scroll
	$(window).scroll(function(){
		var sct = $(this).scrollTop();
		if( sct > 0 ){
			$('body').addClass('is_scroll');
		}else{
			$('body').removeClass('is_scroll');
		}
	});

	// go to top
	$('#btnTop').click(function(){
		$('html,body').stop().animate({scrollTop:0},500);
	});

	//검색 팝업
	$('#schLyr_open').click(function(){
		$('.schwrp').show();	
		$( bodyFix );
	});
	$('#schLyr_cls').click(function(){
		$('.schwrp').hide();
		$( bodyStatic );
	});

	/* ==============================
		component	
	============================== */
	//레이어팝업
	var layerWidth = $('.layer-dimm-wrap .layer-inner').width();
	var layerHeight = $('.layer-dimm-wrap .layer-inner').height();
	var resizeLayerPop = $('.layer-dimm-wrap .layer-inner');
	var layerPopClose = $('.layer-dimm-wrap .btn-close');
	var layerPopWrap = $('.layer-dimm-wrap');

	// 2017-07-06 추가
	var dimm_cover = $("<div class='dimmCover'></div>");
	dimm_append();
	function dimm_append () {
		layerPopWrap.prepend(dimm_cover);
	}
	layerPopWrap.hide();

	$('.dimmCover').click(function(){
		layerPopWrap.hide();
		$(bodyStatic);
	})
	
	//레이어팝업 공통 닫기
	layerPopClose.click(function(){
		layerPopWrap.hide();
		$(bodyStatic);
	});

	//내용 스크롤바
	$(".js-scroll").each(function() {
		$(this).mCustomScrollbar({ theme:"dark-3" });
	});

	// 탭 메뉴 - 일반형
	$("[data-ui=TabMenu]").each(function() {
		var $ui = $(this);
		var $menu = $ui.find("[data-content=menu]");
		var $content = $ui.find("[data-content=content]");

		// 20170705 매장 닫기구현
		var temp_id;
		var flg = false;
		$menu.on("click", function(_e) {
			_e.preventDefault();
			var index = $menu.index(this);
			if(temp_id == index){
				if(flg){
					$menu.eq(index).addClass("active").attr("title", "선택됨");
					$content.eq(index).addClass("active");
					flg = false;
				} else {
					$menu.removeClass("active").removeAttr("title");
					$content.removeClass("active");
					flg = true;
				}
				temp_id;
			} else {
				$menu.removeClass("active").removeAttr("title").eq(index).addClass("active").attr("title", "선택됨");
				$content.removeClass("active").eq(index).addClass("active");
				flg = false;
				temp_id = index;
			}
		});
	});

	//라이크 아이콘(썸네일안)
	$('.goods-item .thumb-img .btn').click(function(){
		$(this).find('.icon-like').toggleClass('on');
	})
	//라이크 아이콘(단독)
	$('.btn-like-count').click(function(){
		$(this).children().children().toggleClass('on');
	})

	//IE 버전체크
	function isIE () {
	   var myNav = navigator.userAgent.toLowerCase();
	   return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
	}    
	var ua = window.navigator.userAgent;
	//Internet Explorer | if | 9-11

	if (isIE () == 9) {
		console.log('IE9');
		$('body').addClass('ie9')
	} else if (isIE () == 10){
		console.log('IE10');
	} else if (ua.indexOf("Trident/7.0") > 0) {
		console.log('IE11');
	}else{
		console.log('Not IE');
	}
});