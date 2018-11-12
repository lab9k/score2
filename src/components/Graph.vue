<template>
  <div class='explorerContainer'>
    <!-- <CitySelection /> -->
    <div id="topic" v-if="topic !== ''">
      <h3 class="text-xs-center">Current topic: <span>{{topic}}</span></h3>
    </div>
    <div id='graph' ref='graph'></div>
    <v-btn id="reloadBtn" color="warning" @click="reload">{{btnText}}</v-btn>
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
        events: ['doubleClick', 'selectNode'],
        network: null,
        dialog: false
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
          return '100%';
        }
      }
    },
    computed: {
      ...mapState([]),
      ...mapGetters(['get_nodes_and_edges', 'get_options', 'btnText', 'topic'])
    },
    created() {},
    mounted() {
      this.dialog = true;
      this.$store.dispatch(types.FETCH_SPREADSHEET_DATA);
    },
    methods: {
      reload() {
        this.dialog = true;
        this.$store.state.topic = '';
        this.$store.dispatch(types.FETCH_SPREADSHEET_DATA);
      },
      handle_event(ev, props) {
        switch (ev) {
          case 'doubleClick':
            this.dialog = true;
            this.$store.commit(types.HANDLE_CLICK, props);
            break;
          case 'selectNode':
            //? current scale = Math.round(this.network.getScale()*10)/10
            this.network.focus(props.nodes[0], {
              animation: { duration: 800, easingFunction: 'easeInCubic' },
              scale: 1.3
            });
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
          const { font: f } = n;
          const node = { ...n, x, y, font: { ...f, vadjust: -15 } };
          y += 80;
          return node;
        });

        newGraph.nodes.add
          ? newGraph.nodes.add(legend_positioned)
          : newGraph.nodes.push(...legend_positioned);

        this.network = new Network(container, newGraph, this.get_options);
        this.events.forEach(ev =>
          this.network.on(ev, props => this.handle_event(ev, props))
        );

        this.network.on('afterDrawing', () => (this.dialog = false));
        this.network.on('stabilizationIterationsDone', () => {
          this.network.setOptions({ physics: false });
        });
      }
    }
  };
</script> 

<style>
  .explorerContainer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    max-height: 100vh;
    width: 100vw;
  }
  #graph {
    background-color: #fefefe;
    width: 100%;
    height: 90%;
  }
  #topic {
    height: 5%;
  }
  #reloadBtn {
    height: 5%;
  }
</style>