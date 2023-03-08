let defaultTheme = document.querySelector('#default-theme');
defaultTheme.addEventListener('click', switchLayerDefault);

let nightTheme = document.querySelector('#night-theme');
nightTheme.addEventListener('click', switchLayerNight);

let agedTheme = document.querySelector('#old-theme');
agedTheme.addEventListener('click', switchLayerOld);

function switchLayerDefault() {
  layerControl.removeLayer(ompNight);
  layerControl.removeLayer(ompDay);
  layerControl.removeLayer(ompAged);
  layerControl.addBaseLayer(ompDay, 'OneMap Day Mode');
  ompDay.addTo(map);
  document.querySelector('#map').style.background='#6da7e3';
}

function switchLayerNight() {
  layerControl.removeLayer(ompNight);
  layerControl.removeLayer(ompDay);
  layerControl.removeLayer(ompAged);
  layerControl.addBaseLayer(ompNight, 'OneMap Night Mode');
  ompNight.addTo(map);
  document.querySelector('#map').style.background='#003652';
}

function switchLayerOld() {
  layerControl.removeLayer(ompNight);
  layerControl.removeLayer(ompDay);
  layerControl.removeLayer(ompAged);
  layerControl.addBaseLayer(ompAged, 'OneMap Classic Mode');
  ompAged.addTo(map);
  document.querySelector('#map').style.background='#bdd3f9';
}

mapInit();