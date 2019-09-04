import AdminLayout from "./AdminLayout";
import BaseContainer from "./container/BaseContainer";

import mixin from './mixins'
import store from "../../store";
import menuStore from './store/menu'

export default {
    install: (Vue, options) => {
        store.registerModule('menu', menuStore)

        Vue.mixin(mixin)

        // 保存菜单
        store.dispatch('menu/storeMenusAction', options.menus)

        Vue.component('admin-layout', AdminLayout)
        Vue.component('base-container', BaseContainer)
        console.log('%c 👌 Admin Layout init finished!', 'background: #9d8621; padding: 1px 25px; color: #fff; border-radius: 4px;', options);
    }
}