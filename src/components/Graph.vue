<template>
  <div class='container'>
    <!-- <CitySelection /> -->
    <div id='graph' ref='graph' v-bind:style='sizeProps'></div>
    <v-btn color="warning" @click="reload">{{btnText}}</v-btn>
    <v-dialog v-model="dialog" hide-overlay persistent width="300">
      <v-card color="primary" dark>
        <v-card-text>
          Please stand by
          <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
 
<script>
  import { mapState, mapGetters } from 'vuex';
  import types from '../store/types';
  import { legend } from '../store';
  // import CitySelection from './CitySelection';
  import { Network } from 'vis';

  export default {
    name: 'Graph',
    // components: { CitySelection },
    data() {
      return {
        events: ['doubleClick'],
        network: null,
        dialog: false
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
          return '90vh';
        }
      }
    },
    computed: {
      ...mapState([]),
      ...mapGetters(['get_nodes_and_edges', 'get_options', 'btnText']),
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
      this.dialog = true;
      this.$store.dispatch(types.FETCH_SPREADSHEET_DATA);
    },
    methods: {
      reload() {
        this.dialog = true;
        this.$store.dispatch(types.FETCH_SPREADSHEET_DATA);
      },
      handle_event(ev, props) {
        switch (ev) {
          case 'doubleClick':
            this.dialog = true;
            this.$store.commit(types.HANDLE_CLICK, props);
            break;
          default:
            return;
        }
      }
    },
    watch: {
      get_nodes_and_edges: function(newGraph) {
        if (this.network !== null) {
          this.network.destroy();
        }
        const container = this.$refs.graph;
        const x = -container.clientWidth / 2 - 50;
        let y = -container.clientHeight / 2 - 50;
        const legend_positioned = legend.map(n => {
          const node = { ...n, x, y };
          y += 75;
          return node;
        });
        newGraph.nodes.push(...legend_positioned);
        this.network = new Network(container, newGraph, this.get_options);
        this.events.forEach(ev =>
          this.network.on(ev, props => this.handle_event(ev, props))
        );

        this.network.on('afterDrawing', () => (this.dialog = false));
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