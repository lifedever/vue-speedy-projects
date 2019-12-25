import SForm from "./SForm";
import SFormItem from "./SFormItem";
import CodeSendInput from "./CodeSendInput";

export default {
    install: (Vue, options) => {
        Vue.component('s-form', SForm)
        Vue.component('s-form-item', SFormItem)
        Vue.component('s-code-send-input', CodeSendInput)
    }
}