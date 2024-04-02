let negativeTags = ['betting', 'gambling', 'fast food', 'fast fashion', 'pound shop'];
let positiveTags = ['museum', 'jewellery', 'watches'];

let shops;
let geojson;

async function getJson() {
    console.log("Getting json files for shops...");

    //Check if IndexDB is populated
    let request = indexedDB.open('shop-ratings', 2);
    request.onsuccess = function() {
        console.log("Loading IndexDB Database...");
    }

    //Create IndexDB if not there
    request.onupgradeneeded = (event) => {
        console.log("Creating IndexDB Database...");
        const db = event.target.result;
        const objectStore = db.createObjectStore("shops", { keyPath: "id" });
        objectStore.createIndex("title", "title", { unique: false });
        objectStore.createIndex("id", "id", { unique: true });
    };

    //Get the shops json file
    fetch('/json/shops.json')
      .then(res => res.json()).then(res => {
          if( res.hasOwnProperty('data') ) {
              shops = res.data;

              //Get the geojson file
              fetch('/json/union-street.json')
                .then(res => res.json()).then(res => {
                    if( res.hasOwnProperty('features') ) {
                        geojson = res.features;

                        sortShops(shops, geojson);
                    }
              });
          }
    });
}

function sortShops(shops, geojson) {
    console.log("Rating shops in background...");

    shops.forEach(shop => {
        let score = 0;
        let foundShop = geojson.find( (element) => element.properties.id == shop.location );
        let coOrdinates = [null, null]

        //try again in case location is an array
        if( foundShop == null && Array.isArray(shop.location) ) {
            foundShop = geojson.find((element) => shop.location.indexOf(element.properties.id) > -1);
        }

        if( foundShop != null ) {
            const coOrdIndex = Math.floor(foundShop.geometry.coordinates[0].length / 2);
            coOrdinates = foundShop.geometry.coordinates[0][coOrdIndex];
        }

        //Add to score for being local company
        if( shop.local != null && shop.local ) {
            score = score + 1;
        }

        //Check the shop tags
        if( shop.tags != null ) {
            const tags = shop.tags;
            let foundNegative = false;
            let foundPositive = false;

            tags.forEach((tag) => {
                if( negativeTags.indexOf(tag.toLowerCase()) != -1 && foundNegative == false ) {
                    score = score - 1;
                    foundNegative = true;
                }

                if( positiveTags.indexOf(tag.toLowerCase()) != -1 && foundPositive == false ) {
                    score = score + 1;
                    foundPositive = true;
                }
            });
        }

        let output = {
            title: foundShop.properties.title,
            id: foundShop.properties.id,
            lat: coOrdinates[1],
            lng: coOrdinates[0],
            score: score
        };

        let openRequest = indexedDB.open('shop-ratings', 2);

        openRequest.onsuccess = function() {
            let db = openRequest.result;
            const transaction = db.transaction(["shops"], "readwrite");
            const objectStore = transaction.objectStore("shops");

            const rq = objectStore.add(output);
            rq.onsuccess = (event) => {
              console.log("added to indexedDB");
            };
        };

        openRequest.onversionchange = function() {
            db.close();
            alert("Database is outdated, please reload the page.")
        };
    });
}

self.addEventListener('message', (event) => {
    const data = event.data;
    if ( data == "start" ) {
        getJson();
    }
});
