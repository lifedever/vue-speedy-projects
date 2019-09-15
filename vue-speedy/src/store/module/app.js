import {
    getBreadCrumbList,
    setTagNavListInLocalstorage,
    getMenuByRouter,
    getTagNavListFromLocalstorage,
    getHomeRoute, setLocale
} from '../../libs/util'

let routers = []
export default {
    state: {
        breadCrumbList: [],
        tagNavList: [],
        homeRoute: null,
        routes: null,
        local: '',
        forbidden: false
    },
    getters: {
        menuList: (state, getters, rootState) => {
            return getMenuByRouter(state.routes, rootState.user.access)
        },
        tagNavList: state => {
            return state.tagNavList
        },
        forbiddenGet: (state) => {
            return state.forbidden
        }
    },
    mutations: {
        setBreadCrumb(state, routeMetched) {
            state.breadCrumbList = getBreadCrumbList(routeMetched, state.homeRoute)
        },
        setTagNavList(state, list) {
            if (list) {
                state.tagNavList = [...list]
                setTagNavListInLocalstorage([...list])
            } else state.tagNavList = getTagNavListFromLocalstorage()
        },
        addTag(state, item, type = 'unshift') {
            if (state.tagNavList.findIndex(tag => {
                if (item.meta.matchByPath) {
                    return tag.path === item.path
                } else {
                    return tag.name === item.name
                }
            }) < 0) {
                if (type === 'push')
                    state.tagNavList.push(item)
                else
                    state.tagNavList.unshift(item)
                setTagNavListInLocalstorage([...state.tagNavList])
            }
        },
        setLocal(state, lang) {
            state.local = lang
            console.log('set locale', lang)
            setLocale(lang)
        },
        setForbidden(state, forbidden) {
            state.forbidden = forbidden
        },
        setRoutes(state, routes) {
            state.homeRoute = getHomeRoute(routes)
            state.routes = routes
        },
        replaceTabByPath(state, route) {
            let tags = []
            state.tagNavList.forEach(tab => {
                if (tab.path === route.path) {
                    tags.push(route)
                } else {
                    tags.push(tab)
                }
            })
            state.tagNavList = tags
            setTagNavListInLocalstorage(state.tagNavList)
        }
    },
    actions: {
        forbid({state, commit}, forbidden) {
            commit('setForbidden', forbidden)
        },
        setRoutes({state, commit}, routes) {
            commit('setRoutes', routes)
        },
        replaceTabByPath({commit}, route) {
            commit('replaceTabByPath', route)
        }
    }
}
