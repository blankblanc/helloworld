$(document).ready(function(){ 
	/* ==============================
		common	
	============================== */
	//resize
	window_resize();
	function window_resize() {
		var headerH = $('#header').outerHeight();
		var footerH = $('#footer').outerHeight(true);
		$('#contents').css({paddingBottom:footerH});
	}

	//바디 고정,해제
	function bodyFix(){
		$('body').css('overflow-y','hidden');
	}
	function bodyStatic(){
		$('body').css('overflow-y','visible');
	}

	// top banner
	$('.top_banner').each(function(){
		var topBn = $(this);
		var btnCls = $(this).find('.btn_close');
		var btnOpen = $(this).find('.btn_open');
		btnCls.click(function(){
			topBn.removeClass('on');
			window_resize();
		});
		btnOpen.click(function(){
			topBn.addClass('on');
			window_resize();
		});
	});

	// gnb fix
	var gnbTop = $('.gnb_wrap').offset();
	$(window).scroll(function(){
		var scTop = $(window).scrollTop();
		if( window.location.href.indexOf("company") == -1 ){ 
			if( scTop > gnbTop.top ){
				$('#header').addClass('header_fix');
			}else{
				$('#header').removeClass('header_fix');
			}
		}; 
	});

	// header > search
	$('.header_search_wrap').each(function(){
		var schWrap = $(this);
		var schInput = $(this).find('.search_input');
		var schSlide = $(this).find('.slide');
		var schRanking = $(this).find('.search_ranking');
		var schKeyword = $(this).find('.search_keyword');
		var schKeywordCls = $(this).find('.btn_cls_keyword');
		schRankingSl = schSlide.bxSlider({
			mode: 'vertical',
			auto: true,
			infiniteLoop: true,
			pager: false, 
			controls: false
		});
		schWrap.hover(
			function(){
				schRanking.addClass('destroy');
				schRankingSl.destroySlider();
			},function(){
				schRanking.removeClass('destroy');
				schRankingSl.reloadSlider();
			}
		);
		schInput.click(function(){
			schWrap.addClass('click');
		});
		function clsKeyword(){
			schWrap.removeClass('click');
		}
		$('body').click(function(e){
			if( schKeyword.css('display') == 'block'){
				var container = $('.header_search_wrap, .fixhd_search_btn');
				if( !container.is(e.target) && container.has(e.target).length === 0 ){
					clsKeyword();
				}
			}
		});
		schKeywordCls.click(function(){
			clsKeyword();
			schRanking.removeClass('destroy');
			schRankingSl.reloadSlider();
		});
	});

	// fixed header > search
	$('.fixhd_search_btn').click(function(){
		var fixSch = $('.header_fix').find('.header_search_wrap');
		fixSch.addClass('click');
	});
	
	// sidebar control
	$('#sidebar').each(function(){
		var sBar = $(this);
		var control = $(this).find('.sidebar_control');
		var controlTxt = control.find('.txt');
		control.click(function(){
			if( sBar.hasClass('on') ){
				sBar.removeClass('on');
				controlTxt.text('OPEN');
			}else{
				sBar.addClass('on');
				controlTxt.text('CLOSE');
			}
		});
	});

	// sidebar > 최근 본 상품
	$('.sidebar_recent_view .slide').bxSlider({
		slideMargin: 10,
		pagerType: 'short',
		pagerShortSeparator: '/'
	});

	// go to top
	$(window).scroll(function(){
		$('.sidebar_top_btn').click(function(){
			$('html,body').scrollTop(0);
		});
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
	var fileTarget = $('.filebox .upload-hidden');
	fileTarget.on('change', function(){  // 값이 변경되면
		if(window.FileReader){  // modern browser
		  var filename = $(this)[0].files[0].name;
		} else {  // old IE
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

	//레이어팝업 모음
	$('.layer-dimm-wrap').each(function(){
		var layer = $(this);
		var btnCls = $(this).find('.btn-close');
		btnCls.click(function(){ //공통 닫기
			layer.hide();
			bodyStatic();
		});
	});
	function popClose(){
		$('.layer-dimm-wrap').hide();
		bodyStatic();
		$(this).parents('.layer-dimm-wrap').find('form')[0].reset();
	};

	//상세 > 카드사 혜택 안내
	$('.btn_card_benefit').click(function(){
		$('.layer_card_benefit').show();
		bodyFix();
	});
	//상세 > 매장픽업
	$('.btn_shop_pickup').click(function(){
		$('.find_shop_pickup').show();
		bodyFix();
	});
	//상세 > 당일수령
	$('.btn_shop_today').click(function(){
		$('.find_shop_today').show();
		bodyFix();
	});
	//상세 > 상품평 작성
	$('.btn_review_write').click(function(){
		$('.layer_review_write').show();
		bodyFix();
	});
	//상세 > Q&A 작성
	$('.btn_qna_write').click(function(){
		$('.layer_qna_write').show();
		bodyFix();
	});
	//리스트 > 상품 미리보기
	$('.btn_preview').click(function(){
		$('.layer_goods_preview').show();
		bodyFix();
		detailSlider.reloadSlider();
	});

	// 좋아요 버튼
	$('.btn_like').click(function(){
		if( $(this).hasClass('on') ){
			$(this).removeClass('on');
		}else{
			$(this).addClass('on');
		}
	});
	
	//상품 정렬 > 갯수
	var view_ea_btn = $('.goods-sort .view-ea button');
	view_ea_btn.click(function(){
		$(this).siblings().removeClass('on');
		$(this).addClass('on');
	});

	//리스트 보기방식
	$('.list_content_wrap').each(function(){
		var list_type = $(this).find('.goods-sort .type button');
		var goodsList = $(this).find('.goods_list_wrap');
		list_type.click(function(){
			$(this).siblings().removeClass('active');
			$(this).addClass('active');
		});
		$('#type_grid').click(function(){
			goodsList.removeClass('list_type');
		});
		$('#type_list').click(function(){
			goodsList.addClass('list_type');
		})
	});


	/* ==============================
		content	
	============================== */
	// 메인 > 비주얼 슬라이드
	$('.main_visual .slider').bxSlider({
		mode: 'vertical',
		auto: true,
		pause: 5000,
		controls: false
	});

	// 메인 > HOT 탭
	$('.main_hot_tab [data-content=menu]').hover(
		function(){
			$(this).click();
		}
	);

	// 메인 > instagram slide
	$('.main_insta_list .slider').bxSlider({
		slideMargin: 10,
		pager: false
	});

	// 상품리스트 > 비주얼 슬라이드
	$('.list_visual .slider').bxSlider({
		mode: 'vertical',
		auto: true,
		pause: 5000,
		controls: false
	});

	// 상품상세 > 대표이미지 확대보기
	$('#detail_zoom').elevateZoom({
		gallery:'thumb_list',
		cursor: 'crosshair',
		galleryActiveClass: 'active',
		zoomWindowWidth: 480,
		zoomWindowHeight: 550,
		zoomWindowOffetx: 90,
		zoomWindowOffety: 40,
		scrollZoom: true,
		lensSize: 120,
		borderSize: 1,
		borderColor: '#d3d3d3',
		lenszoom: true
	});
	$('#thumb_list').find('a').on('click', function(e){
		var ez = $('#detail_zoom').data('elevateZoom');
		ez.getGalleryList();
		return false;
	});

	// 상품상세 > 대표이미지
	detailSlider = $('.layer-dimm-wrap .thumb_box .thumb_list_big').bxSlider({
		mode: 'fade',
		controls: false,
		pagerCustom: '.thumb_list_small'
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
		var sizeBtn = $(this).find('.check_on_label li input');
		var selectSize = $(this).find('.selected_size');
		sizeBtn.click(function(){
			var sizeName = $(this).next('label').text();
			selectSize.text(sizeName);
		});
	});

	// 상품상세 > 기획전 슬라이드
	$('.goods_view_banner .slider').bxSlider({
		pager: false,
		controls: false
	});
		
	// 상품상세 > 탭 이동
	$(function() {
		$('.goods_view_tab .tab-menu a').click(function() {
			var href = $(this).attr('href');
			var hrefTop = $(href).offset().top - 46;
			$('html, body').scrollTop(hrefTop);
			return false;
		});
	});

	// 상품상세 > 상품평 리스트 토글 & 이미지 슬라이드
	$('.review_table').each(function(){
		var btn = $(this).find('.review_open_btn');
		var sliders = new Array();
		$('.uploaded_img .slider').each(function(i, slider){
			sliders[i] = $(slider).bxSlider({pager: false});
		});
		btn.click(function(){
			var content = $(this).parents('tr').next('tr');
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
	$('.qna_table').each(function(){
		var btn = $(this).find('.qna_open_btn');
		btn.click(function(){
			var content = $(this).parents('tr').next('tr');
			if( content.hasClass('on') ){
				content.removeClass('on');
				$(this).removeClass('on');
			}else{
				content.addClass('on');
				$(this).addClass('on');
			}
		});
	});

	// 상품상세 > 플로팅 옵션
	$(window).scroll(function(){
		var detail01 = $('#detail01');
		var detail02 = $('#detail02');
		if( detail01.length && detail02.length ){
			var detailTop = detail01.offset().top - 200;
			var detailBtm = detail02.offset().top - 200;
			var scTop = $(window).scrollTop();
			if( detailTop < scTop && scTop < detailBtm  ){
				$('.floating_option').show();
			}else{
				$('.floating_option').hide();
			}
		}
	});
	$('.floating_option').each(function(){
		var floatOpt = $(this);
		var control = $(this).find('.opt_control_btn');
		control.click(function(){
			floatOpt.toggleClass('unfold');
		});
	});
});