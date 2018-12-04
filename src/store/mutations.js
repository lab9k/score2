import {
  generateNetwork,
  extractData,
  getCityToTopic,
  getCityToChallengeToKeyword
} from '../util';
import { DataSet } from 'vis';

export default {
  mutate_raw_data(state, { feed }) {
    const raw_data = extractData(feed);
    state.raw_data = raw_data;

    const { graph } = generateNetwork(getCityToTopic(raw_data))('topics');
    state.graph = {
      nodes: new DataSet(graph.nodes),
      edges: new DataSet(graph.edges)
    };
  },
  handle_click(state, clickedNode) {
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
  reset_button(state) {
    state.reloadBtnText = 'reload';
  },
  swap_demo_mode(state) {
    state.demo = !state.demo;
  },
  swap_physics({ options }) {
    options.physics = !options.physics;
  }
};
