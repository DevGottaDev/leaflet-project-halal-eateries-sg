var halalIcon = L.icon({
    iconUrl: 'assets\halal_icon.png',

    iconSize:     [38, 95], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

let center = [1.35548,103.80551]; // center latlong

// setup the tile layers
const mapBounds = new L.LatLngBounds(
    new L.LatLng(1.49073, 104.1147),
    new L.LatLng(1.16, 103.575));

ompDay = L.tileLayer('https://maps-{s}.onemap.sg/v3/Default/{z}/{x}/{y}.png', {
    detectRetina: true,
    maxZoom: 19,
    minZoom: 12
})

ompNight = L.tileLayer('https://maps-{s}.onemap.sg/v3/Night/{z}/{x}/{y}.png', {
    detectRetina: true,
    maxZoom: 19,
    minZoom: 12
})

ompGrey = L.tileLayer('https://maps-{s}.onemap.sg/v3/Grey/{z}/{x}/{y}.png', {
    detectRetina: true,
    maxZoom: 19,
    minZoom: 12
})

ompOriginal = L.tileLayer('https://maps-{s}.onemap.sg/v3/Original/{z}/{x}/{y}.png', {
    detectRetina: true,
    maxZoom: 19,
    minZoom: 12
})

async function buildMap(){
    let coords = await getCoords();
    let markers = [];

    for (let i = 0; i < coords.length; i++) {
        let coord = coords[i];
        let marker = new L.marker([coord['LATITUDE'],coord['LONGITUDE']], {icon: halalIcon});
        markers.push(marker);
    }

    let locations = L.layerGroup(markers)

    let map = L.map('map',{
        center: center,
        zoom: 12,
        maxBounds: mapBounds,
        maxBoundsViscosity: 1.0,
        layers: ompDay, ompNight, ompGrey, ompOriginal, locations

    });

    let baseLayers = {
        "OneMap - Day Theme": ompDay.addTo(map),
        "OneMap - Night Theme": ompNight,
        "OneMap - Grey Theme": ompGrey,
        "OneMap - Original Theme": ompOriginal,


    }
    
    let overlayLayers = {
        "Halal Restaurants": locations.addTo(map)
    }

    let layerControl = L.control.layers(baseLayers, overlayLayers).addTo(map);
}
buildMap();