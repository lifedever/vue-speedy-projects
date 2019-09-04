import Vue from 'vue'
import Router from "vue-router";
import defaultRouters from './routers'

Vue.use(Router);

export default (routers) => {
    const router = new Router({
        mode: 'history',
        routes: defaultRouters.concat(routers)
    })
    router.beforeEach((to, from, next) => {
        console.log('from', from)
        console.log('to', to)


        next()
    })
    return router
}