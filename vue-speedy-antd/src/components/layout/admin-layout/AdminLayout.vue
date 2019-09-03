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
            <top v-model="collapsed"></top>
            <a-layout-content class="admin-layout-content">
                <slot></slot>
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>

<script>
    import './less/admin-layout.less'
    import {Layout} from 'ant-design-vue';
    import Menus from "./menu/Menus";
    import MenuTabs from "./header/MenuTabs";
    import Top from './header/Top'

    export default {
        name: "AdminLayout",
        components: {
            Top,
            MenuTabs,
            Menus,
            ALayout: Layout,
            ALayoutSider: Layout.Sider,
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