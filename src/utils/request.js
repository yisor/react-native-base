import { NetInfo, Platform } from 'react-native';
import { Actions } from 'react-native-router-flux';

const serverUrl = "http://192.168.1.153:8989";

const reqHeaders = {
  'Content-Type': 'application/json',
  'x-access-channel': (Platform.OS === 'ios') ? '2' : '1',// 2 IOS, 1 Android
}

let token;

export const configToken = (param) => {
  token = param;
}


// query 参数拼接
const queryString = (url, params) => {
  if (params) {
    let paramsArray = [];
    Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
    if (url.search(/\?/) === -1) {
      url += '?' + paramsArray.join('&')
    } else {
      url += '&' + paramsArray.join('&')
    }
  }
  return url;
}


// 模拟abort
const abortablePromise = (requestPromise, timeout = 30000) => {
  let timeoutAction = null;
  const timerPromise = new Promise((resolve, reject) => {
    timeoutAction = () => {
      reject({ returnCode: '9999', returnMsg: '请求超时，请稍后再试' });
    }
  })
  setTimeout(() => { timeoutAction() }, timeout)
  return Promise.race([requestPromise, timerPromise]);
}

// 带超时效果的fetch
const fetchTimeout = (request, timeout = 30000) => {
  return new Promise((resolve, reject) => {
    abortablePromise(request, timeout)
      .then(response => response.json())
      .then(json => {
        // console.log('返回：', JSON.stringify(json))
        if (json.returnCode !== null && json.returnCode === '0000') {//正常返回
          json.body ? resolve(json.body) : resolve(json);
        } else {
          reject(json);
          if (json.returnCode != null && (json.returnCode === "401" || Number(json.returnCode) === 401)) {
            // token失效：清除缓存、退出登录
            // storage.clear();
            // Actions.reset('login');
          }
        }
      })
      .catch(error => {
        console.log('错误:', JSON.stringify(error))
        if (error.returnMsg) {
          reject(error)
        } else {
          NetInfo.isConnected.fetch().then(isConnected => {
            if (isConnected) {
              reject({ returnCode: '9999', returnMsg: '系统异常，请稍后再试' });
            } else {
              reject({ returnCode: '9999', returnMsg: '网络异常，请稍后再试' });
            }
          });
        }
      });
  });
}

export default class HttpUtils {


  /**
   *
   * @param api 接口名称
   * @param params 提交参数
   * @returns {Promise.<U>|Promise.<T>}
   */
  static get = (api, params) => {
    reqHeaders['x-access-token'] = token;
    reqHeaders['Content-Type'] = 'application/json';
    let url = queryString(`${serverUrl}${api}`, params);
    console.log('路径：', url)
    const httpGet = fetch(url, {
      method: 'GET',
      headers: reqHeaders,
    });

    return fetchTimeout(httpGet)
  }

  /**
   *
   * @param api 接口名称
   * @param params 提交参数
   * @returns {Promise.<U>|Promise.<T>}
   */
  static post = (api, params) => {
    reqHeaders['x-access-token'] = token;
    reqHeaders['Content-Type'] = 'application/json';
    console.log('post路径：' + `${serverUrl}${api}`);
    console.log('参数：' + JSON.stringify(params));
    console.log('Token：' + token);
    const httpPost = fetch(`${serverUrl}${api}`, {
      method: 'POST',
      headers: reqHeaders,
      body: JSON.stringify(params),
    });

    return fetchTimeout(httpPost);
  }

  /**
   *
   * @param api 接口名称
   * @param params 提交参数
   * @returns {Promise.<U>|Promise.<T>}
   */
  static put = (api, params) => {
    reqHeaders['x-access-token'] = token;
    reqHeaders['Content-Type'] = 'application/json';
    let url = queryString(`${serverUrl}${api}`, params);
    const httpPut = fetch(url, {
      method: 'PUT',
      headers: reqHeaders,
    });
    return fetchTimeout(httpPut);
  }

  /**
   *
   * @param api 接口名称
   * @param params 提交参数
   * @returns {Promise.<U>|Promise.<T>}
   */
  static delete = (api, params) => {
    reqHeaders['x-access-token'] = token;
    reqHeaders['Content-Type'] = 'application/json';
    let url = queryString(`${serverUrl}${api}`, params);
    const httpDelete = fetch(url, {
      method: 'DELETE',
      headers: reqHeaders,
    });
    return fetchTimeout(httpDelete);
  }


  static uploadImage = (apiName, params) => {
    reqHeaders['x-access-token'] = token;
    const formData = new FormData();
    const file = {
      uri: params.path,
      type: 'application/octet-stream',
      name: 'icon.jpg',
    };
    formData.append('files', file);
    formData.append('ossBucket', 'user');
    reqHeaders['Content-Type'] = 'multipart/form-data;charset=utf-8';
    const uploadRequest = fetch(`${serverUrl}${apiName}`, {
      method: 'POST',
      headers: reqHeaders,
      body: formData,
    });
    return fetchTimeout(uploadRequest);
  };

}

