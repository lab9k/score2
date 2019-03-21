<template>
  <div class="explorerContainer">
    <!-- <CitySelection /> -->
    <div
      v-if="topic"
      id="topic"
    >
      <h3 class="text-xs-center">
        Current topic:
        <span>{{ topic }}</span>
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
          Please stand by
          <v-progress-linear
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
import { sample } from 'lodash';

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
        'afterDrawing'
      ],
      network: null,
      dialog: false,
      timeout: null
    };
  },
  computed: {
    ...mapState(['demo']),
    ...mapGetters([
      'get_network',
      'get_options',
      'reloadBtnText',
      'topic',
      'demoBtnText',
      'physics',
      'physicsText'
    ])
  },
  watch: {
    get_network: function(newGraph) {
      if (this.network !== null) {
        this.network.destroy();
      }
      const container = this.$refs.graph;
      const x = -container.clientWidth / 2 - 75;
      let y = -container.clientHeight / 2 - 75;
      const legend_positioned = legendNodes.map(n => {
        const { font: f } = n;
        const node = { ...n, x, y, font: { ...f, vadjust: -12 } };
        y += 80;
        return node;
      });

      newGraph.nodes.add(legend_positioned);

      this.network = new Network(container, newGraph, this.get_options);
      this.events.forEach(ev =>
        this.network.on(ev, props => this.handle_event(ev, props))
      );
    }
  },
  created() {},
  mounted() {
    this.dialog = true;
    this.$store.state.topic = '';
    this.$store.dispatch(types.FETCH_SPREADSHEET_DATA);
  },
  methods: {
    reload() {
      this.dialog = true;
      if (this.demo) {
        clearTimeout(this.timeout);
        this.$store.commit(types.SWAP_DEMO);
      }
      this.$store.state.selected_topic = {};
      this.$store.dispatch(types.FETCH_SPREADSHEET_DATA);
    },
    swapPhysics() {
      this.$store.commit(types.SWAP_PHYSICS);
      this.network.setOptions({ physics: this.physics });
    },
    handle_event(ev, props) {
      let id, node;
      switch (ev) {
        case 'doubleClick':
          id = props.nodes[0];
          node = this.network.body.data.nodes
            .map(c => c)
            .find(e => e.id === id && e.group === 'topics');
          this.dialog = true;
          this.$store.commit(types.HANDLE_CLICK, node);

          if (this.demo) {
            clearTimeout(this.timeout);
            this.$store.commit(types.SWAP_DEMO);
          }
          break;
        case 'selectNode':
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
            this.network.focus(id, {
              animation: { duration: 800, easingFunction: 'easeInCubic' },
              scale: 1.2
            });
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
          }
          break;
        case 'afterDrawing':
          this.dialog = false;
          break;
        case 'stabilizationIterationsDone':
          this.swapPhysics();
          this.$nextTick(() => {
            this.swapPhysics();
          });
          break;
        default:
          return;
      }
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
  height: 90%;
}
#topic {
  height: 5%;
}
#btns {
  height: 5%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-content: center;
  align-items: center;
}
</style>
