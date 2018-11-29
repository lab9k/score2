const flatMap = require('lodash/flatMap');
const map = require('lodash/map');
/**
 *
 *
 * @export
 * @param {Array} data Array with nested data representing a network.
 * Every object should already have the desired vis.js~Node properties/options.
 * @returns generateNetwork~generator
 */
function generateNetwork(data) {
  /**
   *
   * @param {string} key
   * @returns {Function} generator
   */
  const generator = key => {
    if (!generator.graph) {
      // ? First iteration: initialize generator.data, push initial Nodes into data
      generator.graph = { nodes: [...generator.data], edges: [] };
    }

    // ? Link previous level with new sublevel
    const edges = flatMap(generator.data, d => {
      const subLevel = d[key];
      return map(subLevel, s => ({ from: d.id, to: s.id }));
    });
    const nodes = flatMap(generator.data, d => d[key]);
    generator.graph.edges.push(...edges);
    generator.graph.nodes.push(...nodes);

    generator.data = nodes;

    return generator;
  };
  generator.data = data;
  return generator;
}

const generator = generateNetwork([
  {
    id: 1,
    label: 'Hello1',
    topics: [
      {
        id: 10,
        label: 'Hello10',
        keywords: [
          {
            id: 100,
            label: 'Hello100'
          },
          {
            id: 101,
            label: 'Hello101'
          },
          {
            id: 102,
            label: 'Hello102'
          }
        ]
      },
      {
        id: 11,
        label: 'Hello11',
        keywords: [
          {
            id: 110,
            label: 'Hello110'
          }
        ]
      },
      {
        id: 12,
        label: 'Hello12',
        keywords: []
      }
    ]
  },
  {
    id: 2,
    label: 'Hello2',
    topics: [
      {
        id: 20,
        label: 'Hello20',
        keywords: [
          {
            id: 200,
            label: 'Hello200'
          },
          {
            id: 201,
            label: 'Hello201'
          }
        ]
      }
    ]
  },
  {
    id: 3,
    label: 'Hello3',
    topics: [
      {
        id: 30,
        label: 'Hello30',
        keywords: [
          {
            id: 300,
            label: 'Hello300'
          },
          {
            id: 301,
            label: 'Hello301'
          },
          {
            id: 302,
            label: 'Hello302'
          }
        ]
      },
      {
        id: 31,
        label: 'Hello31',
        keywords: [
          {
            id: 310,
            label: 'Hello310'
          }
        ]
      }
    ]
  },
  {
    id: 4,
    label: 'Hello4',
    topics: []
  }
]);

console.log(generator('topics')('keywords').graph);
