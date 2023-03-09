//FOR TESTING
const coordsCsv = 'https://raw.githubusercontent.com/RecursiveDev/leaflet-project-halal-eateries-sg/main/datasources/muis_coordinates-smallest.csv';

// const coordsCsv = 'https://raw.githubusercontent.com/RecursiveDev/leaflet-project-halal-eateries-sg/main/datasources/muis_coordinates-small.csv';
const restaurantJson = 'https://raw.githubusercontent.com/RecursiveDev/leaflet-project-halal-eateries-sg/main/datasources/muis/halal-eateries-small.json';

const foursquareplaces = 'https://api.foursquare.com/v3/places/search';
const foursquarephotos1 = 'https://api.foursquare.com/v3/places/'
const foursquarephotos2 = '/photos?limit=1&sort=POPULAR';
const token = 'fsq3Ea7301GXDGdL+eWZBEtsKa4xCAOuOr3H/sdFEncUCzQ=';

const onemapSearch ='https://developers.onemap.sg/commonapi/search';

async function fetchCoords(){
    let response = (await axios.get(coordsCsv)).data;
    // console.log(response);
    return response;
}

async function fetchRestaurant(){
    let response = (await axios.get(restaurantJson,
        )).data;
    // console.log(response);
    return response;
}

async function fetchFoursquare(restaurantName){
    let response = (await axios.get(foursquareplaces,{
        'params': {
            'near': 'singapore',
            'query': restaurantName,
            'categories':'13000',
            'sort':'relevance',
            'limit':'1'
        },
        'headers': {
            'Accept': 'application/json',
            'Authorization': token
        }
    }).catch()).data;
    // console.log(response);
    return response;
}

async function fetchFoursquarephoto(locationId){
    let foursquarephotos = foursquarephotos1 + locationId + foursquarephotos2;
    let response = (await axios.get(foursquarephotos,{
        'headers': {
            'Accept': 'application/json',
            'Authorization': token
        }
    })).data;
    //console.log(response);
    return response;
}

async function getFeatures(){
    let features = await fetchRestaurant();
    let coordsStr = await fetchCoords();
    // console.log(coordsStr)
    let lines = coordsStr.replace("\r","").split("\n");
    // console.log(lines)
    let markerData = [];
    let headers = lines[0].split(",");
    // console.log(headers)

    for (let i=1;i<(lines.length-1);i++){
        let obj = {};
        let row = lines[i].split(",");

        for(let j=0;j<headers.length;j++){
            obj[headers[j].toLowerCase()] = row[j];
        }
        obj['name'] = [(features[i-1]['name'])];
        obj['address'] = [(features[i-1]['address'])];
        obj['postalCode'] = [(features[i-1]['postalCode'])];
        markerData.push(obj);
    }
    // console.log(parsedCoords)
    // console.log(markerData)
    return markerData;
}

async function getLocation(searchString){
    let locResults =[];
    let response = (await axios.get(onemapSearch,{
        'params': {
            'searchVal': searchString,
            'returnGeom': 'Y',
            'getAddrDetails':'Y',
            'pageNum':'1'
        }
    })).data.results;

    for (let i=0; i < response.length; i++){
        let obj = {};
        obj['name'] = response[i].SEARCHVAL;
        obj['latitude'] = response[i].LATITUDE;
        obj['longitude'] = response[i].LONGITUDE;
        locResults.push(obj);
    }
    return locResults;
}