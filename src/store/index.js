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
    focus: 'topics',
    cities: [],
    options: {
      autoResize: true,
      height: '100%',
      width: '100%',
      nodes: {
        shape: 'circle'
      }
    },
    raw_data: {},
    btnText: 'Reload',
    selected_topic: {}
  },
  mutations,
  actions,
  getters
});
