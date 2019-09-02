<template>
    <a-menu :theme="theme" mode="inline" :defaultSelectedKeys="[menus[0].name]" @select="menuSelect">
        <template v-for="(menu, index) in menus">
            <a-sub-menu v-if="menu.children && menu.children.length > 0"
                        :key="menu.name" :disabled="menu.disabled">
                <span slot="title">
                    <menu-name :menu="menu"></menu-name>
                </span>
                <a-menu-item v-for="(subMenu, subIndex) in menu.children"
                             :disabled="subMenu.disabled"
                             :key="subMenu.name">
                    <menu-name :menu="subMenu"></menu-name>
                </a-menu-item>
            </a-sub-menu>
            <a-menu-item v-else
                         :key="menu.name"
                         :disabled="menu.disabled">
                <menu-name :menu="menu"></menu-name>
            </a-menu-item>
        </template>
    </a-menu>
</template>

<script>
    import {Menu} from 'ant-design-vue';
    import {MenuUtil} from "../../../../utils/menu.util";
    import {mapActions} from "vuex";
    import MenuName from "./MenuName";

    export default {
        components: {
            MenuName,
            AMenu: Menu,
            AMenuItem: Menu.Item,
            ASubMenu: Menu.SubMenu
        },
        name: "Menus",
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
        methods: {
            ...mapActions([
                'menuTab/openTabAction'
            ]),
            menuSelect({item, key, selectedKeys}) {
                const menu = MenuUtil.findByName(this.menus, key)
                this['menuTab/openTabAction'](menu)
            }
        }
    }
</script>

<style scoped>

</style>