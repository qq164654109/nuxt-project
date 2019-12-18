export default (axios, store) => {
  axios.fetch = function fetch (options = {}, autoGetData = true, autoErrorRes = true, autoCancel) {
    if (autoCancel) {
      options = Object.assign({ cancelToken: store.state.fetchSource.token() }, options)
    }
    if (/{|}/.test(options.url)) {
      options.url = options.url.replace(/{[^}]}/g, function(word) {
        let paramKey = word.replace(/{|}/g, '');
        let paramVal = options.params[paramKey];
        console.log(options.params)
        delete options.params[paramKey]
        return paramVal;
      });
    }
    if (autoErrorRes) {
      options = Object.assign({ validateStatus: status => {
        return status >= 200 && status < 300;
      }}, options);
    }
    return axios(options).then(res => {
      if (autoGetData) {
        return res.data;
      }
    }).catch(error => {
      console.log(error);
      return Promise.reject(error);
    });
  }

  function storageFetch (type, options = {}, outTime = 60000, autoGetData = true, autoErrorRes = true, autoCancel = false) {
    let storageKey = options.url + '#' + JSON.stringify(params) + JSON.stringify(config);
    let storageVal = window[type + 'Storage'].getItem(storageKey);
    if (storageVal) {
      storageVal = JSON.parse(storageVal);
      if (new Date().getTime() - storageVal.lastTime <= outTime) {
        return Promise.resolve(storageVal.data);
      }
    } else {
      return axios.fetch(options, autoGetData, autoErrorRes, autoCancel).then(data => {
        window[type + 'Storage'].setItem(storageKey, {
          lastTime: new Date().getTime(),
          data
        });
        return data;
      });
    }
  };

  axios.sessionfetch = function(options, outTime, autoGetData, autoErrorRes, autoCancel) {
    return storageFetch('session', options, outTime, autoGetData, autoErrorRes, autoCancel)
  }

  axios.localfetch = function(options, outTime, autoGetData, autoErrorRes, autoCancel) {
    return storageFetch('local', options, outTime, autoGetData, autoErrorRes, autoCancel)
  }
}