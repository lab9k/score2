<template>
  <div class="explorerContainer">
    <!-- <CitySelection /> -->
    <img
      id="legend"
      src="../assets/legend.png"
      alt="legend"
    >
    <div
      v-if="cluster"
      id="cluster"
    >
      <h3 class="text-xs-center">
        You are watching everything within the Cluster:
        <span>{{ cluster }}</span>
      </h3>
    </div>
    <div
      id="graph"
      ref="graph"
    />
    <div id="btns">
      <v-btn
        id="reloadBtn"
        color="warning"
        @click="reload"
      >
        {{ reloadBtnText }}
      </v-btn>
      <v-btn
        v-if="displayDemo"
        id="demoBtn"
        color="primary"
        @click="enableDemo"
      >
        {{ demoBtnText }}
      </v-btn>
      <v-btn
        id="physicsBtn"
        color="secondary"
        @click="swapPhysics"
      >
        {{ physicsText }}
      </v-btn>
      <v-slider
        v-model="slider"
        class="slider"
        min="100"
        max="500"
        label="edge length"
        inverse-label
        thumb-label
      />
    </div>

    <v-dialog
      v-model="dialog"
      hide-overlay
      persistent
      width="300"
    >
      <v-card
        color="primary"
        dark
      >
        <v-card-text>
          {{ dialogText }}
          <v-progress-linear
            v-if="dialogText === 'Please stand by'"
            class="mb-0"
            color="white"
            indeterminate
          />
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { types } from '../store';
import { legendNodes } from '../models';
import { Network } from 'vis';
import { sample, throttle } from 'lodash';

export default {
  name: 'Graph',
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
  data() {
    return {
      events: [
        'doubleClick',
        'selectNode',
        'click',
        'stabilizationIterationsDone',
        'afterDrawing',
        'initRedraw'
      ],
      network: null,
      dialog: false,
      timeout: null,
      displayDemo: false,
      dialogText: 'Please stand by',
      selectedId: null,
      displayLegend: false,
      sliderCurrentValue: 500
    };
  },
  computed: {
    ...mapState(['demo']),
    ...mapGetters([
      'get_network',
      'get_options',
      'reloadBtnText',
      'cluster',
      'demoBtnText',
      'physics',
      'physicsText',
      'sliderValue'
    ]),
    slider: {
      get() {
        return this.sliderValue;
      },
      set(value) {
        this.sliderCurrentValue = value;
        this.throttledLengthUpdate();
      }
    }
  },
  watch: {
    get_network: function(newGraph) {
      if (this.network !== null) {
        this.network.destroy();
      }
      const container = this.$refs.graph;
      if (this.displayLegend) {
        let x = -container.clientWidth;
        let y = container.clientHeight - 100;
        const legend_positioned = legendNodes.map(n => {
          const { font: f } = n;
          const node = { ...n, x, y, font: { ...f } };
          x += 100;
          return node;
        });

        newGraph.nodes.add(legend_positioned);
      }
      if (!this.physics.enabled) {
        this.$store.commit(types.SWAP_PHYSICS);
      }

      this.network = new Network(container, newGraph, this.get_options);

      newGraph.nodes.forEach(({ id: nodeId, size, group }) => {
        if (group !== 'city' && group !== 'challenge') {
          const amountOfEdgesForNode = this.network.getConnectedEdges(nodeId)
            .length;
          const newSize = size + amountOfEdgesForNode * 6;
          newGraph.nodes.update({
            id: nodeId,
            size: newSize
          });
        }
      });

      this.events.forEach(ev =>
        this.network.on(ev, props => this.handle_event(ev, props))
      );
    }
  },
  created() {},
  mounted() {
    this.dialog = true;
    this.$store.state.topic = '';
    this.$store.dispatch(types.FETCH_SPREADSHEET_DATA).catch(err => {
      this.dialogText = 'Error fetching data. Please reload the page.';
      console.error(err);
    });
    let uri = window.location.search.substring(1);
    let params = new URLSearchParams(uri);
    if (params.get('demo')) {
      this.displayDemo = true;
    }
  },
  methods: {
    throttledLengthUpdate: throttle(
      function() {
        this.$store.commit(types.MUTATE_EDGE_LENGTH, this.sliderCurrentValue);
        this.network.setOptions(this.get_options);
        this.network.stabilize();
      },
      200,
      { leading: true }
    ),
    reload() {
      this.dialog = true;
      if (this.demo) {
        clearTimeout(this.timeout);
        this.$store.commit(types.SWAP_DEMO);
      }
      this.$store.state.selected_cluster = {};
      this.$store.dispatch(types.FETCH_SPREADSHEET_DATA).catch(err => {
        this.dialogText = 'Error fetching data. Please reload the page.';
        console.error(err);
      });
    },
    swapPhysics() {
      this.$store.commit(types.SWAP_PHYSICS);
      this.network.setOptions({ physics: this.physics });
    },
    handle_event(ev, props) {
      let id, node, connectedNodes, connectedEdges;
      switch (ev) {
        case 'doubleClick':
          id = this.selectedId;
          node = this.network.body.data.nodes
            .map(c => c)
            .find(e => e.id === id && e.group === 'clusters');
          if (node && node.group === 'clusters') {
            this.dialog = true;
            if (!this.physics.enabled) {
              this.swapPhysics();
            }
            this.$store.commit(types.HANDLE_CLICK, node);
          }
          if (this.demo) {
            clearTimeout(this.timeout);
            this.$store.commit(types.SWAP_DEMO);
          }
          break;
        case 'selectNode':
          // this.network.unselectAll();
          id = props.nodes[0];
          node = this.network.body.data.nodes
            .map(c => c)
            .find(e => e.id === id);

          //? current scale = Math.round(this.network.getScale()*10)/10
          if (this.demo) {
            clearTimeout(this.timeout);
            this.$store.commit(types.SWAP_DEMO);
          }
          if (node.clickable) {
            // this.network.focus(id, {
            //   animation: { duration: 800, easingFunction: 'easeInCubic' },
            //   scale: 1.2
            // });
          }
          break;
        case 'click':
          if (
            props.nodes.length === 0 &&
            props.edges.length === 0 &&
            !this.demo
          ) {
            this.network.fit({
              animation: { duration: 800, easingFunction: 'easeInCubic' },
              scale: 1.2
            });
          } else if (props.nodes.length !== 0) {
            this.network.unselectAll();
            id = props.nodes[0];
            this.selectedId = id;
            node = this.network.body.data.nodes
              .map(c => c)
              .find(e => e.id === id);
            connectedNodes = [
              node.id,
              ...this.network.getConnectedNodes(node.id)
            ];
            connectedEdges = this.network.getConnectedEdges(node.id);
            this.network.setSelection(
              {
                nodes: connectedNodes,
                edges: connectedEdges
              },
              { highlightEdges: false }
            );
          }
          break;
        case 'afterDrawing':
          this.dialog = false;
          break;
        case 'stabilizationIterationsDone':
          this.swapPhysics();
          // this.$nextTick(() => {
          //   this.swapPhysics();
          // });
          break;
        case 'initRedraw':
          if (this.$store.state.selected_cluster.label) return;
          this.createCityCircle();
          break;
        default:
          return;
      }
    },
    createCityCircle() {
      const ids = this.get_network.nodes.getIds({
        filter(node) {
          return node.group === 'city';
        }
      });
      const radius = 250;
      const d = (2 * Math.PI) / ids.length;
      ids.forEach((id, i) => {
        const x = radius * Math.cos(d * i);
        const y = radius * Math.sin(d * i);
        this.network.moveNode(id, x, y);
      });
    },
    enableDemo() {
      if (this.demo) {
        // disable demo mode
        clearTimeout(this.timeout);
      } else {
        // enable demo mode
        const secs = 20;
        const focus = () => {
          const secs = this.randomSecs(4, 8);
          // Focus on random nodes
          const node = sample(
            this.network.body.data.nodes.map(c => c).filter(e => e.clickable)
          );

          this.network.focus(node.id, {
            animation: { duration: secs, easingFunction: 'easeOutCubic' },
            scale: 1.1
          });

          this.timeout = setTimeout(focus, secs + 50);
        };
        this.timeout = setTimeout(focus, secs);
      }
      this.$store.commit(types.SWAP_DEMO);
    },
    randomSecs(min, max) {
      return Math.floor(Math.random() * (max * 1000 - min * 1000)) + min * 1000;
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
  flex-grow: 1;
  max-height: 90%;
}
/* #cluster {
  height: 5%;
} */
#btns {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-content: center;
  align-items: center;
  width: 40%;
}

#legend {
  position: absolute;
  width: 300px;
  left: 0;
  top: 0;
  z-index: 1000;
}
</style>
