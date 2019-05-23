<template>
    <Editor v-model="value"></Editor>
</template>

<script>
    export default {
        name: "Editor",
        data(){
            return {
                value: 'hello world'
            }
        }
    }
</script>

<style scoped>

</style>
