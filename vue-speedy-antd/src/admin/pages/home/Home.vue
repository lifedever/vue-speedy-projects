<template>
    <base-container>
        <div>
            <div style="margin-top: 40px;">
                <a-button @click="openNewTab" type="primary">打开新Tab并加载数据</a-button>
                <s-form @submit="handleSubmit">
                    <s-form-item label="输入验证码">
                        <s-code-send-input style="width: 400px;"
                                           v-decorator="['code', { rules: [{ required: true, message: 'Please input your code' }] }]"
                                           url="/api/pt/userinfo"
                                           @send="handleSend"
                                           @finish="handleFinish"
                                           placeholder="输入验证码"
                                           :timeout="60"/>
                    </s-form-item>
                </s-form>
            </div>

            <a-select class="inline-block" defaultValue="lucy" style="margin-top: 40px; width: 120px"
                      @change="handleChange">
                <a-select-option value="jack">Jack</a-select-option>
                <a-select-option value="lucy">Lucy</a-select-option>
                <a-select-option value="disabled" disabled>Disabled</a-select-option>
                <a-select-option value="Yiminghe">yiminghe</a-select-option>
            </a-select>

            <s-dropdown :data="dropdownData" @select="handleSelect"
                        class="mar-left-sm margin-right-sm">
                <a-button> Cascading menu <a-icon type="down" /> </a-button>
            </s-dropdown>

            <div class="margin-left-sm inline-block">
                <a-button>普通按钮</a-button>
                <a-button type="primary" class="inline-block mar-left-sm">主要按钮</a-button>
                <a-button type="success" class="inline-block margin-left-sm">成功按钮</a-button>
                <a-button type="warning" class="inline-block margin-left-sm">警告按钮</a-button>
                <a-button type="danger" class="inline-block margin-left-sm">错误按钮</a-button>
            </div>

            <div class="mar-top-lg">
                <p>如何解决新tab数据互相影响的问题？</p>
                <div class="mar-bottom-sm">对需要隔离的组件指定一个唯一的 <code>key</code>：</div>
                <pre>{{code}}</pre>
            </div>
        </div>
    </base-container>
</template>

<script>
    import Menu from "../../class/Menu";
    import SDropdown from "../../../components/partial/dropdown/SDropdown";

    export default {
        name: 'Home',
        components: {SDropdown},
        data() {
            return {
                code: `<keep-alive>
    <test-item :key="$route.fullPath"></test-item>
</keep-alive>`,
                dropdownData: [
                    {
                        key: 1,
                        title: '1'
                    },
                    {
                        key: 2,
                        title: '2'
                    },
                    {
                        key: 3,
                        title: '3',
                        children: [
                            {
                                key: 31,
                                title: '31'
                            },
                            {
                                key: 32,
                                title: '32',
                                children: [
                                    {
                                        key: 321,
                                        title: '321'
                                    },
                                    {
                                        key: 322,
                                        title: '322',
                                        children: [
                                            {
                                                key: 3221,
                                                title: '3221'
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        },
        methods: {
            handleSelect(data) {
                console.log(data)
            },
            openNewTab() {
                let id = new Date().getTime()
                let menu = new Menu(id, name = "Tab_" + id, '/test/' + id)
                menu.selecedKey = 'home'
                this.openTab(menu)
            },
            handleChange(value) {
                this.$message.success(value)
            },
            handleSend() {
                this.$message.success('验证码发送成功！')
            },
            handleFinish() {
                this.$message.success('又可以重新发送验证码了')
            },
            handleSubmit(data) {
                this.$message.success(JSON.stringify(data))
            }
        }
    }
</script>

<style scoped></style>