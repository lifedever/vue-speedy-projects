import Vue from "vue";
import Inject from '../../conf/index-main-inject'
import PageLayoutInject from '../layout/page-layout'

Vue.use(PageLayoutInject, {})

Vue.use(Inject, {
    config: {
        title: '业务前台页面',
        menus: [
            {
                id: 'Index',
                name: '首页',
                url: '/'
            },
            {
                id: 'Config',
                name: '配置参考',
                url: '/config'
            },
            {
                id: 'menu2',
                name: '功能列表'
            },
            {
                id: 'admin',
                name: '后台登录',
                url: '/admin'
            }
        ]
    },
    pages: [
        {
            name: 'Index',
            path: '/',
            meta: {
                anonymous: true
            },
            component: () => import('./pages/index/Index'),
        },
        {
            name: 'Config',
            path: '/config',
            meta: {
                anonymous: true
            },
            component: () => import('./pages/config/Config')
        }
    ],
    modules: []
})

