import { types } from '.';

const fetch_json = async url => {
  const data = await fetch(url);
  return data.json();
};

export default {
  /**
   *
   * fetches data from SCORE spreadsheet and commits it to mutate local state.
   *
   * @param {{commit:Function}} state object, handled by vuex
   */
  async fetch_spreadsheet({ commit }) {
    const url = 'https://spreadsheets.google.com/feeds/list/11PkGogP7rsQhiUomXhQBJVZh4wPZWPcDCJm8lKWrisE/2/public/values?alt=json';
    try {
      const json = await fetch_json(url);
      commit(types.MUTATE_RAW_DATA, json);
      commit(types.RESET_BUTTON);
    } catch (error) {
      console.error(error);
    }
  }
};
