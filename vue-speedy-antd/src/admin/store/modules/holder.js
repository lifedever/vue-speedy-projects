import {removeHolder, setHolder} from "../../../utils/storage";
import Vue from "vue";

const state = {
    holders: [],
    current: null
}
const getters = {
    holdersGet: state => state.holders,
    currentGet: state => state.current,
}
const actions = {
    loadHolderAction({commit, dispatch}, holderId) {
        return new Promise((resolve, reject) => {
            new Vue().$http.get(`/api/holders/${holderId}`).then(res => {
                commit('loadHolder', res.data)
                resolve()
            }).catch(reject)
        })
    },
    storeHoldersAction({commit}, holders) {
        commit('storeHolders', holders)
    },
    setCurrentHolderAction({commit}, params) {
        return new Promise((resolve, reject) => {
            commit('setCurrentHolder', params)
            resolve()
        })
    },
    removeHolderAction({commit}) {
        commit('removeHolder')
    }
}

const mutations = {
    'storeHolders'(state, holders) {
        state.holders = holders
    },
    'setCurrentHolder'(state, {holder, expires}) {
        state.current = holder
        setHolder(holder.id, expires)
    },
    'loadHolder'(state, holder) {
        state.current = holder
    },
    'removeHolder'(state) {
        state.current = null
        removeHolder()
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}