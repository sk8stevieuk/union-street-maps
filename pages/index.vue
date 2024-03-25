<template>
    <div class="relative overflow-hidden">
        <Sprite />
        <Loading v-if="loading" />

        <nav v-if="$nuxt.isOnline" id="map-nav" class="flex justify-evenly">
            <div tabindex="0" role="button" aria-pressed="false" @click="menuClick($event)" class="nav-btn border-r">West</div>
            <div tabindex="0" role="button" aria-pressed="false" @click="menuClick($event)" class="nav-btn border-r">Central</div>
            <div tabindex="0" role="button" aria-pressed="false" @click="menuClick($event)" class="nav-btn">East</div>
        </nav>
        <div class="item-details closed">
            <button class="float-right hover:scale-125" @click="closeDetails($event)">
                <span class="sr-only">Close</span>
                &#10006;
            </button>
            <div class="relative top-4">
                <h2 class="sr-only">Shop Details</h2>
                <div class="shop-media relative">
                    <img v-if="clickedShop && clickedShop.image != null" class="w-full mb-2" :src="clickedShop.image" width="320px" height="240px">
                    <img v-else-if="clickedShop && clickedShop.cropUrl != null" class="w-full mb-2" :src="clickedShop.cropUrl" width="320px" height="240px">
                </div>
                <h3 v-if="clickedShop != null" class="text-2xl font-bold">
                    {{ clickedShop.title }}
                    <svg v-if="clickedShop && clickedShop.local" class="fill-red-600 inline-block align-bottom h-8 w-8">
                        <use href="#heart" />
                    </svg>
                </h3>
                <p v-if="clickedShop != null && clickedShop.location && typeof(clickedShop.location) == 'number'" class="text-gray-400">
                    {{ clickedShop.location }} Union Street, Aberdeen
                </p>
                <div class="prose mt-4" v-if="clickedShop != null && clickedShop.hasOwnProperty('description')" v-html="clickedShop.description"></div>
                <ul class="tabs-wrapper">
                    <li v-if="clickedShop != null && clickedShop.hasOwnProperty('tags')" v-for="(tag, tagIndex) in clickedShop.tags">
                        {{ tag }}
                    </li>
                </ul>
                <a class="bg-purple-600 text-white px-4 py-2 rounded-xl" v-if="clickedShop != null && clickedShop.hasOwnProperty('url')" :href="clickedShop.url" target="_blank" rel="noopener nofollow noreferrer">View Property</a>
            </div>
        </div>
        <div class="warning"><p><strong>Whoops!</strong> couldn't find what you are looking for</p></div>
        <div v-if="$nuxt.isOnline" id="map-wrap" style="height: 100vh">
             <client-only>
                 <!-- <l-map ref="map" :zoom=zoom :minZoom="16" :center="center"> -->
                 <l-map ref="map" :zoom=zoom :minZoom="16" :maxBounds="[[57.14846225825293, -2.117965603492106], [57.14130992049215, -2.092060045100244]]" :center="center">
                   <l-tile-layer :url="mapLayer"></l-tile-layer>
                   <l-geo-json :geojson="geojson" :options="options" :options-style="styleFunction"></l-geo-json>
                   <l-marker v-if="userLat && userLong" :lat-lng="[userLat,userLong]">
                       <l-icon
                         :icon-size="[36,36]"
                         :icon-anchor="[18,18]"
                         icon-url="/user-location.svg"
                       />
                     marker
                   </l-marker>
                   <l-control class="example-custom-control">
                      <div class="flex flex-col-reverse sm:flex-row items-end">
                           <div class="flex flex-row">
                               <form class="ml-2 sm:ml-0 sm:mr-4">
                                  <select class="p-2" v-model="typeFilter" :value="typeFilter" @change="toggleFilter($event)">
                                      <option value="null" disabled>Filter By</option>
                                      <option value="">All</option>
                                      <option value="retail">Retail</option>
                                      <option value="leisure">Leisure</option>
                                      <option value="food">Food/Drink</option>
                                      <option value="hotel">Hotel</option>
                                      <option value="office">Office</option>
                                      <option value="mixed">Mixed Use</option>
                                      <option value="empty">Empty Units</option>
                                  </select>
                               </form>
                               <input type="text" class="p-2 ml-2 sm:ml-0 sm:mr-4" @change="search($event)" name="search" placeholder="search">
                           </div>
                           <ul id="key" class="text-right bg-white p-2 flex flex-wrap w-3/4 sm:w-full mb-2 sm:mb-0">
                               <li class="mr-3"><span class="mr-1" :style="'background-color:' + retailColor + ';color:' + retailColor + ';'">....</span>Retail</li>
                               <li class="mr-3"><span class="mr-1" :style="'background-color:' + leisureColor + ';color:' + leisureColor + ';'">....</span>Leisure</li>
                               <li class="mr-3"><span class="mr-1" :style="'background-color:' + foodColor + ';color:' + foodColor + ';'">....</span>Food/Drink</li>
                               <li class="mr-3"><span class="mr-1" :style="'background-color:' + hotelColor + ';color:' + hotelColor + ';'">....</span>Hotel</li>
                               <li class="mr-3"><span class="mr-1" :style="'background-color:' + officeColor + ';color:' + officeColor + ';'">....</span>Office</li>
                               <li><span class="mr-1" :style="'background-color:' + mixedColor + ';color:' + mixedColor + ';'">....</span>Mixed Use</li>
                           </ul>
                       </div>
                    </l-control>
                 </l-map>
             </client-only>
          </div>
          <div v-else class="container mx-auto">
              <svg-icon name="offline" />
              <h2 class="text-2xl font-bold">Whoops!</h2>
              <h3 class="text-lg">You appear to be offline</h3>
              <p>This site requires an internet connection to work. Please try again later.</p>
          </div>
    </div>
</template>

<style>
    .nav-btn {
        @apply py-4 w-full font-bold text-center text-white bg-purple-900 hover:bg-orange-500 hover:text-black;
    }

    .item-details {
        @apply shadow-xl h-full w-full sm:w-1/2 right-0 absolute bg-white p-6 transition-all duration-500 overflow-y-scroll;
        z-index:1001;
    }

    .open {
      opacity: 1 !important;
      animation: fadeOut 1s linear;
      animation-delay: 3s;
      animation-fill-mode: forwards;
    }
    .closed {
        right: -100%;
    }
    .tabs-wrapper {
        @apply flex gap-2 mt-4;

        > li {
            @apply border border-purple-600 text-purple-600 rounded-full text-sm py-1 px-2;
        }
    }
    .leaflet-marker-icon {
        animation: blinker 1.5s linear infinite;
    }
    .warning {
        @apply fixed bottom-0 right-0 mx-6 mb-6 opacity-0;
        z-index: 1001;

        > * {
            @apply text-center bg-red-200 border border-red-700 p-4 text-red-700;
        }
    }

    .marker-tooltip {
        > h3 {
            @apply text-lg font-bold;
        }

        > .marker-notice {
            @apply italic opacity-50 mt-2;
        }

        .tooltip-type-wrapper {
            @apply flex items-center mt-2;
        }

        .tooltip-icon {
            @apply mr-1 h-4 w-4;
        }
    }

    path:focus {
        outline: none;
    }

    @keyframes blinker {
        50% {
          opacity: 0.5;
        }
    }

    @keyframes fadeOut {
        0% {
          opacity: 1;
        }
        60% {
          opacity: 0;
        }
        100% {
            opacity: 0;
        }
    }
</style>

<script>
    import json from "~/static/json/union-street.json";
    import shops from "~/static/json/shops.json";

    export default {
      name: 'IndexPage',
      head() {
        return {
          script: [
            { src: '/leaflet-patterns.js' }
          ]
        }
      },
      data: () => ({
          loading: false,
          zoom: 16,
          center: [57.14617607961514, -2.0990591687252156],
          geojson: json,
          userLat: null,
          userLong: null,
          retailColor: "#f43f5e",
          leisureColor: "#fde047",
          foodColor: "#f97316",
          officeColor: "#4ade81",
          hotelColor: "#06b6d4",
          mixedColor: "#d946ef",
          typeFilter: null,
          clickedShop: [],
          apiBaseUrl: process.env.API_BASE_URL,
          mapLayer: process.env.MAP_LAYER
      }),
      computed: {
          options() {
              return {
                onEachFeature: this.onEachFeatureFunction
              };
          },
          styleFunction() {
              const fillColor = this.fillColor; // important! need touch fillColor in computed for re-calculate when change fillColor

              return () => {
                return {
                  weight: 2,
                  color: "#222222",
                  opacity: 0.75,
                  fillColor: 'red',
                  fillOpacity: 0.5,
                };
              };
          },
          onEachFeatureFunction() {
              return (feature, layer) => {
                  let fillColor = "#9ca3af";
                  let label = "";
                  let opacity = 0.7;
                  let clickedShop = null;
                  let classes = "";

                  // Set the colours based on property type
                  if( feature.properties.type != null ) {
                      //Hide the overlay if there is a filter selected
                      if( this.typeFilter != null && this.typeFilter != feature.properties.type ) {
                          opacity = 0;
                      }

                      //Check the property type
                      switch(feature.properties.type) {
                          case "retail":
                              fillColor = this.retailColor;
                              label = "Retail";
                              break;
                          case "leisure":
                              fillColor = this.leisureColor;
                              label = "Leisure";
                              break;
                          case "food":
                              fillColor = this.foodColor;
                              label = "Food & Drink";
                              break;
                          case "hotel":
                              fillColor = this.hotelColor;
                              label = "Hotel";
                              break;
                          case "office":
                              fillColor = this.officeColor;
                              label = "Office";
                              break;
                          case "mixed":
                              fillColor = this.mixedColor;
                              label = "Mixed Use";
                              break;
                          default:
                              classes = "notinuse";
                              break;
                      }
                  }

                  let fillPattern = fillColor;

                  //Create the popup content for each polygon
                  let html = "<div class='marker-tooltip'>";
                  html += feature.properties.title != null ? "<h3>" + feature.properties.title + "</h3>" : '';

                  if( typeof(feature.properties.id) == "number" ) {
                      html += feature.properties.id != null ? feature.properties.id : '';
                      html += feature.properties.idEnd != null ? " - " + feature.properties.idEnd : '';
                      html += feature.properties.id != null ? ' Union Street' : '';
                  }

                  if( layer.feature.properties.type ) {
                      html += "<div class='tooltip-type-wrapper'><svg class='tooltip-icon' style='fill:" + fillColor + ";'><use href='#" + layer.feature.properties.type + "' /></svg><p style='color:" + fillColor + "'>" + label + "</p></div>";
                  }

                  if( layer.feature.properties.active == 0 ) {
                      html += "<p class='marker-notice'>No activity from tenant.</p>";
                  }

                  html += "</div>";

                  layer.feature.properties.title = feature.properties.title;
                  layer.feature.properties.type = feature.properties.type;

                  //Set the style of the polygon
                  if( html != "<div></div>" ) {
                      layer.bindTooltip(
                            html,
                          { permanent: false,
                            sticky: true ,
                            opacity: 1
                          }
                      );
                  }

                  //Check feature is active and set class if not
                  if( layer.feature.properties.active == 0 ) {
                      classes = "notinuse";
                      fillPattern = 'url(image.gif)';
                  }

                  layer.setStyle({
                      fillColor: fillColor,
                      fill: fillPattern,
                      fillOpacity: opacity,
                      opacity: opacity,
                      color: "#222222",
                      className: classes
                  });

                  layer.on('mousemove', function (event) {
                      layer.setStyle({ fillOpacity: 1 })
                  });

                  layer.on('mouseout', function (event) {
                      layer.setStyle({ fillOpacity: 0.65 })
                  });

                  layer.on('click', (event) => {
                      //Call the Our Union Street Craft API if shop is empty
                      if( feature.properties.type == null && feature.properties.id != null ) {
                          //Create a url to fetch for shop details
                          const auth = process.env.API_AUTH_KEY;
                          let url = this.apiBaseUrl + 'getunit.json?auth=' + auth + '&id=' + feature.properties.id;

                          //Try and fetch the data
                          this.loading = true;
                          let data = fetch(url,{
                              method: 'GET',
                              headers:{
                                "Content-Type":'application/json'
                              }
                          }).then(res => res.json()).then(res => {
                              if( res.data != null && res.data.length > 0 ) {
                                  this.clickedShop = res.data[0];

                                  const detailsTab = document.querySelector('.item-details');
                                  detailsTab.classList.remove('closed');
                              } else {
                                  alert("couldnt find data for this unit");
                              }

                              this.loading = false;
                          })
                      }

                      //Get the shop details from the shop.json file
                      if( feature.properties.id != null ) {
                          const foundShop = shops.data.find((element) => element.location == feature.properties.id);

                          if( foundShop != null ) {
                              this.clickedShop = foundShop;

                              const detailsTab = document.querySelector('.item-details');
                              detailsTab.classList.remove('closed');
                          }
                      }
                  });
              };
          }
      },
      async mounted() {
          const connection = navigator.connection;

          //Get the users current position
          const position = this.getPosition()
              .then((position) => {
                  this.userLat = position.coords.latitude;
                  this.userLong = position.coords.longitude;
              })
              .catch((err) => {
                  console.error(err.message)
              })

          const watchPosition = navigator.geolocation.watchPosition((position) => {
              this.userLat = position.coords.latitude;
              this.userLong = position.coords.longitude;
          });
      },
      methods:{
          getPosition(options) {
              return new Promise(function(resolve, reject) {
                  navigator.geolocation.getCurrentPosition(resolve, reject, options)
              })
          },
          closeDetails($event) {
              const detailsTab = document.querySelector('.item-details');
              detailsTab.classList.add('closed');
          },
          search($event) {
              const search = $event.target.value;
              const map = this.$refs.map.mapObject;
              const regex = new RegExp('^[0-9]+$');
              let found = false;

              let isNumber = regex.test(search);

              this.warning = false;

              String.prototype.fuzzy = function (s) {
                  var hay = this.toLowerCase(), i = 0, n = -1, l;
                  s = s.toLowerCase();
                  for (; l = s[i++] ;) if (!~(n = hay.indexOf(l, n + 1))) return false;
                  return true;
              };

              map.eachLayer((layer) => {
                  if( found == false && layer.feature != null && layer.feature.properties.title != null ) {
                      let title = String(layer.feature.properties.title).toLowerCase();

                      if( title.fuzzy(search.toLowerCase()) && isNumber == false ) {
                          //Check fuzzy logic function for matching title
                          found = true;
                      } else if( isNumber && layer.feature.properties.id == search ) {
                          //Search for the street number
                          found = true;
                      }

                      if( found ) {
                          let position = layer._bounds._northEast;
                          this.zoom = 18;
                          this.center = position;

                          map.panTo(position, this.zoom);

                          if (layer.getTooltip()) {
                              const tooltip = layer.getTooltip();
                              if (tooltip._content != null) {
                                  layer.unbindTooltip().bindTooltip(tooltip, {
                                      permanent: false,
                                      opacity: 1
                                  }).openTooltip()
                              }
                          }

                          //open the sidebar for content
                          if( layer.feature.properties.id != null ) {
                              console.log('searching...');
                              const foundShop = shops.data.find((element) => element.location == layer.feature.properties.id);

                              if( foundShop != null ) {
                                  console.log("found in shops.json file");
                                  this.clickedShop = foundShop;

                                  const detailsTab = document.querySelector('.item-details');
                                  detailsTab.classList.remove('closed');
                              }
                          }
                      }
                  }
                  return;
              })

              if( !found ) {
                  // map.eachLayer((layer) => {
                  //     if( found == false && layer.feature != null && layer.feature.properties.title != null ) {
                  //         let title = String(layer.feature.properties.title).toLowerCase();
                  //         if( title.includes(search) ) {
                  //             found = true;
                  //
                  //             let position = layer._bounds._northEast;
                  //             this.zoom = 18;
                  //             this.center = position;
                  //
                  //             if (layer.getTooltip()) {
                  //                 const tooltip = layer.getTooltip();
                  //                 if (tooltip._content != null) {
                  //                     layer.unbindTooltip().bindTooltip(tooltip, {
                  //                         permanent: false,
                  //                         opacity: 1
                  //                     }).openTooltip()
                  //                 }
                  //             }
                  //         }
                  //     }
                  // })
              }

              if( !found ) {
                  let warningDom = document.querySelector(".warning");
                  warningDom.classList.add('open');

                  setTimeout(() => {
                      warningDom.classList.remove('open');
                  }, "4000");
              }
          },
          menuClick($event) {
              const navType = $event.target.innerText.toLowerCase();

              switch(navType) {
                  case "west":
                      this.zoom = 18;
                      this.center = [57.14339810776216, -2.1090751886074206];
                      break;
                  case "central":
                      this.zoom = 18;
                      this.center = [57.144712101668034, -2.1040621347286654];
                      break;
                  case "east":
                      this.zoom = 18;
                      this.center = [57.1466887586991, -2.0970590131804197];
                      break;
              }
          },
          toggleFilter($event) {
              const map = this.$refs.map.mapObject;
              let filter = this.typeFilter;
              let selectedAmount = 0;

              map.eachLayer(function (layer) {
                  let opacity = 0;
                  let hoverOpacity = 0;
                  let tooltipOpacity = 0;
                  let addClick = false;

                  if( layer.feature != null ) {
                      if( layer.feature.properties.type == null && filter == 'empty' ) {
                          opacity = 0.65;
                          hoverOpacity = 1;
                          tooltipOpacity = 1;

                          selectedAmount = selectedAmount + 1;
                      }
                      else if( filter == '' ) {
                          opacity = 0.65;
                          hoverOpacity = 1;
                          tooltipOpacity = 1;
                      }
                      else if( layer.feature.properties.type != null && layer.feature.properties.type == filter ) {
                          opacity = 0.65;
                          hoverOpacity = 1;
                          tooltipOpacity = 1;

                          selectedAmount = selectedAmount + 1;
                      }

                      layer.setStyle({
                          fillOpacity: opacity,
                          opacity: opacity
                      });

                      if (layer.getTooltip()) {
                          const tooltip = layer.getTooltip();
                          if (tooltip._content != null) {
                              layer.unbindTooltip().bindTooltip(tooltip, {
                                  permanent: false,
                                  opacity: tooltipOpacity
                              })
                          }
                      }

                      layer.on('mousemove', function (event) {
                          layer.setStyle({ fillOpacity: hoverOpacity })
                      });

                      layer.on('mouseout', function (event) {
                          layer.setStyle({ fillOpacity: opacity })
                      });
                  }
              });
          }
      }
    }
</script>
