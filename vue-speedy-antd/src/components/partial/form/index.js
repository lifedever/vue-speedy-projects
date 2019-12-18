import SForm from "./SForm";
import SFormItem from "./SFormItem";

export default {
    install: (Vue, options) => {
        Vue.component('s-form', SForm)
        Vue.component('s-form-item', SFormItem)
    }
}