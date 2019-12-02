import AdminLayout from "./AdminLayout";
import BaseContainer from "./container/BaseContainer";
import SplitContainer from "./container/SplitContainer";
import TableContainer from "./container/TableContainer";
import TreeContainer from "./container/TreeContainer";
import TabContainer from "./container/TabContainer";

import STableColumn from "../../components/partial/table/STableColumn";

import mixin from './mixins'
import store from "../../admin/store";
import menuStore from './store/menu'

export default {
    install: (Vue, options) => {
        store.registerModule('menu', menuStore)
        Vue.mixin(mixin)

        // let menus = options.menus.concat(defaultMenus)
        // 保存菜单
        // store.dispatch('menu/storeMenusAction', menus)

        // console.log('menus', JSON.stringify(menus))

        Vue.component('admin-layout', AdminLayout)
        Vue.component('base-container', BaseContainer)
        Vue.component('split-container', SplitContainer)
        Vue.component('table-container', TableContainer)
        Vue.component('tree-container', TreeContainer)
        Vue.component('tab-container', TabContainer)
        Vue.component('s-table-column', STableColumn)
        console.log('%c 👌 Admin Layout init finished!', 'background: #9d8621; padding: 1px 25px; color: #fff; border-radius: 4px;', options);
    }
}