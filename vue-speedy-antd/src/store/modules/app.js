const state = {
    config: {},
    token: null
}
const getters = {
    configGet: state => state.config,
    tokenGet: state => state.token
}
const actions = {
    storeConfigAction({commit}, config) {
        commit('storeConfig', config)
    },
    storeTokenAction({commit}, token) {
        return new Promise((resolve, reject) => {
            commit('storeToken', token)
            resolve()
        })
    }
}

const mutations = {
    'storeConfig'(state, config) {
        state.config = config
    },
    'storeToken'(state, token){
        state.token = token
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}