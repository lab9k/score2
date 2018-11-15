(function(t){function e(e){for(var i,a,c=e[0],r=e[1],l=e[2],p=0,h=[];p<c.length;p++)a=c[p],s[a]&&h.push(s[a][0]),s[a]=0;for(i in r)Object.prototype.hasOwnProperty.call(r,i)&&(t[i]=r[i]);d&&d(e);while(h.length)h.shift()();return n.push.apply(n,l||[]),o()}function o(){for(var t,e=0;e<n.length;e++){for(var o=n[e],i=!0,c=1;c<o.length;c++){var r=o[c];0!==s[r]&&(i=!1)}i&&(n.splice(e--,1),t=a(a.s=o[0]))}return t}var i={},s={app:0},n=[];function a(e){if(i[e])return i[e].exports;var o=i[e]={i:e,l:!1,exports:{}};return t[e].call(o.exports,o,o.exports,a),o.l=!0,o.exports}a.m=t,a.c=i,a.d=function(t,e,o){a.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},a.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.t=function(t,e){if(1&e&&(t=a(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(a.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)a.d(o,i,function(e){return t[e]}.bind(null,i));return o},a.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return a.d(e,"a",e),e},a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},a.p="";var c=window["webpackJsonp"]=window["webpackJsonp"]||[],r=c.push.bind(c);c.push=e,c=c.slice();for(var l=0;l<c.length;l++)e(c[l]);var d=r;n.push([0,"chunk-vendors"]),o()})({0:function(t,e,o){t.exports=o("56d7")},"56d7":function(t,e,o){"use strict";o.r(e);var i=o("2b0e"),s=o("bb71");o("da64");i["a"].use(s["a"],{iconfont:"md"});var n=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("v-app",[o("v-content",[o("Graph")],1)],1)},a=[],c=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"explorerContainer"},[""!==t.topic?o("div",{attrs:{id:"topic"}},[o("h3",{staticClass:"text-xs-center"},[t._v("Current topic: "),o("span",[t._v(t._s(t.topic))])])]):t._e(),o("div",{ref:"graph",attrs:{id:"graph"}}),o("div",{attrs:{id:"btns"}},[o("v-btn",{attrs:{id:"reloadBtn",color:"warning"},on:{click:t.reload}},[t._v(t._s(t.btnText))]),o("v-btn",{attrs:{id:"demoBtn",color:"primary"},on:{click:t.enableDemo}},[t._v(t._s(t.demoBtnText))])],1),o("v-dialog",{attrs:{"hide-overlay":"",persistent:"",width:"300"},model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[o("v-card",{attrs:{color:"primary",dark:""}},[o("v-card-text",[t._v("\n        Please stand by\n        "),o("v-progress-linear",{staticClass:"mb-0",attrs:{indeterminate:"",color:"white"}})],1)],1)],1)],1)},r=[],l=o("2f62"),d={MUTATE_RAW_DATA:"mutate_raw_data",FETCH_SPREADSHEET_DATA:"fetch_spreadsheet",HANDLE_CLICK:"handle_click",RESET_BUTTON:"reset_button",SELECT_CITY:"select_city",SWAP_DEMO:"swap_demo_mode"},p=o("2ef0");const h={shape:"hexagon",mass:3,fixed:!1,font:{size:18},clickable:!0},u={...h,type:"city",color:"rgba(57,62,70,1)"},b={...h,type:"keywords",color:"rgba(0, 173, 181, 1)"},f={...h,type:"challenge",color:"rgba(248, 181, 0, 1)"},m={...h,type:"topics",color:"rgba(252, 60, 60, 1)"},_={clickable:!1,fixed:!0,physics:!1,size:25},g=[{...u,..._,x:25,y:0,label:"city"},{...b,..._,x:25,y:50,label:"keyword"},{...f,..._,x:25,y:100,label:"challenge"},{...m,..._,x:25,y:150,label:"topic"}];class y{constructor(t){this.data=t,this.title=t.title,this.description=t.description,this.topics=[],this.topics.push(...t.topics),this.keywords=[],this.keywords.push(...t.keywords)}get node(){return{label:this.title,...f}}get keywordNodes(){return Object(p["map"])(this.keywords,t=>({label:t,...b}))}}class w{constructor(t){this.name=t,this.challenges=[]}addChallenges(...t){this.challenges.push(...Object(p["map"])(t,t=>new y(t)))}get topics(){return Object(p["flatMap"])(this.challenges,t=>t.topics)}get topicNodes(){return Object(p["map"])(this.topics,t=>({label:t,...m}))}get node(){return{label:this.name,...u}}get challengeNodes(){return Object(p["map"])(this.challenges,t=>t.node)}get keywordNodes_all(){return Object(p["flatMap"])(this.challenges,t=>t.keywordNodes)}}var O=o("4f27");class j{constructor(t){const e=Object.keys(t);this.cities=Object(p["map"])(e,t=>new w(t)),Object(p["forEach"])(this.cities,e=>e.addChallenges(...t[e.name]))}find_city(t){return Object(p["find"])(this.cities,e=>e.name===t)}get_city_to_topic_view(){const t=[],e=[];let o=0;return Object(p["forEach"])(this.cities,i=>{const s={...i.node,id:++o};t.push(s);const n=Object(p["map"])(i.topicNodes,t=>({...t,id:++o}));Object(p["forEach"])(n,o=>{const i=t.find(t=>t.label===o.label);i?e.push({to:s.id,from:i.id}):(t.push({...o,id:o.id}),e.push({to:s.id,from:o.id}))})}),{nodes:new O["DataSet"](t),edges:new O["DataSet"](e)}}get_city_challenge_keyword_view(){const t=[];let e=0;Object(p["forEach"])(this.cities,o=>{const i={...o.node,id:++e};t.push(i);const s=Object(p["map"])(o.challengeNodes,t=>({...t,id:++e}));t.push(...s);const n=Object(p["map"])(o.keywordNodes_all,t=>({...t,id:++e}));Object(p["forEach"])(n,e=>Object(p["find"])(t,t=>t.label===e.label)?0:t.push(e))})}}const v=t=>{let e=0;return t.entry.map(t=>{const{gsx$city:{$t:o},gsx$contact:{$t:i},gsx$description:{$t:s},gsx$keywords:{$t:n},gsx$title:{$t:a},gsx$topics:{$t:c}}=t,r={city:o,contact:i,description:s,title:a,keywords:n.split(", ").filter(t=>""!==t),topics:c.split(", ").filter(t=>""!==t),id:++e,label:o};return r})},k=t=>{return Object(p["uniqBy"])(t,"city").map(t=>t.city).filter(t=>""!==t)},T=t=>e=>{return Object(p["union"])(...t.map(t=>t[e])).filter(t=>""!==t)};var x={mutate_raw_data(t,{feed:e}){const o=v(e),i=k(o),s=T(o),n=s("keywords"),a=s("topics"),c=Object(p["groupBy"])(Object(p["filter"])(o,t=>""!==t.city),"city");t.raw_data=c,t.cities=i.sort(),t.selected_cities=i.sort(),t.keywords=n,t.topics=a;const r=new j(c).get_city_to_topic_view();t.graph=r},handle_click(t,e){const o=t.graph.nodes.map(t=>t),i=Object(p["find"])(o,t=>t.id===e&&"topics"===t.type);if(i){t.btnText="back",t.selected_topic={...i},t.topic=t.selected_topic.label;const e=Object(p["map"])(t.cities,t=>({label:t,...u})),o=Object(p["filter"])(Object(p["flatMap"])(e,e=>t.raw_data[e.label]),e=>Object(p["includes"])(e.topics,t.selected_topic.label)),s=Object(p["map"])(o,t=>({label:t.title,city:t.city,...f})),n=Object(p["map"])(Object(p["uniq"])(Object(p["flatMap"])(o,t=>t.keywords)),t=>({label:t,...b}));let a=0;const c=Object(p["map"])(Object(p["concat"])(s,e,n),t=>({...t,id:++a})),r=Object(p["map"])(Object(p["filter"])(c,t=>"challenge"===t.type),t=>({from:t.id,to:Object(p["find"])(c,e=>e.label===t.city).id})),l=Object(p["flatMap"])(Object(p["filter"])(c,t=>"challenge"===t.type),e=>{const{keywords:o}=Object(p["find"])(t.raw_data[e.city],t=>t.title===e.label);return Object(p["map"])(o,t=>({from:Object(p["find"])(c,e=>e.label===t).id,to:e.id}))}),d=Object(p["concat"])(r,l);t.graph={nodes:c,edges:d}}},reset_button(t){t.btnText="reload"},select_city({selected_cities:t},e){t=Object(p["find"])(t,e)?Object(p["filter"])(t,t=>t===e):[...t,e]},swap_demo_mode(t){t.demo=!t.demo}};const E=t=>fetch(t).then(t=>t.json());var A={fetch_spreadsheet({commit:t}){const e="https://spreadsheets.google.com/feeds/list/1adKrrgn-KxFe1mWHUXZEDvu23BIzHE2wLk2YfIQjzbM/1/public/values?alt=json";E(e).then(e=>{t(d.MUTATE_RAW_DATA,e),t(d.RESET_BUTTON)}).catch(t=>console.log(t))}},D={get_nodes_and_edges({graph:t}){return t},get_options:({options:t})=>t,btnText:({btnText:t})=>t,cities:({cities:t})=>t,selected_cities:({selected_cities:t})=>t,topic:({topic:t})=>t,demoBtnText:({demo:t})=>t?"Disable Demo":"Enable Demo"};i["a"].use(l["a"]);var S=new l["a"].Store({state:{topic:"",graph:{nodes:[],edges:[]},focus:"topics",cities:[],options:{autoResize:!0,height:"100%",width:"100%",layout:{improvedLayout:!0},physics:{}},raw_data:{},btnText:"Reload",demo:!1,selected_topic:{},selected_cities:[]},mutations:x,actions:A,getters:D});const $=g;var C={name:"Graph",props:{width:{type:String,default:function(){return"100%"}},height:{type:String,default:function(){return"100%"}}},data(){return{events:["doubleClick","selectNode","click"],network:null,dialog:!1,timeout:null}},computed:{...Object(l["c"])(["demo"]),...Object(l["b"])(["get_nodes_and_edges","get_options","btnText","topic","demoBtnText"])},watch:{get_nodes_and_edges:function(t){null!==this.network&&this.network.destroy();const e=this.$refs.graph,o=-e.clientWidth/2-50;let i=-e.clientHeight/2-50;const s=$.map(t=>{const{font:e}=t,s={...t,x:o,y:i,font:{...e,vadjust:-12}};return i+=80,s});t.nodes.add?t.nodes.add(s):t.nodes.push(...s),this.network=new O["Network"](e,t,this.get_options),this.events.forEach(t=>this.network.on(t,e=>this.handle_event(t,e))),this.network.on("afterDrawing",()=>this.dialog=!1),this.network.on("stabilizationIterationsDone",()=>{this.network.setOptions({physics:!1})})}},created(){},mounted(){this.dialog=!0,this.$store.state.topic="",this.$store.dispatch(d.FETCH_SPREADSHEET_DATA)},methods:{reload(){this.dialog=!0,this.demo&&(clearTimeout(this.timeout),this.$store.commit(d.SWAP_DEMO)),this.$store.state.topic="",this.$store.dispatch(d.FETCH_SPREADSHEET_DATA)},handle_event(t,e){const o=e.nodes[0],i=this.network.body.data.nodes.map(t=>t).find(t=>t.id===o);switch(t){case"doubleClick":this.dialog=!0,this.$store.commit(d.HANDLE_CLICK,o),this.demo&&(clearTimeout(this.timeout),this.$store.commit(d.SWAP_DEMO));break;case"selectNode":this.demo&&(clearTimeout(this.timeout),this.$store.commit(d.SWAP_DEMO)),i.clickable&&this.network.focus(o,{animation:{duration:800,easingFunction:"easeInCubic"},scale:1.2}),console.log(this.network);break;case"click":0!==e.nodes.length||0!==e.edges.length||this.demo||this.network.fit({animation:{duration:800,easingFunction:"easeInCubic"},scale:1.2});break;default:return}},enableDemo(){if(this.demo)clearTimeout(this.timeout);else{const t=20,e=()=>{const t=this.randomSecs(4,8),o=Object(p["sample"])(this.network.body.data.nodes.map(t=>t).filter(t=>t.clickable));this.network.focus(o.id,{animation:{duration:t,easingFunction:"easeOutCubic"},scale:1.1}),this.timeout=setTimeout(e,t+50)};this.timeout=setTimeout(e,t)}this.$store.commit(d.SWAP_DEMO)},randomSecs(t,e){return Math.floor(Math.random()*(1e3*e-1e3*t))+1e3*t}}},M=C,P=(o("8e60"),o("2877")),N=o("6544"),B=o.n(N),H=o("8336"),R=o("b0af"),W=o("99d9"),I=o("169a"),L=o("8e36"),F=Object(P["a"])(M,c,r,!1,null,null,null);F.options.__file="Graph.vue";var V=F.exports;B()(F,{VBtn:H["a"],VCard:R["a"],VCardText:W["a"],VDialog:I["a"],VProgressLinear:L["a"]});var z={name:"App",components:{Graph:V},data(){return{}}},U=z,G=o("7496"),K=o("549c"),q=Object(P["a"])(U,n,a,!1,null,null,null);q.options.__file="App.vue";var J=q.exports;B()(q,{VApp:G["a"],VContent:K["a"]}),i["a"].config.productionTip=!1,new i["a"]({store:S,render:t=>t(J)}).$mount("#app")},"8e60":function(t,e,o){"use strict";var i=o("af4a"),s=o.n(i);s.a},af4a:function(t,e,o){}});
//# sourceMappingURL=app.4a980146.js.map