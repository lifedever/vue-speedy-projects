<template>
    <a-layout class="admin-layout">
        <a-layout-sider
                class="admin-layout-sider"
                :trigger="null"
                collapsible
                v-model="collapsed">
            <div class="logo">
                <slot name="logo" v-bind:data="collapsed"></slot>
            </div>
            <menus :menus="menus"></menus>
        </a-layout-sider>
        <a-layout :loading="true">
            <top v-model="collapsed"></top>
            <a-layout-content class="admin-layout-content">
                <a-spin :spinning="!currentMenu || loading" class="admin-layout-content-spin">
                    <slot></slot>
                </a-spin>
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
    import {mapGetters} from "vuex";

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
        mounted() {
            console.log(this.$slots)
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
            },
            loading: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            ...mapGetters('menu', {
                currentMenu: 'currentGet'
            })
        }
    }
</script>

<style>

</style>