# Earthquake Dashboard

## Project Description
  The United States Geological Survey, or USGS for short, is responsible for providing scientific data about natural hazards, the health of our ecosystems and environment, and the impacts of climate and land-use change. Their scientists develop new methods and tools to supply timely, relevant, and useful information about the Earth and its processes.

  The USGS is interested in building a new set of tools that will allow them to visualize their earthquake data. They collect a massive amount of data from all over the world each day, but they lack a meaningful way of displaying it. 

This is an interative dashboard to explore the ["USGS All Earthquakes from the Past 7 Days" dataset](https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson). This dashboard contains a map to visualize USGS data that will allow them to better educate the public and other government organizations (and hopefully secure more funding) on issues facing our planet.

## Built with
- Leaflet 
- HTML
- CSS
- JavaScript
- D3

## Getting Started 
**Prerequisites**

Make sure you have installed all of the following prerequisites on your development machine:
- Your favoriate code editor (e.g. VScode, etc.)
- Your favoriate browser (e.g. Google Chrome, Firefox, etc.

**Installation**
- Clone this repo and save it in your local directory
- git clone `https://github.com/srinivasj1987/leaflet-challenge.git`
- Open the repo in a code editor to see the codes

## Features
**The Map**

  The map is set to centered at GeoCoordinate [37.09, -95.71] (the United States), with a zoom level of 5. Each marker on the map indicates an incident of earthquake, and the orange lines across the map indicate the tectonic plates boundaries. The map is zoomable. You can also move the map by click and drag to explore different areas. 

See below snippet:
<img width="1463" alt="Snapshot 1 - part 1" src="https://github.com/srinivasj1987/leaflet-challenge/assets/132161799/cf2076cc-d436-42ec-89f9-10b6b1dfb98a">
  
**Layer Control**

The map has 3 base maps and 2 overlays to choose from. 
- The base map layers are the satellite (default), and gray scale, you can check a different circle to toggle between the base maps
- The overlays are Earthquakes layer and Tectonic Plates layer, you can select one or more overlays to visualize them on the map.

<img width="1247" alt="earthquake" src="https://github.com/srinivasj1987/leaflet-challenge/assets/132161799/316a193b-d1fe-4c13-9054-5216446f641c">

**Markers**

  - The size of the marker scales with the Location, date of earthquake, magnitude level and depth. 
  - The color of the marker changes with the depth level
  - Each marker has a tooltip with the Magnitude, the location and depth
  
**Legend**
  - The legend showing the depth and their corresponding color
  
## Credits
- Leaflet 
- D3
- USGS
- Tectonic Plates Provider: Hugo Ahlenius, Nordpil and Peter Bird ([Check out their github repo here](https://github.com/fraxen/tectonicplates))
