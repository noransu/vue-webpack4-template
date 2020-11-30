/* eslint-disable max-len */
import axios from 'axios';

const string2object = data => (typeof data === 'string' && data.startsWith('{') ? JSON.parse(data) : data);

const service = axios.create({
  timeout: 20000,
  transformResponse: [string2object],
});


const setToken = () => {
  service.defaults.headers.common.token = window.localStorage.getItem('token');

  service.defaults.headers.common['black-token'] = window.localStorage.getItem('dolphin_token')
    || window.localStorage.getItem('dolphin_token_from_jssdk');
};

setToken();

service.defaults.headers.common.token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMjA0Mzk3MzI0MTU2MTQ1Njc5IiwiYm9keSI6IntcImlkZW50aWZpZXJcIjpcIjI4NTM4Nzg1N1wiLFwibmlja25hbWVcIjpcIuaxn-S6rlwiLFwic2V4XCI6MCxcInVzZXJJZFwiOjEyMDQzOTczMjQxNTYxNDU2Nzl9IiwicmFuIjotMTMwNTE1MzQwfQ.1IQoVq9DB655CoLYr3-E9CaQb2uf9Gf9BD-4b4Kr4DOofrx7rk-WAaIDkY_MUXX6dAhZATVaqQSI78jkI9_szQ';

// 请求拦截器
let checkLogin = false;
service.interceptors.request.use(
  async conf => {
    if (checkLogin) return conf;
    checkLogin = true;
    return conf;
  },
  error => {
    return Promise.resolve(error);
  },
);

// 响应拦截器
// TODO 异常上报
service.interceptors.response.use(
  response => {
    const {
      data: {
        code,
        msg,
        Code,
      },
      config: {
        url,
        headers,
        data: reqBody,
      },
    } = response;
    if (code !== 200 && code !== 0 && Code !== 0) {
      const token = headers.token || headers['black-token'] || 'token缺失';
    }
    return response;
  },
  error => {
    // eslint-disable-next-line no-console
    console.log(error.toJSON());
    const {
      code,
      message,
      config: {
        url,
      },
    } = error.toJSON();
    return Promise.resolve({
      data: {
        msg: '您的网络开小差啦！重新试一试吧',
      },
    });
  },
);

export default service;
