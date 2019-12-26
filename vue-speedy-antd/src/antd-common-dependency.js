import {
    Button,
    Dropdown,
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
    Alert,
    Modal,
    Empty,
    List,
    Divider,
    Avatar,
    Row,
    Col,
    message,
    notification,
    Tree,
    Tooltip,
    Menu,
    LocaleProvider
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
        Vue.prototype.$Modal = Modal
        Vue.component(Button.name, Button)
        Vue.component(Icon.name, Icon)
        Vue.component(Card.name, Card)
        Vue.component(Form.name, Form)
        Vue.component(Form.Item.name, Form.Item)
        Vue.component(Input.name, Input)
        Vue.component(Input.Search.name, Input.Search)
        Vue.component(InputNumber.name, InputNumber)
        Vue.component(Checkbox.name, Checkbox)
        Vue.component(Checkbox.Group.name, Checkbox.Group)
        Vue.component(Radio.name, Radio)
        Vue.component(Select.name, Select)
        Vue.component(Select.Option.name, Select.Option)
        Vue.component(Select.OptGroup.name, Select.OptGroup)
        Vue.component(Switch.name, Switch)
        Vue.component(DatePicker.name, DatePicker)
        Vue.component(Tag.name, Tag)
        Vue.component(Avatar.name, Avatar)
        Vue.component(Spin.name, Spin)
        Vue.component(Alert.name, Alert)
        Vue.component(Modal.name, Modal)
        Vue.component(List.name, List)
        Vue.component(List.Item.name, List.Item)
        Vue.component(List.Item.Meta.name, List.Item.Meta)
        Vue.component(Divider.name, Divider)
        Vue.component(Row.name, Row)
        Vue.component(Col.name, Col)
        Vue.component(Menu.name, Menu)
        Vue.component(Menu.Divider.name, Menu.Divider)
        Vue.component(Menu.Item.name, Menu.Item)
        Vue.component(Menu.SubMenu.name, Menu.SubMenu)
        Vue.component(Menu.ItemGroup.name, Menu.ItemGroup)
        Vue.component(Empty.name, Empty)
        Vue.component(Tooltip.name, Tooltip)
        Vue.component(Tree.name, Tree)
        Vue.component(Tree.TreeNode.name, Tree.TreeNode)
        Vue.component(LocaleProvider.name, LocaleProvider)
        Vue.component(Dropdown.name, Dropdown)
        Vue.component(Dropdown.Button.name, Dropdown.Button)
    }
}