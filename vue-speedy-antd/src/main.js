import Vue from 'vue'
import App from './App.vue'
import AntdDependency from './antd-common-dependency'

Vue.config.productionTip = false
Vue.use(AntdDependency)
new Vue({
    render: h => h(App),
}).$mount('#app')
