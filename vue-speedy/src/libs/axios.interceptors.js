import store from '@/store';
import Cookies from 'js-cookie'
import {TOKEN_KEY} from "../const";
import {getLocalHolder} from "./util";
import Notice from "iview/src/components/notice";

export default (axios, router) => {
    // 请求拦截器
    axios.interceptors.request.use(config => {
        config.headers.Authorization = `Bearer ${Cookies.get(TOKEN_KEY)}`;
        let holder = getLocalHolder()
        if (holder) {
            config.headers.Holder = holder;
        }
        return config;
    }, error => {
        return Promise.reject(error);
    });

    axios.interceptors.response.use(response => {
        return Promise.resolve(response)
    }, error => {
        if (error.response && error.response.status === 500) {
            Notice.warning({
                title: '系统错误',
                desc: error.response.data ? error.response.data.message || '系统发生了错误，请联系管理员！' : '系统发生了错误，请联系管理员！',
                duration: 5
            })
        }
        if (error && error.response) {
            let status = error.response.status;
            if (status === 401) {
                store.dispatch('handleLogOut').then(() => {
                    router.push({
                        name: 'login'
                    });
                })
            }
            if (status === 403) {
                router.push({
                    name: 'error_403'
                });
            }
        }
        return Promise.reject(error)
    });
}
