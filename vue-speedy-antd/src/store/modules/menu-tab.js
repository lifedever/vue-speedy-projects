const state = {
    tabs: []
}
const getters = {}
const actions = {
    openTabAction({state, commit}, menu) {
        commit('addMenuToTab', menu)
    }
}
const mutations = {
    'addMenuToTab'(state, menu) {
        if (state.tabs.indexOf(menu.url) < 0) {
            state.tabs.push(menu)
        }
    }
}
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}