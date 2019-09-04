import AdminLayout from "./AdminLayout";
import BaseContainer from "./container/BaseContainer";

import mixin from './mixins'
import store from "../../../store";
import menuStore from './store/menu'

export default {
    install: (Vue, options) => {
        Vue.component('admin-layout', AdminLayout)
        Vue.component('base-container', BaseContainer)

        Vue.mixin(mixin)
        store.registerModule('menu', menuStore)
    }
}