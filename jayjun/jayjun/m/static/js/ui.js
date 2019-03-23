$(document).ready(function() {
	/* ==============================
		common	
	============================== */
	//resize
    window_resize();
    function window_resize() {
        $("#page").css({ paddingTop: $("#header .header").outerHeight() });
        var pageMinH = $("body").height() - $("#header .header").outerHeight();
        $("#page").css({ minHeight: pageMinH });
        var contentMinH = pageMinH - $("#footer").outerHeight();
        $("#content").css({ minHeight: contentMinH });
    }
	//앱 설치 유도 배너 닫기
    $('.topbanner').each(function() {
        var ui = $(this);
        var btnCls = $(this).find('.btn_close');
        btnCls.click(function() {
            ui.hide();
            window_resize()
        })
    });
	//body stop/static
    function bodyStop(){
        var sct = -$(window).scrollTop();
        $('body').addClass('lyr_open');
        $('#page').css('top', sct);
    }
    function bodyStatic(){
        var osc = -$('#page').position().top;
        $('body').removeClass('lyr_open');
        $(window).scrollTop(osc);
    };

	// LNB open/close
	$('.btn_lnb_open').click(function(){
		$('#lnb_wrp').addClass('on');
		bodyStop();
	})
	$('.btn_lnb_cls, .lnb_dim').click(function(){
		$('#lnb_wrp').removeClass('on');
		bodyStatic();
	});

	// gnb toggle
	$('.gnb').each(function(){
		var gnbMenu = $(this).find('.gnbmenu'),
			subMenu = $(this).find('.sub');
		gnbMenu.click(function(){
			var thisSub = $(this).next('.sub');
			if(thisSub.css('display')=='none'){
				subMenu.slideUp(200).parent('li').removeClass('on');
				thisSub.slideDown(200).parent('li').addClass('on');
			}else{
				thisSub.slideUp(200).parent('li').removeClass('on');
			}
		});
	});

	// header > search popup
	$('.btn_sch_open').click(function(){
		$('.schwrp').show();
		bodyStop();
	});
	$('.schwrp #schLyr_cls').click(function(){
		$('.schwrp').hide();
		bodyStatic();
	});

	// quick(cart,top button)
	$(window).scroll(function(){
		if( $(this).scrollTop() > 300 ) {
			$('.quick_btn_wrp').fadeIn(500);
		}else{ 
			$('.quick_btn_wrp').fadeOut(500); 
		} 
	});
	$('.quick_btn_wrp .btn_top a').click(function() {
		$('html, body').animate({scrollTop: 0}, 500);
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
            var index = $menu.index(this);
            $menu.removeClass("active").removeAttr("title").eq(index).addClass("active").attr("title", "선택됨");
            $content.removeClass("active").eq(index).addClass("active");
        });
    });

	//라이크 아이콘(썸네일안)
	$('.goods-item .like-local button').click(function(){
		$(this).find('.icon_like').toggleClass('on');
	})
	//라이크 아이콘(단독)
	$('.btn-like-count').click(function(){
		$(this).children().children().toggleClass('on');
	})

	//레이어팝업 모음
    $('.pop_layer .btn_close').click(function() {
        $('.pop_layer').hide();
        bodyStatic();
    });
    function popClose() {
        $('.pop_layer').hide();
        bodyStatic();
    };

	// 상세 > 공유하기 팝업
    $('.btn_share').click(function() {
        $('.lyr_share').show();
        bodyStop();
    });
	// 상세 > 포토리뷰보기 팝업
    $('.btn_ptreview_view').click(function() {
        $('.layer_ptreview_view').show();
		ptreviewSlider.reloadSlider();
        bodyStop();
    });
});