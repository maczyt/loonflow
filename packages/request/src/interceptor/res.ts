import { AxiosInstance, isCancel } from 'axios';
import { message } from 'antd';

export default function resInterceptor(instance: AxiosInstance) {
  instance.interceptors.response.use(
    function success(response) {
      // 2xx
      return response.data;
    },
    function fail(error) {
      // 非2xx
      if (isCancel(error) || error.config.customErrorHandle) {
        // No deal
      } else {
        message.error(error.message);
      }
      return Promise.reject(error);
    }
  );
}
