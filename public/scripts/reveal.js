
startCounter = function() {
    $('.stat-number span').each(function() {
        var $this = $(this),
            countTo = $this.attr('data-count');

        $({ countNum: $this.text()}).animate({
                countNum: countTo
            },
            {
                duration: 2000,
                easing:'linear',
                step: function() {
                    $this.text(Math.floor(this.countNum));
                },
                complete: function() {
                    $this.text(this.countNum);
                    //alert('finished');
                }
            });
    });
}

ScrollReveal().reveal('.stat-wrapper', {
    delay: 0,
    afterReveal: function(e) {
        startCounter()
    }
});


ScrollReveal().reveal('.map-filter-nature, .map-filter-state, .mystery-box, .team-profile, #articles-section div, .project-description, .stats-container img', {
    delay: 200,
    duration: 1000
});