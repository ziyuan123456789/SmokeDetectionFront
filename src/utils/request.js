import axios from 'axios'
import { ElMessage } from 'element-plus'
import config from '/config.js'

const instance = axios.create(config.serverConfig)

// Function to refresh token
async function refreshToken() {
  let refreshToken = localStorage.getItem('loginData');
  refreshToken = JSON.parse(refreshToken)
  if (!refreshToken) {
    return Promise.reject(new Error('没有刷新令牌'));
  }
  const response = await axios.post(config.serverConfig.refreshTokenUrl, { refresh_token: refreshToken.refresh_token});
  return response.data;
}

instance.interceptors.request.use(
  (config) => {
    if (config.includeToken === undefined) {
      throw new Error('必须声明includeToken来指示是否应包含token')
    }

    if (config.includeToken) {
      let tokenData = localStorage.getItem('loginData')
      if (tokenData) {
        tokenData = JSON.parse(tokenData)
        config.headers['Authorization'] = `Bearer ${tokenData.token}`
      } else {
        ElMessage.error('请求需要携带登录信息,但未找到token。')
        return Promise.reject(new Error('需要登录'))
      }
    }

    delete config.includeToken
    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const data = await refreshToken();
        localStorage.setItem('loginData', JSON.stringify(data));
        originalRequest.headers['Authorization'] = `Bearer ${data.token}`;
        return instance(originalRequest);
      } catch (refreshError) {
        ElMessage.error('登录已经过期，请重新登录');
        localStorage.removeItem('loginData');
        // Redirect to login page or emit event
        return Promise.reject(refreshError);
      }
    } else if (error.response && error.response.status === 500) {
      ElMessage.error('服务器致命错误');
    }

    return Promise.reject(error);
  }
);

export function get(url, params, includeToken = false) {
  return instance.get(url, { params, includeToken });
}

export function post(url, data, includeToken = false) {
  return instance.post(url, data, {
    includeToken,
    headers: { 'Content-Type': 'application/json; charset=utf-8' }
  });
}

export function del(url, includeToken = false) {
  return instance.delete(url, { includeToken });
}

export function put(url, data, includeToken = false) {
  return instance.put(url, data, { includeToken });
}
