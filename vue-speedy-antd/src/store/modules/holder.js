import {removeHolder, setHolder} from "../../utils/storage";

const state = {
    holders: [],
    current: null
}
const getters = {
    holdersGet: state => state.holders,
    currentGet: state => state.current,
}
const actions = {
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