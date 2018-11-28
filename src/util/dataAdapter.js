import { filter, flatMap, forEach, includes } from 'lodash';
/**
 *
 *
 * @param {Array<{id:number,key:Array}>} data - rows, which will become the nodes
 * @returns formatData~retrieveNetwork
 */
export const formatData = data => {
  // ? Format data

  const nodes = filter(data, node => node.id);
  /**
   *
   * @param {string} key - property of node which links them together
   * @returns {nodes:DataSet,edges:DataSet}
   */
  const retrieveNetwork = key => {
    // ? retrieve graph
    const allKeywords = flatMap(nodes, node => node[key]);
    const edges = [];
    forEach(allKeywords, (keyword, i) => {
      // ? retrieve all nodes where node[key] contains keyword
      const commonKwNodes = filter(nodes, node => includes(node[key], keyword));
      // ? all common nodes should link to the same keyword node
      const kwNode = { id: nodes.length + i, label: keyword };
      forEach(commonKwNodes, ckn =>
        edges.push({ from: ckn.id, to: kwNode.id })
      );
    });

    return { nodes, edges };
  };
  return retrieveNetwork;
};
