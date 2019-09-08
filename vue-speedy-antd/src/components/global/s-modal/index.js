export default {
    install: (Vue, options) => {
        let $bus = new Vue().$bus
        Vue.prototype.$openModal = (view) => {
            $bus.emit('bus_openModal', view)
        }
        Vue.prototype.$closeModal = () => {
            $bus.emit('bus_closeModal')
        }
        Vue.prototype.$okLoadingModal = (loading) => {
            $bus.emit('bus_okLoadingModal', loading)
        }

        Vue.prototype.$openFormModal = view => {
            view.modal = Object.assign({}, view.modal, {footer: null})
            $bus.emit('bus_openModal', view)
        }
    }
}