import axios from 'axios';

import { getAccessToken } from '../auth/authClient';

const apiClient = axios.create({
    baseURL: 'https://some-domain.com/api/',
});

// Add a request interceptor
apiClient.interceptors.request.use(function (config) {
    // Do something before request is sent
    if (!config.headers) {
        config.headers = {};
    }
    const token = getAccessToken();

    if (token) {
        config.headers.Authorization = `Bearer: ${token}`;
    }

    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

  export default apiClient;
  