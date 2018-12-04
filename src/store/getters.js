export default {
  get_network({ graph }) {
    return graph;
  },
  get_options: ({ options }) => options,
  reloadBtnText: ({ reloadBtnText }) => reloadBtnText,
  cities: ({ cities }) => cities,
  selected_cities: ({ selected_cities }) => selected_cities,
  topic: ({ selected_topic }) => selected_topic.label,
  demoBtnText: ({ demo }) => (demo ? 'Disable Demo' : 'Enable Demo'),
  physics: ({ options: { physics } }) => physics,
  physicsText: ({ options: { physics } }) =>
    physics ? 'Disable physics' : 'Enable physics'
};
