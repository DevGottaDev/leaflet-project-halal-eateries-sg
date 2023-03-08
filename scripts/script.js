let testbtn = document.querySelector('#testbtn');
testbtn.addEventListener('click', switchLayer);

function switchLayer() {
  let ompDay = L.tileLayer('https://maps-{s}.onemap.sg/v3/Default/{z}/{x}/{y}.png', {
    detectRetina: true
}).addTo(map);

    console.log("button clicked");
    // layerControl.removeLayer(locations);
    // mcgLayerClustering.checkOut(locations);
    let iconColor = document.querySelectorAll('.leaflet-marker-icon');
    console.log(iconColor);
    iconColor.style.filter = 'none';
    layerControl.addBaseLayer(ompDay, 'OneMap Day Mode')
    layerControl.removeLayer(ompNight);
  }
  mapInit();