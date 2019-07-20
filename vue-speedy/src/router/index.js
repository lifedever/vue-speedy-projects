import Vue from 'vue'
import Router from 'vue-router'
import routers from './routers'
import store from '../store'
import $Message from 'iview/src/components/message'
import {checkIfHolderNeedless, getLocalHolder, setLocalHolder, storeHolder} from "../libs/util";

Vue.use(Router);

export default (extRoutes) => {
    const routes = routers(extRoutes)
    const router = new Router({
        routes,
        mode: 'history',
        scrollBehavior (to, from, savedPosition) {
            // return 期望滚动到哪个的位置
            if (savedPosition) {
                return savedPosition
            } else {
                return { x: 0, y: 0 }
            }
        }
    });

    store.dispatch('setRoutes', routes)
    router.beforeEach((to, from, next) => {
        console.log('from', from)
        console.log('to', to)
        let holderId = to.params.holder
        if (!holderId && !checkIfHolderNeedless(to)) {
            console.log('远程 load 租户列表')
            const nextRoute = (holderId) => {
                let params = to.params || {}
                let name = to.name
                if (name === 'Main') {
                    name = 'Home'
                }
                // 默认只有一个租户的时候，直接跳转
                setLocalHolder(to, holderId)
                params.holder = holderId
                next({
                    name: name,
                    params: params,
                    query: to.query
                })
            }

            holderId = getLocalHolder()
            if (holderId) {
                // 本地有holder缓存
                nextRoute(holderId)
            } else {
                // 远程holder加载
                store.dispatch('loadHolders').then(holders => {
                    if (holders.length === 0) {
                        $Message.warning('当前登录用户在此平台无有效关联租户，请联系系统管理员！')
                        store.dispatch('handleLogOut')
                        next('/login')
                    } else if (holders.length === 1) {
                        nextRoute(holders[0].id);
                    } else {
                        // TODO 租户选择
                    }
                });
            }
        }

        storeHolder(to)
        store.dispatch('forbid', false)
        const token = store.getters.tokenGet
        const userInfoGet = store.getters.userInfoGet
        if (!token && !to.meta.anonymous && !userInfoGet) {
            store.dispatch('getUserInfo').then(res => {
                next()
            }).catch(err => {
                store.dispatch('handleLogOut')
                next('/login')
            })
        } else {
            next()
        }
    })
    router.afterEach(to => {
        window.scrollTo(0, 0)
    })
    return router
}
