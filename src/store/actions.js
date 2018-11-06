import types from './types';

const fetch_json = url => fetch(url).then(data => data.json());

export default {
  fetch_spreadsheet({ commit }) {
    const url = `https://spreadsheets.google.com/feeds/list/${'1adKrrgn-KxFe1mWHUXZEDvu23BIzHE2wLk2YfIQjzbM'}/${'1'}/public/values?alt=json`;
    fetch_json(url)
      .then(json => {
        commit(types.MUTATE_RAW_DATA, json);
        commit(types.RESET_BUTTON);
      })
      .catch(err => console.log(err));
  }
};
