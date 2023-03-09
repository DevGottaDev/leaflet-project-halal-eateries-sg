//initialize map
mapInit();

//start of clickable themes
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
  document.querySelector('#map').style.background = '#6da7e3';
}

function switchLayerNight() {
  layerControl.removeLayer(ompNight);
  layerControl.removeLayer(ompDay);
  layerControl.removeLayer(ompAged);
  layerControl.addBaseLayer(ompNight, 'OneMap Night Mode');
  ompNight.addTo(map);
  document.querySelector('#map').style.background = '#003652';
}

function switchLayerOld() {
  layerControl.removeLayer(ompNight);
  layerControl.removeLayer(ompDay);
  layerControl.removeLayer(ompAged);
  layerControl.addBaseLayer(ompAged, 'OneMap Classic Mode');
  ompAged.addTo(map);
  document.querySelector('#map').style.background = '#bdd3f9';
}
//end of clickable themes

//autocomplete search with flyto
const searchInput = document.querySelector('#search-input');
const searchResults = document.querySelector('#search-results');
searchInput.addEventListener('input', async function () {
  try {
    results = await getLocation(searchInput.value);
    searchResults.innerHTML = '';
    for (let i = 0; i <= results.length; i++) {
      const option = document.createElement('option');
      option.value = results[i].name;
      searchResults.appendChild(option);
    }
  }
  catch (err) {
  }
});

const searchBtn = document.querySelector('#search-button');
let searchMarker = null;
searchBtn.addEventListener('click', async function (event) {
  event.preventDefault();
  results = await getLocation(searchInput.value);

  if (searchMarker !== null) {
    map.removeLayer(searchMarker);
  }

  searchMarker = new L.marker([results[0].latitude, results[0].longitude], ).bindPopup(
    "<div id='search-location'>"+
    "<b>Name:</b> "+ results[0].name +
    "</div>");
  searchMarker.addTo(map);
  searchMarker.openPopup()
  map.flyTo([results[0].latitude, results[0].longitude], 16)

});