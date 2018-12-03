import { map, filter, includes, find, uniqBy, flatMap, compact } from 'lodash';
import {
  challengeProto,
  keywordProto,
  cityProto,
  topicProto
} from '../models/nodeOptions';
import { generateNetwork } from '../util';
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

const getCityToChallengeToKeyword = (challenges, topic) => {
  const cities = extractCities(challenges);
  let counter = 0;
  return compact(
    map(cities, city => {
      const challengesForCity = filter(
        challenges,
        c => c.city === city && includes(c.topics, topic)
      );
      if (challengesForCity.length <= 0) return null;
      return {
        challenges: map(challengesForCity, ch => ({
          ...ch,
          ...challengeProto,
          label: ch.title,
          id: ++counter,
          keywords: map(ch.keywords, kw => ({
            ...keywordProto,
            label: kw,
            id: ++counter
          }))
        })),
        ...cityProto,
        label: city,
        id: ++counter
      };
    })
  );
};

const getCityToTopic = challenges => {
  const cities = extractCities(challenges);
  let counter = 0;
  return map(cities, city => {
    const cityChallenges = filter(challenges, c => c.city === city);
    const cityTopics = flatMap(cityChallenges, cch => cch.topics);
    return {
      ...cityProto,
      label: city,
      id: ++counter,
      topics: map(cityTopics, topic => ({
        ...topicProto,
        label: topic,
        id: ++counter
      }))
    };
  });
};

export default {
  mutate_raw_data(state, { feed }) {
    const raw_data = extractData(feed);
    state.raw_data = raw_data;

    // state.cityToChallengeToKeyword = getCityToChallengeToKeyword(
    //   visData,
    //   'Sensing'
    // );
    // state.cityToTopic = getCityToTopic(visData);

    const graph = generateNetwork(getCityToTopic(raw_data))('topics').graph;
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
      const topic = state.selected_topic.label;
      state.topic = topic;

      state.cityToChallengeToKeyword = getCityToChallengeToKeyword(
        state.raw_data,
        topic
      );

      const { graph } = generateNetwork(
        getCityToChallengeToKeyword(state.raw_data, topic)
      )('challenges')('keywords');

      state.graph = {
        nodes: new DataSet(graph.nodes),
        edges: new DataSet(graph.edges)
      };
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
  },
  swap_physics({ options }) {
    options.physics = !options.physics;
  }
};
