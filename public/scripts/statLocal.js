function checkTypeDeBien(latPoint, longPoint){
    console.log(latPoint + "   " + longPoint);
     //Type de biens
     let espaceNaturels = 0;
     let logements = 0;
     let bureaux = 0;
     let espaceAmenage = 0;
     let batTechnique = 0;
     let voirie = 0;
     let parcelles = 0;
     let sport = 0;
     let sanitaire = 0;
     let commerce = 0;
     let culturel = 0;
     let agricole = 0;
     let memorial = 0;
     let culte = 0;

     let nbTypeBiens = 0;

     for(var i=0;i<dataCSV.length;i++)
    {

        let latitude = dataCSV[i]["latitude"];
        let longitude = dataCSV[i]["longitude"];

        let distance = Math.abs(latPoint - latitude) + Math.abs(longPoint - longitude);
        if(distance < 1){
            //Type de bien 
            switch(dataCSV[i]["nature"]){
                case "BATIMENT D'ENSEIGNEMENT OU DE SPORT":
                    sport++;
                    nbTypeBiens++;
                    break;
                case "BATIMENT SANITAIRE OU SOCIAL":
                    sanitaire++;
                    nbTypeBiens;
                    break;
                case "BATIMENT CULTUREL":
                    culturel++;
                    nbTypeBiens++;
                    break;
                case "COMMERCE":
                    commerce++;
                    nbTypeBiens++;
                    break;
                case "BUREAU":
                    bureaux++;
                    nbTypeBiens++;
                    break;
                case "EDIFICE DE CULTE":
                    culte++;
                    nbTypeBiens++;
                    break;
                case "LOGEMENT":
                    logements++;
                    nbTypeBiens++;
                    break;
                case "ESPACE NATUREL":
                    espaceNaturels++;
                    nbTypeBiens++;
                    break;
                case "BATIMENT AGRICOLE OU D'ELEVAGE":
                    agricole++;
                    nbTypeBiens++;
                    break;
                case "BATIMENT TECHNIQUE":
                    batTechnique++;
                    nbTypeBiens++;
                    break;
                case "SUPPORT DE PARCELLE":
                    parcelles++
                    nbTypeBiens++;
                    break;
                case "RESEAUX ET VOIRIES":
                    voirie++;
                    nbTypeBiens++;
                    break;
                case "MONUMENT ET MEMORIAL":
                    memorial++;
                    nbTypeBiens;
                    break;
                case "ESPACE AMENAGE":
                    espaceAmenage++;
                    nbTypeBiens++;
                    break;
                
            }
        }
    }
    
    let res =  [espaceNaturels,logements,bureaux,espaceAmenage,batTechnique,voirie,parcelles,sport,sanitaire,commerce,culturel,agricole,memorial,culte]; 
    return res;
}


function checkTypeVentes(latPoint, longPoint){
     //Type de ventes
     let greagre = 0;
     let droitDePro = 0;
     let appelDoffre = 0;
     let adjujication = 0;
     let autresDroit = 0;
     let echange = 0;
     let recoursAgence = 0;
     let VNI = 0;

     let nbVentes = 0;

     for(var i=0;i<dataCSV.length;i++)
     {
         let latitude = dataCSV[i]["latitude"];
         let longitude = dataCSV[i]["longitude"];
 
         let distance = Math.abs(latPoint - latitude) + Math.abs(longPoint - longitude);
         if(distance < 1){
            //Type de ventes
            switch(dataCSV[i]["procedure"]) {
                case "Gré à gré":
                    greagre++;
                    nbVentes++;
                    break;
                case "Appel d'offres":
                    appelDoffre++;
                    nbVentes++;
                    break;
                case "Droit de priorité":
                    droitDePro++;
                    nbVentes++;
                    break;
                case "Adjudication":
                    adjujication++;
                    nbVentes++;
                    break;
                case "Autres droits":
                    autresDroit++;
                    nbVentes++;
                    break;
                case "Echange (Hors Etat)":
                    echange++;
                    nbVentes++;
                    break;
                case "Recours à une agence":
                    recoursAgence++;
                    nbVentes;
                    break;
                case "VNI":
                    VNI++;
                    nbVentes++;
                    break;
            }
         }
    }

    let res = [greagre, droitDePro, appelDoffre, adjujication, autresDroit, echange, recoursAgence, VNI];
    return res;
}

function occupantCheck(latPoint, longPoint){
    //Occupant
    let ecologieM = 0;
    let defenseM = 0;
    let agricultureM = 0;
    let comptePubM = 0;
    let interieurM = 0;
    let educationM = 0;
    let justiceM = 0;
    let cultureM = 0;
    let economieM = 0;
    let travailM = 0;
    let foretM = 0;
    let affaireEtrangeresM = 0;
    let santeM = 0;
    let serviceMinistreM = 0;

    let nbOccupant = 0;

    for(var i=0;i<dataCSV.length;i++)
    {

        let latitude = dataCSV[i]["latitude"];
        let longitude = dataCSV[i]["longitude"];

        let distance = Math.abs(latPoint - latitude) + Math.abs(longPoint - longitude);
        if(distance < 2){
            //Occupant            
            if(dataCSV[i]["ministry"] != null){
                let occup = dataCSV[i]["ministry"].toLowerCase();
                if(occup.includes("cologi")){
                    ecologieM++;
                    nbOccupant++;
                }else if(occup.includes("agriculture")){
                    agricultureM++;
                    nbOccupant++;
                }else if(occup.includes("comptes publics")){
                    defenseM++;
                    nbOccupant++;
                }else if(occup.includes("budget")){
                    comptePubM++;
                    nbOccupant++;
                }else if(occup.includes("conomie")){
                    economieM++;
                    nbOccupant++;
                }else if(occup.includes("travail")){
                    travailM;
                    nbOccupant++;
                }else if(occup.includes("justice")){
                    justiceM++;
                    nbOccupant++;
                }else if(occup.includes("culture")){
                    cultureM++;
                    nbOccupant++;
                }else if(occup.includes("forêt")){
                    foretM++;
                    nbOccupant++;
                }else if(occup.includes("intérieur")){
                    interieurM++;
                    nbOccupant++;
                }else if(occup.includes("ducation") || occup.includes("enseignement")){
                    educationM++;
                    nbOccupant++;
                }else if(occup.includes("trangères")){
                    affaireEtrangeresM++;
                    nbOccupant++;
                }else if(occup.includes("santé")){
                    santeM++;
                    nbOccupant++;
                }else if(occup.includes("premier ministre")){
                    serviceMinistreM++;
                    nbOccupant++;
                }
        }
    

        }
    }
    let res = [ecologieM,defenseM, agricultureM, comptePubM, interieurM, educationM, justiceM, cultureM, economieM, travailM, foretM, affaireEtrangeresM, santeM, serviceMinistreM];
    return res;
}

function checkAcquereur(latPoint, longPoint){
    //Acquereurs
    let particuliers = 0;
    let collectivites = 0;
    let entreprise = 0;
    let etabPubTerri = 0;
    let asso = 0;
    let persoEtr = 0;

    let nbAcquereur = 0;

    for(var i=0;i<dataCSV.length;i++){

       let latitude = dataCSV[i]["latitude"];
       let longitude = dataCSV[i]["longitude"];

       let distance = Math.abs(latPoint - latitude) + Math.abs(longPoint - longitude);
       if(distance < 1){
         switch(dataCSV[i]["buyer"]){
             case "Associations":
                asso++;
                nbAcquereur++;
                break;
             case "Collectivités territoriales":
                collectivites++;
                nbAcquereur++;
                break;
             case "Collectivités territoriales ET Entreprises société":
                collectivites++;
                nbAcquereur++;
                break;
             case "Collectivités territoriales ET Etablissements publics locaux":
                collectivites++;
                nbAcquereur++;
                break;
             case "Entreprises société":
                entreprise++;
                nbAcquereur++;
                break;
            case "Entreprises société ET Collectivités territoriales":
                entreprise++;
                nbAcquereur++;
                break;
            case "Entreprises société ET Etablissements publics nationaux":
                entreprise++;
                nbAcquereur++;
                break;
            case "Etablissements publics locaux":
                etabPubTerri++;
                nbAcquereur++;
                break;
            case "Etablissements publics locaux ET Collectivités territoriales":
                etabPubTerri++;
                nbAcquereur++;
                break;
            case "Etablissements publics nationaux":
                etabPubTerri++;
                nbAcquereur++;
                break;
            case "Indivision":
                particuliers++;
                nbAcquereur++;
                break;
            case "Personne morale de droit étranger":
                persoEtr++;
                nbAcquereur++;
                break;
            case "Personne physique immatriculée (métropole)":
                particuliers++;
                nbAcquereur++;
                break;
            case "Personne physique immatriculée (métropole) ET Personne physiques non commerçantes":
                particuliers++;
                nbAcquereur++;
                break;
            case "Personnes physiques non commerçantes":
                particuliers++;
                nbAcquereur++;
                break;
            case "Personnes physiques non commerçantes ET Collectivités territoriales":
                particuliers++;
                nbAcquereur++;
                break;
            case "Personnes physiques non commerçantes ET Entreprises société":
                particuliers++;
                nbAcquereur++;
                break;
            case "Personnes physiques non commerçantes ET Personne physique immatriculée (métropole)":
                particuliers++;
                nbAcquereur++;
                break;
            case "Service de l'Etat":
                entreprise++;
                nbAcquereur++;
                break;
            case "Société de fait":
                entreprise;
                nbAcquereur++;
                break;
          }
        }

    }

    let res =  [particuliers, collectivites, entreprise, etabPubTerri, asso, persoEtr];
    console.log(res);
    return res;
}




$('.stat-number span').each(function() {
    var $this = $(this),
        countTo = $this.attr('data-count');

    $({ countNum: $this.text()}).animate({
            countNum: countTo
        },

        {

            duration: 4000,
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