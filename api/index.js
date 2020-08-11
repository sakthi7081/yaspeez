import axios from 'axios';

export const baseUrl = 'http://manimaran-001-site1.etempurl.com/';

export default axios.create({
  baseURL: `${baseUrl}`,
});