import notification from 'ant-design-vue/lib/notification'
import {getToken, getHolder, getOpenToken} from "../utils/storage";
import Vue from 'vue'

export default (axios, router, open = false) => {
    // 请求拦截器
    axios.interceptors.request.use(config => {
        config.headers.Authorization = `Bearer ${(open? getOpenToken(): getToken()) || ''}`;
        if (!open) {
            let holder = getHolder()
            if (holder)
                config.headers.common['Holder'] = getHolder();
        }else{
            config.headers.common['Open'] = 'true';
        }
        return config;
    }, error => {
        return Promise.reject(error);
    });

    axios.interceptors.response.use(response => {
        return Promise.resolve(response)
    }, error => {
        console.log()
        if (error.response && error.response.status === 500) {
            error.type = 'SERVER_ERROR'
            Vue.config.errorHandler(error)
        }
        if (error && error.response && !open) {
            let status = error.response.status;
            if (status === 401) {
                router.push(`/logout`)
            }
            if (status === 403) {

            }
        }
        return Promise.reject(error)
    });
}
