mapboxgl.accessToken = 'pk.eyJ1Ijoiam9yZGhhbiIsImEiOiJjaW4xZ3lxYzkwMG5qdzhseTN4eWViMWlxIn0.IjKwIeh3FBxZQmul2JPcew';


//----------  COLORS ----------

var gray = 'rgb(135, 135, 135)';
var green1 = 'rgb(115, 240, 180)';
var green2 = 'rgb(139, 202, 27)';
var green3 = 'rgb(10, 103, 64)';
var red = 'rgb(255, 2, 1)';
var pink = 'rgb(200, 0, 127)';
var orange1 = 'rgb(255, 146, 2)';
var orange2 = 'rgb(255, 100, 0)';
var purple = 'rgb(94, 30, 132)';
var blue1 = 'rgb(161, 210, 219)';
var blue2 = 'rgb(61, 146, 181)';
var blue3 = 'rgb(28, 42, 150)';
var yellow1 = 'rgb(255, 255, 0)';
var yellow2 = 'rgb(255, 200, 0)';





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

$("#map-zipcode-input").on('keypress', function (e) {
    if(e.which === 13) { // Press enter key

        //Disable textbox to prevent multiple submit
        $(this).attr("disabled", "disabled");

        zoomZipcode();

        //Enable the textbox again if needed.
        $(this).removeAttr("disabled");
    }
});











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
    map.addSource("patrimony", {
        type: "geojson",
        data: "https://raw.githubusercontent.com/JordhanMadec/hyblab/master/data.geojson",
        cluster: true,
        clusterRadius: 30 // Radius of each cluster when clustering points (defaults to 50)
    });

    map.addLayer({
        id: "clusters",
        type: "circle",
        source: "patrimony",
        filter: ["has", "point_count"],
        paint: {
            // Use step expressions (https://www.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
            // with three steps to implement three types of circles:
            //   * Blue, 20px circles when point count is less than 100
            //   * Yellow, 30px circles when point count is between 100 and 750
            //   * Pink, 40px circles when point count is greater than or equal to 750
            "circle-color": "#FFF",
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
        source: "patrimony",
        filter: ["has", "point_count"],
        layout: {
            "text-field": "{point_count_abbreviated}",
            "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
            "text-size": 12
        }
    });

    map.addLayer({
        id: "unclustered-point",
        type: "circle",
        source: "patrimony",
        filter: ["!", ["has", "point_count"]],
        paint: {
            "circle-color": [
                "match",
                ["get", "nature"],
                "BATIMENT AGRICOLE", red,
                "BATIMENT CULTUREL", yellow1,
                "BATIMENT D'ENSEIGNEMENT OU DE SPORT", green1,
                "BATIMENT SANITAIRE", orange1,
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
                "#FFEB3B"
            ],
            "circle-radius": 10,
            "circle-stroke-width": 2,
            "circle-stroke-color": "#fff"
        }
    });










    //---------- MAP CLICK LISTENER ----------

    // inspect a cluster on click
    map.on('click', 'clusters', function (e) {
        var features = map.queryRenderedFeatures(e.point, { layers: ['clusters'] });
        var clusterId = features[0].properties.cluster_id;
        map.getSource('patrimony').getClusterExpansionZoom(clusterId, function (err, zoom) {
            if (err)
                return;

            map.easeTo({
                center: features[0].geometry.coordinates,
                zoom: zoom
            });
        });
    });

    // Affiche la fiche du patrimoine
    map.on('click', 'unclustered-point', function (e) {
        var coordinates = e.features[0].geometry.coordinates.slice();
        var patrimony = e.features[0].properties;

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        title = patrimony.address.toLowerCase() != "null" ? patrimony.address : "Pas d'adresse";
        subtitle = patrimony.zipcode + ", " + patrimony.city
        description = patrimony.description.toLowerCase() != "null" ? patrimony.description : "Pas de description";

        new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(
                "<div class='patrimony-id'>" +
                    "<div class='patrimony-id-title'>" + title  + "</div>" +
                    "<div class='patrimony-id-subtitle'>" + subtitle + "</div>" +
                    "<div class='patrimony-id-details'>" +
                        "<div><div class='label'>Nature</div><div class='value'>" + patrimony.nature + "</div></div>" +
                        "<div><div class='label'>Statut</div><div class='value'>" + patrimony.state + "</div></div>" +
                        "<div><div class='label'>Ministère</div><div class='value'>" + patrimony.ministry + "</div></div>" +
                        "<div><div class='label'>Procédure</div><div class='value'>" + patrimony.procedure + "</div></div>" +
                        "<div><div class='label'>Acheteur</div><div class='value'>" + patrimony.buyer + "</div></div>" +
                        "<div><div class='label'>Mise en vente</div><div class='value'>" + patrimony.registration_year + "</div></div>" +
                        "<div><div class='label'>Vente</div><div class='value'>" + patrimony.disposal_year + "</div></div>" +
                        "<div><div class='label'>Acheteur</div><div class='value'>" + patrimony.buyer + "</div></div>" +
                        "<div><div class='label'>Description</div><div class='value'>" + description + "</div></div>" +
                    "</div>" +
                "</div>"
            )
            .addTo(map);
    });

    map.on('mouseenter', 'clusters', function () {
        map.getCanvas().style.cursor = 'pointer';
    });
    map.on('mouseleave', 'clusters', function () {
        map.getCanvas().style.cursor = '';
    });

    map.on('mouseenter', 'unclustered-point', function () {
        map.getCanvas().style.cursor = 'pointer';
    });
    map.on('mouseleave', 'unclustered-point', function () {
        map.getCanvas().style.cursor = '';
    });




    
    //---------- MAP FILTERS ----------

    var selectedItems = ['all-filters'];

    var selectFilters = function () {
        $('.map-filter').removeClass('selected');
        selectedItems.forEach(filter => {
            $('#' + filter).addClass('selected');
        });
    }

    $('.map-filter').on('click', function (event) {
        if ($(this).attr('id') == 'all-filters') {
            if ($(this).hasClass('selected')) {
                return;
            }

            selectedItems = ['all-filters'];
            selectFilters();
            return;
        }


        if ($(this).hasClass('selected')) {
            selectedItems = selectedItems.filter(e => e != $(this).attr('id'));
        } else {
            selectedItems = selectedItems.filter(e => e != 'all-filters');
            selectedItems.push($(this).attr('id'));
        }

        if (selectedItems.length == 0) {
            selectedItems = ['all-filters'];
        }

        selectFilters();
    })
});