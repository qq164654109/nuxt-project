import axiosExtend from '~/utils/axios';

export default ({ $axios, replace, store, route }) => {
  $axios.defaults.timeout = 10000;
  $axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

  $axios.interceptors.request.use(
    config => {
      return config;
    },
    err => {
      return Promise.reject(err);
    }
  );

  $axios.interceptors.response.use(
    response => response,
    error => {
      if (!error.response) {
        if (error.message.includes('timeout')) {
          // 网络超时
        } else {
          // 断网状态
        }
        return;
      }
      const status = error.response.status;
      switch (status) {
        case 401:
          // 无权限
          break;
        case 403:
          // 登录信息过期，请重新登录
          store.commit('setUsername', null);
          store.commit('setUsertoken', null);

          setTimeout(() => {
            replace({
              path: '/login',
              query: {
                redirect: route.path
              }
            });
          }, 600);
          break;
        case 404:
          // 网络请求不存在
          break;
        default:
          // 其他错误
          console.log(error.message);
      }
      return Promise.reject(error);
    }
  );

  axiosExtend($axios, store);
};