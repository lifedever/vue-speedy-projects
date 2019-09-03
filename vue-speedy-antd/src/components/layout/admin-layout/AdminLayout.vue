<template>
    <a-layout class="admin-layout">
        <a-layout-sider
                class="admin-layout-sider"
                :trigger="null"
                collapsible
                v-model="collapsed">
            <div class="logo"/>
            <menus :menus="menus"></menus>
        </a-layout-sider>
        <a-layout>
            <a-layout-header class="admin-layout-header">
                <a-icon
                        class="trigger"
                        :type="collapsed ? 'menu-unfold' : 'menu-fold'"
                        @click="() => collapsed = !collapsed"/>
                <menu-tabs></menu-tabs>
            </a-layout-header>
            <a-layout-content class="admin-layout-content">
                <slot></slot>
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>

<script>
    import './admin-layout.less'
    import {Layout, Menu} from 'ant-design-vue';
    import Menus from "./menu/Menus";
    import MenuTabs from "./menu/MenuTabs";

    export default {
        name: "AdminLayout",
        components: {
            MenuTabs,
            Menus,
            ALayout: Layout,
            ALayoutSider: Layout.Sider,
            ALayoutHeader: Layout.Header,
            ALayoutContent: Layout.Content,
        },
        data() {
            return {
                collapsed: false,
            }
        },
        props: {
            menus: {
                type: Array,
                default: []
            }
        }
    }
</script>

<style scoped>

</style>