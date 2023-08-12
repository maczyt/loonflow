import { AxiosInstance } from 'axios';

export default function reqInterceptor(instance: AxiosInstance) {
  instance.interceptors.request.use(
    function beforeSend(config) {
      return config;
    },
    function catchError(error) {
      return Promise.reject(error);
    }
  );
}
