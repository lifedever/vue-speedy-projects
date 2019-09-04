<template>
    <base-container>
        <div slot="headerRight">
            <a-button type="primary">添加按钮</a-button>
        </div>
        <div>
            这是容器的内容
        </div>
        <div>
            <a href="#" @click.prevent="openNewTab">在新标签中打开</a>
        </div>
    </base-container>
</template>

<script>
    import Menu from "../../class/Menu";

    export default {
        name: "Example",
        components: {
        },
        methods: {
            openNewTab() {
                let menu = new Menu('newTabId', "新标签", "/example", "form")
                this.openTab(menu)
            }
        }
    }
</script>

<style scoped>

</style>