<template>
    <base-container>
        <div slot="headerRight">
            <a-button type="primary">添加按钮</a-button>
        </div>
        <div>
            基础容器定义
        </div>
        <div>
            <a href="#" @click.prevent="openNewTab">在新标签中打开</a>
            <pre class="example-pre">
let menu = new Menu('newTabId', "新标签", "/example", "form")
this.openTab(menu)
            </pre>
        </div>
        <div>
            <a-button @click="openModal">打开全局模态框</a-button>
            <pre class="example-pre">
this.$openModal({
    modal: {
        title: '你好Modal',
        okText: '确定',
        cancelText: '取消',
        width: 300,
    },
    component: () => import('./HelloModal'),
    props: {
        content: '这部分文字是动态传过来的'
    },
    ok: () => {
        console.log('click ok')
        this.$closeModal()
    }
})
            </pre>
        </div>
    </base-container>
</template>

<script>
    import Menu from "../../class/Menu";

    export default {
        name: "Example",
        components: {},
        methods: {
            openNewTab() {
                let menu = new Menu('newTabId', "新标签", "/example", "form")
                this.openTab(menu)
            },
            openModal() {
                this.$openModal({
                    modal: {
                        title: '你好Modal',
                        okText: '确定',
                        cancelText: '取消',
                        width: 300,
                    },
                    component: () => import('./HelloModal'),
                    props: {
                        content: '这部分文字是动态传过来的'
                    },
                    ok: () => {
                        console.log('click ok')
                        this.$closeModal()
                    }
                })
            }
        }
    }
</script>

<style>
    .example-pre {
        width: 600px;
        margin-top: 10px;
    }
</style>