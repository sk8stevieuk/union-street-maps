(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{189:function(t,e,r){var content=r(274);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(66).default)("3eb80c82",content,!0,{sourceMap:!1})},195:function(t,e,r){"use strict";var n={data:function(){return{}},mounted:function(){}},o=r(27),component=Object(o.a)(n,(function(){var t=this._self._c;return t("div",[t("Nuxt"),this._v(" "),t("Navigation")],1)}),[],!1,null,null,null);e.a=component.exports;installComponents(component,{Navigation:r(278).default})},201:function(t,e,r){r(202),t.exports=r(203)},273:function(t,e,r){"use strict";r(189)},274:function(t,e,r){var n=r(65)((function(i){return i[1]}));n.push([t.i,":root{--hamburger-width:28px;--hamburger-height:6px}.main-nav{--tw-bg-opacity:1;background-color:#fff;background-color:rgba(255,255,255,var(--tw-bg-opacity));height:100%;padding:1.5rem;position:fixed;top:0;transition-duration:.15s;transition-property:all;transition-timing-function:cubic-bezier(.4,0,.2,1);width:100%}@media (min-width:768px){.main-nav{width:50%}}@media (min-width:1024px){.main-nav{width:33.333333%}}.main-nav{left:-100%;z-index:1001}.main-nav.open{transition-duration:.15s;transition-property:all;transition-timing-function:cubic-bezier(.4,0,.2,1)}.hamburger,.main-nav.open{left:0}.hamburger{--tw-bg-opacity:1;background-color:#fff;background-color:rgba(255,255,255,var(--tw-bg-opacity));border-radius:9999px;margin-left:3.5rem;margin-top:.5rem;padding:.5rem;position:fixed;top:0;z-index:1001}.hamburger:hover{cursor:pointer}.hamburger>p{--tw-bg-opacity:1;background-color:#000;background-color:rgba(0,0,0,var(--tw-bg-opacity));border-radius:.25rem;height:6px;height:var(--hamburger-height);width:28px;width:var(--hamburger-width)}.hamburger>p:not(:last-child){margin-bottom:3px;margin-bottom:calc(var(--hamburger-height)/2)}input{border-radius:.25rem;border-width:1px;width:100%}",""]),n.locals={},t.exports=n},278:function(t,e,r){"use strict";r.r(e);r(21),r(105);var n={methods:{navClick:function(t){document.querySelector(".main-nav").classList.toggle("open")},search:function(t){this.$root.$refs.index.search(t)}}},o=(r(273),r(27)),component=Object(o.a)(n,(function(){var t=this,e=t._self._c;return e("div",[e("div",{staticClass:"hamburger",on:{click:function(e){return t.navClick(e)}}},[e("p"),t._v(" "),e("p"),t._v(" "),e("p")]),t._v(" "),e("nav",{staticClass:"main-nav"},[e("button",{staticClass:"nav-toggle float-right",on:{click:function(e){return t.navClick(e)}}},[t._v("X")]),t._v(" "),e("h1",{staticClass:"text-3xl font-bold"},[t._v("Save Union Street")]),t._v(" "),e("div",{staticClass:"flex flex-col justify-end items-baseline gap-16 h-full"},[e("div",{staticClass:"w-full"},[e("label",{staticClass:"font-bold",attrs:{for:"search"}},[t._v("Search Union Street for:")]),t._v(" "),e("input",{staticClass:"p-2 mt-1 w-full",attrs:{type:"text",id:"search",name:"search",placeholder:"search"},on:{change:function(e){return t.search(e)}}})]),t._v(" "),e("ul",[e("li",[e("nuxt-link",{staticClass:"text-2xl font-bold",attrs:{to:"/"}},[t._v("Occupancy Map")])],1),t._v(" "),e("li",[e("nuxt-link",{staticClass:"flex items-center",attrs:{to:"heat-map"}},[e("svg",{staticClass:"h-5 w-5 cursor-pointer hover:fill-red-700 mr-2",on:{click:function(e){return t.createHeatMap(e)}}},[e("use",{attrs:{href:"#heatmap"}})]),t._v(" "),e("span",{staticClass:"text-2xl font-bold"},[t._v("Heat Map")])])],1)]),t._v(" "),e("ul",[e("li",[t._v("Generate Report")]),t._v(" "),e("li",[e("nuxt-link",{attrs:{to:"report-a-problem"}},[t._v("Report A Problem")])],1)]),t._v(" "),e("Buycoffee")],1)])])}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{Buycoffee:r(279).default})},279:function(t,e,r){"use strict";r.r(e);var n=r(27),component=Object(n.a)({},(function(){var t=this,e=t._self._c;return e("a",{staticClass:"buymeacoffee bg-yellow-400 p-3 rounded-full flex items-center",attrs:{href:"https://buymeacoffee.com/sk8stevieuk",target:"_blank"}},[e("svg",{staticClass:"h-6 w-6 mr-1"},[e("use",{attrs:{href:"#buymeacoffee"}})]),t._v(" "),e("p",[t._v("Buy me a coffee")])])}),[],!1,null,null,null);e.default=component.exports}},[[201,5,1,6]]]);