import axios from 'axios';

const prodURL = 'https://clubspace.onrender.com/api';
const localURL = 'http://localhost:3001/api';

const API = () => {
  const get = (queryString, params) => {
    return axios.get(`http://localhost:3001/api/${queryString}`, params);
  };

  const post = (queryString, params) => {
    return axios.post(`/api/${queryString}`, params);
  };

  const put = (queryString, params) => {
    return axios.put(`/api/${queryString}`, params);
  };

  const deleteAPI = (queryString, params) => {
    return axios.delete(`/api/${queryString}`, params);
  };
};

export default API;

export const events = () => {
  const getEvents = (params) => {
    return API.get(`events`, params);
  };

  const postEvents = (params) => {
    return API.post(`events`, params);
  };

  const updateEvents = (params) => {
    return API.delete(`events`, params);
  };

  const deleteEvents = (params) => {
    return API.deleteAPI(`events`, params);
  };
};

export const clubs = () => {
  const getClubs = (params) => {
    return API.get(`clubs`, params);
  };

  const postClubs = (params) => {
    return API.post(`clubs`, params);
  };

  const updateClubs = (params) => {
    return API.delete(`clubs`, params);
  };

  const deleteClubs = (params) => {
    return API.deleteAPI(`clubs`, params);
  };
};

export const proposal = () => {
  const getProposals = (params) => {
    return API.get(`${localURL}/proposals/getmultiple`, params);
  };

  const postProposals = (params) => {
    return API.post(`${localURL}/proposals`, params);
  };

  const updateProposals = (params) => {
    return API.delete(`proposals`, params);
  };

  const deleteProposals = (params) => {
    return API.deleteAPI(`proposals`, params);
  };
};
