<template>
    <div class="page-layout-menus">
        <div class="container">
            <a-row>
                <a-col :span="span">
                    <a-menu :theme="theme"
                            v-model="current"
                            mode="horizontal">
                        <template v-for="menu in menus">
                            <a-sub-menu v-if="menu.children && menu.children.length > 0">
                                <span slot="title" class="submenu-title-wrapper">
                                    <a-icon v-if="menu.icon" :type="menu.icon"/>
                                    {{menu.name}}
                                </span>
                                <a-menu-item v-for="subMemu in menu.children" :key="subMemu.id">
                                    <a v-if="subMemu.url" :href="subMemu.url">
                                        <a-icon v-if="subMemu.icon" :type="subMemu.icon"/>
                                        {{subMemu.name}}
                                    </a>
                                    <span v-else>
                                        <a-icon v-if="menu.icon" :type="menu.icon"/>
                                        {{menu.name}}
                                    </span>
                                </a-menu-item>
                            </a-sub-menu>
                            <a-menu-item :key="menu.id" v-else>
                                <a v-if="menu.url" :href="menu.url">
                                    <a-icon v-if="menu.icon" :type="menu.icon"/>
                                    {{menu.name}}
                                </a>
                                <span v-else>
                                    <a-icon v-if="menu.icon" :type="menu.icon"/>
                                    {{menu.name}}
                                </span>
                            </a-menu-item>
                        </template>
                    </a-menu>
                </a-col>

                <a-col :span="24-span" v-if="$slots.default" class="text-right">
                    <slot></slot>
                </a-col>
            </a-row>
        </div>
    </div>
</template>

<script>
    import {Menu} from 'ant-design-vue';
    import ARow from "ant-design-vue/es/grid/Row";
    import ACol from "ant-design-vue/es/grid/Col";

    export default {
        name: "TopMenus",
        components: {
            ACol,
            ARow,
            AMenu: Menu,
            AMenuItem: Menu.Item,
            ASubMenu: Menu.SubMenu,
            AMenuItemGroup: Menu.ItemGroup
        },
        data() {
            return {
                current: []
            }
        },
        mounted() {
            this.current = this.value
        },
        props: {
            theme: String,
            value: Array,
            menus: Array,
            span: {
                type: Number,
                default: 20
            }
        }
    }
</script>

<style scoped>

</style>