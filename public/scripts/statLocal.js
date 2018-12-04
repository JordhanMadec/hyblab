function checkTypeDeBien(latPoint, longPoint){
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

        let distance = Math.sqrt(Math.pow((latPoint - latitude),2) + Math.pow((longPoint - longitude),2));
        if(distance < 0.25){
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

function checkStat(latPoint, longPoint) {
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

    //Type de ventes
    let greagre = 0;
    let droitDePro = 0;
    let appelDoffre = 0;
    let adjujication = 0;
    let autresDroit = 0;
    let echange = 0;
    let recoursAgence = 0;
    let VNI = 0;

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

    //Acquereurs
    let particuliers = 0;
    let collectivites = 0;
    let entreprise = 0;
    let etabPubTerri = 0;
    let asso = 0;
    let persoEtr = 0;

    //Duree de ventes
    let moinsUnAn = 0;
    let entreUnetDe = 0;
    let plusDeDeux = 0;

    let nbCorrect = 0;
    let nbVentes = 0;
    let nbTypeBiens = 0;
    let nbOccupant = 0;

    for(var i=0;i<dataCSV.length;i++)
    {

        let latitude = dataCSV[i]["latitude"];
        let longitude = dataCSV[i]["longitude"];

        let distance = Math.sqrt(Math.pow((latPoint - latitude),2) + Math.pow((longPoint - longitude),2));
        if(distance < 0.25){
            nbCorrect++;

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

        }//Fin if
    }//Fin For
    console.log(nbOccupant);

    console.log(nbVentes);
    console.log("Adj " + adjujication);
}

//checkStat(48.926296,2.222054);

