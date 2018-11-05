<template>
  <div class="container">
    <button @click="buttonClicked">refs</button>
    <div id="graph" ref="graph" v-bind:style="sizeProps"></div>
  </div>
</template>
 
<script>
import { mapState, mapGetters } from "vuex";
import types from "../store/types";
import Vis from "vis";

export default {
  name: "Graph",
  data() {
    return {};
  },
  props: {
    width: {
      type: Number,
      default: function() {
        return 600;
      }
    },
    height: {
      type: Number,
      default: function() {
        return 400;
      }
    }
  },
  computed: {
    ...mapState([]),
    ...mapGetters([]),
    sizeProps() {
      return {
        width: `${this.$props.width}px`,
        height: `${this.$props.height}px`
      };
    }
  },
  mounted() {
    const nodes = new Vis.DataSet([
      { id: 1, label: "Node 1" },
      { id: 2, label: "Node 2" },
      { id: 3, label: "Node 3" },
      { id: 4, label: "Node 4" },
      { id: 5, label: "Node 5" }
    ]);
    // create an array with edges
    const edges = new Vis.DataSet([
      { from: 1, to: 3 },
      { from: 1, to: 2 },
      { from: 2, to: 4 },
      { from: 2, to: 5 }
    ]);
    // create a network
    const container = this.$refs["graph"];
    // provide the data in the vis format
    var data = {
      nodes: nodes,
      edges: edges
    };
    var options = {};
    new Vis.Network(container, data, options);
  },
  methods: {
    buttonClicked() {
      this.$store.dispatch(types.FETCH_SPREADSHEET_DATA);
    }
  }
};
</script> 

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#graph {
  background-color: gainsboro;
}
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>