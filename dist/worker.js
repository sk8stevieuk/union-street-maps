let negativeTags = ['betting', 'gambling', 'fast food', 'fast fashion', 'pound shop', 'estate agents', "chain"];
let positiveTags = ['museum', 'jewellery', 'watches', 'fashion', 'music', 'record shop', 'arcade', 'outdoor seating', 'outdoors', 'kitchenware'];

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

function centroid(coords) {
    var signedArea = 0;
    var x = 0;
    var y = 0;

    for (var i = 0; i < coords.length - 1; i++) {
         var temp = (coords[i][0] * coords[i + 1][1]) - (coords[i + 1][0] * coords[i][1]);

         signedArea += temp;
         x += (coords[i][0] + coords[i + 1][0]) * temp;
         y += (coords[i][1] + coords[i + 1][1]) * temp;
     }

    signedArea *= 0.5;
    x /= 6 * signedArea;
    y /= 6 * signedArea;

    let output = [x, y]
    return output;
}

function sortShops(shops, geojson) {
    console.log("Rating shops in background...");

    shops.forEach(shop => {
        let score = 0.5;
        let foundShop = geojson.find( (element) => element.properties.id == shop.location );
        let centre = [null, null]

        //try again in case location is an array
        if( foundShop == null && Array.isArray(shop.location) ) {
            foundShop = geojson.find((element) => shop.location.indexOf(element.properties.id) > -1);
        }

        if( foundShop != null ) {
            centre = centroid(foundShop.geometry.coordinates[0]);

            //Mark down for being office
            if( foundShop.properties.type == "office" ) {
                score = score - 0.1;
            }

            //Add to score for being mixed use
            if( foundShop.properties.type == "mixed" ) {
                score = score + 0.1;
            }
        }

        //Add to score for being local company
        if( shop.local != null && shop.local ) {
            score = score + 0.1;
        }

        //Check the shop tags
        if( shop.tags != null ) {
            const tags = shop.tags;
            let foundNegative = false;
            let foundPositive = false;

            tags.forEach((tag) => {
                if( negativeTags.indexOf(tag.toLowerCase()) != -1 && foundNegative == false ) {
                    score = score - 0.1;
                    foundNegative = true;
                }

                if( positiveTags.indexOf(tag.toLowerCase()) != -1 && foundPositive == false ) {
                    score = score + 0.1;
                    foundPositive = true;
                }
            });
        }

        //Set to minimum if not active
        if( shop.active == 0 ) {
            score = 0.1;
        }

        let output = {
            title: foundShop.properties.title,
            id: foundShop.properties.id,
            lat: centre[1],
            lng: centre[0],
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
