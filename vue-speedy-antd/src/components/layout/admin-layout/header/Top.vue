<template>
    <a-layout-header class="admin-layout-header">
        <a-icon
                class="trigger"
                :type="collapsed ? 'menu-unfold' : 'menu-fold'"
                @click="triggerHandler"/>
        <menu-tabs></menu-tabs>
        <top-control></top-control>
    </a-layout-header>
</template>

<script>
    import {Layout} from 'ant-design-vue'
    import MenuTabs from "./MenuTabs";
    import TopControl from "./TopControl";

    export default {
        name: "Top",
        components: {
            TopControl,
            MenuTabs,
            ALayoutHeader: Layout.Header,
        },
        data() {
            return {
                collapsed: false,
            }
        },
        mounted() {
            this.collapsed = this.value
        },
        props: {
            value: Boolean
        },
        methods: {
            triggerHandler() {
                this.collapsed = !this.collapsed
                this.$emit('input', this.collapsed)
            }
        }
    }
</script>

<style scoped>

</style>