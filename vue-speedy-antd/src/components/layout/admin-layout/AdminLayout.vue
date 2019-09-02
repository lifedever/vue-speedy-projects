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
    import {Layout} from 'ant-design-vue';
    import Menus from "./menu/Menus";

    export default {
        name: "AdminLayout",
        components: {
            Menus,
            ALayout: Layout,
            ALayoutSider: Layout.Sider,
            ALayoutHeader: Layout.Header,
            ALayoutContent: Layout.Content,
        },
        data() {
            return {
                collapsed: false,
                menus: [
                    {
                        name: '首页',
                        icon: 'home',
                        url: '/home'
                    },
                    {
                        name: '系统管理',
                        icon: 'setting',
                        children: [
                            {
                                name: '用户管理',
                                url: '/system/users'
                            }, {
                                name: '角色管理',
                                url: '/system/roles'
                            }
                        ]
                    }
                ]
            }
        }
    }
</script>

<style scoped>

</style>