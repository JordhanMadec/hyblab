$(function() {
    /**
    * Smooth scrolling to page anchor on click
    **/
	 $('a[href^="#"]').click(function(){
		var the_id = $(this).attr("href");
		if (the_id === '#') {
			return;
		}
		$('html, body').animate({
			scrollTop:$(the_id).offset().top
		}, 'slow');
		return false;
	});


	// Vars.
	var	$window = $(window),
		$body = $('body'),
		$wrapper = $('#wrapper');

	// Breakpoints.
	skel.breakpoints({
		xlarge:	'(max-width: 1680px)',
		large:	'(max-width: 1280px)',
		medium:	'(max-width: 980px)',
		small:	'(max-width: 736px)',
		xsmall:	'(max-width: 480px)'
	});

	// Disable animations/transitions until everything's loaded.
	$body.addClass('is-loading');

	$window.on('load', function() {
		$body.removeClass('is-loading');
	});

	initModalAndGraph();
});