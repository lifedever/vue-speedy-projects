import notification from 'ant-design-vue/lib/notification'
import {getToken, getHolder} from "../utils/storage";

export default (axios, router) => {
    // 请求拦截器
    axios.interceptors.request.use(config => {
        config.headers.Authorization = `Bearer ${getToken()}`;
        config.headers.common['Holder'] = getHolder();
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
        if (error && error.response) {
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
