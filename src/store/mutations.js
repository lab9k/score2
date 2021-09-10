import {
  generateNetwork,
  getCityToTopic,
  getCityToChallengeToKeyword,
  extractData,
} from '../util';
import { DataSet } from 'vis';
import types from './types';

export default {
  [types.MUTATE_RAW_DATA](state, { feed }) {
    state.feed = feed;
    const raw_data = extractData(feed);
    console.log(raw_data);
    state.raw_data = raw_data;

    const { graph } = generateNetwork(getCityToTopic(raw_data))('topics');
    state.graph = {
      nodes: new DataSet(graph.nodes),
      edges: new DataSet(graph.edges),
    };
  },
  [types.HANDLE_CLICK](state, clickedNode) {
    if (clickedNode) {
      state.reloadBtnText = 'back';
      const selected_cluster = { ...clickedNode };
      state.selected_cluster = selected_cluster;

      const { graph } = generateNetwork(
        getCityToChallengeToKeyword(state.raw_data, selected_cluster.label)
      )('challenges')('keywords');
      const nodes = new DataSet(graph.nodes);
      const edges = new DataSet(graph.edges);
      state.options.edges.length = 200;
      state.options.nodes.font.size = 32;
      state.graph = {
        nodes,
        edges,
      };
    }
  },
  [types.RESET_BUTTON](state) {
    state.options.edges.length = 500;
    state.options.nodes.font.size = 24;
    state.reloadBtnText = 'reload';
  },
  [types.SWAP_DEMO](state) {
    state.demo = !state.demo;
  },
  [types.SWAP_PHYSICS]({ options }) {
    options.physics.enabled = !options.physics.enabled;
  },
  [types.MUTATE_EDGE_LENGTH]({ options }, value) {
    options.edges.length = value;
  },
};
