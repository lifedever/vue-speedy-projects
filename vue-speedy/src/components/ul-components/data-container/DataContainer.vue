<template>
    <Container ref="containerRef">
        <div slot="headerRight">
            <slot name="headerRight"></slot>
        </div>
        <template slot-scope="scope">
            <ul-table v-if="items" :height="scope.mainHeight" v-model="items" :loading="loading">
                <slot></slot>
            </ul-table>
        </template>
    </Container>
</template>

<script>
    export default {
        name: "DataContainer",
        props: {
            url: String
        },
        data(){
            return {
                loading: false,
                items: null
            }
        },
        mounted(){
            this.loadData()
        },
        methods: {
            loadData(){
                this.loading = true
                this.$http.get(this.url).then(res => {
                    this.items = res.data
                    this.loading = false
                })
            },
        }
    }
</script>

<style scoped>

</style>
