import {
  generateNetwork,
  extractData,
  getCityToTopic,
  getCityToChallengeToKeyword
} from '../util';
import { DataSet } from 'vis';
import { types } from '.';

export default {
  [types.MUTATE_RAW_DATA](state, { feed }) {
    const raw_data = extractData(feed);
    state.raw_data = raw_data;

    const { graph } = generateNetwork(getCityToTopic(raw_data))('topics');
    state.graph = {
      nodes: new DataSet(graph.nodes),
      edges: new DataSet(graph.edges)
    };
  },
  [types.HANDLE_CLICK](state, clickedNode) {
    if (clickedNode) {
      state.reloadBtnText = 'back';
      const selected_topic = { ...clickedNode };
      state.selected_topic = selected_topic;

      const { graph } = generateNetwork(
        getCityToChallengeToKeyword(state.raw_data, selected_topic.label)
      )('challenges')('keywords');

      state.graph = {
        nodes: new DataSet(graph.nodes),
        edges: new DataSet(graph.edges)
      };
    }
  },
  [types.RESET_BUTTON](state) {
    state.reloadBtnText = 'reload';
  },
  [types.SWAP_DEMO](state) {
    state.demo = !state.demo;
  },
  [types.SWAP_PHYSICS]({ options }) {
    options.physics.enabled = !options.physics.enabled;
  }
};
