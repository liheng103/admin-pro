import axios from 'axios';
import { getMessageInfo } from './status';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { ElMessage } from 'element-plus';

interface BaseResponse<T = any> {
    code: number | string;
    message: string;
    data: T;
    status?: number | string;
}

const service: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_APP_USE_MOCK
        ? import.meta.env.VITE_APP_MOCK_BASEURL
        : import.meta.env.VITE_APP_API_BASEURL,
    timeout: 15000
});

service.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // 在发送请求之前做些什么
        return config;
    },
    (error: AxiosError) => {
        // 对请求错误做些什么
        return Promise.reject(error);
    }
);

// 添加响应拦截器
service.interceptors.response.use(
    (response: AxiosResponse) => {
        if (response.status === 200) {
            return response;
        }
        ElMessage.error(getMessageInfo(response.status));
        return response.data;
    },
    (error: any) => {
        const { response } = error;
        if (response) {
            ElMessage.error(getMessageInfo(response.status));
            return Promise.reject(response.data);
        }
        ElMessage.error('网络连接异常,请稍后再试!');
    }
);

const requestInstance = <T = any>(config: AxiosRequestConfig): Promise<T> => {
    const conf = config;
    return new Promise((resolve, reject) => {
        service.request<any, AxiosResponse<BaseResponse>>(conf).then((res: AxiosResponse<BaseResponse>) => {
            const data = res.data;
            if (data.code != 0) {
                ElMessage.error(data.message);
                reject(data.message);
            } else {
                ElMessage.success(data.message);
                resolve(data.data as T);
            }
        });
    });
};

export function get<T = any, U = any>(config: AxiosRequestConfig, url: string, params?: U): Promise<T> {
    return requestInstance({ ...config, url, method: 'GET', params });
}

export function post<T = any, U = any>(config: AxiosRequestConfig, url: string, data?: U): Promise<T> {
    return requestInstance({ ...config, url, method: 'POST', data });
}

export function put<T = any, U = any>(config: AxiosRequestConfig, url: string, params?: U): Promise<T> {
    return requestInstance({ ...config, url, method: 'PUT', params });
}

export function del<T = any, U = any>(config: AxiosRequestConfig, url: string, data?: U): Promise<T> {
    return requestInstance({ ...config, url, method: 'DELETE', data });
}

// 一般的后端返回的数据结构
// {
//     'code': 1,
//     'message': '成功',
//     'data': {
//         'id': 1,
//         'name': '张三',
//         'age': 18,
//         'sex': 1,
//         'address': '北京市',
//         'createTime': '2021-08-30 15:49:16',
//         'updateTime': '2021-08-30 15:49:16',
//         'deleteTime': null,
//         'createBy': 1,
//         'updateBy': 1,
//     }
// }

export default service;
