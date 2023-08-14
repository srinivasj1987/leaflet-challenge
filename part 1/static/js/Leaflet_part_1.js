//The API url from which the geojson data is taken
let queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

//Defining the map 
let myMap = L.map("map").setView([50.5260, -105.2551], 4)

// adding Tilelayer to the map 
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Retrienving the data from the geoJSON file from the API
d3.json(queryUrl).then(function (data) {

  //looping through the structure to get the coordinates and depth
  for (let i = 0; i < data.features.length; i++) {
    //assigning coordinates location to variable
    const coordinates = data.features[i].geometry.coordinates;
    //checking if coordinates are not null
    if (coordinates) {
      //assinging data to various variables
      const lat = coordinates[1];
      const lon = coordinates[0];
      const depth = coordinates[2];
      const magnitude = data.features[i].properties.mag;

      //Checking if magnitude is null
      if (typeof magnitude === 'number' && !isNaN(magnitude)) {
        // Creating a circle marker with appropriate properties and a popup
        let marker = L.circle([lat, lon], {
          fillOpacity: 0.8,
          color: chooseColor(depth),
          weight: 1,
          radius: markerSize(magnitude)
        }).bindPopup(`<h3>Location: ${data.features[i].properties.place}</h3><hr><p>Date: ${new Date(data.features[i].properties.time)}</p><p>Magnitude: ${data.features[i].properties.mag}</p><p>Depth: ${data.features[i].geometry.coordinates[2]}</p>`)
          .openPopup().addTo(myMap);
      }
    }
  }
});

// Function to calculate marker size based on magnitude
function markerSize(magnitude) {
  return (magnitude * 20000);
}

// Function to choose color based on depth
function chooseColor(depth) {
  if (depth < 10) return "#a3f600";
  else if (depth < 30) return "#dcf400";
  else if (depth < 50) return "#f7db11";
  else if (depth < 70) return "#fdb72a";
  else if (depth < 90) return "#fca35d";
  else return "#ff5f65";
};

// Creating a legend for depth ranges
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
legend.addTo(myMap);