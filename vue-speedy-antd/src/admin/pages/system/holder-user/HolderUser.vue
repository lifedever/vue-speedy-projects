<template>
    <table-container url="/api/holder/users"
                     ref="containerRef"
                     operation-width="240px"
                     @load="handleLoad"
                     @editItem="editUser">
        <template v-slot:headerRight>
            <a-button type="primary" icon="user-add" @click="addUser">添加新用户</a-button>
            <a-button icon="user-add" class="btn-success margin-left" @click="addPlatformUsers">添加其他平台用户</a-button>
        </template>
        <s-table-column title="用户名" prop="nickname" width="250px"></s-table-column>
        <s-table-column title="登录账号" prop="loginName" width="350px">
            <template slot-scope="{record}">
                <a-tag color="green" v-for="u in record.platformUser.userCertificates">
                    {{u.loginName}}
                </a-tag>
            </template>
        </s-table-column>
        <s-table-column title="添加日期" prop="createdDate" width="200px"></s-table-column>
        <s-table-column title="是否激活" prop="id">
            <template slot-scope="{value, record, index}">
                <a-switch :defaultChecked="record.active"
                          :disabled="record.administrator"
                          checkedChildren="已激活"
                          unCheckedChildren="未激活"
                          @change="activeChange(record)"></a-switch>
            </template>
        </s-table-column>

        <template v-slot:otherOperation="{record}">
            <a-button class="btn-success" size="small" :disabled="record.administrator">重置密码</a-button>
        </template>
    </table-container>
</template>

<script>
    import STableColumn from "../../../../components/partial/table/STableColumn";

    export default {
        name: "HolderUser",
        components: {STableColumn},
        data() {
            return {
                data: []
            }
        },
        computed: {

        },
        methods: {
            handleLoad(users) {
                users.forEach(u => {
                    this.$set(u, 'disableDelete', u.administrator)
                })
            },
            activeChange(user) {
                this.$http.put(`/api/holder/users/${user.id}/active/${!user.active}`).then(res => {
                    this.$refs['containerRef'].loadData()
                })
            },
            addUser() {
                this.$openFormModal({
                    modal: {
                        title: '添加用户',
                        width: 400,
                    },
                    props: {
                        callback: password => {
                            console.log(password)
                            this.$refs['containerRef'].loadData()
                            if (password) {
                                this.$Modal.info({
                                    title: '用户创建成功！',
                                    content: '初始密码：' + password + '，请妥善保管！'
                                })
                            }
                        }
                    },
                    component: () => import('./UserForm')
                })
            },
            editUser(user) {
                this.$openModal({
                    modal: {
                        title: '编辑用户',
                        width: 400,
                        footer: null
                    },
                    props: {
                        user,
                        callback: () => {
                            this.$refs['containerRef'].loadData()
                        }
                    },
                    component: () => import('./UserForm')
                })
            },
            addPlatformUsers() {
                this.$openModal({
                    modal: {
                        width: 800,
                        title: '其他平台用户列表',
                        footer: null
                    },
                    props: {
                        callback: () => {
                            this.$refs['containerRef'].loadData()
                        }
                    },
                    component: () => import('./PlatformUsers')
                })
            }
        }
    }
</script>

<style scoped>

</style>