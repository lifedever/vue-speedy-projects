<template>
    <DataContainer url="/api/holder/users" ref="containerRef">
        <div slot="headerRight">
            <Button type="primary"
                    icon="md-add"
                    @click="addUser">
                {{$t('addUser')}}
            </Button>
        </div>
        <ul-table-column title="用户名">
            <template slot-scope="scope">
                {{scope.row.nickname}}
            </template>
        </ul-table-column>
        <ul-table-column title="邮箱">
            <template slot-scope="scope">
                {{scope.row.loginName}}
            </template>
        </ul-table-column>
        <ul-table-column title="是否激活">
            <template slot-scope="scope">
                <Tag v-if="scope.row.active" color="green">已激活</Tag>
                <Tag v-else>未激活</Tag>
            </template>
        </ul-table-column>
        <ul-table-column title="操作">
            <template slot-scope="scope">
                <Button type="error" size="small">删除</Button>
                <Button type="primary"
                        v-if="!scope.row.active"
                        size="small"
                        :loading="scope.row.id === sending"
                        @click="sendActivationEmail(scope.row)">再次发送激活邮件
                </Button>
            </template>
        </ul-table-column>
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
            }
        }
    }
</script>

<style scoped>

</style>
