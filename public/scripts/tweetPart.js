function displayInfo(nb){
    document.getElementById("boites").style.display = "none";
    document.getElementById("bien"+nb).style.display = "block";
}

function backToChoice(){
    document.getElementById("boites").style.display = "block";
    for(var i=1; i <= 3; i++)
        document.getElementById("bien"+i).style.display = "none";
}

function openTwitter(nb){
    let prix = document.getElementById("prixUtilisateur" + nb).value;
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

    $('#box1, #box2, #box3').css({
        height: $('#box1').width()
    });
}

squareBoxes();
$window.resize(squareBoxes);