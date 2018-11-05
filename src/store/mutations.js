import { uniqBy } from 'lodash';
export default {
  mutate_raw_data(state, { feed }) {
    let count = 0;
    const visData = feed.entry.map(entry => {
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
        keywords: keywords.split(', '),
        topics: topics.split(', '),
        id: ++count,
        label: city
      };
      return ret;
    });
    const cities = uniqBy(visData, 'city')
      .map(val => val.city)
      .filter(val => val !== '');
    state.cities = cities;

    state.graph = { nodes: visData, edges: [] };
  },
  change_focus(state, focus) {
    state.focus = focus;
  }
};
