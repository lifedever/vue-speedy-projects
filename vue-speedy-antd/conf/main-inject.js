import Vue from 'vue'
import App from '../src/App.vue'
import axios from 'axios'
import router from '../src/router'
import store from '../src/store'
import {notification} from "ant-design-vue";

import AntdDependency from '../src/antd-common-dependency'
import axiosInterceptors from '../src/core/axios.interceptors'

import '../src/assets/less/index.less'

Vue.config.productionTip = false
Vue.use(AntdDependency)

export default {
    install: (Vue, options) => {
        console.log('%c 😎😎😎 Platform Inject!', 'background: #00a1ff; padding: 1px 25px; color: #fff; border-radius: 4px;', options);
        let defaultOptions = {
            routes: null,                // 路由配置
            menus: [],
            modules: [],
            mixins: [],
            config: {
            }
        }
        defaultOptions = Object.assign(defaultOptions, options)

        const routerInstance = router(defaultOptions.pages)
        axiosInterceptors(axios, routerInstance)

        /**
         * @description 全局注册应用配置
         */
        Vue.prototype.$http = axios;

        defaultOptions.modules.forEach(m => {
            store.registerModule(m.path, m.module)
        })

        Vue.config.errorHandler = (error, vm) => {
            console.error(error)
            console.error({
                error,
                vm
            })
            notification.error({
                message: '遇到未知错误!',
                description: `请按Ctrl + F5强制刷新浏览器重试！`
            })
        }

        // 保存菜单
        store.dispatch('menu/storeMenusAction', defaultOptions.menus)

        new Vue({
            router: routerInstance,
            store,
            render: h => h(App),
        }).$mount('#app')
    }
}
