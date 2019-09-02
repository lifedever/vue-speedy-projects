<template>
    <a-layout class="admin-layout">
        <a-layout-sider
                class="admin-layout-sider"
                :trigger="null"
                collapsible
                v-model="collapsed">
            <div class="logo" />
            <a-menu theme="dark" mode="inline" :defaultSelectedKeys="['1']">
                <a-menu-item key="1">
                    <a-icon type="user" />
                    <span>nav 1</span>
                </a-menu-item>
                <a-menu-item key="2">
                    <a-icon type="video-camera" />
                    <span>nav 2</span>
                </a-menu-item>
                <a-menu-item key="3">
                    <a-icon type="upload" />
                    <span>nav 3</span>
                </a-menu-item>
            </a-menu>
        </a-layout-sider>
        <a-layout>
            <a-layout-header class="admin-layout-header">
                <a-icon
                        class="trigger"
                        :type="collapsed ? 'menu-unfold' : 'menu-fold'"
                        @click="() => collapsed = !collapsed"
                />
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

    export default {
        name: "AdminLayout",
        components: {
            AMenu: Menu,
            AMenuItem: Menu.Item,
            ALayout: Layout,
            ALayoutSider: Layout.Sider,
            ALayoutHeader: Layout.Header,
            ALayoutContent: Layout.Content,
        },
        data() {
            return {
                collapsed: false
            }
        }
    }
</script>

<style scoped>

</style>