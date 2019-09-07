import Vue from 'vue'
import Router from "vue-router";
import defaultRouters from './routers'

Vue.use(Router);

export default (routers, baseAdminUrl) => {
    const router = new Router({
        // mode: 'history',
        base: `/${baseAdminUrl}/`,
        routes: routers.concat(defaultRouters)
    })
    router.beforeEach((to, from, next) => {
        console.log('from', from)
        console.log('to', to)


        next()
    })
    return router
}