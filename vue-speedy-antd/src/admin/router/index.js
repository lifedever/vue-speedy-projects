import Vue from 'vue'
import Router from "vue-router";
import defaultRouters from './routers'

Vue.use(Router);

export default (routers) => {
    let options = {
        // mode: 'history',
        // base: `/${adminName}/`,
        routes: routers.concat(defaultRouters)
    }
    const router = new Router(options);
    router.beforeEach((to, from, next) => {
        console.log('from', from)
        console.log('to', to)


        next()
    })
    return router
}