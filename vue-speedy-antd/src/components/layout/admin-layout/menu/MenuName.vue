<template>
    <span class="menu-name-span">
        <a-icon v-if="menu.icon" :type="menu.icon"/>
        <span v-if="(menu.children && menu.children.length > 0) || menu.url">{{menu.name}}</span>
        <span v-else>请设置[menu.url]</span>
        <a href="#" v-if="!menu.fixed && closable" class="menu-tab-close" @click.prevent.stop="removeTab(menu)">
            <a-icon type="close-circle" theme="filled"/>
        </a>
    </span>
</template>

<script>
    import {mapActions} from "vuex";

    export default {
        name: "MenuName",
        props: {
            menu: Object,
            closable: Boolean
        },
        methods: {
            ...mapActions('menu', {
                removeTab: 'removeTabAction'
            })
        }
    }
</script>

<style lang="less">
    .ant-menu-item {
        margin: 0 3px;
        &:hover {
            .menu-tab-close {
                display: inline-block;
            }
        }
        .menu-tab-close {
            display: none;
            transform: scale(.9);
            position: absolute;
            right: 0px;
            margin-top: 0px;
        }
    }
    .menu-tab {
        .ant-menu-item {
            .menu-tab-close {
                right: -12px;
                margin-top: -10px;
            }
        }
    }
</style>