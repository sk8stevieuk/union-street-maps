(window.webpackJsonp=window.webpackJsonp||[]).push([[4,2],{291:function(e,t,r){"use strict";r.r(t);var n={props:["title"]},o=r(17),component=Object(o.a)(n,(function(){var e=this,t=e._self._c;return t("div",{staticClass:"py-12"},[null!=e.title?t("h1",{staticClass:"text-2xl font-bold"},[e._v(e._s(e.title))]):e._e()])}),[],!1,null,null,null);t.default=component.exports},292:function(e,t,r){var content=r(297);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,r(43).default)("3ce95c7c",content,!0,{sourceMap:!1})},296:function(e,t,r){"use strict";r(292)},297:function(e,t,r){var n=r(42)((function(i){return i[1]}));n.push([e.i,".grid-boxes{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));grid-gap:.5rem;gap:.5rem}@media (min-width:768px){.grid-boxes{grid-template-columns:repeat(4,minmax(0,1fr))}}.grid-boxes>li{border-radius:.25rem;border-width:1px;padding:1rem}",""]),n.locals={},e.exports=n},310:function(e,t,r){"use strict";r.r(t);var n=r(10),o=(r(35),r(16),{data:function(){return{details:[]}},methods:{getDb:function(){return Object(n.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise((function(e,t){var r=window.indexedDB.open("shop-ratings",2);r.onerror=function(e){console.log("Error opening db",e),t("Error")},r.onsuccess=function(t){e(t.target.result)}})));case 1:case"end":return e.stop()}}),e)})))()},getDetailsFromDb:function(){var e=this;return Object(n.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",new Promise((function(t,r){var n=e.db.transaction(["details"],"readonly");n.oncomplete=function(e){t(details)};var o=n.objectStore("details"),details=[];o.openCursor().onsuccess=function(e){var cursor=e.target.result;cursor&&(details.push(cursor.value),cursor.continue())}})));case 1:case"end":return t.stop()}}),t)})))()}},created:function(){var e=this;return Object(n.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.getDb();case 2:return e.db=t.sent,t.next=5,e.getDetailsFromDb();case 5:e.details=t.sent;case 6:case"end":return t.stop()}}),t)})))()}}),l=(r(296),r(17)),component=Object(l.a)(o,(function(){var e=this,t=e._self._c;return t("section",{staticClass:"container mx-auto flex flex-col gap-12"},[t("Header",{attrs:{title:"Union Street Report"}}),e._v(" "),t("ul",{staticClass:"flex flex-col gap-4"},e._l(e.details,(function(r){return t("li",[t("h3",{staticClass:"font-bold"},[e._v(e._s(r.title))]),e._v(" "),t("p",[e._v(e._s(r.value))])])})),0),e._v(" "),e._m(0)],1)}),[function(){var e=this,t=e._self._c;return t("div",[t("header",{staticClass:"mb-4"},[t("h3",{staticClass:"text-xl"},[e._v("Ideal High Street\n            ")]),e._v(" "),t("h4",[e._v("According to you.gov poll "),t("small",{staticClass:"ml-1 opacity-50"},[t("a",{attrs:{href:"https://yougov.co.uk/consumer/articles/20984-heres-what-britains-ideal-high-street-looks"}},[e._v("(Source)")])])])]),e._v(" "),t("ul",{staticClass:"grid-boxes"},[t("li",[e._v("Bank")]),e._v(" "),t("li",[e._v("Post Office")]),e._v(" "),t("li",[e._v("Pharmacy")]),e._v(" "),t("li",[e._v("Restaurant/Cafe")]),e._v(" "),t("li",[e._v("Clothes Shop")]),e._v(" "),t("li",[e._v("Newsagent")]),e._v(" "),t("li",[e._v("Homeware Shop")]),e._v(" "),t("li",[e._v("Barber/Hairdresser")]),e._v(" "),t("li",[e._v("Book Shop")]),e._v(" "),t("li",[e._v("Coffee Shop")]),e._v(" "),t("li",[e._v("Department Store")]),e._v(" "),t("li",[e._v("Supermarket")]),e._v(" "),t("li",[e._v("Electronic Goods Shop")]),e._v(" "),t("li",[e._v("Pub")]),e._v(" "),t("li",[e._v("Cinema")]),e._v(" "),t("li",[e._v("Takeaway")]),e._v(" "),t("li",[e._v("Music/Film/Game Shop")]),e._v(" "),t("li",[e._v("Charity Shop")]),e._v(" "),t("li",[e._v("Travel Agent")])])])}],!1,null,null,null);t.default=component.exports;installComponents(component,{Header:r(291).default,Header:r(291).default})}}]);