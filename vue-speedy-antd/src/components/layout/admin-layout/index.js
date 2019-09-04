import AdminLayout from "./AdminLayout";
import mixin from './mixins'
import store from "../../../store";
import menuStore from './store/menu'

export default {
    install: (Vue, options) => {
        Vue.component('admin-layout', AdminLayout)
        Vue.mixin(mixin)
        store.registerModule('menu', menuStore)
    }
}