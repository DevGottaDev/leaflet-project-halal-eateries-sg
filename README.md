# **Halal Go Where? An interactive leaflet.js app** 

![Multi device view](https://github.com/RecursiveDev/leaflet-project-halal-eateries-sg/blob/main/readme%20assets/multi-device-view.PNG)

Try out the site [here](https://halalgowhere.netlify.app/).

## Project Summary
"Halal Go Where?" is a mobile-responsive front-end web application that aims to allow users to view and explore MUIS-certified Halal eateries located in Singapore.

### Why make this application?  
Currently, there exists only a few resources with which Muslims living in Singapore can use to find places to eat. They are the official MUIS [website](https://www.muis.gov.sg/Halal/Halal-Certification/Certified-Eating-Establishments#) and the MuslimSG application. However both sources come with the downsides. MUIS's site only allows the user to check if a restaurant is halal certified and the MuslimSG application only works if downloaded and installed on a compatible device. Halal Go Where? (Refered to from here on HGW) allows the user to access an interactive leaflet-map based application from any device with a browser.

### Where is the data from?
The data used was scraped from MUIS's official website using the Selenium and BeautifulSoup4 plugins for python into a JSON file.. You can view the source code of the scraper [here](https://github.com/RecursiveDev/leaflet-project-halal-eateries-sg/tree/main/datasources/muis). This was necessary as there currently does not exist any public API of all Halal eateries in Singapore.

The data was then manually cleaned due to a large amount of incorrect data on MUIS's site and then reverse geo-coded through the [OneMap Search API](https://app.swaggerhub.com/apis/onemap-sg/new-onemap-api/1.0.4#/OneMap%20REST%20APIs/search). The results were then stored in CSV format for later use by the main web application.

### User Story
| User Story | Acceptance Criteria |
| ----------- | ----------- |
| I want to easily locate a halal eatery near me | Geolocator clickable option in map to allow user to center the map on them |
| I want to easily locate a halal eatery near a specific location | Search bar with auto-complete/auto-suggest feature that allows the user to center the map on the target location |
| I want to be able to easily identify the cuisine of the halal eateries near my chosen location | Map markers are dynamically generated using Foursquare's api to more accurate depict the cuisine of the point of interest |
| I want to get the exact address of the halal eatery i am interested in | Map markers have a popup on hover that displays the eatery's address as awell as a small preview image of the food/restaurant |

### Goals  
This app is targeted at Muslims living in Singapore as well as any potential Muslim visitors to Singapore such as tourists etc. The app also aims to help support halal-ceritfied establishments by raising awareness of their existence, helping to keep them in business, allowing for more diversity in menu options for Muslim consumers.




## UI/UX
Below we willd discuss the various decisions made for the UI/UX of this project.,
***
### Wireframes/Mockups  
<p align="center"><img src="https://user-images.githubusercontent.com/31808408/224069121-a38c0a3f-2bca-46b9-a542-17ffbe88603f.png" alt="Desktop wireframe" width="50%"/></p>
<span align="center"><i>Wireframe for large screen devices.</i></span>

***

<p align="center"><img src="https://user-images.githubusercontent.com/31808408/224069788-6d67b2b1-7e19-4c91-a608-69370142dd9e.png" alt="Mobile wireframe" width="30%"/></p>
<span align="center"><i>Wireframe for smaller screen devices.</i></span>

***

### Layout
The layout was chosen to be relatively simple as can be seen from the wireframes. The goal of this was to make the application intuitive and easy to navigate even for non tech-savvy users such as possibly the elderly. This was done with the end goal of making the app more accessible and usable for the target audience.

### Themes/Colors
The app by default loads in nightmode. This was done deliberately due to the rising popularity of dark/night mode themes being used by the modern day end user. However, to allow for flexibility/preference, there are several clickable options in the collapsible navbar to allow the user to choose a theme more to their liking.

The icons were chosen to be green to thematically represent the malay cultural dumppling, the "Ketupat" which is traditionally wrapped in green Pandan leaves.

### Icons
The icons were taken from Foursquare's API allowing the app to be infinitely scalable no matter the number of halal-retaurant geodata is fed into it. Eateries that do not have a matching entry in Foursquare are instead given Foursquare's default restaurant icon of a fork and spoon.

This was done to allow users to understand the cuisine of the eatery at a quick glance without the need to check each one individually.

### Fonts
FontAwesome was used for icons in various positions on the application. The [Pacifico](https://fonts.google.com/specimen/Pacifico) font from Google Fonts was used for styling the sitename next to the logo. [Roboto](https://fonts.google.com/specimen/Roboto) font was used for styling the map-marker popups for a clean, crisp look.


## Features

| Feature | Description |
| ----------- | ----------- |
| Search for a location by name | Users can search for any location in Singapore by its name. Autocomplete suggestions areprovided to the user as with every character they type into the search form as it is tied to a keyup event. |
| Find current location | Users can geolocate their current location to help themselves navigate the map |
| Change map theme | Users can choose a map theme from the navbar to set the app's look to their liking |
| View eatery info | Users can view a halal eatery's information by hovering/touching the location's respective marker |
| Identify cuisine by icon | Each eatery will have a dynamic icon based on the cuisine they serve. |

## Technologies Used

1. HTML5
2. CSS
3. Javascript
4. [Bootstrap](https://getbootstrap.com/) for quick styling and functionality
5. [Leaflet](leafletjs.com) for rendering the map
6. [MarkerCluster](https://github.com/Leaflet/Leaflet.markercluster) for map marker clustering
7. [Axios](https://github.com/axios/axios) for fetching data from relevant API endpoints.
8. [Google Fonts](https://fonts.google.com/) for styling of fonts.
9. [MarkerCluster.LayerSupport](https://github.com/ghybs/Leaflet.MarkerCluster.LayerSupport) for dynamic clustering support for multiple layers
10. [Locate.Control](https://github.com/domoritz/leaflet-locatecontrol) for geolocating the users.

## Testing
Testing was carried out via the use of python localhost server as well as VSCode live server plugin. A table of the test cases and results can be found [here](https://github.com/RecursiveDev/leaflet-project-halal-eateries-sg/blob/main/readme%20assets/Halal%20Go%20Where%20Test%20Cases.pdf).

Debugging tools used were the developer's tools from Google Chrome Version 110.0.5481.180.

## Deployment
The web app was deployed via [Netlify](https://www.netlify.com/). This github repository's main branch was connected via third-party auth to allow Netlify to dynamically fetch and deploy any changes made to the main branch.

## Credits and Attributions
1. [OneMap Developer Portal](https://www.onemap.gov.sg/docs/) which was used for the autocomplete search function as well as for reverse geocoding the addresses scraped from MUIS.
2. [MUIS](https://www.muis.gov.sg/Halal/Halal-Certification/Certified-Eating-Establishments) which was used for scraping to retrieve all Halal-Certified eateries in Singapore. 
3. [Foursquare Developer Portal](https://foursquare.com/developers/home) which was used to fetch data about each restaurant such as cuisine and pictures.
4. [Bootstrap](https://getbootstrap.com/) which was used for styling the site.
5. [Font Awesome](https://fontawesome.com/icons) for icons across the site.
6. [CodePen](https://codepen.io/WhirlwindRhyme/pen/PwrMYE) for the CSS used to allow the logo of the site to spin.








