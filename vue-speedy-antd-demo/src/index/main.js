import Vue from "vue";
import Inject from 'vue-speedy-antd/conf/index-main-inject'
import pages from './pages'
import modules from './modules'

Vue.use(Inject, {
    config: {
        title: '业务前台页面',
    },
    pages,
    modules
})