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
            <menus :menus="menus" :menu-collapsed="collapsed"></menus>
        </a-layout-sider>
        <a-layout :loading="true">
            <top v-model="collapsed"></top>
            <a-layout-content class="admin-layout-content">
                <a-spin :spinning="spinning" class="admin-layout-content-spin">
                    <slot></slot>
                </a-spin>
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>

<script>
    import './less/admin-layout.less'
    import './less/fix-safair-100.less'
    import {Layout} from 'ant-design-vue';
    import Menus from "./menu/Menus";
    import MenuTabs from "./header/MenuTabs";
    import Top from './header/Top'
    import {mapActions, mapGetters} from "vuex";

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
            this.loadUserInfo()
        },
        data() {
            return {
                collapsed: false,
            }
        },
        watch: {
            currentMenu(menu) {
                if (menu && !menu.anonymous && !this.token) {
                    this.$router.push('/login')
                }
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
            }),
            ...mapGetters('app', {
                token: 'tokenGet'
            }),
            spinning() {
                return (!this.currentMenu || this.loading) && !this.$route.meta.clearLoading
            }
        },
        methods: {
            ...mapActions('user', {
                loadUserInfo: 'loadUserInfoAction'
            })
        }
    }
</script>

<style>

</style>