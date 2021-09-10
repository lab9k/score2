import types from './types';
const PublicGoogleSheetsParser = require('public-google-sheets-parser');

// const fetch_json = async (url) => {
//   const data = await fetch(url);
//   return data.json();
// };

export default {
  /**
   *
   * fetches data from SCORE spreadsheet and commits it to mutate local state.
   *
   * @param {{commit:Function}} state object, handled by vuex
   */
  async [types.FETCH_SPREADSHEET_DATA]({ commit }) {
    // const url =
    //   'https://spreadsheets.google.com/feeds/list/1vBJ9rB7NttdM98DbF0cBm6C1QD5nVmom53iisk3mtTc/1/public/values?alt=json';
    // try {
    //   const json = await fetch_json(url);
    //   commit(types.MUTATE_RAW_DATA, json);
    //   commit(types.RESET_BUTTON);
    // } catch (error) {
    //   console.error(error);
    // }
    console.log('hello world');
    const parser = new PublicGoogleSheetsParser();
    parser.parse('1adKrrgn-KxFe1mWHUXZEDvu23BIzHE2wLk2YfIQjzbM').then((e) => {
      console.log(e);
      commit(types.MUTATE_RAW_DATA, { feed: e });
      commit(types.RESET_BUTTON);
    });
  },
};
