import Vue from 'vue'
import Router from "vue-router";
import defaultRouters from './routers'
Vue.use(Router);


export default (routers) => {
    const router = new Router({
        mode: 'history',
        routes: defaultRouters.concat(routers)
    })

    return router
}