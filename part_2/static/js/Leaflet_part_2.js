var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
var tectonicplatesUrl = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json"

// Perform a GET request to the query URL
d3.json(queryUrl).then(function (data) {
  // Console log the data retrieved 
  console.log(data);
  // Once we get a response, send the data.features object to the createFeatures function.
  earthQuake(data.features);
  $('#slider-timestamp').html(options.markers[ui.value].features.properties.time.substr(0, 19));
});


function earthQuake(data) {

  function onEachFeature(feature, layer) {
    layer.bindPopup(`<h3>Location: ${feature.properties.place}</h3><hr><p>Date: ${new Date(feature.properties.time)}</p><p>Magnitude: ${feature.properties.mag}</p><p>Depth: ${feature.geometry.coordinates[2]}</p>`);
  }

  var earthquakes = L.geoJSON(data, {
    onEachFeature: onEachFeature,

    // Point to layer used to alter markers
    pointToLayer: function (feature, latlng) {

      // Determine the style of markers based on properties
      var markers = {
        radius: feature.properties.mag * 20000,
        fillColor: chooseColor(feature.geometry.coordinates[2]),
        fillOpacity: 0.7,
        color: "black",
        weight: 0.5
      }
      return L.circle(latlng, markers);
    }
  });

  // Send our earthquakes layer to the createMap function/
  createMap(earthquakes);
};

// Function to choose color based on depth
function chooseColor(depth) {
  if (depth < 10) return "#a3f600";
  else if (depth < 30) return "#dcf400";
  else if (depth < 50) return "#f7db11";
  else if (depth < 70) return "#fdb72a";
  else if (depth < 90) return "#fca35d";
  else return "#ff5f65";
};

function createMap(earthquakes) {

  // Create tile layers
  var satellite = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  })

  var grayscale = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', {
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    attribution: '© Google'
  });

  // Create layer for tectonic plates
  let tectonicPlates = new L.layerGroup();

  // Perform a GET request to the tectonicplatesURL
  d3.json(tectonicplatesUrl).then(function (plates) {

    // Console log the data retrieved 
    console.log(plates);
    L.geoJSON(plates, {
      color: "orange",
      weight: 2
    }).addTo(tectonicPlates);
  });

  // Create a baseMaps object.
  var baseMaps = {
    "Satellite": satellite,
    "Grayscale": grayscale
  };

  // Create an overlay object to hold our overlay.
  var overlayMaps = {
    "Earthquakes": earthquakes,
    "Tectonic Plates": tectonicPlates
  };

  // Create our map, giving it the satellite map and earthquakes layers to display on load.
  var myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    layers: [satellite, earthquakes, tectonicPlates]
  });


  // Add legend
  var legend = L.control({ position: "bottomright" });
  legend.onAdd = function () {
    var div = L.DomUtil.create("div", "info legend"),
      depth = [-10, 10, 30, 50, 70, 90];

    div.innerHTML += "<h3 style='text-align: center'>Depth</h3>"

    for (var i = 0; i < depth.length; i++) {
      div.innerHTML +=
        '<i style="background:' + chooseColor(depth[i] + 1) + '"></i> ' + depth[i] + (depth[i + 1] ? '&ndash;' + depth[i + 1] + '<br>' : '+');
    }
    return div;
  };
  legend.addTo(myMap)

  // Create a layer control.
  // Pass it our baseMaps and overlayMaps.
  // Add the layer control to the map.
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);
};

