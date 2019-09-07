import Vue from "vue";
import Inject from '../conf/main-inject'
import pages from './pages'
import adminLayout from "./layout/admin-layout";
import menus from './menus';

Vue.use(adminLayout, {
    menus,
})

Vue.use(Inject, {
    config: {
        title: 'Vue Speedy Ant Design',
        shortTitle: 'VD',
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