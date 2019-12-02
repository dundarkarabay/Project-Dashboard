// Create map element. Center view on continential U.S. Set default zoom to level 5.
var myMap = L.map('map').setView([39.8283, -98.5795], 5);

// Set tile layer.
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 10,
    minZoom: 5,
    // Set to lock zoom to U.S.
    // id: "mapbox.streets"
    // id: "mapbox.pirates",
    accessToken: API_KEY
}).addTo(myMap);

// Define functions for formatting number strings.
var formatDecimalComma = d3.format(",.2f");
var formatComma = d3.format(",");
var formatMoney = function(d) { return "$" + formatComma(d); };

(async function(){

    // Download data from csv.
    const realEstateData = await d3.csv("static/js/real_estate_db.csv");

    // Create marker cluster.
    const markers = L.markerClusterGroup();

    // Create array of states for drop-down menu.
    const states = [];
    realEstateData.forEach(data => {
        if (!states.includes(data.state_ab)){
            states.push(data.state_ab)
        }
    })
    console.log(states)

    realEstateData.forEach(data => {

    // Define variables for marker pop-up descriptions.
        const coord = [data.lat, data.lng]
        const city = data.city
        const state_ab = data.state_ab
        const zip_code = data.zip_code
        const mortgage_median = formatMoney(data.hc_mortgage_median)
        const rent_median = formatMoney(data.rent_median)
        const household_income = formatMoney(data.hi_median)
    // Description for marker pop-up. 
        const marker_description = "<h4>"+ city + ", " + state_ab + " " + zip_code + "</h4>" + "<hr>" +
        "Median household income: " + "<strong>" + household_income + "</strong>" + "<br>" +
        "Median monthly mortgage and owner costs: " + "<strong>" + mortgage_median + "</strong>" + "<br>" +
        "Median gross rent: " + "<strong>" + rent_median + "</strong>"

        markers.addLayer(L.marker(coord).bindPopup(marker_description))
    })

    // Add marker cluster layer to the map.
    myMap.addLayer(markers);

    /* Drop-down menu. Can't get it to work.
    var legend = L.control({position: 'topright'});
    legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend');
    
    var dropDownContent ='<select><option value="default">   State   </option>';
    for (var i = 0; i < states.length; i++){
        dropDownContent += "<option value=" + states[i] +">" + states[i] + "</option>";
    }  
    dropDownContent += "</select>";  
    div.innerHTML = dropDownContent;

    // div.innerHTML = '<select><option>1</option><option>2</option><option>3</option></select>';

    div.firstChild.onmousedown = div.firstChild.ondblclick = L.DomEvent.stopPropagation;
    return div;
    };
    legend.addTo(myMap);
    */

})()