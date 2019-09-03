<template>
    <a-menu :theme="theme"
            mode="inline"
            v-model="current"
            @select="menuSelect">
        <template v-for="(menu, index) in menus">
            <a-sub-menu v-if="menu.children && menu.children.length > 0"
                        :key="menu.url" :disabled="menu.disabled">
                <span slot="title">
                    <menu-name :menu="menu"></menu-name>
                </span>
                <a-menu-item v-for="(subMenu, subIndex) in menu.children"
                             :disabled="subMenu.disabled"
                             :key="subMenu.url">
                    <menu-name :menu="subMenu"></menu-name>
                </a-menu-item>
            </a-sub-menu>
            <a-menu-item v-else
                         :key="menu.url"
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

    export default {
        components: {
            MenuName,
            AMenu: Menu,
            AMenuItem: Menu.Item,
            ASubMenu: Menu.SubMenu
        },
        name: "Menus",
        mixins: [MenuMixin],
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
            this.menuSelect({key: url})
        },
        methods: {

        }
    }
</script>

<style scoped>

</style>