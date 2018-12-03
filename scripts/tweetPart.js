function displayInfo(nb){
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
    }
}

