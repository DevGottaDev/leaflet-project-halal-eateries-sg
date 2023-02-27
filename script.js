let trent = [1.3076,103.8808]; // #trent latlong

// setup the tile layers
omp = L.tileLayer('https://maps-{s}.onemap.sg/v3/Default/{z}/{x}/{y}.png', {
    detectRetina: true,
    maxZoom: 18,
    minZoom: 11
})

async function buildMap(){
    let coords = await getCoords();
    let markers = [];

    for (let i = 0; i < coords.length; i++) {
        let coord = coords[i];
        let marker = new L.marker([coord['LATITUDE'],coord['LONGITUDE']]);
        markers.push(marker);
    }

    let locations = L.layerGroup(markers)

    let map = L.map('map',{
        center: trent,
        zoom: 12,
        layers: omp, locations

    });

    let baseLayers = {
        "OneMap SG": omp,
    }
    
    let overlayLayers = {
        "Halal Restaurants": locations
    }

    let layerControl = L.control.layers(baseLayers, overlayLayers).addTo(map)
}
buildMap();