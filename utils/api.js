import axios from 'axios';

const api = axios.create({
  baseURL: 'http://manimaran-001-site1.etempurl.com/'
});

const getMethod = async (url) => {
  return await api.get(url)
          .then(res => res.data)
          .catch(e => e);
};

export const getAllStates = async () => {
  return await getMethod('custom/getcities?countryid=66');
};

export const getAllSports = async () => {
  return await getMethod('custom/getsportsall');
};

export const getAllPurposes = async () => {
  return await getMethod('utility/getroles');
};

export const getAllOrganizations = async () => {
  return await getMethod('organization/allorganization');
};

export default api;