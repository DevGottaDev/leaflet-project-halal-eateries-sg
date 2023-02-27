let halalIcon = L.icon({
    iconUrl: 'https://github.com/RecursiveDev/tgc-proj1/blob/main/assets/halal_icon.png?raw=true',

    iconSize:     [30, 37.5], // size of the icon
    iconAnchor:   [18, 18], // point of the icon which will correspond to marker's location
    popupAnchor:  [0, -10] // point from which the popup should open relative to the iconAnchor
});

let center = [1.3306,103.8158]; // center latlong

// setup the tile layers
let mapBounds = new L.LatLngBounds(
    new L.LatLng(1.1443, 103.596),
    new L.LatLng(1.4835, 104.1));

ompDay = L.tileLayer('https://maps-{s}.onemap.sg/v3/Default/{z}/{x}/{y}.png', {
})

ompNight = L.tileLayer('https://maps-{s}.onemap.sg/v3/Night/{z}/{x}/{y}.png', {
})

async function populateMarkers(){
    let features = await getFeatures();
    let markers = [];

    for (let i = 0; i < features.length; i++) {
        let feature = features[i];
        let name = String(feature['name'])
        let address = String(feature['address'])
        let postalCode = String(feature['postalCode'])
        let marker = new L.marker([feature['latitude'],feature['longitude']], {icon: halalIcon}).bindPopup(
            "<b>Name:</b> "+ name +
            "<br><b>Address:</b> "+ address +
            "<br><b>Postcode:</b> "+ postalCode

        );
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
        layers: ompDay, ompNight, locations

    });

    let baseLayers = {
        "OneMap - Day Theme": ompDay.addTo(map),
        "OneMap - Night Theme": ompNight


    }
    
    let overlayLayers = {
        "Halal Restaurants": locations.addTo(map)
    }

    let layerControl = L.control.layers(baseLayers, overlayLayers).addTo(map);
}

async function mapInit(){
   await buildMap();
}