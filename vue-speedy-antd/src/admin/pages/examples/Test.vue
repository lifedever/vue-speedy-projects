<template>
    <base-container>
        <keep-alive>
            <test-item :key="$route.fullPath"></test-item>
        </keep-alive>
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