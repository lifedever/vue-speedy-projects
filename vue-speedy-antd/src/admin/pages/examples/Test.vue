<template>
    <div>
        <h1>{{text}}</h1>
    </div>
</template>

<script>
    export default {
        name: "Test",
        data() {
            return {
                text: null
            }
        },
        mounted() {
            this.init()
        },
        watch: {
            '$route'(){
                if (this.$route.name === 'Test') {
                    // this.init()
                }
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