import Vue from 'vue'

const state = {
    userInfo: null,
}

const getters = {
    userInfoGet: state => state.userInfo
}
const actions = {
    loadUserInfoAction({commit}) {
        return new Promise((resolve, reject) => {
            new Vue().$http.get(`/api/open/userinfo`).then(res => {
                commit('loadUserInfo', res.data)
                resolve(res)
            }).catch(reject)
        })
    },

}

const mutations = {
    'loadUserInfo'(state, userInfo) {
        state.userInfo = userInfo
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}