coordsCsv = 'https://raw.githubusercontent.com/RecursiveDev/tgc-proj1/main/datasources/muis_coordinates-small.csv'

async function getCoords(){
    response = (await axios.get(coordsCsv)).data
    console.log(response)
}