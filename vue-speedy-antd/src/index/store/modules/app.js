import {} from "../../../utils/storage";
import {setOpenToken} from "../../../utils/storage";
import {removeOpenToken} from "../../../utils/storage";
import {getOpenToken} from "../../../utils/storage";

const state = {
    config: {},
    token: getOpenToken(),
}
const getters = {
    configGet: state => state.config,
    tokenGet: state => state.token,
}
const actions = {
    storeConfigAction({commit}, config) {
        commit('storeConfig', config)
    },
    storeTokenAction({commit}, params) {
        return new Promise((resolve, reject) => {
            commit('storeToken', params)
            resolve()
        })
    },
    logoutAction({commit, dispatch}, params) {
        commit('removeToken')
    }
}

const mutations = {
    'storeConfig'(state, config) {
        state.config = config
    },
    'storeToken'(state, {token, expires}) {
        state.token = token
        setOpenToken(token, 365)
    },
    'removeToken'(state) {
        state.token = null
        removeOpenToken()
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}