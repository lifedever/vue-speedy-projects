const state = {
    tabs: []
}
const getters = {
    menuTabsGet: state => state.tabs
}
const actions = {
    openTabAction({state, commit}, menu) {
        commit('addMenuToTab', menu)
    }
}
const mutations = {
    'addMenuToTab'(state, menu) {
        console.log('addMenuToTab', menu)
        if (!state.tabs.find(o => o.url === menu.url)) {
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