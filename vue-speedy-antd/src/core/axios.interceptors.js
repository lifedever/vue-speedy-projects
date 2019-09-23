import notification from 'ant-design-vue/lib/notification'
import {getToken, getHolder, getOpenToken} from "../utils/storage";

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
        if (error.response && error.response.status === 500) {
            notification.warning({
                message: '系统错误',
                description: error.response.data ? error.response.data.message || '系统发生了错误，请联系管理员！' : '系统发生了错误，请联系管理员！',
            })
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
