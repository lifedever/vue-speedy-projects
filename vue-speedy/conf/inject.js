import Vue from 'vue'
import App from '../src/App'
import router from '../src/router'
import store from '../src/store'
import iView from 'iview'
import i18n from '@/locale'
import config from '@/config'
import importDirective from '@/directive'
import '../src/index.less'
import '@/assets/icons/iconfont.css'
import axios from '../src/libs/axios'
import axiosInterceptors from '../src/libs/axios.interceptors'
import lodash from 'lodash'
import UlComponents from '@/components/ul-components'
import configMixin from '../src/config/mixins'
import dayjs from '../src/libs/dayjs'
import jQuery from '../src/libs/jquery'
import {appendPath} from "../src/libs/util";

Vue.use(iView, {
    i18n: (key, value) => i18n.t(key, value)
})
Vue.use(UlComponents)
Vue.use(jQuery)

Vue.config.productionTip = false

let $bus = new Vue()
Vue.prototype.$bus = $bus;
Vue.prototype.$dayjs = dayjs

Vue.prototype.$mountModal = view => {
    $bus.$emit('MODAL_OPEN', view)
}
Vue.prototype.$unmountModal = (val) => {
    $bus.$emit('MODAL_CLOSE', val)
}

Vue.prototype.$closeTag = () => {
    $bus.$emit('closeTab')
}

Vue.prototype.$Message.config({
    top: 100,
    duration: 3
})

/**
 * 注册指令
 */
importDirective(Vue)

/**
 * Mixin
 */
Vue.mixin(configMixin)

export default {
    install: (Vue, options) => {
        console.log('Platform Inject!', options)
        let defaultOptions = {
            routes: null,                // 路由配置
            modules: []
        }
        defaultOptions = Object.assign(defaultOptions, options)
        const routerInstance = router(defaultOptions.pages)
        axiosInterceptors(axios, routerInstance)
        /**
         * @description 全局注册应用配置
         */
        Vue.prototype.$config = config
        Vue.prototype.$http = axios
        Vue.prototype.$_ = lodash
        Vue.prototype.$site = defaultOptions.site || {}
        Vue.prototype.$appendPath = appendPath

        defaultOptions.modules.forEach(m => {
            store.registerModule(m.path, m.module)
        })

        new Vue({
            el: '#app',
            router: routerInstance,
            i18n,
            store,
            render: h => h(App)
        })
    }
}
