import AdminLayout from "./AdminLayout";
import BaseContainer from "./container/BaseContainer";

import mixin from './mixins'
import store from "../../store";
import menuStore from './store/menu'

export default {
    install: (Vue, options) => {
        Vue.component('admin-layout', AdminLayout)
        Vue.component('base-container', BaseContainer)

        Vue.mixin(mixin)
        store.registerModule('menu', menuStore)

        // 保存菜单
        store.dispatch('menu/storeMenusAction', options.menus)

        console.log('%c 👌 Admin Layout init finished!', 'background: #9d8621; padding: 1px 25px; color: #fff; border-radius: 4px;', options);
    }
}