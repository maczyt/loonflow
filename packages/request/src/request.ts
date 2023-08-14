import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import reqInterceptor from './interceptor/req';
import resInterceptor from './interceptor/res';

export interface RequestOptions {
  baseURL?: string;
}

type Config<T = any> = AxiosRequestConfig<T> & {
  /** 自定义错误处理 */
  customErrorHandle?: boolean;
};

export class Request {
  private instance: AxiosInstance;
  constructor(options: RequestOptions = {}) {
    this.instance = axios.create(options);

    // interceptor
    reqInterceptor(this.instance);
    resInterceptor(this.instance);
  }

  private generateAbortController() {
    return new AbortController();
  }

  get<T, R>(url: string, config?: Config<T>) {
    const controller = this.generateAbortController();
    return [
      this.instance.get<R>(url, {
        ...config,
        signal: controller.signal,
      }),
      (reason?: string) => controller.abort(reason),
    ] as const;
  }

  post<T, R>(url: string, data?: T, config?: Config<T>) {
    const controller = this.generateAbortController();

    return [
      this.instance.post<R>(url, data, {
        ...config,
        signal: controller.signal,
      }),
      (reason?: string) => controller.abort(reason),
    ] as const;
  }

  request<T, R>(config: Config<T>) {
    const controller = this.generateAbortController();

    return [
      this.instance.request<R>({
        ...config,
        signal: controller.signal,
      }),
      (reason?: string) => controller.abort(reason),
    ] as const;
  }

  getInstance() {
    return this.instance;
  }
}
