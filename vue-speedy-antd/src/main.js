import Vue from "vue";
import Inject from '../conf/main-inject'
import pages from './pages'
import adminLayout from "./layout/admin-layout";
import router from "./router";

const routerInstance = router(pages)

Vue.use(adminLayout, {
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
})

Vue.use(Inject, {
    config: {
        title: 'Vue Speedy Ant Design',
        shortTitle: 'VD',
        router: routerInstance
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