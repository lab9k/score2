import {
  uniqBy,
  union,
  flatMap,
  map,
  groupBy,
  filter,
  partition,
  forEach,
  times,
  includes
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
    label: val,
    type: state.focus
  }));
  const cities = state.cities.map(val => ({ label: val, type: 'city' }));
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
    state.cities = cities;
    state.keywords = keywords;
    state.topics = topics;

    const nodes = extractNodes(state);
    const edges = extractEdges(nodes, raw_data);
    state.graph = { nodes, edges: edges };
  },
  change_focus(state, focus) {
    state.focus = focus;
  }
};
