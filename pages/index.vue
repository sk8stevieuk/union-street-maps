<template>
    <div>
        <nav id="map-nav" class="flex justify-evenly">
            <div tabindex="0" role="button" aria-pressed="false" @click="menuClick($event)" class="nav-btn border-r">West</div>
            <div tabindex="0" role="button" aria-pressed="false" @click="menuClick($event)" class="nav-btn border-r">Central</div>
            <div tabindex="0" role="button" aria-pressed="false" @click="menuClick($event)" class="nav-btn">East</div>
        </nav>
        <div id="map-wrap" style="height: 100vh">
             <client-only>
                 <l-map ref="map" :zoom=zoom :minZoom="16" :maxBounds="[[57.14846225825293, -2.117965603492106], [57.14130992049215, -2.092060045100244]]" :center="center">
                   <l-tile-layer url="https://api.mapbox.com/styles/v1/sk8stevieuk/clj8oxlwa001u01pj9tk1bw4a/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoic2s4c3RldmlldWsiLCJhIjoiY2o3dThmZGR4NHoxdjJxbnU2cmo0MGptYSJ9.P81_j3KirUWPOQ_X6FQdqg"></l-tile-layer>
                   <l-geo-json :geojson="geojson" :options="options" :options-style="styleFunction"></l-geo-json>
                   <l-marker v-if="userLat && userLong" :lat-lng="[userLat,userLong]">marker</l-marker>
                   <l-control class="example-custom-control">
                      <div class="flex flex-row">
                          <form class="mr-4">
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
                           <ul id="key" class="text-right bg-white p-2 flex">
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
    </div>
</template>

<style>
    path.leaflet-interactive:hover {
        fill-opacity: 1;
    }

    .nav-btn {
        @apply py-4 w-full text-center hover:bg-gray-100;
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
          typeFilter: null
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

                  // layer.on('click', function(e) {
                  //     console.log(e.target);
                  // });

                  //Set the style of the polygon
                  if( html != "<div></div>" ) {
                      layer.bindTooltip(
                            html,
                          { permanent: false,sticky: true }
                      );
                  }

                  layer.setStyle({
                      fillColor: fillColor,
                      fillOpacity: opacity,
                      opacity: opacity,
                      color: "#222222"
                  });
              };
          }
      },
      async mounted() {
          //Get the users current position
          const position = this.getPosition()
              .then((position) => {
                  this.userLat = position.coords.latitude;
                  this.userLong = position.coords.longitude;
              })
              .catch((err) => {
                  console.error(err.message)
              })

          // console.log(this.$children);

      },
      methods:{
          getPosition(options) {
              return new Promise(function(resolve, reject) {
                  navigator.geolocation.getCurrentPosition(resolve, reject, options)
              })
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

              map.eachLayer(function (layer) {
                  let opacity = 0;

                  if( layer.feature != null ) {
                      if( layer.feature.properties.type == null && filter == 'empty' ) {
                          opacity = 0.65;
                      }
                      else if( filter == '' ) {
                          opacity = 0.65;
                      }
                      else if( layer.feature.properties.type != null && layer.feature.properties.type == filter ) {
                          opacity = 0.65;
                      }

                      layer.setStyle({
                          fillOpacity: opacity,
                          opacity: opacity
                      });
                  }
              });
          }
      }
    }
</script>
