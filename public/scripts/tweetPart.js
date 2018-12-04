$('.mystery-box-container').click(function(e) {

    if($(this).hasClass('selected')) {
        $('.infoBien').slideUp();
        $(this).removeClass('selected');
        return;
    }

    var detail = $('#bien1');

    switch ($(this).attr('id')) {
        case 'box1':
            detail = $('#bien1');
            break;
        case 'box2':
            detail = $('#bien2');
            break;
        case 'box3':
            detail = $('#bien3');
            break;
    }

    $('.infoBien').slideUp();
    detail.slideDown();

    $('.mystery-box-container').removeClass('selected');
    $(this).addClass('selected');
});



function openTwitter(nb) {
    let prix = document.getElementById("prixUtilisateur" + nb).value;

    if (prix.trim().length == 0) return;

    let text = "J'ai estimé un bien de l'état à " + prix + "€ mais l'état ne renseigne pas son prix de vente.";
    let HashTag = "BalanceTonPrix";
    var lien = "https://twitter.com/intent/tweet?button_hashtag=" + HashTag + "&ref_src=twsrc%5Etfw&text=" + text;
    window.open(lien);
}

$("#prixUtilisateur1").on('keypress', function (e) {
    if(e.which === 13) { // Press enter key
        openTwitter(1);
    }
});

$("#prixUtilisateur2").on('keypress', function (e) {
    if(e.which === 13) { // Press enter key
        openTwitter(2);
    }
});

$("#prixUtilisateur3").on('keypress', function (e) {
    if(e.which === 13) { // Press enter key
        openTwitter(3);
    }
});





//---------- RESIZE BOXES ----------

var $window = $(window);

function squareBoxes() {

    $('.mystery-box').css({
        height: $('#box1').width()
    });
}

squareBoxes();
$window.resize(squareBoxes);