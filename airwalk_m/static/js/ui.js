$(document).ready(function(){ 
	/* ==============================
		common	
	============================== */
	//resize
	window_resize();
	function window_resize() {
		$('#page').each(function(){
			var page = $(this);
			var contents = $('#contents');
			var headerH = $('#header').outerHeight();
			var footerH = $('#footer').outerHeight();
			var btmFixH = $(this).find('.btm_fix').outerHeight();
			var pageMinH = $('body').height() - headerH;
			var contentsMinH = pageMinH - footerH;
			page.css({'min-height':pageMinH, 'padding-top':headerH, 'padding-bottom':btmFixH});
			contents.css({'min-height':contentsMinH});
		});
	}

	//body stop/static
	function bodyStop(){
		var sct = - $(window).scrollTop();
		$('body').addClass('lyr_open');
		$('#page').css('top',sct);
	}
	function bodyStatic(){
		var osc = - $('#page').position().top;
		$('body').removeClass('lyr_open');
		$(window).scrollTop(osc);
	};

	// prev, top 버튼 
    $(window).on('scroll', function(){
        if($(window).scrollTop() >= 80){
            $('.quick_btn_wrap').css('display', 'block');
        }else{
            $('.quick_btn_wrap').css('display', 'none');
        }
    });
	var btnTop = $('.quick_btn_wrap .top_btn');
	btnTop.click(function() {
		$('html, body').animate({scrollTop: 0}, 0);
	});
	

	/* ==============================
		component	
	============================== */
	// 탭 메뉴 - 일반형
	$("[data-ui=TabMenu]").each(function() {
		var $ui = $(this);
		var $menu = $ui.find("[data-content=menu]");
		var $content = $ui.find("[data-content=content]");
		$menu.on("click", function(_e) {
			//_e.preventDefault();
			var index = $menu.index(this);
			$menu.removeClass("active").removeAttr("title").eq(index).addClass("active").attr("title", "선택됨");
			$content.removeClass("active").eq(index).addClass("active");
		});
	});

	//파일 첨부
	var fileTarget = $('.filebox .upload_hidden');
	fileTarget.on('change', function(){  // 값이 변경되면
		if(window.FileReader){  // modern browser
		  var filename = $(this)[0].files[0].name;
		} else {  // old IE
		  var filename = $(this).val().split('/').pop().split('\\').pop();  // 파일명만 추출
		}
		// 추출한 파일명 삽입
		$(this).siblings('.upload_name').val(filename);
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
		} else {
			$(this)[0].select();
			$(this)[0].blur();
			var imgSrc = document.selection.createRange().text;
			parent.prepend('<div class="upload-display"><div class="upload-thumb-wrap"><img class="upload-thumb"></div></div>');
			parent.children('.photoBox').addClass('after');
			var img = $(this).siblings('.upload-display').find('img');
			img[0].style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(enable='true',sizingMethod='scale',src=\""+imgSrc+"\")";
		}
	});

	//좋아요 버튼 on off
	$('.btn_like').click(function(){
		if( $(this).hasClass('on') ){
			$(this).removeClass('on');
			$(this).attr('title','선택 안됨');
		}else{
			$(this).addClass('on');
			$(this).attr('title','선택됨');
		}
	});
	
	//레이어팝업 모음
	$('.layer-dimm-wrap').each(function(){
		var layer = $(this);
		var btnCls = $(this).find('.btn-close, .btn_cls');
		btnCls.click(function(){ //공통 닫기
			layer.hide();
			bodyStatic();
		});
	});

	function popClose(){
		$('.pop_layer').hide();
		bodyStatic();
		$(this).parents('.pop_layer').find('form')[0].reset();
	};
	//헤더 > 검색
	$('.btn_search').click(function(){
		$('.layer_search').show();
		bodyStop();
	});
	//리스트 > 필터
	$('.btn_filter').click(function(){
		$('.layer_filter').show();
		bodyStop();
	});
	//상세 > 공유
	$('.btn_sns_share').click(function(){
		$('.layer_sns_share').show();
		bodyStop();
	});
	//상세 > 카드사 혜택 안내
	$('.btn_card_benefit').click(function(){
		$('.layer_card_benefit').show();
		bodyStop();
	});
	//상세 > 매장픽업
	$('.btn_shop_pickup').click(function(){
		$('.find_shop_pickup').show();
		bodyStop();
	});
	//상세 > 당일수령
	$('.btn_shop_today').click(function(){
		$('.find_shop_today').show();
		bodyStop();
	});
	//상세 > 상품평 작성
	$('.btn_review_write').click(function(){
		$('.layer_review_write').show();
		bodyStop();
	});
	//상세 > Q&A 작성
	$('.btn_qna_write').click(function(){
		$('.layer_qna_write').show();
		bodyStop();
	});


	/* ==============================
		content	
	============================== */
	//메인 > 메인 비주얼 슬라이드 
	var mainSlider = $('.main_visual .slide');
	mainSlider.bxSlider({
		controls: false,
		auto: true,
		onSlideAfter: function(){
            mainSlider.startAuto()
        }
	});

	//메인 > HOT# 슬라이드
	$('.main_hot .goods_list').bxSlider({
		controls: false,
		slideWidth: 360,
		minSlides: 2,
		maxSlides: 2,
		moveSlides: 2
	});

	//메인 > NEW ARRIVALS 슬라이드 
	$('.main_new_arrivals .goods_list').bxSlider({
		controls: false,
		slideWidth: 360,
		minSlides: 2,
		maxSlides: 2,
		moveSlides: 2
	});

	//메인 > #INSTAGRAM 슬라이드 
	$('.main_instagram .slide').bxSlider({
		pager:false
	});

	//상세 > 메인 슬라이드 
	$('.thumb_box .slide').bxSlider({
		controls:false
	});

	//상세 > 말풍선형 팝업 공통
	$('.wrap_bubble').each(function(){
		var wrapBubble = $(this);
		var btnBubble = $(this).find('.btn_bubble');
		var popBubble = $(this).find('.pop_bubble');
		btnBubble.children('button').click(function(){
			$('.wrap_bubble').removeClass('on');
			$('.pop_bubble').hide();
			wrapBubble.addClass('on');
			popBubble.show();
		});
		popBubble.find('.btn_pop_close').click(function(){
			wrapBubble.removeClass('on');
			popBubble.hide();
		});
	});

	// 상품상세 > 옵션선택(색상)
	$('.opt_color_wrap').each(function(){
		var colorChipBtn = $(this).find('.color_img li a');
		var selectColor = $(this).find('.selected_color');
		colorChipBtn.click(function(){
			var colorChip = $(this).parent('li');
			var colorName = $(this).find('img').attr('alt');
			colorChip.siblings('li').removeClass('on');
			colorChip.addClass('on');
			selectColor.text(colorName);
		});
	});

	// 상품상세 > 옵션선택(사이즈)
	$('.opt_size_wrap').each(function(){
		var sizeBtn = $(this).find('.check_on_label input');
		var selectSize = $(this).find('.selected_size');
		sizeBtn.click(function(){
			var sizeName = $(this).next('span').text();
			selectSize.text(sizeName);
		});
	});

	// 상품상세 > 상품평 리스트 토글 & 이미지 슬라이드
	$('.review_list').each(function(){
		var btn = $(this).find('.review_open_btn');
		var sliders = new Array();
		$('.uploaded_img .slide').each(function(i, slider){
			sliders[i] = $(slider).bxSlider({pager: false});
		});
		btn.click(function(){
			var content = $(this).parents('li');
			if( content.hasClass('on') ){
				content.removeClass('on');
			}else{
				content.addClass('on');
				$.each(sliders, function(i, slider){
					slider.reloadSlider();
				});
			}
		});
	});

	// 상품상세 > 상품Q&A 리스트 토글
	$('.qna_list').each(function(){
		var btn = $(this).find('.qna_open_btn');
		btn.click(function(){
			var content = $(this).parents('li');
			if( content.hasClass('on') ){
				content.removeClass('on');
			}else{
				content.addClass('on');
			}
		});
	});

	// 상품상세 > 플로팅 옵션
	$('.floating_option').each(function(){
		var floatOpt = $(this);
		var btnOpen = $(this).find('.fold button');
		var btnCls = $(this).find('.btn_cls');
		btnOpen.click(function(){
			floatOpt.addClass('active');
		});
		btnCls.click(function(){
			floatOpt.removeClass('active');
		});
	});

	//상세 > 매장선택 팝업 > 지도 토글
	$('.shop_list > li').each(function(){
		var btnMap = $(this).find('.btn_map');
		var mapArea = $(this).find('.map_area');
		btnMap.click(function(){
			if( mapArea.css('display') == 'none' ){
				btnMap.addClass('on');
				btnMap.text('지도닫기');
				mapArea.show();
			}else{
				btnMap.removeClass('on');
				btnMap.text('지도보기');
				mapArea.hide();
			}
		});
	});
});
