<template>
    <base-container>
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

        <a-select defaultValue="lucy" style="margin-top: 40px; width: 120px" @change="handleChange">
            <a-select-option value="jack">Jack</a-select-option>
            <a-select-option value="lucy">Lucy</a-select-option>
            <a-select-option value="disabled" disabled>Disabled</a-select-option>
            <a-select-option value="Yiminghe">yiminghe</a-select-option>
        </a-select>
    </base-container>
</template>

<script>
    import Menu from "../../class/Menu";

    export default {
        name: 'Home',
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