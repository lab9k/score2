import Vue from 'vue';
import Vuex from 'vuex';
import mutations, { legendNodes } from './mutations';
import actions from './actions';
import getters from './getters';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    graph: {
      nodes: [],
      edges: []
    },
    focus: 'topics',
    cities: [],
    options: {
      autoResize: true,
      height: '100%',
      width: '100%'
    },
    raw_data: {},
    btnText: 'Reload',
    selected_topic: {},
    selected_cities: []
  },
  mutations,
  actions,
  getters
});

export const legend = legendNodes;
