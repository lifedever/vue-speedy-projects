<template>
    <DataContainer url="/api/holder/users" ref="containerRef" :operation-width="200">
        <div slot="headerRight">
            <Button type="primary"
                    icon="md-add"
                    @click="addUser">
                {{$t('addUser')}}
            </Button>
        </div>
        <ul-table-column title="用户名">
            <template slot-scope="scope">
                {{scope.row.nickname || scope.row.loginName}}
            </template>
        </ul-table-column>
        <ul-table-column title="邮箱">
            <template slot-scope="scope">
                {{scope.row.loginName}}
            </template>
        </ul-table-column>
        <ul-table-column title="是否激活">
            <template slot-scope="scope">
                <i-switch :value="scope.row.active" class="ivu-switch-xlarge" size="large" @on-change="activeChange(scope.row)">
                    <span slot="open">已激活</span>
                    <span slot="close">未激活</span>
                </i-switch>
            </template>
        </ul-table-column>

        <template v-slot:itemOperation="{scope}">
            <Button type="success"
                    v-if="!scope.row.active"
                    size="small"
                    :loading="scope.row.id === sending"
                    @click="sendActivationEmail(scope.row)">重置密码
            </Button>
        </template>
    </DataContainer>
</template>

<script>
    import {getErrorCode} from "../../../libs/util";

    export default {
        name: "UserList",
        i18n: {
            messages: {
                'zh-CN': {
                    addUser: '添加新用户'
                },
                'en-US': {
                    addUser: 'Add User'
                },
            }
        },
        data() {
            return {
                sending: false
            }
        },
        methods: {
            sendActivationEmail(profile) {
                console.log(profile)
                this.sending = profile.id
                this.$http.get(`/api/holder/users/${profile.id}/activation/code`).then(res => {
                    this.sending = false
                    this.$Message.success('激活邮件发送成功！');
                })
            },
            addUser() {
                this.$mountModal({
                    component: () => import('./Edit'),
                    width: 300,
                    title: '添加用户',
                    ok: (formIns, error) => {
                        formIns.saveUser().then(res => {
                            this.$Message.success('保存成功！');
                            this.$unmountModal()
                            this.$refs['containerRef'].loadData()
                        }).catch(err => {
                            if (getErrorCode(err) === 'HOLDER_PROFILE_EXISTS') {
                                this.$Message.warning('邮箱已被占用')
                            }
                            error();
                        })
                    }
                })
            },
            activeChange(user) {
                this.$http.put(`/api/holder/users/${user.id}/active/${!user.active}`).then(res => {
                    this.$refs['containerRef'].loadData()
                })
            }
        }
    }
</script>

<style lang="less">
    .ivu-switch-xlarge.ivu-switch-large {
        width: 66px;

        &.ivu-switch-checked:after {
            left: 46px;
        }
    }
</style>
