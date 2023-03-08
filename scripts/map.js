let center = [1.3606,103.8158]; // center latlong
let mapBounds = new L.LatLngBounds(
    new L.LatLng(1.1443, 103.596),
    new L.LatLng(1.4835, 104.1));

//initialize the map
var map = L.map('map', {
    center: center,
    zoom: 13,
    maxZoom: 19,
    minZoom: 13,
    maxBounds: mapBounds,
    maxBoundsViscosity: 1,
});

let ompNight = L.tileLayer('https://maps-{s}.onemap.sg/v3/Night/{z}/{x}/{y}.png', {
    detectRetina: true
}).addTo(map);

let baseLayers = {
    "OneMap Night Mode": ompNight
};

//theme layers
let ompDay = L.tileLayer('https://maps-{s}.onemap.sg/v3/Default/{z}/{x}/{y}.png', {
    detectRetina: true
});
let ompAged = L.tileLayer('https://maps-{s}.onemap.sg/v3/Original/{z}/{x}/{y}.png', {
    detectRetina: true
});

//initialize overlay layers
let locations = L.layerGroup(null);
let overlayLayers= {"Halal Restaurants": locations};

let layerControl = L.control.layers(baseLayers, overlayLayers).addTo(map);

//layer clustering plugin
let mcgLayerClustering = L.markerClusterGroup.layerSupport();

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
    mcgLayerClustering.checkIn(locations).addTo(map);
    locations.addTo(map);

    for (let i = 0; i < features.length; i++) {
        let feature = features[i];
        let name = String(feature['name']);
        let foursquare = await fetchFoursquare(name);
        let iconUrl = 'https://ss3.4sqi.net/img/categories_v2/food/default_64.png'
        let photoUrl = "";
        try{
        iconUrl = String(foursquare.results[0].categories[0].icon.prefix) + '64.png'
        // console.log(iconUrl);
        let fsq_id = String(foursquare.results[0].fsq_id);
        // console.log(fsq_id);
        let photoObj = await fetchFoursquarephoto(fsq_id);
        photoUrl = String(photoObj[0].prefix) + "500x200" + String(photoObj[0].suffix);
        // console.log('photourl is: ' + photoUrl);
        }
        catch(err){
            console.log("error is :" + err + "for index " + i + "with name " + name);
            console.log(foursquare);
        }
        let address = String(feature.address);
        let postalCode = String(feature.postalCode);
        let marker = new L.marker([feature.latitude,feature.longitude], {icon: getIcon(iconUrl)}).bindPopup(
            "<div class = 'address-div'>" +
            "<b>Name:</b> "+ name +
            "<br><b>Address:</b> "+ address +
            "<br><b>Postcode:</b> "+ postalCode + "</div>" +
            `<br><img src="`+ photoUrl + `" onerror="this.style.display='none'" class = "img-responsive w-100" alt="" style="height:50%">`
        );
        marker.on('mouseover', function(){
            this.openPopup();
        })
        locations.addLayer(marker);
    }
}

//main map method
async function mapInit(){
    await populateMarkers();
}