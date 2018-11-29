import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations';
import actions from './actions';
import getters from './getters';
import { legendNodes } from '../models/nodeOptions';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    topic: '',
    graph: {
      nodes: [],
      edges: []
    },
    focus: 'topics',
    cities: [],
    options: {
      autoResize: true,
      height: '100%',
      width: '100%',
      layout: { improvedLayout: false },
      physics: {}
    },
    raw_data: {},
    btnText: 'Reload',
    demo: false,
    selected_topic: {},
    selected_cities: [],
    physics: true
  },
  mutations,
  actions,
  getters
});

export const legend = legendNodes;
