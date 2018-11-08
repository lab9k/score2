(function(t){function e(e){for(var n,a,s=e[0],c=e[1],l=e[2],p=0,u=[];p<s.length;p++)a=s[p],i[a]&&u.push(i[a][0]),i[a]=0;for(n in c)Object.prototype.hasOwnProperty.call(c,n)&&(t[n]=c[n]);d&&d(e);while(u.length)u.shift()();return o.push.apply(o,l||[]),r()}function r(){for(var t,e=0;e<o.length;e++){for(var r=o[e],n=!0,s=1;s<r.length;s++){var c=r[s];0!==i[c]&&(n=!1)}n&&(o.splice(e--,1),t=a(a.s=r[0]))}return t}var n={},i={app:0},o=[];function a(e){if(n[e])return n[e].exports;var r=n[e]={i:e,l:!1,exports:{}};return t[e].call(r.exports,r,r.exports,a),r.l=!0,r.exports}a.m=t,a.c=n,a.d=function(t,e,r){a.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},a.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.t=function(t,e){if(1&e&&(t=a(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(a.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)a.d(r,n,function(e){return t[e]}.bind(null,n));return r},a.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return a.d(e,"a",e),e},a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},a.p="/score2/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],c=s.push.bind(s);s.push=e,s=s.slice();for(var l=0;l<s.length;l++)e(s[l]);var d=c;o.push([0,"chunk-vendors"]),r()})({0:function(t,e,r){t.exports=r("56d7")},"56d7":function(t,e,r){"use strict";r.r(e);var n=r("2b0e"),i=r("bb71");r("da64");n["a"].use(i["a"],{iconfont:"md"});var o=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-app",[r("v-content",[r("Graph")],1)],1)},a=[],s=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"container"},[r("div",{ref:"graph",style:t.sizeProps,attrs:{id:"graph"}}),r("v-btn",{attrs:{color:"warning"},on:{click:t.reload}},[t._v(t._s(t.btnText))]),r("v-dialog",{attrs:{"hide-overlay":"",persistent:"",width:"300"},model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[r("v-card",{attrs:{color:"primary",dark:""}},[r("v-card-text",[t._v("\n        Please stand by\n        "),r("v-progress-linear",{staticClass:"mb-0",attrs:{indeterminate:"",color:"white"}})],1)],1)],1)],1)},c=[],l=r("2f62"),d={MUTATE_RAW_DATA:"mutate_raw_data",FETCH_SPREADSHEET_DATA:"fetch_spreadsheet",HANDLE_CLICK:"handle_click",RESET_BUTTON:"reset_button",SELECT_CITY:"select_city"},p=r("2ef0");const u=t=>{let e=0;return t.entry.map(t=>{const{gsx$city:{$t:r},gsx$contact:{$t:n},gsx$description:{$t:i},gsx$keywords:{$t:o},gsx$title:{$t:a},gsx$topics:{$t:s}}=t,c={city:r,contact:n,description:i,title:a,keywords:o.split(", ").filter(t=>""!==t),topics:s.split(", ").filter(t=>""!==t),id:++e,label:r};return c})},h={shape:"hexagon",mass:2,fixed:!1},f={...h,type:"city",color:"rgba(178,114,112,1)"},b={...h,type:"keywords",color:"rgba(249, 255, 127, 1)"},g={...h,type:"challenge",color:"rgba(61, 139, 204, 1)"},_={...h,type:"topics",color:"rgba(255, 107, 101, 1)"},y=[{...f,fixed:!0,physics:!1,size:25,x:25,y:0,label:"city"},{...b,fixed:!0,physics:!1,size:25,x:25,y:50,label:"keyword"},{...g,fixed:!0,physics:!1,size:25,x:25,y:100,label:"challenge"},{..._,fixed:!0,physics:!1,size:25,x:25,y:150,label:"topic"}],v=t=>{return Object(p["uniqBy"])(t,"city").map(t=>t.city).filter(t=>""!==t)},j=t=>e=>{return Object(p["union"])(...t.map(t=>t[e])).filter(t=>""!==t)},O=t=>e=>{return Object(p["filter"])(e,e=>Object(p["includes"])(e.topics,t.label)).length},m=(t,e)=>{const[r,n]=Object(p["partition"])(t,t=>"city"===t.type),i=[];return Object(p["forEach"])(n,t=>{const n=O(t);Object(p["forEach"])(r,r=>{i.push(...Object(p["times"])(n(e[r.label]),()=>({from:r.id,to:t.id})))})}),i},w=t=>{const e=t[t.focus].map(e=>({..._,label:e,type:t.focus})),r=t.cities.map(t=>({label:t,...f}));let n=0;return Object(p["flatMap"])([e,r],t=>Object(p["map"])(t,t=>({...t,id:++n})))};var x={mutate_raw_data(t,{feed:e}){const r=u(e),n=v(r),i=j(r),o=i("keywords"),a=i("topics"),s=Object(p["groupBy"])(Object(p["filter"])(r,t=>""!==t.city),"city");t.raw_data=s,t.cities=n.sort(),t.selected_cities=n.sort(),t.keywords=o,t.topics=a;const c=w(t),l=m(c,s);t.graph={nodes:c,edges:l}},handle_click(t,{nodes:e}){const r=Object(p["find"])(t.graph.nodes,t=>t.id===e[0]&&"topics"===t.type);if(r){t.btnText="back",t.selected_topic={...r};const e=Object(p["map"])(t.cities,t=>({label:t,...f})),n=Object(p["filter"])(Object(p["flatMap"])(e,e=>t.raw_data[e.label]),e=>Object(p["includes"])(e.topics,t.selected_topic.label)),i=Object(p["map"])(n,t=>({label:t.title,city:t.city,...g})),o=Object(p["map"])(Object(p["uniq"])(Object(p["flatMap"])(n,t=>t.keywords)),t=>({label:t,...b}));let a=0;const s=Object(p["map"])(Object(p["concat"])(i,e,o),t=>({...t,id:++a})),c=Object(p["map"])(Object(p["filter"])(s,t=>"challenge"===t.type),t=>({from:t.id,to:Object(p["find"])(s,e=>e.label===t.city).id})),l=Object(p["flatMap"])(Object(p["filter"])(s,t=>"challenge"===t.type),e=>{const{keywords:r}=Object(p["find"])(t.raw_data[e.city],t=>t.title===e.label);return Object(p["map"])(r,t=>({from:Object(p["find"])(s,e=>e.label===t).id,to:e.id}))}),d=Object(p["concat"])(c,l);t.graph={nodes:s,edges:d}}},reset_button(t){t.btnText="reload"},select_city({selected_cities:t},e){t=Object(p["find"])(t,e)?Object(p["filter"])(t,t=>t===e):[...t,e]}};const T=t=>fetch(t).then(t=>t.json());var E={fetch_spreadsheet({commit:t}){const e="https://spreadsheets.google.com/feeds/list/1adKrrgn-KxFe1mWHUXZEDvu23BIzHE2wLk2YfIQjzbM/1/public/values?alt=json";T(e).then(e=>{t(d.MUTATE_RAW_DATA,e),t(d.RESET_BUTTON)}).catch(t=>console.log(t))}},k={get_nodes_and_edges({graph:t}){return t},get_options:({options:t})=>t,btnText:({btnText:t})=>t,cities:({cities:t})=>t,selected_cities:({selected_cities:t})=>t};n["a"].use(l["a"]);var $=new l["a"].Store({state:{graph:{nodes:[],edges:[]},focus:"topics",cities:[],options:{autoResize:!0,height:"100%",width:"100%"},raw_data:{},btnText:"Reload",selected_topic:{},selected_cities:[]},mutations:x,actions:E,getters:k});const A=y;var S=r("4f27"),C={name:"Graph",data(){return{events:["doubleClick"],network:null,dialog:!1}},props:{width:{type:String,default:function(){return"100vw"}},height:{type:String,default:function(){return"90vh"}}},computed:{...Object(l["c"])([]),...Object(l["b"])(["get_nodes_and_edges","get_options","btnText"]),sizeProps(){return{width:`${this.$props.width}`,height:`${this.$props.height}`,"min-height":`${this.$props.height}`}}},created(){},mounted(){this.dialog=!0,this.$store.dispatch(d.FETCH_SPREADSHEET_DATA)},methods:{reload(){this.dialog=!0,this.$store.dispatch(d.FETCH_SPREADSHEET_DATA)},handle_event(t,e){switch(t){case"doubleClick":this.dialog=!0,this.$store.commit(d.HANDLE_CLICK,e);break;default:return}}},watch:{get_nodes_and_edges:function(t){null!==this.network&&this.network.destroy();const e=this.$refs.graph,r=-e.clientWidth/2-50;let n=-e.clientHeight/2-50;const i=A.map(t=>{const e={...t,x:r,y:n};return n+=75,e});t.nodes.push(...i),this.network=new S["Network"](e,t,this.get_options),this.events.forEach(t=>this.network.on(t,e=>this.handle_event(t,e))),this.network.on("afterDrawing",()=>this.dialog=!1)}}},D=C,P=(r("8e60"),r("2877")),H=r("6544"),M=r.n(H),z=r("8336"),R=r("b0af"),L=r("99d9"),V=r("169a"),B=r("8e36"),I=Object(P["a"])(D,s,c,!1,null,null,null);I.options.__file="Graph.vue";var N=I.exports;M()(I,{VBtn:z["a"],VCard:R["a"],VCardText:L["a"],VDialog:V["a"],VProgressLinear:B["a"]});var U={name:"App",components:{Graph:N},data(){return{}}},F=U,G=r("7496"),K=r("549c"),W=Object(P["a"])(F,o,a,!1,null,null,null);W.options.__file="App.vue";var q=W.exports;M()(W,{VApp:G["a"],VContent:K["a"]}),n["a"].config.productionTip=!1,new n["a"]({store:$,render:t=>t(q)}).$mount("#app")},"8e60":function(t,e,r){"use strict";var n=r("af4a"),i=r.n(n);i.a},af4a:function(t,e,r){}});
//# sourceMappingURL=app.858a456c.js.map