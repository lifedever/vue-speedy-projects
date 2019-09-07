import Vue from 'vue'

const state = {
    userInfo: null,
    holders: null
}

const getters = {
    userInfoGet: state => state.userInfo
}
const actions = {
    loadUserInfoAction({commit}) {
        return new Promise((resolve, reject) => {
            new Vue().$http.get(`/api/pt/userinfo`).then(res => {
                commit('loadUserInfo', res.data)
                resolve(res)
            }).catch(reject)
        })
    },
    loadUserActiveHoldersAction({commit}){
        return new Promise((resolve, reject) => {
            new Vue().$http.get(`/api/holder/profiles/active`).then(res => {
                commit('loadUserActiveHolders', res.data)
                resolve(res)
            })
        })
    }
}

const mutations = {
    'loadUserInfo'(state, userInfo) {
        state.userInfo = userInfo
    },
    'loadUserActiveHolders'(state, holders) {
        state.holders = holders
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}