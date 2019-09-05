export default {
    install: (Vue, options) => {
        let $bus = new Vue().$bus
        Vue.prototype.$openModal = (view) => {
            $bus.emit('bus_openModal', view)
        }
        Vue.prototype.$closeModal = () => {
            $bus.emit('bus_closeModal')
        }
    }
}