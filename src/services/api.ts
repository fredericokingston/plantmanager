import axios from 'axios';

const api = axios.create({
  baseURL: 'http://138.185.185.192:3333'
});

export default api;