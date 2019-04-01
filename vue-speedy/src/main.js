import Vue from "vue";
import Inject from '../conf/inject'
import pages from './pages'
Vue.use(Inject, {
    site: {
        title: 'Speedy Demo',
        shortTitle: 'SD',
    },
    pages: pages,
    modules: [
        {
            path: 'test',
            module: {
                state: {
                    name: 'gefangshuai'
                },
                getters: {
                    nameGet: state => state.name
                }
            }
        }
    ]
})
