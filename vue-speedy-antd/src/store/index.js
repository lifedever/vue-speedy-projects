import Vue from 'vue'
import Vuex from 'vuex'
import menuTab from './modules/menu-tab'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        menuTab
    },
})