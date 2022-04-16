import Vue from 'vue'
import Router from "vue-router";
import defaultRouters from './routers'
import Login from '../pages/login'

Vue.use(Router);
const createRouter = (routers, config) => {
    let options = {
        // mode: 'history',
        // base: `/${adminName}/`,
        routes: routers.concat([
            {
                name: 'Login',
                path: '/login',
                component: config.loginComponent || Login
            }
        ]).concat(defaultRouters)
    }
    const router = new Router(options);
    router.beforeEach((to, from, next) => {
        console.log('from', from)
        console.log('to', to)


        next()
    })
    return router
}
export {createRouter}