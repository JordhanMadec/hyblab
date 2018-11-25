mapboxgl.accessToken = 'pk.eyJ1Ijoiam9yZGhhbiIsImEiOiJjaW4xZ3lxYzkwMG5qdzhseTN4eWViMWlxIn0.IjKwIeh3FBxZQmul2JPcew';


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
        clusterMaxZoom: 15, // Max zoom to cluster points on
        clusterRadius: 35 // Radius of each cluster when clustering points (defaults to 50)
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
            "circle-color": [
                "step",
                ["get", "point_count"],
                "#51bbd6",
                50,
                "#f1f075",
                300,
                "#f28cb1"
            ],
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
            "circle-color": "#11b4da",
            "circle-radius": 4,
            "circle-stroke-width": 1,
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

        console.log(patrimony);

        new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(
                "<h4>" + patrimony.address + "</h4>" +
                "<h5>" + patrimony.zipcode + ", " + patrimony.city + "</h5>"
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