import { flatMap, forEach, uniqBy, map, uniq, filter } from 'lodash';
import { cityProto, default as getProto } from '../models/nodeOptions';
/**
 *
 *
 * @param {Array<{id:number,key:Array}>} data - rows, which will become the nodes
 * @returns formatData~retrieveNetwork
 */
export const formatData = data => {
  // ? Format data

  const cities = filter(
    map(uniqBy(data, 'city'), ch => ({ name: ch.city })),
    c => c.name !== ''
  );

  /**
   *
   * @param {string} key - property of node which links them together
   * @returns {nodes:DataSet,edges:DataSet}
   */
  const retrieveNetwork = key => {
    forEach(cities, city => {
      city[key] = flatMap(
        filter(data, d => d.city === city.name),
        challenge => challenge[key]
      );
    });
    const keys = uniq(flatMap(cities, city => city[key]));

    let counter = 0;

    const cityNodes = map(cities, city => ({
      ...cityProto,
      label: city.name,
      id: ++counter,
      [key]: city[key]
    }));

    const keywNodes = map(keys, keyw => ({
      ...getProto(key),
      label: keyw,
      id: ++counter
    }));

    const nodes = [...cityNodes, ...keywNodes];
    const edges = [];

    forEach(cityNodes, city => {
      forEach(city[key], keyword => {
        edges.push({
          from: city.id,
          to: keywNodes.find(el => el.label === keyword).id
        });
      });
    });
    const graph = { nodes, edges };
    return graph;
  };
  return retrieveNetwork;
};
