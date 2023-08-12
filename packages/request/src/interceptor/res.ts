import { AxiosInstance } from 'axios';

export default function resInterceptor(instance: AxiosInstance) {
  instance.interceptors.request.use(
    function success(response) {
      // 2xx
      return response;
    },
    function fail(error) {
      // 非2xx
      return Promise.reject(error);
    }
  );
}
