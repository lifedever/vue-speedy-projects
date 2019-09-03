import {localGet, localSave} from "../../utils/storage";
import {storage} from "../../cost/index";

const state = {
    tabs: localGet(storage.MENU_TAB) || [],
    current: null
}
const getters = {
    menuTabsGet: state => state.tabs,
    currentGet: state => state.current
}
const actions = {
    addTabAction({state, commit}, menu) {
        commit('addMenuToTab', menu)
    }
}
const mutations = {
    'addMenuToTab'(state, menu) {
        console.log('addMenuToTab', menu)
        if (!state.tabs.find(o => o.id === menu.id)) {
            state.tabs.push(menu)
        }
        localSave(storage.MENU_TAB, state.tabs)
        state.current = menu
    }
}
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}