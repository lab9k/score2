import { map, find, forEach } from 'lodash';
import City from './city';
import { DataSet } from 'vis';
export default class Data {
  constructor(raw_data) {
    const cityNames = Object.keys(raw_data);
    this.cities = map(cityNames, c => new City(c));

    forEach(this.cities, c => c.addChallenges(...raw_data[c.name]));
  }
  find_city(name) {
    return find(this.cities, c => c.name === name);
  }
  get_city_to_topic_view() {
    const nodes = [];
    const edges = [];

    let counter = 0;
    forEach(this.cities, c => {
      const cityNode = { ...c.node, id: ++counter };
      nodes.push(cityNode);
      const topicNodes = map(c.topicNodes, t => ({ ...t, id: ++counter }));

      forEach(topicNodes, t => {
        const node = nodes.find(n => n.label === t.label);
        if (!node) {
          nodes.push({ ...t, id: t.id });
          edges.push({ to: cityNode.id, from: t.id });
        } else {
          edges.push({ to: cityNode.id, from: node.id });
        }
      });
    });

    return { nodes: new DataSet(nodes), edges: new DataSet(edges) };
  }
  get_city_challenge_keyword_view() {
    const nodes = [];
    // const edges = [];

    let counter = 0;
    forEach(this.cities, city => {
      const cityNode = { ...city.node, id: ++counter };
      nodes.push(cityNode);

      //add challenges, add keywords, connect
      const challengeNodes = map(city.challengeNodes, n => ({
        ...n,
        id: ++counter
      }));
      nodes.push(...challengeNodes);

      const keywordNodes = map(city.keywordNodes_all, n => ({
        ...n,
        id: ++counter
      }));
      forEach(keywordNodes, k =>
        find(nodes, n => n.label === k.label) ? 0 : nodes.push(k)
      );
    });
  }
}
