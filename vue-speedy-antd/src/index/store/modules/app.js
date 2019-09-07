import {cookieGet, cookieSet, removeCookie} from "../../../utils/storage";

const state = {
    config: {},
    token: cookieGet('UserToken'),
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
        cookieSet('UserToken', token, 365)
    },
    'removeToken'(state) {
        state.token = null
        removeCookie('UserToken')
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}