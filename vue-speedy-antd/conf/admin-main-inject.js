import Vue from 'vue'
import App from '../src/admin/App.vue'
import axios from 'axios'
import router from '../src/admin/router'
import store from '../src/admin/store'
import VueBus from 'vue-bus'

import AntdDependency from '../src/antd-common-dependency'
import axiosInterceptors from '../src/core/axios.interceptors'
import Prototype from '../src/core/prototype'

import '../src/assets/less/index.less'
import {setSiteTitle} from "../src/utils/common";
import InjectSModal from '../src/components/global/s-modal'
import errorNotice from '../src/components/global/error-notice'

Vue.use(VueBus)
Vue.config.productionTip = false
Vue.use(AntdDependency)
Vue.use(InjectSModal)
Vue.use(Prototype)
Vue.use(errorNotice)
export default {
    install: (Vue, options) => {
        let defaultOptions = {
            // adminName: 'index',
            pages: null,                // 路由配置
            modules: [],
            mixins: [],
            config: {
            }
        }
        defaultOptions = Object.assign(defaultOptions, options)

        setSiteTitle(defaultOptions.config.title, true)

        const routerInstance = router(defaultOptions.pages, defaultOptions.config)
        axiosInterceptors(axios, routerInstance)

        /**
         * @description 全局注册应用配置
         */
        Vue.prototype.$http = axios;

        defaultOptions.modules.forEach(m => {
            store.registerModule(m.path, m.module)
        })


        // 保存菜单
        store.dispatch('app/storeConfigAction', defaultOptions.config)
        new Vue({
            router: routerInstance,
            store,
            render: h => h(App),
        }).$mount('#app')

        console.log('%c 😎 Platform init finished!', 'background: #00a1ff; padding: 1px 25px; color: #fff; border-radius: 4px;', options);
    }
}
