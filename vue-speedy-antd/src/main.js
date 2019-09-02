import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import router from './router'
import store from './store'

import AntdDependency from './antd-common-dependency'
import './assets/less/index.less'

Vue.config.productionTip = false

Vue.prototype.$http = axios

Vue.use(AntdDependency)
new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
