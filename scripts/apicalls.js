const coordsCsv = 'https://raw.githubusercontent.com/RecursiveDev/tgc-proj1/main/datasources/muis_coordinates-small.csv'

async function fetchCoords(){
    let response = (await axios.get(coordsCsv)).data;
    // console.log(response);
    return response;
}

async function getCoords(){
    let coordsStr = await fetchCoords()
    // console.log(coordsStr)
    let lines = coordsStr.replace("\r","").split("\n");
    // console.log(lines)
    let parsedCoords = [];
    let headers = lines[0].split(",");
    // console.log(headers)

    for (let i=1;i<(lines.length-1);i++){
        let obj = {};
        let row = lines[i].split(",");

        for(var j=0;j<headers.length;j++){
            obj[headers[j]] = row[j];
        }
        parsedCoords.push(obj);
    }
    // console.log(parsedCoords)
    return parsedCoords;
}