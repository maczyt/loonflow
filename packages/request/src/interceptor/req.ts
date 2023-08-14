import { getToken } from '@loonflow/common-tools';
import { AxiosInstance } from 'axios';

export default function reqInterceptor(instance: AxiosInstance) {
  instance.interceptors.request.use(
    function beforeSend(config) {
      // TODO: 设置 token
      config.headers.Authorization = `Bearer ${getToken()}`;
      return config;
    },
    function catchError(error) {
      return Promise.reject(error);
    }
  );
}
