<template>
    <a-menu :theme="theme"
            class="menus"
            mode="inline"
            v-model="current"
            :openKeys="openKeys"
            @select="menuSelect">
        <template v-for="(menu, index) in menus">
            <a-sub-menu v-if="menu.children && menu.children.length > 0"
                        :key="menu.id"
                        @titleClick="titleClick"
                        :disabled="menu.disabled">
                <span slot="title">
                    <menu-name :menu="menu"></menu-name>
                </span>
                <a-menu-item v-for="(subMenu, subIndex) in menu.children"
                             :disabled="subMenu.disabled"
                             :key="subMenu.id">
                    <menu-name :menu="subMenu"></menu-name>
                </a-menu-item>
            </a-sub-menu>
            <a-menu-item v-else
                         :key="menu.id"
                         :disabled="menu.disabled">
                <menu-name :menu="menu"></menu-name>
            </a-menu-item>
        </template>
    </a-menu>
</template>

<script>
    import {Menu} from 'ant-design-vue';
    import MenuMixin from './menu.mixin'
    import MenuName from "./MenuName";
    import {MenuUtil} from '../../../utils/menu.util'

    export default {
        components: {
            MenuName,
            AMenu: Menu,
            AMenuItem: Menu.Item,
            ASubMenu: Menu.SubMenu
        },
        name: "Menus",
        mixins: [MenuMixin],
        data() {
            return {
                openKeys: []
            }
        },
        props: {
            theme: {
                type: String,
                default: 'dark'
            },
            mode: {
                type: String,
                default: 'inline'
            },
            menus: {
                type: Array,
                default: []
            }
        },
        mounted() {
            let url = this.$route.path
            const menu = MenuUtil.findByUrl(this.menus, url)
            if (menu) {
                this.menuSelect({key: menu.id});
            }
        },
        methods: {
            currentChange(menu) {
                let parent = MenuUtil.findParent(this.menus, menu)
                if (parent && this.openKeys.indexOf(parent.id) === -1) {
                    this.openKeys = [parent.id]
                }
            },
            titleClick({key}) {
                if (this.openKeys.indexOf(key) === -1) {
                    this.openKeys = [key]
                } else {
                    this.openKeys = this.openKeys.filter(o => o !== key)
                }
            }
        }
    }
</script>

<style scoped>

</style>