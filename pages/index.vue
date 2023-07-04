<template>
    <div class="relative overflow-hidden">
        <nav v-if="$nuxt.isOnline" id="map-nav" class="flex justify-evenly">
            <div tabindex="0" role="button" aria-pressed="false" @click="menuClick($event)" class="nav-btn border-r">West</div>
            <div tabindex="0" role="button" aria-pressed="false" @click="menuClick($event)" class="nav-btn border-r">Central</div>
            <div tabindex="0" role="button" aria-pressed="false" @click="menuClick($event)" class="nav-btn">East</div>
        </nav>
        <div class="item-details shadow-xl h-full w-full sm:w-1/2 lg:w-1/4 right-0 absolute bg-white p-6 transition-all duration-500 closed" style="z-index:1001;">
            <button class="float-right hover:scale-125" @click="closeDetails($event)">
                <span class="sr-only">Close</span>
                &#10006;
            </button>
            <h2 class="text-lg font-bold mb-6">Shop Details</h2>
            <img v-if="clickedShop && clickedShop.image != null" class="mb-2" :src="clickedShop.image">
            <h3 v-if="clickedShop != null" class="font-bold">{{ clickedShop.title }}</h3>
            <p v-if="clickedShop != null && clickedShop.id">
                {{ clickedShop.id }}
                <span v-if="clickedShop != null && clickedShop.idEnd != null"> - {{ clickedShop.idEnd }}</span>
                Union Street, Aberdeen
            </p>
        </div>
        <div class="warning"><p class="text-center bg-red-200 border border-red-700 p-2 text-red-700"><strong>Whoops!</strong> couldn't find what you are looking for</p></div>
        <div v-if="$nuxt.isOnline" id="map-wrap" style="height: 100vh">
             <client-only>
                 <!-- <l-map ref="map" :zoom=zoom :minZoom="16" :center="center"> -->
                 <l-map ref="map" :zoom=zoom :minZoom="16" :maxBounds="[[57.14846225825293, -2.117965603492106], [57.14130992049215, -2.092060045100244]]" :center="center">
                   <l-tile-layer url="https://api.mapbox.com/styles/v1/sk8stevieuk/clj8oxlwa001u01pj9tk1bw4a/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoic2s4c3RldmlldWsiLCJhIjoiY2o3dThmZGR4NHoxdjJxbnU2cmo0MGptYSJ9.P81_j3KirUWPOQ_X6FQdqg"></l-tile-layer>
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
    .open {
      max-height: 100px !important;
      opacity: 1;
      animation: fadeOut 1s linear;
      animation-delay: 3s;
      animation-fill-mode: forwards;
    }
    .closed {
        width: 0;
        right: -100%;
    }
    .leaflet-marker-icon {
        animation: blinker 1.5s linear infinite;
    }
    .warning {
        max-height: 0;
    }
    @keyframes blinker {
        50% {
          opacity: 0.5;
        }
    }

    @keyframes fadeOut {
        60% {
          opacity: 0;
          height: auto;
        }
        100% {
            opacity: 0;
            height: 0;
        }
    }
</style>

<script>
    import json from "~/static/json/union-street.json";

    export default {
      name: 'IndexPage',
      data: () => ({
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
          clickedShop: null
      }),
      computed: {
          options() {
              return {
                onEachFeature: this.onEachFeatureFunction
              };
          },
          styleFunction() {
              const fillColor = this.fillColor; // important! need touch fillColor in computed for re-calculate when change fillColor

              console.log(fillColor);

              return () => {
                return {
                  weight: 2,
                  color: "#222222",
                  opacity: 0.75,
                  fillColor: 'red',
                  fillOpacity: 0.5
                };
              };
          },
          onEachFeatureFunction() {
              return (feature, layer) => {
                  let fillColor = "#9ca3af";
                  let opacity = 0.5;
                  let clickedShop = null;

                  if( feature.properties.type != null ) {
                      //Hide the overlay if there is a filter selected
                      if( this.typeFilter != null && this.typeFilter != feature.properties.type ) {
                          opacity = 0;
                      }

                      switch(feature.properties.type) {
                          case "retail":
                              fillColor = this.retailColor;
                              break;
                          case "leisure":
                              fillColor = this.leisureColor;
                              break;
                          case "food":
                              fillColor = this.foodColor;
                              break;
                          case "hotel":
                              fillColor = this.hotelColor;
                              break;
                          case "office":
                              fillColor = this.officeColor;
                              break;
                          case "mixed":
                              fillColor = this.mixedColor;
                              break;
                      }
                  }

                  //Create the popup content for each polygon
                  let html = "<div>";
                  html += feature.properties.title != null ? "<h3>" + feature.properties.title + "</h3>" : '';
                  html += feature.properties.id != null ? feature.properties.id : '';
                  html += feature.properties.idEnd != null ? " - " + feature.properties.idEnd : '';
                  html += feature.properties.id != null ? ' Union Street' : '';
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

                  layer.setStyle({
                      fillColor: fillColor,
                      fillOpacity: opacity,
                      opacity: opacity,
                      color: "#222222"
                  });

                  layer.on('mousemove', function (event) {
                      layer.setStyle({ fillOpacity: 1 })
                  });

                  layer.on('mouseout', function (event) {
                      layer.setStyle({ fillOpacity: 0.65 })
                  });

                  layer.on('click', (event) => {
                      const detailsTab = document.querySelector('.item-details');
                      detailsTab.classList.remove('closed');

                      clickedShop = feature.properties;
                      this.clickedShop = clickedShop;
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
              let found = false;

              this.warning = false;

              map.eachLayer((layer) => {
                  if( found == false && layer.feature != null && layer.feature.properties.title != null ) {
                      let title = String(layer.feature.properties.title).toLowerCase();
                      if(search.toLowerCase() == title) {
                          found = true;

                          let position = layer._bounds._northEast;
                          this.zoom = 18;
                          this.center = position;

                          if (layer.getTooltip()) {
                              const tooltip = layer.getTooltip();
                              if (tooltip._content != null) {
                                  layer.unbindTooltip().bindTooltip(tooltip, {
                                      permanent: false,
                                      opacity: 1
                                  }).openTooltip()
                              }
                          }
                      }
                  }
              })

              if( !found ) {
                  map.eachLayer((layer) => {
                      if( found == false && layer.feature != null && layer.feature.properties.title != null ) {
                          let title = String(layer.feature.properties.title).toLowerCase();
                          if( title.includes(search) ) {
                              found = true;

                              let position = layer._bounds._northEast;
                              this.zoom = 18;
                              this.center = position;

                              if (layer.getTooltip()) {
                                  const tooltip = layer.getTooltip();
                                  if (tooltip._content != null) {
                                      layer.unbindTooltip().bindTooltip(tooltip, {
                                          permanent: false,
                                          opacity: 1
                                      }).openTooltip()
                                  }
                              }
                          }
                      }
                  })
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

              console.log(selectedAmount);
          }
      }
    }
</script>
