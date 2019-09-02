import Vue from 'vue'
import Router from "vue-router";
import pages from '../pages'
Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: pages
})

export default router