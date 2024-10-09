import axios, { AxiosInstance, AxiosResponse } from 'axios';

const API = ({ headers = {}, params = {} } = {}): AxiosInstance => {
  const BASE_URL = import.meta.env.VITE_APP_BASE_URL ?? process.env.VUE_APP_BASE_URL
  const API_KEY = import.meta.env.VITE_APP_API_KEY ?? process.env.VUE_APP_API_KEY

  const instance = axios.create({
    baseURL: `https://cors-anywhere.herokuapp.com/${BASE_URL}/v2`,
    headers: {
      'Content-type': 'application/json',
      'x-api-key': API_KEY,
      ...headers,
    },
    params,
  });

  return instance;
};

const NewsServices = {
  getTopHeadlines: (params: {
    country?: string,
    page?: number,
    pageSize?: number,
    category: string
  }): Promise<AxiosResponse> => {
    return API({ params }).get('/top-headlines')
  },

  getEverything: (params: { q?: string, page?: number, pageSize?: number }): Promise<AxiosResponse> => {
    return API({ params }).get('/everything');
  }
};

export default NewsServices;