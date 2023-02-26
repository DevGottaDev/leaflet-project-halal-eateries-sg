let trent = [1.3076,103.8808]; // #Cambridge latlong
let map = L.map('map').setView(trent, 13); // #2 Set the center point

// setup the tile layers
L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
    maxZoom: 20,
	attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
    tileSize: 512,
    zoomOffset: -1
}).addTo(map);

let fitzMarker = L.marker([52.20,0.119]);
fitzMarker.addTo(map);
fitzMarker.bindPopup("<p>Fitzwilliam Museum</p>")

getCoords()
