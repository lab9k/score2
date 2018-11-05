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
        gsx$topics: { $t: topics },
        id: { $t: id }
      } = entry;
      const ret = {
        city,
        contact,
        description,
        title,
        keywords: keywords.split(', '),
        topics: topics.split(', '),
        id,
        label: ++count + ''
      };
      return ret;
    });
    state.graph = { nodes: visData, edges: [] };
  }
};
