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
          enabled: true
        },
        repulsion: { nodeDistance: 50, centralGravity: 1 }
      },
      groups: {
        city: {
          color: {
            border: 'rgba(43, 222, 200, 0.7)',
            background: 'rgba(43, 222, 200, 0.7)',
            highlight: {
              border: 'rgba(30, 30, 30, 1)',
              background: 'rgba(43, 222, 200, 1)'
            }
          },
          shape: 'hexagon'
        },
        clusters: {
          color: {
            border: 'rgba(252, 60, 60, 0.7)',
            background: 'rgba(252, 60, 60, 0.7)',
            highlight: {
              border: 'rgba(30, 30, 30, 1)',
              background: 'rgba(252, 60, 60, 1)'
            }
          },
          shape: 'hexagon'
        },
        topics: {
          color: {
            border: 'rgba(174, 25, 255, 0.7)',
            background: 'rgba(174, 25, 255, 0.7)',
            highlight: {
              border: 'rgba(30, 30, 30, 1)',
              background: 'rgba(174, 25, 255, 1)'
            }
          },
          shape: 'hexagon'
        },
        challenge: {
          color: {
            border: 'rgba(248, 181, 0, 0.7)',
            background: 'rgba(248, 181, 0, 0.7)',
            highlight: {
              border: 'rgba(30, 30, 30, 1)',
              background: 'rgba(248, 181, 0, 1)'
            }
          },
          shape: 'hexagon'
        }
      },
      edges: {
        length: 500,
        width: 2,
        arrows: {
          to: {
            enabled: true,
            scaleFactor: 0.5
          }
        },
        smooth: {
          type: 'cubicBezier',
          roundness: 0.75,
          forceDirection: true
        }
      },
      nodes: {
        font: {
          background: 'rgba(0, 0, 0, 0.1)',
          size: 24
        }
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
