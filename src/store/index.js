import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations';
import actions from './actions';
import getters from './getters';
import { legendNodes } from '../models/nodeOptions';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    graph: {
      nodes: [],
      edges: []
    },
    options: {
      autoResize: true,
      height: '100%',
      width: '100%',
      layout: { improvedLayout: false },
      physics: true
    },
    raw_data: {},
    reloadBtnText: 'Reload',
    demo: false,
    selected_topic: {}
  },
  mutations,
  actions,
  getters
});

export const legend = legendNodes;
