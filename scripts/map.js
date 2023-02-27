var halalIcon = L.icon({
    iconUrl: 'https://github.com/RecursiveDev/tgc-proj1/blob/main/assets/halal_icon.png?raw=true',

    iconSize:     [30, 37.5], // size of the icon
    iconAnchor:   [18, 18], // point of the icon which will correspond to marker's location
    popupAnchor:  [0, -10] // point from which the popup should open relative to the iconAnchor
});

let center = [1.3306,103.8158]; // center latlong

// setup the tile layers
const mapBounds = new L.LatLngBounds(
    new L.LatLng(1.1443, 103.596),
    new L.LatLng(1.4835, 104.1));

ompDay = L.tileLayer('https://maps-{s}.onemap.sg/v3/Default/{z}/{x}/{y}.png', {
})

ompNight = L.tileLayer('https://maps-{s}.onemap.sg/v3/Night/{z}/{x}/{y}.png', {
})

ompGrey = L.tileLayer('https://maps-{s}.onemap.sg/v3/Grey/{z}/{x}/{y}.png', {
})

ompOriginal = L.tileLayer('https://maps-{s}.onemap.sg/v3/Original/{z}/{x}/{y}.png', {
})

async function populateMarkers(){
    let coords = await getCoords();
    let markers = [];

    for (let i = 0; i < coords.length; i++) {
        let coord = coords[i];
        let marker = new L.marker([coord['LATITUDE'],coord['LONGITUDE']], {icon: halalIcon});
        markers.push(marker);
    }
    return markers;
}

async function buildMap(){
    markers = await populateMarkers()
    let locations = L.layerGroup(markers)

    let map = L.map('map',{
        detectRetina: true,
        maxZoom: 19,
        minZoom: 13,
        center: center,
        zoom: 13,
        maxBounds: mapBounds,
        maxBoundsViscosity: 1,
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

async function mapInit(){
   await buildMap();
}