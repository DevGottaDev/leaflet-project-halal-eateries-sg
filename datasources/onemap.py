import requests
import csv
import json
import time
import pathlib

#.csv file write headers
csvheaders = ['ID','LATITUDE','LONGITUDE']

with open('muis_coordinates.csv','w',encoding ='utf-8',newline='') as c:
    writer=csv.writer(c)
    writer.writerow(csvheaders)

dataSource=[]

#open halal-eateries.json and read from it
with open ('muis\halal-eateries-small.json', 'r') as a:
    dataSource = json.load(a)
    print('Finished reading json')

#set up the url, headers and parameters
url = 'https://developers.onemap.sg/commonapi/search'

headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
}

#iterate through json and get lat/long and dump to csv
for source in dataSource:
    resData = []
    # print(source)
    id = source['id']
    postalCode = source.get('postalCode')
    #print(id)

    params = {
        'searchVal': postalCode,
        'returnGeom': 'Y',
        'getAddrDetails':'N'
    }

    #call onemap api and format to JSON
    response = requests.request("GET", url,headers=headers,params=params)
    resJson = response.json()
    print(resJson)

    #parse JSON response for lat/long and write to csv
    latitude = resJson['results'][0]['LATITUDE']
    longitude = resJson['results'][0]['LONGITUDE']
    data=[id, latitude, longitude]
    print(data)
    resData.append(data)


    with open('muis_coordinates-small.csv','a',encoding ='utf-8',newline='') as b:
        writer=csv.writer(b)
        writer.writerows(resData)

#alert when csv is done writing
print('CSV completed')