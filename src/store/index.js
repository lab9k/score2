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
      layout: {
        improvedLayout: false
      },
      physics: {
        enabled: true,
        stabilization: {
          enabled: true,
          iterations: 150,
          fit: true
        }
      },
      groups: {
        city: {
          color: 'rgba(57,62,70,1)',
          font: {
            size: 18
          },
          shape: 'hexagon'
        },
        clusters: {
          color: 'rgba(252, 60, 60, 1)',
          font: {
            size: 18
          },
          shape: 'hexagon'
        },
        topics: {
          color: 'rgba(0, 173, 181, 1)',
          font: {
            size: 18
          },
          shape: 'hexagon'
        },
        challenge: {
          color: 'rgba(248, 181, 0, 1)',
          font: {
            size: 18
          },
          shape: 'hexagon'
        }
      },
      edges: {
        arrows: {
          to: {
            enabled: true,
            scaleFactor: 0.5
          }
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
