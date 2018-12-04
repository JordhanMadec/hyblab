mapboxgl.accessToken = 'pk.eyJ1Ijoiam9yZGhhbiIsImEiOiJjaW4xZ3lxYzkwMG5qdzhseTN4eWViMWlxIn0.IjKwIeh3FBxZQmul2JPcew';


//----------  COLORS ----------

var gray = '#9e9e9e';
var green1 = '#69f0ae';
var green2 = '#8bc34a';
var green3 = '#558b2f';
var red = '#e53935';
var pink = '#f06292';
var orange1 = '#ff9800';
var orange2 = '#e65100';
var purple = '#673ab7';
var blue1 = '#bbdefb';
var blue2 = '#90caf9';
var blue3 = '#3f51b5';
var yellow1 = '#ffeb3b';
var yellow2 = '#fbc02d';

var enseignement = '#f44336';
var bureau = '#81d4fa';
var amenage = '#9575cd';
var monument = '#d84315';
var agricole = '#2e7d32';
var sanitaire = '#9fa8da';
var commerce = '#757575';
var naturel = '#4caf50';
var voirie = '#2196f3';
var culturel = '#ffeb3b';
var technique = '#e91e63';
var culte = '#eeff41';
var logement = '#ff7043';
var parcelle = '#009688';



//---------- RESIZE MAP ----------

var $window = $(window);

function fullSize() {
    size = Math.min($window.height(), $window.width()) * 0.8;

    $('#map').css({
        width: size,
        height: size
    });
}

fullSize();
$window.resize(fullSize);









//---------- CREATE MAP ----------

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v9',
    center: [2.467531, 46.725433],
    maxZoom: 15,
    maxBounds: [
        [-8.467531, 38.725433],
        [13.467531, 53.725433]
    ]
});


//---------- ZOOM ON ZIPCODE ----------

var zoomZipcode = function() {
    var zipcode = $("#map-zipcode-input").val();

    if (zipcode.length == 0) {
        return;
    }

    $.get("https://geo.api.gouv.fr/communes?codePostal=" + zipcode + "&fields=centre&format=json&geometry=centre", function (data) {
        map.flyTo({
            zoom: 11,
            center: data[0].centre.coordinates
        });
    });
}

$("#map-search-button").click(function() {
    zoomZipcode();
});





//---------- CREATE UNCLUSTERED POINT LAYER ----------

var getUnclusteredPointsLayer = function(id, clustered) {
    return {
        id: id,
        type: "circle",
        source: clustered ? "patrimonyClustered" : "patrimonyUnclustered",
        filter: ["all", ["!", ["has", "point_count"]]],
        paint: {
            "circle-color": [
                "match",
                ["get", "nature"],
                "BATIMENT AGRICOLE OU D'ELEVAGE", green1,
                "BATIMENT CULTUREL", yellow1,
                "BATIMENT D'ENSEIGNEMENT OU DE SPORT", red,
                "BATIMENT SANITAIRE OU SOCIAL", orange1,
                "BATIMENT TECHNIQUE", pink,
                "BUREAU", gray,
                "COMMERCE", blue2,
                "EDIFICE DE CULTE", yellow2,
                "ESPACE AMENAGE", purple,
                "ESPACE NATUREL", green2,
                "LOGEMENT", blue1,
                "MONUMENT ET MEMORIAL", orange2,
                "RESEAUX ET VOIRIES", blue3,
                "SUPPORT DE PARCELLE", green3,
                "#000"
            ],
            "circle-radius": 7,
            "circle-stroke-width": 2,
            "circle-stroke-color": "#fff"
        }
    }
}




//---------- MAP LAYERS ----------

map.on('load', function() {
    // Set language to french
    map.addControl(new MapboxLanguage({
        defaultLanguage: 'fr'
    }));
    // Set water color
    map.setPaintProperty('water', 'fill-color', '#000');
    // Add a new source from our GeoJSON data and set the
    // 'cluster' option to true. GL-JS will add the point_count property to your source data.
    map.addSource("patrimonyClustered", {
        type: "geojson",
        data: "https://raw.githubusercontent.com/JordhanMadec/hyblab/master/public/data.geojson",
        cluster: true,
        clusterRadius: 30
    });
    map.addSource("patrimonyUnclustered", {
        type: "geojson",
        data: "https://raw.githubusercontent.com/JordhanMadec/hyblab/master/public/data.geojson",
        cluster: false
    });

    map.addLayer({
        id: "clusters",
        type: "circle",
        source: "patrimonyClustered",
        filter: ["has", "point_count"],
        paint: {
            "circle-color": "#FFF",
            "circle-opacity": 0.8,
            "circle-radius": [
                "step",
                ["get", "point_count"],
                20,
                100,
                30,
                750,
                40
            ]
        }
    });

    map.addLayer({
        id: "cluster-count",
        type: "symbol",
        source: "patrimonyClustered",
        filter: ["has", "point_count"],
        layout: {
            "text-field": "{point_count_abbreviated}",
            "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
            "text-size": 12
        }
    });

    map.addLayer(getUnclusteredPointsLayer("point-clustered",true));
    map.addLayer(getUnclusteredPointsLayer("point-unclustered",false));
    map.setLayoutProperty("point-unclustered", 'visibility', 'none');




    //---------- ZOOM ON ZIPCODE ----------

    $("#map-zipcode-input").on('keypress', function (e) {
        if(e.which === 13) { // Press enter key

            //Disable textbox to prevent multiple submit
            $(this).attr("disabled", "disabled");

            zoomZipcode();

            //Enable the textbox again if needed.
            $(this).removeAttr("disabled");
        }
    });




    //---------- MAP CLICK LISTENER ----------

    // inspect a cluster on click
    map.on('click', 'clusters', function (e) {
        var features = map.queryRenderedFeatures(e.point, { layers: ['clusters'] });
        var clusterId = features[0].properties.cluster_id;
        map.getSource('patrimonyClustered').getClusterExpansionZoom(clusterId, function (err, zoom) {
            if (err)
                return;

            map.easeTo({
                center: features[0].geometry.coordinates,
                zoom: zoom
            });
        });
    });

    var getPicto = function(nature) {
        switch (nature) {
            case "BATIMENT AGRICOLE OU D'ELEVAGE": return 'batiment-agricole';
            case 'BATIMENT CULTUREL': return 'batiment-culturel';
            case "BATIMENT D'ENSEIGNEMENT OU DE SPORT": return 'batiment-sport';
            case 'BATIMENT SANITAIRE OU SOCIAL': return 'batiment-sanitaire';
            case 'BATIMENT TECHNIQUE': return 'batiment-technique';
            case 'BUREAU': return 'bureau';
            case 'COMMERCE': return 'commerce';
            case 'EDIFICE DE CULTE': return 'edifice-culte';
            case 'ESPACE AMENAGE': 'espace-amenage';
            case 'ESPACE NATUREL': return 'espace-naturel';
            case 'LOGEMENT': return 'logement';
            case 'MONUMENT ET MEMORIAL': return 'monument';
            case 'RESEAUX ET VOIRIES': return 'reseaux-voiries';
            case 'SUPPORT DE PARCELLE': 'support-parcelle';
            default: return '';
        }
    }

    var displayIdCard = function (e) {
        var coordinates = e.features[0].geometry.coordinates.slice();
        var patrimony = e.features[0].properties;

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }


        address = patrimony.numero.trim() + patrimony.cardinal.trim() + " " + patrimony.voie.trim() + " " + patrimony.address.trim();
        address = address.trim();

        if (address == "null") {
            address = patrimony.lieu_dit.trim().length > 0 ? patrimony.lieu_dit.trim() : "Pas d'adresse";
        } else if (patrimony.lieu_dit.trim().length > 0) {
            address = patrimony.address.trim() != patrimony.lieu_dit.trim() ? address + " (" + patrimony.lieu_dit.trim() + ")" : address;
        }

        subtitle = patrimony.zipcode + ", " + patrimony.city
        description = patrimony.description.toLowerCase() != "null" ? patrimony.description : "Pas de description";

        imgSource = 'assets/images/pictos/' + getPicto(patrimony.nature) + '.svg';

        new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(
                "<div class='patrimony-id'>" +
                    "<div class='patrimony-id-header'>" +
                        "<img src=" + imgSource + " class='patrimony-id-header-image'>" +
                        "<div class='patrimony-id-title-container'>" +
                            "<div class='patrimony-id-title'>" + address.toLowerCase() + "</div>" +
                            "<div class='patrimony-id-subtitle'>" + subtitle + "</div>" +
                        "</div>" +
                    "</div>" +
                    "<div class='patrimony-id-details'>" +
                        "<div><div class='label'>Nature</div><div class='value'>" + patrimony.nature + "</div></div>" +
                        "<div><div class='label'>Statut</div><div class='value'>" + patrimony.state + "</div></div>" +
                        "<div><div class='label'>Ministère</div><div class='value'>" + patrimony.ministry + "</div></div>" +
                        "<div><div class='label'>Procédure</div><div class='value'>" + patrimony.procedure + "</div></div>" +
                        "<div><div class='label'>Mise en vente</div><div class='value'>" + patrimony.registration_year + "</div></div>" +
                        "<div><div class='label'>Vente</div><div class='value'>" + patrimony.disposal_year + "</div></div>" +
                        "<div><div class='label'>Acheteur</div><div class='value'>" + patrimony.buyer + "</div></div>" +
                        "<div><div class='label'>Description</div><div class='value'>" + description + "</div></div>" +
                    "</div>" +
                    "<div class='center-align' style='margin-top:10px;'>" +
                        "<a class='waves-effect waves-light btn modal-trigger yellow more-stats-button' href='#modal1' style='color: black;'>Voir Statistiques</a>" +
                    "</div>" +
                "</div>"
            )
            .addTo(map);
    }

    map.on('mouseenter', 'clusters', function () {
        map.getCanvas().style.cursor = 'pointer';
    });
    map.on('mouseleave', 'clusters', function () {
        map.getCanvas().style.cursor = '';
    });

    map.on('mouseenter', 'point-unclustered', function () {
        map.getCanvas().style.cursor = 'pointer';
    });
    map.on('mouseleave', 'point-unclustered', function () {
        map.getCanvas().style.cursor = '';
    });

    map.on('mouseenter', 'point-clustered', function () {
        map.getCanvas().style.cursor = 'pointer';
    });
    map.on('mouseleave', 'point-clustered', function () {
        map.getCanvas().style.cursor = '';
    });

    // Affiche la fiche du patrimoine
    map.on('click', 'point-unclustered', function (e) {
        displayIdCard(e);
    });
    map.on('click', 'point-clustered', function (e) {
        displayIdCard(e);
    });





    //---------- MAP FILTERS ----------

    var selectedFiltersNature = ['all-filters-nature'];
    var selectedFiltersState = ['all-filters-state'];
    var natureFilters = [];
    var stateFilters = [];

    var selectFilters = function () {
        $('.map-filter-nature').removeClass('selected');
        selectedFiltersNature.forEach(filter => {
            $('#' + filter).addClass('selected');
        });

        $('.map-filter-state').removeClass('selected');
        selectedFiltersState.forEach(filter => {
            $('#' + filter).addClass('selected');
        });

        let filterUnclusteredPoint = ["all", ["!", ["has", "point_count"]]];

        if (natureFilters.length > 0 || stateFilters.length > 0) {
            filterUnclusteredPoint = ["all"];

            if (natureFilters.length > 0) {
                filterUnclusteredPoint.push(['match', ['get', 'nature'], natureFilters, true, false]);
            }

            if (stateFilters.length > 0) {
                filterUnclusteredPoint.push(['match', ['get', 'state'], stateFilters, true, false]);
            }

            map.setLayoutProperty("clusters", 'visibility', 'none');
            map.setLayoutProperty("cluster-count", 'visibility', 'none');
            map.setLayoutProperty("point-clustered", 'visibility', 'none');
            map.setLayoutProperty("point-unclustered", 'visibility', 'visible');
        } else {
            map.setLayoutProperty("clusters", 'visibility', 'visible');
            map.setLayoutProperty("cluster-count", 'visibility', 'visible');
            map.setLayoutProperty("point-clustered", 'visibility', 'visible');
            map.setLayoutProperty("point-unclustered", 'visibility', 'none');
        }

        map.setFilter('point-unclustered', filterUnclusteredPoint);
    }

    var getFilterValue = function(filterId) {
        switch (filterId) {
            case 'batiment-agricole': return "BATIMENT AGRICOLE OU D'ELEVAGE";
            case 'batiment-culturel': return 'BATIMENT CULTUREL';
            case 'batiment-sport': return "BATIMENT D'ENSEIGNEMENT OU DE SPORT";
            case 'batiment-sanitaire': return 'BATIMENT SANITAIRE OU SOCIAL';
            case 'batiment-technique': return 'BATIMENT TECHNIQUE';
            case 'bureau': return 'BUREAU';
            case 'commerce': return 'COMMERCE';
            case 'edifice-culte': return 'EDIFICE DE CULTE';
            case 'espace-amenage': return 'ESPACE AMENAGE';
            case 'espace-naturel': return 'ESPACE NATUREL';
            case 'logement': return 'LOGEMENT';
            case 'monument': return 'MONUMENT ET MEMORIAL';
            case 'reseaux-voiries': return 'RESEAUX ET VOIRIES';
            case 'support-parcelle': return 'SUPPORT DE PARCELLE';
            case 'cession-a-venir': return 'Cession à venir';
            case 'cession-realisee': return 'Cession réalisée';
            case 'cession-en-cours': return 'Cessions en cours';
            default: return '';
        }
    }

    $('.map-filter-nature').on('click', function (event) {
        if ($(this).attr('id') == 'all-filters-nature') {
            if ($(this).hasClass('selected')) {
                return;
            }

            selectedFiltersNature = ['all-filters-nature'];
            natureFilters = [];
            selectFilters();
            return;
        }


        if ($(this).hasClass('selected')) {
            selectedFiltersNature = selectedFiltersNature.filter(e => e != $(this).attr('id'));
            natureFilters = natureFilters.filter(e => e != getFilterValue($(this).attr('id')));
        } else {
            selectedFiltersNature = selectedFiltersNature.filter(e => e != 'all-filters-nature');
            selectedFiltersNature.push($(this).attr('id'));
            natureFilters.push(getFilterValue($(this).attr('id')));
        }

        if (selectedFiltersNature.length == 0) {
            selectedFiltersNature = ['all-filters-nature'];
            natureFilters = [];
        }

        selectFilters();
    })

    $('.map-filter-state').on('click', function (event) {
        if ($(this).attr('id') == 'all-filters-state') {
            if ($(this).hasClass('selected')) {
                return;
            }

            selectedFiltersState = ['all-filters-state'];
            stateFilters = [];
            selectFilters();
            return;
        }


        if ($(this).hasClass('selected')) {
            selectedFiltersState = selectedFiltersState.filter(e => e != $(this).attr('id'));
            stateFilters = stateFilters.filter(e => e != getFilterValue($(this).attr('id')));
        } else {
            selectedFiltersState = selectedFiltersState.filter(e => e != 'all-filters-state');
            selectedFiltersState.push($(this).attr('id'));
            stateFilters.push(getFilterValue($(this).attr('id')));
        }

        if (selectedFiltersState.length == 0) {
            selectedFiltersState = ['all-filters-state'];
            stateFilters = [];
        }

        selectFilters();
    })
});