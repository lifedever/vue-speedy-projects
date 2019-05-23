<template>
    <div style="width: 700px;">
        <Editor v-model="value"></Editor>

        <Button @click="show()">get</Button>
    </div>
</template>

<script>

    import Editor from "../../../components/editor/editor";
    export default {
        name: "ExpEditor",
        components: {Editor},
        data(){
            return {
                value: 'hello world'
            }
        },
        methods: {
            show(){
                alert(this.value)
            }
        }
    }
</script>

<style scoped>

</style>
