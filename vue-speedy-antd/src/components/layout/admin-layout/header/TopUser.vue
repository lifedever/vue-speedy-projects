<template>
    <a-dropdown :trigger="['hover']" placement="bottomRight">
        <a href="#" class="admin-top-user">
            <a-avatar icon="user" size="small"/>
            <span class="margin-left-sm">
                Devid.Ge
            </span>
        </a>
        <a-menu slot="overlay">
            <a-menu-item key="0">
                <a-icon type="user" />
                个人中心
            </a-menu-item>
            <a-menu-item key="1">
                <a-icon type="setting" />
                设置
            </a-menu-item>
            <a-menu-divider/>
            <a-menu-item key="3">
                <a-icon type="poweroff" />
                退出
            </a-menu-item>
        </a-menu>
    </a-dropdown>
</template>

<script>
    import {Avatar, Dropdown, Menu} from 'ant-design-vue'

    export default {
        name: "TopUser",
        components: {
            AAvatar: Avatar,
            ADropdown: Dropdown,
            AMenu: Menu,
            AMenuItem: Menu.Item,
            AMenuDivider: Menu.Divider
        },
    }
</script>

<style lang="less">
    .admin-top-user {
        height: 46px;
        display: block;
        color: @text-color;
        &:hover {
            color: darken(@text-color, 10%);
        }
    }
</style>