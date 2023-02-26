# import required modules 
from selenium import webdriver 
from selenium.webdriver.common.keys import Keys 
from selenium.webdriver.chrome.options import Options
from bs4 import BeautifulSoup
import time 
import json
import re

# create instance of Chrome webdriver
options = Options()
options.add_argument("--headless=new")
driver = webdriver.Chrome(options = options) 
driver.get("https://www.muis.gov.sg/Halal/Halal-Certification/Certified-Eating-Establishments#") 

driver.implicitly_wait(10)

# enter asterisk 
print('Searching with wildcard')
driver.find_element("xpath",'//*[@id="txtHalalSearch"]').send_keys('*') 

# click on Search 
print('Clicking search')
driver.find_element("xpath",
	'//*[@id="btnHalalSearch"]').click() 
time.sleep(8)

# Initialize array to store restaurant data
res = []

# Iterate through 404 pages to scrape the data
i=1
rest_no = 0
while i <= 10:
    print('Scraping Page: ' + str(i))

    # get all divs
    results = driver.find_element("xpath",'//*[@id="results"]')

    # parse results with soup
    soup = BeautifulSoup(results.get_attribute('innerHTML'), 'html.parser')
    time.sleep(8)

    fullPage = soup.find('div', class_='search-result')
    # print(fullPage)
    restaurantNames = fullPage.find_all('p',class_='strong')
    restaurantLocations = fullPage.find_all('div',class_='location')

    #Iterate through all the restaurants on the page
    for index, restaurant in enumerate(restaurantNames):
        #name of restaurant
        name = restaurantNames[index].text.strip()
        addressRaw = ''.join(restaurantLocations[index].find('br').previous_sibling)
        address = re.sub(r"\n", "", addressRaw).strip()
        postalCodeRaw = ''.join(restaurantLocations[index].find('br').next_sibling)
        postalCode = re.sub(r"\n", "", postalCodeRaw).strip()
        data ={'id': str(rest_no),'name':name, 'address':address, 'postalCode':postalCode}
        res.append(data)
        rest_no+=1

    # Click next page
    driver.find_element("xpath","//a[@title='>> Next']").click()

    # Sleep while waiting for page to load
    time.sleep(8)
    i+=1

with open("halal-eateries-small.json", "a",  encoding='utf-8') as f:
    json.dump(res, f, indent=8, ensure_ascii=False)