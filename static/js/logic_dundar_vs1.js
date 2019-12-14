// Function to determine marker size based on job openings
function markerSize(jobOpening) {
    return jobOpening * 100;
}

// An array containing all of the information needed to create markers for each job category
const locations = [
  {
    coordinates: [47.6062, -122.3321],
    city_state: {
      city: 'Seattle',
      state: "WA"
    },
    openings: {
      DE: 6833,
      BA: 492,
      SE: 6317
    }
  },
  {
    coordinates: [40.7128, -74.0060],
    city_state: {
      city: 'New York', 
      state: "NY"
    },
    openings: {
      DE: 4791,
      BA: 951,
      SE: 1440
    }
  },
  {
    coordinates: [37.7749, -122.4194],
    city_state: {
      city: 'San Francisco',
      state: "CA"
    },
    openings: {
      DE: 4354, 
      BA: 448,
      SE: 1201
    }
  },
  {
    coordinates: [30.2672, -97.7431],
    city_state: {
      city: "Austin", 
      state: "TX"
    },
    openings: {
      DE: 2401,
      BA: 322,
      SE: 1027
    }
  },
  {
    coordinates: [41.8781, -87.6298],
    city_state: {
      city: 'Chicago',
      state: "IL"
    },
    openings: {
      DE: 2219,
      BA: 695,
      SE: 846
    }
  },
  {
    coordinates: [38.9072, -77.0369],
    city_state: {
      city: 'Washington',
      state: "DC"
    },
    openings: {
      DE: 1993,
      BA: 549,
      SE: 760
    }
  },
  {
    coordinates: [42.3601, -71.0589],
    city_state: {
      city: 'Boston', 
      state: "MA"
    },
    openings: {
      DE: 1918,
      BA: 378,
      SE: 793
    }
  },
  {
    coordinates: [37.3382, -121.8863],
    city_state: {
      city: 'San Jose',
      state: "CA"
    },
    openings: {
      DE: 1754, 
      BA: 0,
      SE: 675
    }
  },
  {
    coordinates: [32.7157, -117.1611],
    city_state: {
      city: 'San Diego', 
      state: "CA"
    },
    openings: {
      DE: 1581,
      BA: 0,
      SE: 554
    }
  },
  {
    coordinates: [37.3688, -122.0363],
    city_state: {
      city: 'Sunnyvale', 
      state: "CA"
    },
    openings: {
      DE: 1489,
      BA: 0,
      SE: 606
    }
  },
  {
    coordinates: [29.7604, -95.3698],
    city_state: {
      city: 'Houston', 
      state: "TX"
    },
    openings: {
      DE: 1463,
      BA: 319,
      SE:0
    }
  },
  {
    coordinates: [33.7490, -84.3880],
    city_state: {
      city: 'Atlanta', 
      state: "GA"
    },
    openings: {
      DE: 1457,
      BA: 476,
      SE: 714
    }
  },
  {
    coordinates: [38.9784, -76.4922],
    city_state: {
      city: 'Annapolis Junction',
      state: "MD"
    },
    openings: {
      DE: 1393,
      BA: 0,
      SE: 472
    }
  },
  {
    coordinates: [37.3541, -121.9552],
    city_state: {
      city: 'Santa Clara',
      state: "CA"
    },
    openings: {
      DE: 1270,
      BA: 0,
      SE: 455
    }
  },
  {
    coordinates: [38.8816, -77.0910],
    city_state: {
      city: 'Arlington',
      state: "VA"
    },
    openings: {
      DE: 0,
      BA: 288,
      SE: 0
    }
  },
  {
    coordinates: [32.7767, -96.7970],
    city_state: {
      city: 'Dallas',
      state: "TX"
    },
    openings: {
      DE: 0,
      BA: 287, 
      SE: 0
    }
  },
  {
    coordinates: [35.2271, -80.8431],
    city_state: {
      city: 'Charlotte', 
      state: "NC"
    },
    openings: {
      DE: 0,
      BA: 264, 
      SE: 0
    }
  },
  {
    coordinates: [27.9506, -82.4572],
    city_state: {
      city: 'Tampa',
      state: "FL"
    },
    openings: {
      DE: 0,
      BA: 244, 
      SE: 0
    }
  },
  {
    coordinates: [40.4406, -79.9959],
    city_state: {
      city: 'Pittsburgh',
      state: "PA"
    },
    openings: {
      DE: 0,
      BA: 241,
      SE: 0
    }
  },
  {
    coordinates: [47.6740, -122.1215],
    city_state: {
      city: 'Redmond',
      state: "WA"
    },
    openings: {
      DE: 0,
      BA: 0,
      SE: 591
    }
  }
];

// Define arrays to hold created markers for each job category
const DEMarkers = [];
const BAMarkers = [];
const SEMarkers = [];

// Loop through locations and create city and state markers
locations.forEach(location => {
    // Setting the marker radius for Data Engineer job openings
    DEMarkers.push(
        L.circle(location.coordinates, {
        stroke: false,
        fillOpacity: 0.5,
        color: "green",
        fillColor: "green",
        radius: markerSize(location.openings.DE)
        })
    );

    // Setting the marker radius for Business Analyts job openings
    BAMarkers.push(
        L.circle(location.coordinates, {
        stroke: false,
        fillOpacity: 0.5,
        color: "red",
        fillColor: "red",
        radius: markerSize(location.openings.BA)
        })
    );

    // Setting the marker radius for Software Engineer job openings
    SEMarkers.push(
      L.circle(location.coordinates, {
      stroke: false,
      fillOpacity: 0.5,
      color: "blue",
      fillColor: "blue",
      radius: markerSize(location.openings.SE)
      })
    );
  })

// Define variables for our base layers
const lightmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
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
