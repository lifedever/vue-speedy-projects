<template>
    <div class="page-layout">
        <slot></slot>
    </div>
</template>

<script>
    import {mapActions} from "vuex";

    export default {
        name: "PageLayout",
        mounted() {
            this.loadUserInfo().then(res => {

            }).catch(err => {
                console.warn('openUser not login!')
            })
        },
        methods: {
            ...mapActions('indexUser', {
                loadUserInfo: 'loadUserInfoAction'
            })
        }
    }
</script>

<style scoped>

</style>