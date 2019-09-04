import {getToken, removeToken, setToken} from "../../utils/storage";

const state = {
    config: {},
    token: getToken(),
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
    logoutAction({commit}, params) {
        commit('removeToken')
    }
}

const mutations = {
    'storeConfig'(state, config) {
        state.config = config
    },
    'storeToken'(state, {token, expires}) {
        state.token = token
        setToken(token, expires)
    },
    'removeToken'(state) {
        state.token = null
        removeToken()
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}