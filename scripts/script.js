let testbtn = document.querySelector('#testbtn');
testbtn.addEventListener('click', getFeaturesInView);

function getFeaturesInView() {
    console.log("button clicked");
    var features = [];
    map.eachLayer( function(layer) {
      if(layer instanceof L.Marker) {
        if(map.getBounds().contains(layer.getLatLng())) {
          features.push(layer.getLatLng());
        }
      }
    });
    console.log(features);
  }
  mapInit();