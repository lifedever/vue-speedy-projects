<template>
    <base-container>
        <div>
            <div style="margin-top: 40px;">
                <a-button @click="openNewTab" type="primary">打开新Tab并加载数据</a-button>
                <s-code-send-input class="margin-left-sm"
                                   style="width: 400px;"
                                   url="/api/pt/userinfo"
                                   @send="handleSend"
                                   @finish="handleFinish"
                                   :timeout="60"/>
            </div>

            <a-select class="inline-block" defaultValue="lucy" style="margin-top: 40px; width: 120px"
                      @change="handleChange">
                <a-select-option value="jack">Jack</a-select-option>
                <a-select-option value="lucy">Lucy</a-select-option>
                <a-select-option value="disabled" disabled>Disabled</a-select-option>
                <a-select-option value="Yiminghe">yiminghe</a-select-option>
            </a-select>

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

    export default {
        name: 'Home',
        data() {
            return {
                code: `<keep-alive>
    <test-item :key="$route.fullPath"></test-item>
</keep-alive>`
            }
        },
        methods: {
            openNewTab() {
                let id = new Date().getTime()
                let menu = new Menu(id = id, name = "Tab_" + id, '/test/' + id)
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
            }
        }
    }
</script>

<style scoped></style>