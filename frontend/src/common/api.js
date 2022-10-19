import axios from 'axios';

const API = () => {
  const getAPI = (queryString, params) => {
    return axios.get(`/api/${queryString}`, params);
  };

  const postAPI = (queryString, params) => {
    return axios.post(`/api/${queryString}`, params);
  };

  const putAPI = (queryString, params) => {
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
    return API.delete(`events`, params);
  };
};
