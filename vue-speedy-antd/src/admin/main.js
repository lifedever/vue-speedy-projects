import Vue from "vue";
import AdminInject from '../../conf/admin-main-inject'
import pages from './pages'
import adminLayout from "../layout/admin-layout";

Vue.use(adminLayout, {
})

Vue.use(AdminInject, {
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