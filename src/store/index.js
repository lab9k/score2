import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations';
import actions from './actions';
import getters from './getters';

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
      physics: {
        enabled: true,
        stabilization: {
          enabled: true,
          iterations: 150,
          fit: true
        }
      }
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
export { default as types } from './types';
