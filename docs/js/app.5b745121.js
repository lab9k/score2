(function(t){function e(e){for(var r,o,s=e[0],c=e[1],u=e[2],d=0,p=[];d<s.length;d++)o=s[d],a[o]&&p.push(a[o][0]),a[o]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(t[r]=c[r]);l&&l(e);while(p.length)p.shift()();return i.push.apply(i,u||[]),n()}function n(){for(var t,e=0;e<i.length;e++){for(var n=i[e],r=!0,s=1;s<n.length;s++){var c=n[s];0!==a[c]&&(r=!1)}r&&(i.splice(e--,1),t=o(o.s=n[0]))}return t}var r={},a={app:0},i=[];function o(e){if(r[e])return r[e].exports;var n=r[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=t,o.c=r,o.d=function(t,e,n){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},o.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)o.d(n,r,function(e){return t[e]}.bind(null,r));return n},o.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],c=s.push.bind(s);s.push=e,s=s.slice();for(var u=0;u<s.length;u++)e(s[u]);var l=c;i.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"56d7":function(t,e,n){"use strict";n.r(e);n("cadf"),n("551c"),n("097d");var r=n("2b0e"),a=n("bb71");n("da64");r["a"].use(a["a"],{iconfont:"md"});var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-app",[n("v-content",[n("Graph")],1)],1)},o=[],s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"explorerContainer"},[t.cluster?n("div",{attrs:{id:"cluster"}},[n("h3",{staticClass:"text-xs-center"},[t._v("\n      You are watching everything within the Cluster:\n      "),n("span",[t._v(t._s(t.cluster))])])]):t._e(),n("div",{ref:"graph",attrs:{id:"graph"}}),n("div",{attrs:{id:"btns"}},[n("v-btn",{attrs:{id:"reloadBtn",color:"warning"},on:{click:t.reload}},[t._v("\n      "+t._s(t.reloadBtnText)+"\n    ")]),t.displayDemo?n("v-btn",{attrs:{id:"demoBtn",color:"primary"},on:{click:t.enableDemo}},[t._v("\n      "+t._s(t.demoBtnText)+"\n    ")]):t._e(),n("v-btn",{attrs:{id:"physicsBtn",color:"secondary"},on:{click:t.swapPhysics}},[t._v("\n      "+t._s(t.physicsText)+"\n    ")])],1),n("v-dialog",{attrs:{"hide-overlay":"",persistent:"",width:"300"},model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[n("v-card",{attrs:{color:"primary",dark:""}},[n("v-card-text",[t._v("\n        Please stand by\n        "),n("v-progress-linear",{staticClass:"mb-0",attrs:{color:"white",indeterminate:""}})],1)],1)],1)],1)},c=[],u=(n("7514"),n("386d"),n("ac6a"),n("cebc")),l=n("2f62"),d=n("bd86"),p=n("75fc"),f=n("e9a8"),h=n.n(f),b=n("dd61"),m=n.n(b),v=n("2769"),g=n.n(v),_=n("a8fc"),y=n.n(_),w=n("6cd4"),O=n.n(w);function j(t){var e=function t(e){var n;O()(t.data,function(n){var r=n[e];O()(r,function(e){g()(t.graph.nodes,function(t){return t.label===e.label})||t.graph.nodes.push(e)})});var r=h()(t.data,function(n){var r=y()(n[e],"label");return m()(r,function(e){var r=g()(t.graph.nodes,function(t){return t.label===e.label});return{from:n.id,to:(r||e).id}})});(n=t.graph.edges).push.apply(n,Object(p["a"])(r));var a=h()(t.data,function(t){return t[e]});return t.data=a,t};return e.data=t,e.graph={nodes:Object(p["a"])(e.data),edges:[]},e}n("28a5");var T=n("2ef0"),k={mass:1,fixed:!1,clickable:!0},x=Object(u["a"])({},k,{group:"city"}),S=Object(u["a"])({},k,{group:"topics"}),D=Object(u["a"])({},k,{group:"challenge"}),A=Object(u["a"])({},k,{group:"clusters"}),E={clickable:!1,fixed:!0,physics:!1,size:25},P=[Object(u["a"])({},x,E,{label:"city"}),Object(u["a"])({},A,E,{label:"cluster"}),Object(u["a"])({},D,E,{label:"challenge"}),Object(u["a"])({},S,E,{label:"topic"})];var C,$=function(t){var e=0;return Object(T["map"])(t.entry,function(t){var n=t.gsx$city.$t,r=t.gsx$description.$t,a=t.gsx$topicsauto.$t,i=t.gsx$title.$t,o=t.gsx$clustersauto.$t;return{city:n,description:r,title:i,keywords:a.split(", ").filter(function(t){return""!==t}),topics:o.split(", ").filter(function(t){return""!==t}),id:++e,label:n}})},B=function(t){return Object(T["filter"])(Object(T["map"])(Object(T["uniqBy"])(t,"city"),function(t){return t.city}),function(t){return""!==t})},M=function(t,e){var n=B(t),r=0;return Object(T["compact"])(Object(T["map"])(n,function(n){var a=Object(T["filter"])(t,function(t){return t.city===n&&Object(T["includes"])(t.topics,e)});return a.length<=0?null:Object(u["a"])({challenges:Object(T["map"])(a,function(t){return Object(u["a"])({},t,D,{label:t.title,id:++r,keywords:Object(T["map"])(t.keywords,function(t){return Object(u["a"])({},S,{label:t,id:++r})})})})},x,{label:n,id:++r})}))},R=function(t){var e=B(t),n=0;return Object(T["map"])(e,function(e){var r=Object(T["filter"])(t,function(t){return t.city===e}),a=Object(T["flatMap"])(r,function(t){return t.topics});return Object(u["a"])({},x,{label:e,id:++n,topics:Object(T["map"])(a,function(t){return Object(u["a"])({},A,{label:t,id:++n})})})})},H=n("4f27"),W={MUTATE_RAW_DATA:"mutate_raw_data",FETCH_SPREADSHEET_DATA:"fetch_spreadsheet",HANDLE_CLICK:"handle_click",RESET_BUTTON:"reset_button",SWAP_DEMO:"swap_demo_mode",SWAP_PHYSICS:"swap_physics"},I=(C={},Object(d["a"])(C,W.MUTATE_RAW_DATA,function(t,e){var n=e.feed;t.feed=n;var r=$(n);t.raw_data=r;var a=j(R(r))("topics"),i=a.graph;t.graph={nodes:new H["DataSet"](i.nodes),edges:new H["DataSet"](i.edges)}}),Object(d["a"])(C,W.HANDLE_CLICK,function(t,e){if(e){t.reloadBtnText="back";var n=Object(u["a"])({},e);t.selected_cluster=n;var r=j(M(t.raw_data,n.label))("challenges")("keywords"),a=r.graph;t.graph={nodes:new H["DataSet"](a.nodes),edges:new H["DataSet"](a.edges)}}}),Object(d["a"])(C,W.RESET_BUTTON,function(t){t.reloadBtnText="reload"}),Object(d["a"])(C,W.SWAP_DEMO,function(t){t.demo=!t.demo}),Object(d["a"])(C,W.SWAP_PHYSICS,function(t){var e=t.options;e.physics.enabled=!e.physics.enabled}),C),N=(n("96cf"),n("3b8d")),z=function(){var t=Object(N["a"])(regeneratorRuntime.mark(function t(e){var n;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,fetch(e);case 2:return n=t.sent,t.abrupt("return",n.json());case 4:case"end":return t.stop()}},t,this)}));return function(e){return t.apply(this,arguments)}}(),F=Object(d["a"])({},W.FETCH_SPREADSHEET_DATA,function(){var t=Object(N["a"])(regeneratorRuntime.mark(function t(e){var n,r,a;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return n=e.commit,r="https://spreadsheets.google.com/feeds/list/1vBJ9rB7NttdM98DbF0cBm6C1QD5nVmom53iisk3mtTc/1/public/values?alt=json",t.prev=2,t.next=5,z(r);case 5:a=t.sent,n(W.MUTATE_RAW_DATA,a),n(W.RESET_BUTTON),t.next=13;break;case 10:t.prev=10,t.t0=t["catch"](2),console.error(t.t0);case 13:case"end":return t.stop()}},t,this,[[2,10]])}));return function(e){return t.apply(this,arguments)}}()),L={get_network:function(t){var e=t.graph;return e},get_options:function(t){var e=t.options;return e},reloadBtnText:function(t){var e=t.reloadBtnText;return e},cities:function(t){var e=t.cities;return e},selected_cities:function(t){var e=t.selected_cities;return e},cluster:function(t){var e=t.selected_cluster;return e.label},demoBtnText:function(t){var e=t.demo;return e?"Disable Demo":"Enable Demo"},physics:function(t){var e=t.options.physics;return e},physicsText:function(t){var e=t.options.physics.enabled;return e?"Disable physics":"Enable physics"}};r["a"].use(l["a"]);var V=new l["a"].Store({state:{graph:{nodes:[],edges:[]},options:{autoResize:!0,height:"100%",width:"100%",layout:{improvedLayout:!1},physics:{enabled:!0,stabilization:{enabled:!0,iterations:150,fit:!0}},groups:{city:{color:"rgba(57,62,70,1)",font:{size:18},shape:"hexagon"},clusters:{color:"rgba(252, 60, 60, 1)",font:{size:18},shape:"hexagon"},topics:{color:"rgba(0, 173, 181, 1)",font:{size:18},shape:"hexagon"},challenge:{color:"rgba(248, 181, 0, 1)",font:{size:18},shape:"hexagon"}},edges:{arrows:{to:{enabled:!0,scaleFactor:.5}}}},raw_data:{},reloadBtnText:"Reload",demo:!1,selected_cluster:{}},mutations:I,actions:F,getters:L}),U={name:"Graph",props:{width:{type:String,default:function(){return"100%"}},height:{type:String,default:function(){return"100%"}}},data:function(){return{events:["doubleClick","selectNode","click","stabilizationIterationsDone","afterDrawing"],network:null,dialog:!1,timeout:null,displayDemo:!1}},computed:Object(u["a"])({},Object(l["c"])(["demo"]),Object(l["b"])(["get_network","get_options","reloadBtnText","cluster","demoBtnText","physics","physicsText"])),watch:{get_network:function(t){var e=this;null!==this.network&&this.network.destroy();var n=this.$refs.graph,r=-n.clientWidth/2-75,a=-n.clientHeight/2-75,i=P.map(function(t){var e=t.font,n=Object(u["a"])({},t,{x:r,y:a,font:Object(u["a"])({},e,{vadjust:-12})});return a+=80,n});t.nodes.add(i),this.network=new H["Network"](n,t,this.get_options),this.events.forEach(function(t){return e.network.on(t,function(n){return e.handle_event(t,n)})})}},created:function(){},mounted:function(){this.dialog=!0,this.$store.state.topic="",this.$store.dispatch(W.FETCH_SPREADSHEET_DATA);var t=window.location.search.substring(1),e=new URLSearchParams(t);e.get("demo")&&(this.displayDemo=!0)},methods:{reload:function(){this.dialog=!0,this.demo&&(clearTimeout(this.timeout),this.$store.commit(W.SWAP_DEMO)),this.$store.state.selected_cluster={},this.$store.dispatch(W.FETCH_SPREADSHEET_DATA)},swapPhysics:function(){this.$store.commit(W.SWAP_PHYSICS),this.network.setOptions({physics:this.physics})},handle_event:function(t,e){var n,r,a=this;switch(t){case"doubleClick":n=e.nodes[0],r=this.network.body.data.nodes.map(function(t){return t}).find(function(t){return t.id===n&&"clusters"===t.group}),this.dialog=!0,this.$store.commit(W.HANDLE_CLICK,r),this.demo&&(clearTimeout(this.timeout),this.$store.commit(W.SWAP_DEMO));break;case"selectNode":n=e.nodes[0],r=this.network.body.data.nodes.map(function(t){return t}).find(function(t){return t.id===n}),this.demo&&(clearTimeout(this.timeout),this.$store.commit(W.SWAP_DEMO)),r.clickable&&this.network.focus(n,{animation:{duration:800,easingFunction:"easeInCubic"},scale:1.2});break;case"click":0!==e.nodes.length||0!==e.edges.length||this.demo||this.network.fit({animation:{duration:800,easingFunction:"easeInCubic"},scale:1.2});break;case"afterDrawing":this.dialog=!1;break;case"stabilizationIterationsDone":this.swapPhysics(),this.$nextTick(function(){a.swapPhysics()});break;default:return}},enableDemo:function(){var t=this;if(this.demo)clearTimeout(this.timeout);else{var e=20,n=function e(){var n=t.randomSecs(4,8),r=Object(T["sample"])(t.network.body.data.nodes.map(function(t){return t}).filter(function(t){return t.clickable}));t.network.focus(r.id,{animation:{duration:n,easingFunction:"easeOutCubic"},scale:1.1}),t.timeout=setTimeout(e,n+50)};this.timeout=setTimeout(n,e)}this.$store.commit(W.SWAP_DEMO)},randomSecs:function(t,e){return Math.floor(Math.random()*(1e3*e-1e3*t))+1e3*t}}},G=U,Y=(n("8e60b"),n("2877")),J=n("6544"),K=n.n(J),q=n("8336"),Q=n("b0af"),X=n("99d9"),Z=n("169a"),tt=n("8e36"),et=Object(Y["a"])(G,s,c,!1,null,null,null);et.options.__file="Graph.vue";var nt=et.exports;K()(et,{VBtn:q["a"],VCard:Q["a"],VCardText:X["a"],VDialog:Z["a"],VProgressLinear:tt["a"]});var rt={name:"App",components:{Graph:nt},data:function(){return{}}},at=rt,it=n("7496"),ot=n("549c"),st=Object(Y["a"])(at,i,o,!1,null,null,null);st.options.__file="App.vue";var ct=st.exports;K()(st,{VApp:it["a"],VContent:ot["a"]}),r["a"].config.productionTip=!1,new r["a"]({store:V,render:function(t){return t(ct)}}).$mount("#app")},"8e60b":function(t,e,n){"use strict";var r=n("af4a"),a=n.n(r);a.a},af4a:function(t,e,n){}});
//# sourceMappingURL=app.5b745121.js.map