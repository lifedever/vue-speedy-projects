<template>
    <base-container>
        <div>
            哈哈， 这是首页
            <div style="width: 400px;">
                <a-input class="s-input-with-button-right">
                    <a-button slot="addonAfter" type="primary">
                        获取验证码
                    </a-button>
                </a-input>
            </div>
            <div style="margin-top: 40px;">
                <a-button @click="openNewTab" type="primary">打开新Tab并加载数据</a-button>
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
            }
        }
    }
</script>

<style scoped></style>