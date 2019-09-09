import Vue from 'vue'
import Vuex from 'vuex'
import indexApp from './modules/app'
import indexUser from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        indexApp,
        indexUser,
    },
})