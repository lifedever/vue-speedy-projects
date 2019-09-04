<template>
    <a-dropdown :trigger="['hover']" placement="bottomRight">
        <a href="#" @click.prevent class="admin-top-user">
            <a-avatar size="small"
                      style="color: #61759a; backgroundColor: rgba(178,220,255,0.65)">
                {{usernameShort}}
            </a-avatar>
            <span v-if="userInfo">
                &nbsp; {{userInfo.nickname || userInfo.loginName}}
            </span>
        </a>
        <a-menu slot="overlay" @click="menuClick">
            <a-menu-item key="profile">
                <a-icon type="user"/>
                个人中心
            </a-menu-item>
            <a-menu-item key="1">
                <a-icon type="setting"/>
                设置
            </a-menu-item>
            <a-menu-divider/>
            <a-menu-item key="logout">
                <a-icon type="poweroff"/>
                退出
            </a-menu-item>
        </a-menu>
    </a-dropdown>
</template>

<script>
    import {Avatar, Dropdown, Menu} from 'ant-design-vue'
    import {mapGetters} from "vuex";
    import IMenu from '../../../class/Menu'

    export default {
        name: "TopUser",
        components: {
            AAvatar: Avatar,
            ADropdown: Dropdown,
            AMenu: Menu,
            AMenuItem: Menu.Item,
            AMenuDivider: Menu.Divider
        },
        computed: {
            ...mapGetters('user', {
                userInfo: 'userInfoGet'
            }),
            usernameShort() {
                if (this.userInfo) {
                    let name = this.userInfo.nickname || this.userInfo.loginName
                    return name.substr(0, 1).toUpperCase()
                } else {
                    return 'U'
                }
            }
        },
        methods: {
            menuClick({item, key, keyPath}) {
                switch (key) {
                    case 'profile': {
                        this.openTab(new IMenu('profile', '个人中心', '/profile', 'user'))
                        return;
                    }
                    case 'logout' : {
                        this.$Modal.confirm({
                            title: '确定要退出系统吗?',
                            content: '请确保您的所有工作已保存！',
                            okText: '马上退出',
                            cancelText: '再留一会',
                            onOk: () => {
                                this.$router.push('/logout')
                            },
                        })
                        return;
                    }
                }
            }
        }
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