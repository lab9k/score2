<template>
  <div class='container'>
    <div id='graph' ref='graph' v-bind:style='sizeProps'></div>
    <button @click="buttonClicked">click me!</button>
  </div>
</template>
 
<script>
  import { mapState, mapGetters } from 'vuex';
  import types from '../store/types';
  import Vis from 'vis';

  export default {
    name: 'Graph',
    data() {
      return {
        events: ['selectNode', 'selectEdge', 'deselectNode', 'deselectEdge'],
        network: null
      };
    },
    props: {
      width: {
        type: String,
        default: function() {
          return '100vw';
        }
      },
      height: {
        type: String,
        default: function() {
          return '100vh';
        }
      }
    },
    computed: {
      ...mapState([]),
      ...mapGetters(['get_nodes_and_edges']),
      sizeProps() {
        return {
          width: `${this.$props.width}`,
          height: `${this.$props.height}`
        };
      }
    },
    created() {},
    mounted() {
      this.$store.dispatch(types.FETCH_SPREADSHEET_DATA);
    },
    methods: {
      buttonClicked() {
        this.$store.dispatch(types.FETCH_SPREADSHEET_DATA);
      }
    },
    watch: {
      get_nodes_and_edges: function(newGraph /* , oldGraph*/) {
        if (this.network !== null) {
          this.network.destroy();
        }
        this.network = null;
        const container = this.$refs.graph;
        const options = {};
        this.network = new Vis.Network(container, newGraph, options);
        this.events.forEach(ev =>
          this.network.on(ev, props => console.log(props))
        );
      }
    }
  };
</script> 

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
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