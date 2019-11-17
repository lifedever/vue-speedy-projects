import ErrorNotice from "./ErrorNotice.vue";

/**
 * 错误通知收集组件
 */
export default {
    install(Vue, options) {
        Vue.component('error-notice', ErrorNotice)
        Vue.config.errorHandler = (error, vm, trace) => {
            console.error(vm);
            console.error(error);
            let name = 'notice#' + new Date().getTime()
            new Vue().$notification.warning({
                name,
                duration: 0,
                title: '未知错误',
                render: function (createElement) {
                    return createElement('error-notice', {
                        props: {
                            name,
                            error,
                            type: 'JS_ERROR',
                        }
                    })
                }
            })
        }
    }
}