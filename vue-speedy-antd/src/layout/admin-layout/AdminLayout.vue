<template>
    <page-loading v-if="mainLoading"></page-loading>
    <a-layout v-else class="admin-layout">
        <a-layout-sider
                :width="siderWidth"
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
            <a-layout-content class="admin-layout-content" v-if="userInfo && !userInfo.unsafed">
                <a-spin :spinning="spinning" class="admin-layout-content-spin">
                    <slot></slot>
                </a-spin>
            </a-layout-content>
            <a-layout-content class="admin-layout-content" else>
                <base-container>
                    <div slot="headerLeft">设置新密码</div>
                    <div class="margin-bottom-lg">
                        <a-alert style="width: 600px;" message="您的账号存在安全隐患，请先设置您的新密码！" type="warning"></a-alert>
                    </div>
                    <change-password-form></change-password-form>
                </base-container>
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
    import {getHolder} from "../../utils/storage";
    import PageLoading from "../../components/partial/other/PageLoading";
    import parallel from 'async/parallel';
    import ChangePasswordForm from "./partial/ChangePasswordForm";

    export default {
        name: "AdminLayout",
        components: {
            ChangePasswordForm,
            PageLoading,
            Top,
            MenuTabs,
            Menus,
            ALayout: Layout,
            ALayoutSider: Layout.Sider,
            ALayoutContent: Layout.Content,
        },
        mounted() {
            parallel([
                    callback => {
                        this.loadMenus().then(res => {
                            callback(null, res)
                        })
                    },
                    callback => {
                        this.loadUserInfo().then(res => {
                            callback(null, res);
                        })
                    },
                    callback => {
                        this.loadHolder(getHolder()).then(res => {
                            callback(null, res)
                        })
                    }
                ],
                (err, results) => {
                    this.mainLoading = false
                });
        },
        data() {
            return {
                collapsed: false,
                mainLoading: true
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
            },
            siderWidth: {
                type: [Number, String],
                default: 250
            }
        },
        computed: {
            ...mapGetters('menu', {
                currentMenu: 'currentGet'
            }),
            ...mapGetters('app', {
                token: 'tokenGet'
            }),
            ...mapGetters('user', {
                userInfo: 'userInfoGet'
            }),
            spinning() {
                return (!this.currentMenu || this.loading) && !this.$route.meta.clearLoading
            }
        },
        methods: {
            ...mapActions('user', {
                loadUserInfo: 'loadUserInfoAction'
            }),
            ...mapActions('holder', {
                loadHolder: 'loadHolderAction'
            }),
            ...mapActions('menu', {
                loadMenus: 'loadMenusAction'
            })
        }
    }
</script>

<style>

</style>