function displayInfo(nb){
    document.getElementById("boites").style.display = "none";
    document.getElementById("bien"+nb).style.display = "block";
/*
    var toDisplay = false;
    for(var i = 1; i <= 3; i++){
        if( i != nb && document.getElementById("bien" + i).style.display == "none"){
            toDisplay = true;
        }
    }
    if(!toDisplay){
        for(var i = 1; i <= 3; i++){
            if( i != nb){
                document.getElementById("bien" + i).style.display = "none";
            }
        }
        document.getElementById("infoBien" + nb).style.display = "block";
    }else{
        document.getElementById("infoBien" + nb).style.display = "none";
        for(var i = 1; i <= 3; i++)
            document.getElementById("bien" + i).style.display = "block";
    }*/
}

function openTwitter(nb){
    let prix = document.getElementById("prixUtilisateur" + nb).value;
    let text = "Nous voulons savoir le prix du bien. Pour nous, il vaut " + prix + "€";
    let HashTag = "DonneLePrix";
    var lien = "https://twitter.com/intent/tweet?button_hashtag=" + HashTag + "&ref_src=twsrc%5Etfw&text=" + text;
    window.open(lien);
}