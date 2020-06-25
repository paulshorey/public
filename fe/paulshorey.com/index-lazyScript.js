
	$.getScript('/assets/js/rainbow/js/rainbow.min.js');
	// $.getScript('/assets/js/rainbow/js/language/generic.js');
	// $.getScript('/assets/js/rainbow/js/language/javascript.js');

	$('video').parent().click(function () {
	    if($(this).find("video").get(0).paused){
	        $(this).find("video").get(0).play();
	        $(this).find(".playpause").fadeOut();
	    }else{
	       $(this).find("video").get(0).pause();
	        $(this).find(".playpause").fadeIn();
	    }
	});
	$(document).ready(function(){

		$('[secret-mailto]').each(function(){
			$(this).get(0).innerHTML = $(this).attr('secret-mailto');
			$(this).attr('href','mailto:'+$(this).attr('secret-mailto'));
		});
		$('body').addClass('ready');

		$('[secret-tel]').each(function(){
			$(this).get(0).innerHTML = $(this).attr('secret-tel1')+'.'+$(this).attr('secret-tel2')+'.'+$(this).attr('secret-tel3');
			$(this).attr('href','tel:'+$(this).attr('secret-tel1')+$(this).attr('secret-tel2')+$(this).attr('secret-tel3'));
		});
		
	});
	$(window).on('load, scroll', function(){
		$('[scrollplay]').each(function(){
			if (isVideoInView($(this)[0])) {
				$(this)[0].play();
			} else {
				$(this)[0].pause();
			}
		})
	});
	function isVideoInView(video) {
		var middle = (window.innerHeight || document.documentElement.clientHeight) * (2/5);
		var rect = video.getBoundingClientRect();
		if (
			rect.top < middle && 
			rect.top+video.clientHeight >= middle
		) {
			return true;
		}
	}
	$(document).ready(function(){
		$('.cycle-slideshow').each(function(){
			$(this).cycle();
			$(this)[0].play = function(){ try { $(this).cycle('resume'); } catch(e){} }
			$(this)[0].pause = function(){ try { $(this).cycle('pause'); } catch(e){} }
			$(this).cycle('pause');
		})
	});
	function scrollToTopCode(){
		$('html, body').animate({
			scrollTop: $('a[name="scrollToTopCode"]').eq(0).offset().top
		}, 2000);
	}
	function scrollToCode(){
		$('html, body').animate({
			scrollTop: $('a[name="scrollToCode"]').eq(0).offset().top-20
		}, 2000);
	}
	function scrollToMe(){
		$('html, body').animate({
			scrollTop: 100000
		}, 2000);
	}
	function scrollToTop(){
		$('html, body').animate({
			scrollTop: 0
		}, 2000);
	}