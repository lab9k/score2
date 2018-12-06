import flatMap from 'lodash/flatMap';
import map from 'lodash/map';
import find from 'lodash/find';
import uniqBy from 'lodash/uniqBy';
import forEach from 'lodash/forEach';
/**
 *
 *
 * @export
 * @param {[{id:string|number,label:string}]} data Array with nested data representing a network.
 * Every object should already have the desired vis.js~Node properties/options.
 * @returns generateNetwork~generator
 */
export default function generateNetwork(data) {
  /**
   *
   * @param {string} key
   * @returns {Function} generator
   */
  const generator = key => {
    forEach(generator.data, d => {
      // get key arrays from current sublevel
      const keyList = d[key];

      forEach(keyList, k => {
        // if there isn't a similar node in the graph, push it to the graph
        if (!find(generator.graph.nodes, n => n.label === k.label)) {
          generator.graph.nodes.push(k);
        }
      });
    });

    const edges = flatMap(generator.data, d => {
      // d[key] represents an array of key elements.
      // We only want to extract unique elements, so we won't have duplicate nodes.
      const subLevel = uniqBy(d[key], 'label');

      // Add unknown nodes of the sublevel nodes to the graph
      return map(subLevel, subLevelNode => {
        const found = find(generator.graph.nodes, node => {
          return node.label === subLevelNode.label;
        });
        // if found is not undefined, the node is new. So we build an edge to the found node.
        // This creates the links between different top levels
        // If found is undefined, we know a node was just created from this sublevel, so we link to that node.
        return {
          from: d.id,
          to: (found || subLevelNode).id
        };
      });
    });

    // Add the newly created edges
    generator.graph.edges.push(...edges);

    // Prepare for next iteration.
    const nextNodes = flatMap(generator.data, d => d[key]);
    generator.data = nextNodes;

    return generator;
  };

  // ? First iteration: initialize generator.data, push initial Nodes into data
  generator.data = data;
  generator.graph = { nodes: [...generator.data], edges: [] };
  return generator;
}
