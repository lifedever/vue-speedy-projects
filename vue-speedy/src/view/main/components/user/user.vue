<template>
    <div class="user-avator-dropdown">
        <Dropdown @on-click="handleClick" trigger="click">
			<span class="username" v-if="userInfoGet">
				{{userInfoGet.realname || userInfoGet.username || userInfoGet.loginName}}
			</span>
            <Icon :size="18" type="md-arrow-dropdown"></Icon>
            <DropdownMenu slot="list">
                <DropdownItem name="profile">
                    <Icon type="md-person"/>
                    个人中心
                </DropdownItem>
                <DropdownItem name="logout">
                    <Icon type="md-log-out"/>
                    退出登录
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    </div>
</template>

<script>
    import './user.less'
    import {mapActions, mapGetters} from 'vuex'

    export default {
        name: 'User',
        props: {
            userAvator: {
                type: String,
                default: ''
            }
        },
        computed: {
            ...mapGetters([
                'tokenGet',
                'userInfoGet'
            ])
        },
        methods: {
            ...mapActions([
                'handleLogOut'
            ]),
            handleClick(name) {
                switch (name) {
                    case 'logout':
                        this.handleLogOut().then(() => {
                            this.$router.push({
                                name: 'login'
                            })
                        })
                        break
                    case 'profile':
                        this.$router.push('/profile')
                        break
                }
            }
        }
    }
</script>
