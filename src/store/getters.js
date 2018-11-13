export default {
  get_nodes_and_edges({ graph }) {
    return graph;
  },
  get_options: ({ options }) => options,
  btnText: ({ btnText }) => btnText,
  cities: ({ cities }) => cities,
  selected_cities: ({ selected_cities }) => selected_cities,
  topic: ({ topic }) => topic,
  demoBtnText: ({ demo }) => (demo ? 'Disable Demo' : 'Enable Demo')
};
