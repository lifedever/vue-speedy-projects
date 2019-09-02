import {
    Button,
    Icon,
} from 'ant-design-vue';

export default {
    install: (Vue, options) => {
        Vue.component(Button.name, Button)
        Vue.component(Icon.name, Icon)
    }
}