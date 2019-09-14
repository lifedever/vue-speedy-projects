<template>
    <split-container v-model="split">
        <s-editor slot="left" ref="editorRef" v-model="content"></s-editor>
        <div v-html="content" slot="right"></div>
        <div slot="footer">
            <a-button size="small" type="primary" @click="setContent">设置内容</a-button>
        </div>
    </split-container>
</template>

<script>
    import SEditor from "../../../components/partial/editor/SEditor";

    export default {
        name: "EditorExample",
        components: {SEditor},
        data() {
            return {
                split: 100,
                content: ''
            }
        },
        methods: {
            setContent() {
                this.$refs['editorRef'].setContent('<h1>这是自动添加的内容</h1>')
            }
        }
    }
</script>

<style scoped>

</style>