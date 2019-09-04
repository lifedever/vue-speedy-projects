import {
    Button,
    Icon,
    Layout
} from 'ant-design-vue';

export default {
    install: (Vue, options) => {
        Vue.component(Button.name, Button)
        Vue.component(Icon.name, Icon)
    }
}