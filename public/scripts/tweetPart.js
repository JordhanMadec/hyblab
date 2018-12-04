function displayInfo(nb){
    var detail;

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

    detail.slideDown();

    $('.mystery-box-container').removeClass('selected');
    $(this).addClass('selected');
}

function backToChoice(){
    document.getElementById("boites").style.display = "block";
    for(var i=1; i <= 3; i++)
        document.getElementById("bien"+i).style.display = "none";
}

function openTwitter(nb){
    let prix = document.getElementById("prixUtilisateur" + nb).value;
    let text = "D'après moi, ce bien vaut " + prix + "€ mais l'état ne renseigne pas son prix.";
    let HashTag = "DonnezLePrix";
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