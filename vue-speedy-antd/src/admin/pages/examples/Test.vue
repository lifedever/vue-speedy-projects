<template>
    <base-container>
        <test-item></test-item>
    </base-container>
</template>

<script>
    import TestItem from "./TestItem";
    export default {
        name: "Test",
        components: {TestItem},
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