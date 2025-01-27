(window.webpackJsonp=window.webpackJsonp||[]).push([[6,2],{291:function(t,e,r){"use strict";r.r(e);var o={props:["title"]},l=r(17),component=Object(l.a)(o,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"py-12"},[null!=t.title?e("h1",{staticClass:"text-2xl font-bold"},[t._v(t._s(t.title))]):t._e()])}),[],!1,null,null,null);e.default=component.exports},294:function(t,e,r){var content=r(301);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(43).default)("5dfb1fca",content,!0,{sourceMap:!1})},300:function(t,e,r){"use strict";r(294)},301:function(t,e,r){var o=r(42)((function(i){return i[1]}));o.push([t.i,".shop-list{display:grid;grid-template-columns:repeat(1,minmax(0,1fr));grid-gap:2rem;gap:2rem}.shop-list li a{overflow:hidden;--tw-shadow:0 4px 6px -1px rgba(0,0,0,.1),0 2px 4px -2px rgba(0,0,0,.1);--tw-shadow-colored:0 4px 6px -1px var(--tw-shadow-color),0 2px 4px -2px var(--tw-shadow-color);box-shadow:0 0 transparent,0 0 transparent,0 4px 6px -1px rgba(0,0,0,.1),0 2px 4px -2px rgba(0,0,0,.1);box-shadow:var(--tw-ring-offset-shadow,0 0 transparent),var(--tw-ring-shadow,0 0 transparent),var(--tw-shadow)}.shop-list li a,.shop-list li a .card-content{display:flex;flex-direction:column;gap:1rem}.shop-list li a .card-content{padding:1rem}.shop-list li a h3{font-size:1.25rem;font-weight:700;line-height:1.75rem}.shop-list li a img{aspect-ratio:1/1;-o-object-fit:contain;object-fit:contain}.shop-list li a p{display:-webkit-box;overflow:hidden;text-overflow:ellipsis;-webkit-line-clamp:5;-webkit-box-orient:vertical}.shop-list li a:hover{--tw-shadow:0 20px 25px -5px rgba(0,0,0,.1),0 8px 10px -6px rgba(0,0,0,.1);--tw-shadow-colored:0 20px 25px -5px var(--tw-shadow-color),0 8px 10px -6px var(--tw-shadow-color);box-shadow:0 0 transparent,0 0 transparent,0 20px 25px -5px rgba(0,0,0,.1),0 8px 10px -6px rgba(0,0,0,.1);box-shadow:var(--tw-ring-offset-shadow,0 0 transparent),var(--tw-ring-shadow,0 0 transparent),var(--tw-shadow)}@media (min-width:768px){.shop-list{grid-template-columns:repeat(3,minmax(0,1fr))}}@media (min-width:1024px){.shop-list{grid-template-columns:repeat(4,minmax(0,1fr))}}.tags{display:flex;flex-direction:row;flex-flow:wrap;gap:.5rem}.pill{border-color:#8b66a1;border-color:rgba(139,102,161,var(--tw-border-opacity));border-radius:.375rem;border-width:1px;font-size:.875rem;line-height:1.25rem;padding:.5rem 1rem;--tw-text-opacity:1;color:#8b66a1;color:rgba(139,102,161,var(--tw-text-opacity))}.error,.pill{--tw-border-opacity:1}.error{align-items:center;border-color:#b91c1c;border-color:rgba(185,28,28,var(--tw-border-opacity));border-radius:.375rem;border-width:1px;display:flex;margin-bottom:1rem;--tw-bg-opacity:1;background-color:#fecaca;background-color:rgba(254,202,202,var(--tw-bg-opacity));padding:1rem;--tw-text-opacity:1;color:#b91c1c;color:rgba(185,28,28,var(--tw-text-opacity))}",""]),o.locals={},t.exports=o},312:function(t,e,r){"use strict";r.r(e);r(44);var o=r(10),l=(r(35),r(16),r(45),r(83),r(84),r(50),{data:function(){return{allShops:null,shops:null,tagsRaw:null,tags:null,topLevelTags:null,showError:!1,errorMessage:"Generic error: Unknown problem."}},methods:{filterList:function(t){var filter=document.querySelector("#filter-category").value,e=document.querySelector("#local-checkbox").checked,r=document.querySelector("#filter-search").value,o=this.allShops,l=[];if(""!=filter&&"null"!=filter?(o.forEach((function(t){t.Tags.includes(filter)&&(1==e&&1!=t.Local||l.push(t))})),this.shops=l,l.length<1?(this.showError=!0,this.errorMessage="Couldn't find anything with your chosen filter, please try again with another filter."):this.showError=!1):(this.showError=!1,1==e?(o.forEach((function(t){t.Local&&l.push(t)})),this.shops=l):(l=this.allShops,this.shops=this.allShops)),null!=r&&r.length>0){String.prototype.fuzzy=function(s){var t,e=this.toLowerCase(),i=0,r=-1;for(s=s.toLowerCase();t=s[i++];)if(!~(r=e.indexOf(t,r+1)))return!1;return!0};var n=[];l.forEach((function(t){t.Title.toLowerCase().fuzzy(r.toLowerCase())&&n.push(t)})),this.shops=n}}},mounted:function(){var data=localStorage.getItem("shops"),t=localStorage.getItem("tags");if(null!=data&&(this.allShops=JSON.parse(data),this.shops=JSON.parse(data)),null!=t){t=JSON.parse(t),this.tagsRaw=t;var e=[],r=[];t.forEach((function(t){e[t.id]=t.name,1==t.level&&r.push(t)})),this.tags=e,this.topLevelTags=r}},created:function(){return Object(o.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:case"end":return t.stop()}}),t)})))()}}),n=(r(300),r(17)),component=Object(n.a)(l,(function(){var t=this,e=t._self._c;return e("section",{staticClass:"container mx-auto"},[e("Header",{attrs:{title:"Stores"}}),t._v(" "),t.showError?e("div",{staticClass:"error"},[e("svg",{staticClass:"fill-current h-5 w-5"},[e("use",{attrs:{href:"#alert"}})]),t._v(" "),e("p",[t._v(t._s(t.errorMessage))])]):t._e(),t._v(" "),e("form",{staticClass:"flex flex-row items-center justify-end gap-4 mb-8"},[e("fieldset",{staticClass:"checkbox flex"},[e("input",{staticClass:"w-auto mr-1",attrs:{type:"checkbox",id:"local-checkbox",name:"local"},on:{change:function(e){return t.filterList(e)}}}),t._v(" "),e("label",{attrs:{for:"local-checkbox"}},[t._v("Local only?")])]),t._v(" "),e("fieldset",{staticClass:"w-auto"},[e("label",{staticClass:"sr-only",attrs:{for:"filter-search"}},[t._v("Search")]),t._v(" "),e("input",{staticClass:"w-auto mr-1",attrs:{type:"text",id:"filter-search",name:"search",placeholder:"Search stores"},on:{keyup:function(e){return t.filterList(e)}}})]),t._v(" "),e("fieldset",{staticClass:"w-auto"},[e("label",{staticClass:"sr-only",attrs:{for:"filter-category"}},[t._v("Filter by category")]),t._v(" "),e("select",{staticClass:"w-auto",attrs:{id:"filter-category"},on:{change:function(e){return t.filterList(e)}}},[e("option",{attrs:{disabled:"",selected:"",value:"null"}},[t._v("Filter by category")]),t._v(" "),e("option",{attrs:{value:""}},[t._v("All")]),t._v(" "),t._l(t.topLevelTags,(function(r){return e("optgroup",{attrs:{label:r.name}},t._l(t.tagsRaw,(function(o){return 1!=o.level&&o.parent==r.id?e("option",{domProps:{value:o.id}},[t._v(t._s(o.name))]):t._e()})),0)})),t._v(" "),t._l(t.tagsRaw,(function(r){return 1!=r.level&&null==r.parent?e("option",{domProps:{value:r.id}},[t._v(t._s(r.name))]):t._e()}))],2)])]),t._v(" "),e("ul",{staticClass:"shop-list"},t._l(t.shops,(function(r){return e("li",[e("a",{attrs:{href:"#"}},[null!=r.Image?e("img",{attrs:{src:r.Image,alt:r.Title,loading:"lazy"}}):e("img",{attrs:{src:"https://placehold.co/500x500",alt:"placeholder image",loading:"lazy"}}),t._v(" "),e("div",{staticClass:"card-content"},[e("div",[e("h3",[t._v(t._s(r.Title))]),t._v(" "),e("span",{staticClass:"text-gray-500 text-sm"},[t._v(t._s(r.Number)+" Union Street, Aberdeen")])]),t._v(" "),e("p",[t._v(t._s(r.Description))]),t._v(" "),e("div",{staticClass:"tags"},t._l(r.Tags,(function(r,o){return e("p",{staticClass:"pill"},[t._v(t._s(t.tags[r]))])})),0)])])])})),0)],1)}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{Header:r(291).default})}}]);