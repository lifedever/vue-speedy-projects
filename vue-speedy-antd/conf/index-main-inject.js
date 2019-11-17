import Vue from 'vue'
import App from '../src/index/App.vue'
import axios from 'axios'
import router from '../src/index/router'
import store from '../src/index/store'
import VueBus from 'vue-bus'

import AntdDependency from '../src/antd-common-dependency'
import axiosInterceptors from '../src/core/axios.interceptors'
import Prototype from '../src/core/prototype'

import {setSiteTitle} from "../src/utils/common";
import InjectSModal from '../src/components/global/s-modal'
import errorNotice from '../src/components/global/error-notice'

import '../src/assets/less/index.less'
import '../src/index/less/index.less'

Vue.use(VueBus)
Vue.config.productionTip = false
Vue.use(AntdDependency)
Vue.use(InjectSModal)
Vue.use(Prototype)
Vue.use(errorNotice)
export default {
    install: (Vue, options) => {
        let defaultOptions = {
            pages: null,                // 路由配置
            modules: [],
            mixins: [],
            config: {
            }
        }
        defaultOptions = Object.assign(defaultOptions, options)
        setSiteTitle(defaultOptions.config.title, true)
        const routerInstance = router(defaultOptions.pages)

        axiosInterceptors(axios, routerInstance, true)
        /**
         * @description 全局注册应用配置
         */
        Vue.prototype.$http = axios;

        defaultOptions.modules.forEach(m => {
            store.registerModule(m.path, m.module)
        })


        // 保存配置信息
        store.dispatch('indexApp/storeConfigAction', defaultOptions.config)

        new Vue({
            router: routerInstance,
            store,
            render: h => h(App),
        }).$mount('#app')

        console.log('%c 😎 Platform init finished!', 'background: #00a1ff; padding: 1px 25px; color: #fff; border-radius: 4px;', options);
    }
}
