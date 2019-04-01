import store from '@/store';
import Cookies from 'js-cookie'
import {TOKEN_KEY} from "../const";
import {getLocalHolder} from "./util";

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
        console.log(store)
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
