import axios from 'axios';
import CONTANTS from '../constants';
import history from '../browserHistory';

const httpClient = axios.create({
  baseURL: CONTANTS.BASE_URL,
});

let accessToken = null;

httpClient.interceptors.request.use(
  config => {
    const refreshToken = window.localStorage.getItem(CONTANTS.REFRESH_TOKEN);
    if (refreshToken && accessToken) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${accessToken}`,
      };
    }
    return config;
  },
  err => Promise.reject(err)
);

httpClient.interceptors.response.use(
  response => {
    if (
      response &&
      response.data &&
      response.data.data &&
      response.data.data.tokenPair
    ) {
      const {
        data: {
          data: { tokenPair },
        },
      } = response;
      window.localStorage.setItem(CONTANTS.REFRESH_TOKEN, tokenPair.refresh);
      accessToken = tokenPair.access;
    }
    return response;
  },
  err => {
    //console.log(err)
    if (
      err.response.status === 401 &&
      history.location.pathname !== '/login' &&
      history.location.pathname !== '/registration' &&
      history.location.pathname !== '/'
    ) {
      history.replace('/login');
      return;
    }
    const refreshToken = window.localStorage.getItem(CONTANTS.REFRESH_TOKEN);
    if (refreshToken && err.response.status === 408) {
      const {
        data: {
          data: { tokenPair },
        },
      } = httpClient.post('/auth/refresh', { refreshToken });
      window.localStorage.setItem(CONTANTS.REFRESH_TOKEN, tokenPair.refresh);
      accessToken = tokenPair.access;
      //err.config.headers['Authorization']=`Bearer ${accessToken}`;
      //return axios.request(err.config);
    }
    return Promise.reject(err);
  }
);

export default httpClient;
