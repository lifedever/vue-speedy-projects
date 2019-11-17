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
            let key = 'notice#' + new Date().getTime()
            new Vue().$notification.warning({
                key,
                duration: 0,
                message: '未知错误',
                style: {
                    width: '450px',
                    marginLeft: `${-60}px`,
                },
                description: function (createElement) {
                    return createElement('error-notice', {
                        props: {
                            noticeKey: key,
                            error,
                            type: error.type || 'JS_ERROR',
                        }
                    })
                }
            })
        }
    }
}