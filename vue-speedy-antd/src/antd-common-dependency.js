import {
    Button,
    Icon,
    Card,
    Form,
    Input,
    InputNumber,
    Checkbox,
    Radio,
    Select,
    Switch,
    DatePicker,
    Tag,
    Spin,
    message,
    notification
} from 'ant-design-vue';

export default {
    install: (Vue, options) => {
        message.config({
            top: `80px`,
            duration: 3,
            maxCount: 3,
        });

        Vue.prototype.$message = message
        Vue.prototype.$notification = notification
        Vue.component(Button.name, Button)
        Vue.component(Icon.name, Icon)
        Vue.component(Card.name, Card)
        Vue.component(Form.name, Form)
        Vue.component(Form.Item.name, Form.Item)
        Vue.component(Input.name, Input)
        Vue.component(InputNumber.name, InputNumber)
        Vue.component(Checkbox.name, Checkbox)
        Vue.component(Radio.name, Radio)
        Vue.component(Select.name, Select)
        Vue.component(Switch.name, Switch)
        Vue.component(DatePicker.name, DatePicker)
        Vue.component(Tag.name, Tag)
        Vue.component(Spin.name, Spin)
    }
}