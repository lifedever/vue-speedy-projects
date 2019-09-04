import Vue from "vue";
import Inject from '../conf/main-inject'
import pages from './pages'
import adminLayout from "./components/layout/admin-layout";

Vue.use(adminLayout)
Vue.use(Inject, {
    config: {
    },
    menus: [
        {
            id: 'home',
            name: '首页',
            icon: 'home',
            url: '/home',
            fixed: true         // 不能删除
        },
        {
            id: 'example',
            name: '示例',
            icon: 'appstore',
            children: [
                {
                    id: 'exampleBase',
                    name: '基础示例',
                    url: '/example',
                }
            ]
        }
    ],
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
