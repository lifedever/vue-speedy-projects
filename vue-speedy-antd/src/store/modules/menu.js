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
    },
    removeTabAction({state, commit}, menu) {
        commit('removeMenuFromTab', menu)
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
    },
    'removeMenuFromTab'(state, menu) {
        let tabs = []
        for (let i = 0; i < state.tabs.length; i++) {
            let tab = state.tabs[i]
            if (tab.id !== menu.id) {
                tabs.push(tab);
            } else {
                if (state.current.id === menu.id) {
                    state.current = tabs[i - 1]
                }
            }
        }
        console.log(tabs)
        state.tabs = tabs
        localSave(storage.MENU_TAB, state.tabs)
    }
}
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}