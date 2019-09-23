import Vue from "vue";
import AdminInject from '../../conf/admin-main-inject'
import pages from './pages'
import adminLayout from "../layout/admin-layout";
import Login from '../admin/pages/login'

Vue.use(adminLayout, {})

Vue.use(AdminInject, {
    config: {
        title: 'Vue Speedy Ant Design',     // 标题
        shortTitle: 'VD',                   // 短名称
        loginComponent: Login,              // 登录组件，完成对登录页面对自定义
        defaultLogin: {
            registerUrl: '/register'           // 注册地址
        }
    },
    pages: pages,
    modules: [
        {
            path: 'test',
            module: {
                namespaced: true,
                state: {
                    name: 'VueSpeedyAntD'
                },
                getters: {
                    nameGet: state => state.name
                }
            }
        }
    ]
})