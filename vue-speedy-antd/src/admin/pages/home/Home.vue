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
    </base-container>
</template>

<script>
import Menu from "../../class/Menu";

export default {
    name: 'Home',
    methods: {
        openNewTab(){
            let id = new Date().getTime()
            let menu = new Menu(id, "Tab_" + id, '/test/' + id)
            this.openTab(menu)
        }
    }
}
</script>

<style scoped></style>