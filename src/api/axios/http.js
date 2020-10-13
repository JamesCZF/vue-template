import fetch from './fetch.js';

const http = {
  get(url, base, config) {
    let data = { params: base };
    return fetch(url, data, config);
  },
  post(...arr) {
    return fetch.post(...arr);
  },
  put(url, base, config) {
    // let data={data:base};
    let data = base;
    return fetch.put(url, data, config);
  },
  delete(url, base, config) {
    let data = { data: base };
    return fetch.delete(url, data, config);
  }
};

export default http;