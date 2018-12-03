function displayInfo(nb){
    document.getElementById("boites").style.display = "none";
    document.getElementById("bien"+nb).style.display = "block";
}

function openTwitter(nb){
    let prix = document.getElementById("prixUtilisateur" + nb).value;
    let text = "Nous voulons savoir le prix du bien. Pour nous, il vaut " + prix + "€";
    let HashTag = "DonneLePrix";
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