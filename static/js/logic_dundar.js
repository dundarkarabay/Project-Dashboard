// // Function to determine marker size based on job openings
function markerSize(jobOpening) {
    return jobOpening * 100;
}

// // An array containing the coordinates
const cityCoordinates = [
    {coordinates: [47.6062, -122.3321], city: 'Seattle'},
    {coordinates: [40.7128, -74.0060], city: 'New York'},
    {coordinates: [37.7749, -122.4194],city: 'San Francisco'},
    {coordinates: [30.2672, -97.7431], city: "Austin"},
    {coordinates: [41.8781, -87.6298], city: 'Chicago'},
    {coordinates: [38.9072, -77.0369], city: 'Washington'},
    {coordinates: [42.3601, -71.0589], city: 'Boston'},
    {coordinates: [37.3382, -121.8863], city: 'San Jose'},
    {coordinates: [32.7157, -117.1611], city: 'San Diego'},
    {coordinates: [37.3688, -122.0363], city: 'Sunnyvale'},
    {coordinates: [29.7604, -95.3698], city: 'Houston'},
    {coordinates: [33.7490, -84.3880], city: 'Atlanta'},
    {coordinates: [38.9784, -76.4922], city: 'Annapolis Junction'},
    {coordinates: [37.3541, -121.9552], city: 'Santa Clara'},
    {coordinates: [38.8816, -77.0910], city: 'Arlington'},
    {coordinates: [32.7767, -96.7970], city: 'Dallas'},
    {coordinates: [35.2271, -80.8431], city: 'Charlotte'},
    {coordinates: [27.9506, -82.4572], city: 'Tampa'},
    {coordinates: [40.4406, -79.9959], city: 'Pittsburgh'},
    {coordinates: [47.6740, -122.1215], city: 'Redmond'}
];

(async function getData(){
    const URL = "/job_distribution_data";
    const data = await d3.json(URL);
    // Once we get a response, send the data.features object to the createFeatures function
    const cityDE = data["Scraped Data"][0]["location"];
    const openingsDE = data["Scraped Data"][0]["location_count"];
    lengthDE = cityDE.length;
    let listDE = [];
    for (let i=0; i<lengthDE;i++){
        let city = cityDE[i].split(",")[0];
        for (let j=0; j<cityCoordinates.length;j++){
            if (city==cityCoordinates[j].city){
                var coordinates = cityCoordinates[j].coordinates;
            }
        }
        let numberOfOpenings = parseInt(openingsDE[i].replace(")", "").replace("(", ""));
        let dictionaryDE = {
            city : city ,
            opening : numberOfOpenings,
            coordinates: coordinates
        }
        listDE.push(dictionaryDE);
    }
    const cityBA = data["Scraped Data"][1]["location"];
    const openingsBA = data["Scraped Data"][1]["location_count"];
    lengthBA = cityBA.length;
    let listBA = [];
    for (let i=0; i<lengthBA;i++){
        let city = cityBA[i].split(",")[0];
        for (let j=0; j<cityCoordinates.length;j++){
            if (city==cityCoordinates[j].city){
                var coordinates = cityCoordinates[j].coordinates;
            }
        }
        let numberOfOpenings = parseInt(openingsBA[i].replace(")", "").replace("(", ""));
        let dictionaryBA = {
            city : city ,
            opening : numberOfOpenings,
            coordinates: coordinates
        }
        listBA.push(dictionaryBA);
    }
    const citySE = data["Scraped Data"][2]["location"];
    const openingsSE = data["Scraped Data"][2]["location_count"];
    lengthSE = citySE.length;
    let listSE = [];
    for (let i=0; i<lengthSE;i++){
        let city = citySE[i].split(",")[0];
        for (let j=0; j<cityCoordinates.length;j++){
            if (city==cityCoordinates[j].city){
                var coordinates = cityCoordinates[j].coordinates;
            }
        }
        let numberOfOpenings = parseInt(openingsSE[i].replace(")", "").replace("(", ""));
        let dictionarySE = {
            city : city ,
            opening : numberOfOpenings,
            coordinates: coordinates
        }
        listSE.push(dictionarySE);
    }
    // console.log(listDE);
    // console.log(listBA);
    // console.log(listSE);

    // Define arrays to hold created markers for each job category
    const DEMarkers = [];
    const BAMarkers = [];
    const SEMarkers = [];

    // Loop through locations and create city markers for Data Engineer list
    listDE.forEach(listItem => {
        // Setting the marker radius for Data Engineer job openings
        DEMarkers.push(
            L.circle(listItem.coordinates, {
            stroke: false,
            fillOpacity: 0.5,
            color: "green",
            fillColor: "green",
            radius: markerSize(listItem.opening)
            })
        );
    })

    // Loop through locations and create city markers for Business Analyst list
    listBA.forEach(listItem => {
        // Setting the marker radius for Business Analyst job openings
        BAMarkers.push(
            L.circle(listItem.coordinates, {
            stroke: false,
            fillOpacity: 0.5,
            color: "red",
            fillColor: "red",
            radius: markerSize(listItem.opening)
            })
        );
    })

    // Loop through locations and create city markers for Data Engineer list
    listSE.forEach(listItem => {
        // Setting the marker radius for Data Engineer job openings
        SEMarkers.push(
            L.circle(listItem.coordinates, {
            stroke: false,
            fillOpacity: 0.5,
            color: "blue",
            fillColor: "blue",
            radius: markerSize(listItem.opening)
            })
        );
    })

    // Define variables for our base layers
    const lightmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 7,
        minZoom: 3,
        id: "mapbox.light",
        accessToken: API_KEY
    });

    // Create three separate layer groups: one for cities and one for states
    const dataEngineer = L.layerGroup(DEMarkers);
    const businessAnalyst = L.layerGroup(BAMarkers);
    const softwareEngineer = L.layerGroup(SEMarkers);

    // Create a baseMaps object
    const baseMaps = {};

    // Create an overlay object
    const overlayMaps = {
        "Data Engineer": dataEngineer,
        "Business Analyst": businessAnalyst,
        "Software Engineer": softwareEngineer 
    };

    // Define a map object
    const myMap = L.map("map", {
        center: [37.09, -95.71],
        zoom: 5,
        layers: [lightmap, dataEngineer, businessAnalyst, softwareEngineer]
    });

    // Pass our map layers into our layer control
    // Add the layer control to the map
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false,
        position: 'bottomright'
    }).addTo(myMap);

})() 