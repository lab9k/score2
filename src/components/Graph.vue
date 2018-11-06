<template>
  <div class='container'>
    <div id='graph' ref='graph' v-bind:style='sizeProps'></div>
    <v-btn color="warning" @click="buttonClicked">Reload</v-btn>
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
          return '100%';
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
      ...mapGetters(['get_nodes_and_edges', 'get_options']),
      sizeProps() {
        return {
          width: `${this.$props.width}`,
          height: `${this.$props.height}`,
          'min-height': `${this.$props.height}`
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
      get_nodes_and_edges: function(newGraph) {
        if (this.network !== null) {
          this.network.destroy();
        }
        const container = this.$refs.graph;
        this.network = new Vis.Network(container, newGraph, this.get_options);
        this.events.forEach(ev =>
          this.network.on(ev, props => console.log(props))
        );
      }
    }
  };
</script> 

<style>
  #graph {
    background-color: #fefefe;
  }
  .container {
    width: 60%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
</style>