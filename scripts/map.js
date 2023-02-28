let center = [1.3306,103.8158]; // center latlong

let map = L.map('map').setView(center, 12);

// setup the tile layers
let mapBounds = new L.LatLngBounds(
    new L.LatLng(1.1443, 103.596),
    new L.LatLng(1.4835, 104.1));

function initTiles(locations){
    ompNight = L.tileLayer('https://maps-{s}.onemap.sg/v3/Night/{z}/{x}/{y}.png', {
        detectRetina: true,
        maxZoom: 19,
        minZoom: 13,
        zoom: 13,
        maxBounds: mapBounds,
        maxBoundsViscosity: 1,
        layers: locations
    }).addTo(map);
}

//set the icon parameters
function getIcon(iconUrl){
    let halalIcon = L.icon({
        iconUrl: iconUrl,
        iconSize:     [48, 48], 
        iconAnchor:   [18, 18], 
        popupAnchor:  [0, -10] 
    });
    return halalIcon
}

//populate layer with markers using foursquare icons
async function populateMarkers(){
    let features = await getFeatures();
    let markers = [];

    for (let i = 0; i < features.length; i++) {
        let feature = features[i];
        let name = String(feature['name']);
        let foursquare = await fetchFoursquare(name);
        let iconUrl = 'https://ss3.4sqi.net/img/categories_v2/food/default_64.png'
        try{
        iconUrl = String(foursquare.results[0].categories[0].icon.prefix) + '64.png'
        // console.log(iconUrl);
        }
        catch{}
        let address = String(feature['address']);
        let postalCode = String(feature['postalCode']);
        let marker = new L.marker([feature['latitude'],feature['longitude']], {icon: getIcon(iconUrl)}).bindTooltip(
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
    initTiles(locations);

    let baseLayers = {
    }

    let overlayLayers = {
        "Halal Restaurants": locations.addTo(map)
    }
    let layerControl = L.control.layers(baseLayers, overlayLayers).addTo(map);
}

async function mapInit(){
   await buildMap();

}