//a simple function to click next link
//a timer will call this function, and the rotation will begin
function rotate() {
    $('#next-funfact').click();
}

toggleFunfact = function () {
    if ($(".funfact-wrapper").hasClass('visible')) {
        $(".funfact-wrapper").removeClass('visible');
        $(".funfact-button .btn-floating").removeClass('selected');
    } else {
        $(".funfact-wrapper").addClass('visible')
        $(".funfact-button .btn-floating").addClass('selected');
    }
}

initFunfact = function() {
    //rotation speed and timer
    var speed = 7000;

    var run = setInterval(rotate, speed);
    var slides = $('.slide');
    var container = $('#slides ul');
    var elm = container.find(':first-child').prop("tagName");
    var item_width = container.width();
    var previous = 'previous-funfact'; //id of previous button
    var next = 'next-funfact'; //id of next button
    slides.width(item_width); //set the slides to the correct pixel width
    container.parent().width(item_width);
    container.width(slides.length * item_width); //set the slides container to the correct total width
    container.find(elm + ':first').before(container.find(elm + ':last'));
    resetSlides();


    //if user clicked on prev button
    $('.funfact-control-button').click(function (e) {
        //slide the item

        if (container.is(':animated')) {
            return false;
        }

        if ($(this).attr('id') == previous) {
            container.stop().animate({
                'left': 0
            }, 1500, function () {
                container.find(elm + ':first').before(container.find(elm + ':last'));
                resetSlides();
            });
        }

        if ($(this).attr('id') == next) {
            container.stop().animate({
                'left': item_width * -2
            }, 1500, function () {
                container.find(elm + ':last').after(container.find(elm + ':first'));
                resetSlides();
            });
        }

        //cancel the link behavior
        return false;

    });

    //if mouse hover, pause the auto rotation, otherwise rotate it
    container.parent().mouseenter(function () {
        clearInterval(run);
    }).mouseleave(function () {
        run = setInterval(rotate, speed);
    });


    function resetSlides() {
        //and adjust the container so current is in the frame
        container.css({
            'left': -1 * item_width
        });
    }

};