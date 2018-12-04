//----------  STATS ----------

function initModal() {
    $('.modal').modal();

    $('.modal').modal({
        onOpenEnd: function(el) {
            $('.tabs').tabs({
                swipeable: true,
                responsiveThreshold: Infinity
            });

            $('.tab a').click(function (event) {
                console.log($(this));

                if (!e) var e = window.event
                e.cancelBubble = true;
                if (e.stopPropagation) e.stopPropagation();

                $('.tab a').removeClass('active');
                $(this).addClass('active');
                $('.tabs').tabs();
            });
        }
    });
}

function initGraph() {
    /* ---------------
    GRAPH TYPE DE BIEN
    ----------------- */
    var ctx = document.getElementById("typeBiens").getContext('2d');
    var data = {
    labels: ["Espace naturel (54.7 %)", "Logement (15.2 %) ", "Bureaux (10.6 %) ","Espace amenage (6.6 %) ", "Batiment technique (6 %) ", "Reseaux et voiries (3 %) ", "Support de parcelle (1.6 %) ", "Batiment enseignement ou sport (0.74 %) ", "Batiment sanitaire (0.50 %) ", "Commerce (0.20 %) ", "Batiment culturel (0.18 %) ", "Agricole ou elevage (0.18 %) ", "Monument et memorial (0.10 %) ", "Edifice de culte (0.09 %) "],
      datasets: [
        {
            fill: true,
            backgroundColor: [naturel, logement, bureau, amenage, technique, voirie, parcelle, enseignement, sanitaire, commerce, culturel, agricole, monument, culte],
            data: [2606, 723, 507, 317, 289, 142, 79, 35, 25, 10, 9, 9, 6, 4],
            // Notice the borderColor
            borderColor: ['white','white','white','white','white','white','white','white','white','white','white','white','white','white'],
            borderWidth: [2,2,2,2,2,2,2,2,2,2,2,2,2,2]
        }
      ]
    };

    var options = {
        legend: {
            display: true,
            position: 'right'
        }
    }

    // Chart declaration:
    var myBarChart = new Chart(ctx, {
        type: 'pie',
        data: data,
        options: options
    });

    var ctx = document.getElementById("typeBiensLocal").getContext('2d');
    var data = {
    labels: ["Espace naturel (54.7 %)", "Logement (15.2 %) ", "Bureaux (10.6 %) ","Espace amenage (6.6 %) ", "Batiment technique (6 %) ", "Reseaux et voiries (3 %) ", "Support de parcelle (1.6 %) ", "Batiment enseignement ou sport (0.74 %) ", "Batiment sanitaire (0.50 %) ", "Commerce (0.20 %) ", "Batiment culturel (0.18 %) ", "Agricole ou elevage (0.18 %) ", "Monument et memorial (0.10 %) ", "Edifice de culte (0.09 %) "],
      datasets: [
        {
            fill: true,
            backgroundColor: [naturel, logement, bureau, amenage, technique, voirie, parcelle, enseignement, sanitaire, commerce, culturel, agricole, monument, culte],
            data: [2606, 723, 507, 317, 289, 142, 79, 35, 25, 10, 9, 9, 6, 4],
            // Notice the borderColor
            borderColor: ['white','white','white','white','white','white','white','white','white','white','white','white','white','white'],
            borderWidth: [2,2,2,2,2,2,2,2,2,2,2,2,2,2]
        }
      ]
    };

    var options = {
        legend: {
            display: true,
            position: 'right'
        }
    }

    // Chart declaration:
    var myBarChart = new Chart(ctx, {
        type: 'pie',
        data: data,
        options: options
    });
    /* ---------------
    FIN GRAPH TYPE DE BIEN
    ----------------- */


    /* ---------------
    GRAPH TYPE DE VENTE
    ----------------- */
    var ctx = document.getElementById("typeVente").getContext('2d');
    var data = {
    labels: ["Gre a gre (38.70 %)", "Droit de priorite (28.36 %) ", "Appel d'offres (18 %) ","Adjudication (7.60 %) ", "Autres droits (6.20 %) ", "Echange (hors Etats) (0.50 %) ", "Recours a une agence (0.47 %) ", "VNI (0.16 %) "],
      datasets: [
        {
            fill: true,
            backgroundColor: [green1, blue3,gray, purple, pink,blue1, green2, red],
            data: [1642, 1203, 762, 323, 262, 23, 20, 7],
            // Notice the borderColor
            borderColor: ['black'],
            borderWidth: [0]
        }
      ]
    };

    var options = {
        legend: {
            display: true,
            position: 'right'
        }
    }

    // Chart declaration:
    var myBarChart = new Chart(ctx, {
        type: 'pie',
        data: data,
        options: options
    });

    var ctx = document.getElementById("typeVenteLocal").getContext('2d');
    var data = {
    labels: ["Gre a gre (38.70 %)", "Droit de priorite (28.36 %) ", "Appel d'offres (18 %) ","Adjudication (7.60 %) ", "Autres droits (6.20 %) ", "Echange (hors Etats) (0.50 %) ", "Recours a une agence (0.47 %) ", "VNI (0.16 %) "],
      datasets: [
        {
            fill: true,
            backgroundColor: [green1, blue3,gray, purple, pink,blue1, green2, red],
            data: [1642, 1203, 762, 323, 262, 23, 20, 7],
            // Notice the borderColor
            borderColor: ['black'],
            borderWidth: [0]
        }
      ]
    };

    var options = {
        legend: {
            display: true,
            position: 'right'
        }
    }

    // Chart declaration:
    var myBarChart = new Chart(ctx, {
        type: 'pie',
        data: data,
        options: options
    });
    /* ---------------
    FIN GRAPH TYPE DE VENTE
    ----------------- */



    /* ---------------
    GRAPH OCCUPANTS
    ----------------- */
    var ctx = document.getElementById("occupants").getContext('2d');
    var data = {
    labels: ["Ecologie (49.10 %)", "Defense (11 %) ", "Agriculte et Peche (6.40 %) ","Comptes publics (4.60 %) ", "Intérieur (4 %) ", "Education nationale (3.50 %) ", "Justice (3.37 %) ", "Culture (1.40 %) ", "Economie (1.30 %) ", "Travail (1%) ", "Office des forets (0.80%)", "Affaires etrangeres (0.70%)", "Sante (0.50%) ", "Service du 1er ministre (0.35%)"],
      datasets: [
        {
            fill: true,
            backgroundColor: [green1, blue3,gray, purple, pink,blue1, green2, red, orange1, blue2, yellow1,green3,orange2, yellow2],
            data: [1941, 434, 255, 185, 160, 140, 133, 54, 53, 40, 29, 27, 20, 14],
            // Notice the borderColor
            borderColor: ['black'],
            borderWidth: [0]
        }
      ]
    };

    var options = {
        legend: {
            display: true,
            position: 'right'
        }
    }

    // Chart declaration:
    var myBarChart = new Chart(ctx, {
        type: 'pie',
        data: data,
        options: options
    });

    var ctx = document.getElementById("occupantsLocal").getContext('2d');
    var data = {
    labels: ["Ecologie (49.10 %)", "Defense (11 %) ", "Agriculte et Peche (6.40 %) ","Comptes publics (4.60 %) ", "Intérieur (4 %) ", "Education nationale (3.50 %) ", "Justice (3.37 %) ", "Culture (1.40 %) ", "Economie (1.30 %) ", "Travail (1%) ", "Office des forets (0.80%)", "Affaires etrangeres (0.70%)", "Sante (0.50%) ", "Service du 1er ministre (0.35%)"],
      datasets: [
        {
            fill: true,
            backgroundColor: [green1, blue3,gray, purple, pink,blue1, green2, red, orange1, blue2, yellow1,green3,orange2, yellow2],
            data: [1941, 434, 255, 185, 160, 140, 133, 54, 53, 40, 29, 27, 20, 14],
            // Notice the borderColor
            borderColor: ['black'],
            borderWidth: [0]
        }
      ]
    };

    var options = {
        legend: {
            display: true,
            position: 'right'
        }
    }

    // Chart declaration:
    var myBarChart = new Chart(ctx, {
        type: 'pie',
        data: data,
        options: options
    });
    /* ----------------
    FIN GRAPH OCCUPANTS
    ----------------- */



    /* ---------------
    GRAPH ACQUEREURS
    ----------------- */
    var ctx = document.getElementById("acquereurs").getContext('2d');
    var data = {
    labels: ["Particuliers (39.90 %)", "Collectivite territoriale (33.50 %) ", "Entreprises (16.70 %) ","Etablissement public local (8.40 %) ", "Association (1.10 %) ", "Personnes morale de droit etranger (0.10 %) "],
      datasets: [
        {
            fill: true,
            backgroundColor: [green1, blue3,gray, purple, pink, blue1],
            data: [1688, 1419, 707, 357, 48, 6],
            // Notice the borderColor
            borderColor: ['black'],
            borderWidth: [0]
        }
      ]
    };

    var options = {
        legend: {
            display: true,
            position: 'right'
        }
    }

    // Chart declaration:
    var myBarChart = new Chart(ctx, {
        type: 'pie',
        data: data,
        options: options
    });

    var ctx = document.getElementById("acquereursLocal").getContext('2d');
    var data = {
    labels: ["Particuliers (39.90 %)", "Collectivite territoriale (33.50 %) ", "Entreprises (16.70 %) ","Etablissement public local (8.40 %) ", "Association (1.10 %) ", "Personnes morale de droit etranger (0.10 %) "],
      datasets: [
        {
            fill: true,
            backgroundColor: [green1, blue3,gray, purple, pink, blue1],
            data: [1688, 1419, 707, 357, 48, 6],
            // Notice the borderColor
            borderColor: ['black'],
            borderWidth: [0]
        }
      ]
    };

    var options = {
        legend: {
            display: true,
            position: 'right'
        }
    }

    // Chart declaration:
    var myBarChart = new Chart(ctx, {
        type: 'pie',
        data: data,
        options: options
    });
    /* ----------------
    FIN GRAPH ACQUEREURS
    ----------------- */



    /* ---------------
    GRAPH DUREE VENTES
    ----------------- */
    var ctx = document.getElementById("duree").getContext('2d');
    var data = {
    labels: ["Moins de 1 an (48.80 %)", "Entre 1 et 2 ans (27 %) ", "Plus de 2 ans (24.2%) "],
      datasets: [
        {
            fill: true,
            backgroundColor: [green1, blue3, gray],
            data: [1688, 1419, 707],
            // Notice the borderColor
            borderColor: ['black'],
            borderWidth: [0]
        }
      ]
    };

    var options = {
        legend: {
            display: true,
            position: 'right'
        }
    }

    // Chart declaration:
    var myBarChart = new Chart(ctx, {
        type: 'pie',
        data: data,
        options: options
    });
    /* ----------------
    FIN DUREE VENTES
    ----------------- */

  }
