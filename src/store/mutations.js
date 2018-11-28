import {
  uniq,
  flatMap,
  map,
  filter,
  includes,
  find,
  concat,
  uniqBy,
  // union,
  groupBy
} from 'lodash';
import { challengeProto, keywordProto, cityProto } from '../models/nodeOptions';
//import Data from '../models';
import { formatData } from '../util';
import { DataSet } from 'vis';

const extractData = arr => {
  let count = 0;
  return arr.entry.map(entry => {
    const {
      gsx$city: { $t: city },
      gsx$contact: { $t: contact },
      gsx$description: { $t: description },
      gsx$keywords: { $t: keywords },
      gsx$title: { $t: title },
      gsx$topics: { $t: topics }
    } = entry;
    const ret = {
      city,
      contact,
      description,
      title,
      keywords: keywords.split(', ').filter(t => t !== ''),
      topics: topics.split(', ').filter(t => t !== ''),
      id: ++count,
      label: city
    };
    return ret;
  });
};

const extractCities = arr => {
  return uniqBy(arr, 'city')
    .map(val => val.city)
    .filter(val => val !== '');
};

const extractArrays = arr => prop => {
  return flatMap(arr, val => val[prop]).filter(val => val !== '');
};

let format = null;

export default {
  mutate_raw_data(state, { feed }) {
    const visData = extractData(feed);

    const cities = extractCities(visData);

    const dataExtract = extractArrays(visData);
    const keywords = dataExtract('keywords');
    const topics = dataExtract('topics');

    const raw_data = groupBy(filter(visData, d => d.city !== ''), 'city');
    state.raw_data = raw_data;
    state.cities = cities.sort();
    state.selected_cities = cities.sort();
    state.keywords = keywords;
    state.topics = topics;

    // const graph = new Data(raw_data).get_city_to_topic_view();

    if (format === null) {
      format = formatData(visData);
    }
    const graph = format('topics');

    state.graph = {
      nodes: new DataSet(graph.nodes),
      edges: new DataSet(graph.edges)
    };
    //state.graph = graph;
  },

  handle_click(state, id) {
    const graphNodes = state.graph.nodes.map(c => c);
    const clickedNode = find(
      graphNodes,
      n => n.id === id && n.type === 'topics'
    );
    if (clickedNode) {
      state.btnText = 'back';
      state.selected_topic = { ...clickedNode };
      state.topic = state.selected_topic.label;

      console.log('clicked: ', clickedNode);
      // TODO: create all nodes (collect cities, challenges and keywords)

      // !show all cities
      const cities = map(state.cities, name => ({ label: name, ...cityProto }));
      // !filter challenges on the selected topic

      const challenges = filter(
        flatMap(cities, city => state.raw_data[city.label]),
        ch => includes(ch.topics, state.selected_topic.label)
      );

      const challengeNodes = map(challenges, ch => ({
        label: ch.title,
        city: ch.city,
        ...challengeProto
      }));

      const keywords = map(uniq(flatMap(challenges, ch => ch.keywords)), k => ({
        label: k,
        ...keywordProto
      }));
      let count = 0;
      const nodes = map(concat(challengeNodes, cities, keywords), val => ({
        ...val,
        id: ++count
      }));
      // TODO: create the edges

      const challenge_to_city = map(
        filter(nodes, n => n.type === 'challenge'),
        chn => ({
          from: chn.id,
          to: find(nodes, n => n.label === chn.city).id
        })
      );

      const challenge_to_keyword = flatMap(
        filter(nodes, n => n.type === 'challenge'),
        ch => {
          const { keywords } = find(
            state.raw_data[ch.city],
            c => c.title === ch.label
          );
          return map(keywords, k => ({
            from: find(nodes, no => no.label === k).id,
            to: ch.id
          }));
        }
      );

      const edges = concat(challenge_to_city, challenge_to_keyword);

      state.graph = { nodes, edges };
    }
  },
  reset_button(state) {
    state.btnText = 'reload';
  },
  select_city({ selected_cities }, name) {
    if (find(selected_cities, name)) {
      selected_cities = filter(selected_cities, s => s === name);
    } else {
      selected_cities = [...selected_cities, name];
    }
  },
  swap_demo_mode(state) {
    state.demo = !state.demo;
  }
};
