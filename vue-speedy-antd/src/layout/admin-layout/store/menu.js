import Vue from 'vue'
import {localGet, localSave} from "../../../utils/storage";
import {storage} from "../../../cost/index";
import {MenuUtil} from "../../../utils/menu.util";
import _cloneDeep from 'lodash/cloneDeep'

const state = {
    tabs: localGet(storage.MENU_TAB) || [],
    menus: [],
    current: null
}
const getters = {
    menusGet: state => state.menus,
    menuTabsGet: state => state.tabs,
    iFrameTabsGet: state => state.tabs.filter(o => o.iframe) || [],
    currentGet: state => state.current,
    parentGet: state => {
        if (state.menus && state.current) {
            return MenuUtil.findParent(state.menus, state.current)
        } else {
            return null
        }
    },
    menusAndTabsGet: state => {
        let menus = _cloneDeep(state.menus);
        state.tabs.forEach(m => {
            if (!menus.find(o => o.id === m.id)) {
                menus.push(m)
            }
        })
        return menus
    }
}
const actions = {
    loadMenusAction({commit}) {
        new Vue().$http.get(`/api/pt/functions`).then(res => {
            commit('storeMenus', res.data)
        })
    },
    storeMenusAction({commit}, menus) {
        commit('storeMenus', menus)
    },
    addTabAction({state, commit}, menu) {
        commit('addMenuToTab', menu)
    },
    removeTabAction({state, commit}, menu) {
        commit('removeMenuFromTab', menu)
    }
}
const mutations = {
    'storeMenus'(state, menus) {
        state.menus = menus
    },
    'addMenuToTab'(state, menu) {
        if (!state.tabs.find(o => o.id === menu.id)) {
            state.tabs.push(menu)
        }
        localSave(storage.MENU_TAB, state.tabs)
        state.current = menu
    },
    'removeMenuFromTab'(state, menu) {
        return new Promise((resolve, reject) => {
            let tabs = []
            for (let i = 0; i < state.tabs.length; i++) {
                let tab = state.tabs[i]
                if (tab.id !== menu.id) {
                    tabs.push(tab);
                } else {
                    if (state.current.id === menu.id) {
                        setTimeout(() => {
                            state.current = tabs[i - 1]
                            resolve(state.current)
                        }, 100)
                    }else{
                        resolve(state.current)
                    }
                }
            }
            state.tabs = tabs
            localSave(storage.MENU_TAB, state.tabs)
        })
    }
}
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}