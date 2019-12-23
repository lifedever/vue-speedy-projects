<template>
    <h1>{{text}}</h1>
</template>

<script>
    export default {
        name: "TestItem",
        mounted() {
            console.log('mounted')
            this.init()
        },
        data() {
            return {
                text: null
            }
        },
        methods: {
            init(){
                this.text = this.$route.params.id
                console.log('init: ' + this.text)
            }
        }
    }
</script>

<style scoped>

</style>