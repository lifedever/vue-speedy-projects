import Vue from "vue";
import Inject from 'vue-speedy-antd/conf/main-inject'
import pages from 'vue-speedy-antd/src/pages'
import adminLayout from "vue-speedy-antd/src/layout/admin-layout";
import modules from './modules'
import menus from './menu'

import './assets/override.less'


Vue.use(adminLayout, {
    menus
})

Vue.use(Inject, {
    config: {
        title: 'Vue Speedy Ant Design',
        shortTitle: 'VD',
    },
    pages: pages,
    modules
})