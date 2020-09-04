import axios from 'axios';

const api = axios.create({
  baseURL: 'http://51.210.150.124:8010/'
});

const getMethod = async (url) => {
  return await api.get(url)
          .then(res => res.data)
          .catch(e => e);
};

const postMethod = async (url, data) => {
  return await api.post(url, data)
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

export const getUserEvents = async userId => {
  return await getMethod(`custom/getusereventschedules?userid=${userId}`)
}

export const getOrg = async orgId => {
  return await getMethod(`organization/getorgnaization?id=${orgId}`);
}

export const getOrgEvents = async orgId => {
  return await getMethod(`custom/getorgevents?id=${orgId}`);
}

export const getEventInfo = async orgId => {
  return await getMethod(`Custom/GetEvent?id=${orgId}`);
}

export const getProfile = async userId => {
  return await getMethod(`yusers/getprofile?id=${userId}`);
}

export const getOrgByPurpose = async purposeId => {
  return await getMethod(`organization/orgroletype?id=${purposeId}`);
}

export const getOrgBySport = async sportId => {
  return await getMethod(`Organization/SportOrg?id=${sportId}`);
}

export const postRegisterEvent = async data => {
  return await postMethod(`events/eventregister`, data);
}

export default api;