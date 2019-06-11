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
          color: {
            border: 'rgba(43, 222, 200, 0.7)',
            background: 'rgba(43, 222, 200, 0.7)',
            highlight: {
              border: 'rgba(43, 222, 200, 1)',
              background: 'rgba(43, 222, 200, 1)'
            }
          },
          font: {
            size: 18
          },
          shape: 'hexagon'
        },
        clusters: {
          color: {
            border: 'rgba(252, 60, 60, 0.7)',
            background: 'rgba(252, 60, 60, 0.7)',
            highlight: {
              border: 'rgba(252, 60, 60, 1)',
              background: 'rgba(252, 60, 60, 1)'
            }
          },
          font: {
            size: 18
          },
          shape: 'hexagon'
        },
        topics: {
          color: {
            border: 'rgba(174, 25, 255, 0.7)',
            background: 'rgba(174, 25, 255, 0.7)',
            highlight: {
              border: 'rgba(174, 25, 255, 1)',
              background: 'rgba(174, 25, 255, 1)'
            }
          },
          font: {
            size: 18
          },
          shape: 'hexagon'
        },
        challenge: {
          color: {
            border: 'rgba(248, 181, 0, 0.7)',
            background: 'rgba(248, 181, 0, 0.7)',
            highlight: {
              border: 'rgba(248, 181, 0, 1)',
              background: 'rgba(248, 181, 0, 1)'
            }
          },
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
      },
      nodes: {
        font: { background: 'rgba(0, 0, 0, 0.1)' }
      },
      interaction: {
        hover: false
      }
    },
    raw_data: {},
    reloadBtnText: 'Reload',
    demo: false,
    selected_cluster: {}
  },
  mutations,
  actions,
  getters
});
export { default as types } from './types';
