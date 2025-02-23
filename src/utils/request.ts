import axios from "axios";
import type {
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
    AxiosError,
    InternalAxiosRequestConfig,
  } from 'axios';

const service:AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_APP_API_BASEURL,
    timeout: 15000,
  });

service.interceptors.request.use(
    (config:InternalAxiosRequestConfig) => {
    // 在发送请求之前做些什么
      return config;
    },
    (error:AxiosError) => {
    // 对请求错误做些什么
      return Promise.reject(error);
    }
  );

  // 添加响应拦截器
axios.interceptors.response.use(
    (response:AxiosResponse) => {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response;
  }, (error:any) => {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
  });
export default service;