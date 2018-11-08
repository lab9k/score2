import {
  uniqBy,
  uniq,
  union,
  flatMap,
  map,
  groupBy,
  filter,
  partition,
  forEach,
  times,
  includes,
  find,
  concat
} from 'lodash';
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

const commonProto = {
  shape: 'hexagon',
  mass: 2,
  fixed: false
};

const cityProto = {
  ...commonProto,
  type: 'city',
  color: 'rgba(178,114,112,1)'
};

const keywordProto = {
  ...commonProto,
  type: 'keywords',
  color: 'rgba(249, 255, 127, 1)'
};

const challengeProto = {
  ...commonProto,
  type: 'challenge',
  color: 'rgba(61, 139, 204, 1)'
};

const topicProto = {
  ...commonProto,
  type: 'topics',
  color: 'rgba(255, 107, 101, 1)'
};

export const legendNodes = [
  {
    ...cityProto,
    fixed: true,
    physics: false,
    size: 25,
    x: 25,
    y: 0,
    label: 'city'
  },
  {
    ...keywordProto,
    fixed: true,
    physics: false,
    size: 25,
    x: 25,
    y: 50,
    label: 'keyword'
  },
  {
    ...challengeProto,
    fixed: true,
    physics: false,
    size: 25,
    x: 25,
    y: 100,
    label: 'challenge'
  },
  {
    ...topicProto,
    fixed: true,
    physics: false,
    size: 25,
    x: 25,
    y: 150,
    label: 'topic'
  }
];

const extractCities = arr => {
  return uniqBy(arr, 'city')
    .map(val => val.city)
    .filter(val => val !== '');
};

const extractArrays = arr => prop => {
  return union(...arr.map(val => val[prop])).filter(val => val !== '');
};

const hasTopic = topic => city => {
  return filter(city, ch => includes(ch.topics, topic.label)).length;
};

const extractEdges = (nodes, data) => {
  const [cityNodes, topicNodes] = partition(nodes, n => n.type === 'city');
  const edges = [];

  forEach(topicNodes, topic => {
    const hasCurrentTopic = hasTopic(topic);
    forEach(cityNodes, city => {
      edges.push(
        ...times(hasCurrentTopic(data[city.label]), () => ({
          from: city.id,
          to: topic.id
        }))
      );
    });
  });

  return edges;
};

const extractNodes = state => {
  const extras = state[state.focus].map(val => ({
    ...topicProto,
    label: val,
    type: state.focus
  }));
  const cities = state.cities.map(val => ({ label: val, ...cityProto }));
  let count = 0;
  return flatMap([extras, cities], val =>
    map(val, v => ({ ...v, id: ++count }))
  );
};

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

    const nodes = extractNodes(state);
    const edges = extractEdges(nodes, raw_data);
    state.graph = { nodes, edges };
  },

  handle_click(state, { nodes }) {
    const clickedNode = find(
      state.graph.nodes,
      n => n.id === nodes[0] && n.type === 'topics'
    );
    if (clickedNode) {
      state.btnText = 'back';
      state.selected_topic = { ...clickedNode };

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
  }
};
