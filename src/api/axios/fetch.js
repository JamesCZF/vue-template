// import baseURL from '@/configs/baseUrl';
import Axios from 'axios';
import router from '@/router/index';
// import utils from '@/jslibs/utils';
import { message } from 'ant-design-vue';

const fetch = Axios.create({
  baseURL: ''
  // timeout: 200000, // 设置超时时间
});
fetch.interceptors.request.use(function (config) {
  // let token = utils.getCookie('X-Access-Token');
  // //后期改成从cookies中获取
  // config.headers = { 'X-Access-Token': token || '' };
  return config;
}, function (error) {
  return Promise.reject(error);
});

// 添加响应拦截器
fetch.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  const { status, data } = error.response;
  switch (status) {
    case 401:
      message.warn(data.message)
      router.push('/login');
      break;
    default:
      message.error(data.message)
      return Promise.reject(data);
  }
});

export default fetch;