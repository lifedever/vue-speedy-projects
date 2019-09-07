import Vue from "vue";
import Inject from 'vue-speedy-antd/conf/main-inject'
import pages from 'vue-speedy-antd/src/pages'
import adminLayout from "vue-speedy-antd/src/layout/admin-layout";
import router from "vue-speedy-antd/src/router";

import homeMenu from 'vue-speedy-antd/src/pages/home/menu'
import systemMenu from 'vue-speedy-antd/src/pages/system/menu'
import './assets/override.less'

const routerInstance = router(pages)

Vue.use(adminLayout, {
    menus: [
        homeMenu,
        {
            id: 'tenowork',
            name: 'Tenowork',
            icon: 'project',
            url: 'https://app.tenowork.com',
            iframe: true
        },
        {
            id: 'vue-speedy-antd',
            name: 'Ant.Design-Vue',
            icon: 'ant-design',
            url: 'https://vue.ant.design/docs/vue/introduce-cn/',
            iframe: true
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
                },
                {
                    id: 'exampleSplit',
                    name: '分割容器',
                    url: '/example/split',
                },
                {
                    id: 'exampleTree',
                    name: '树容器',
                    url: '/example/tree',
                },
            ]
        },
        systemMenu
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