<template>
    <table-container :columns="columns"
                     url="/api/holder/users"
                     ref="containerRef"
                     operation-width="240px"
                     @editItem="editUser">
        <template v-slot:headerRight>
            <a-button type="primary" icon="user-add" @click="addUser">添加用户</a-button>
        </template>
        <s-table-column title="用户名" prop="nickname" width="250px"></s-table-column>
        <s-table-column title="登录邮箱" prop="loginName" width="250px"></s-table-column>
        <s-table-column title="是否激活" prop="id">
            <template slot-scope="{value, record, index}">
                <a-switch :defaultChecked="record.active"
                          checkedChildren="已激活"
                          unCheckedChildren="未激活"
                          @change="activeChange(record)"></a-switch>
            </template>
        </s-table-column>

        <template v-slot:otherOperation="{record}">
            <a-button class="btn-success" size="small">重置密码</a-button>
        </template>
    </table-container>
</template>

<script>
    import STableColumn from "../../../components/partial/table/STableColumn";

    const columns = [
        {
            title: '用户名',
            dataIndex: 'nickname',
        }, {
            title: '邮箱',
            dataIndex: 'loginName'
        }
    ];
    export default {
        name: "HolderUser",
        components: {STableColumn},
        data() {
            return {
                columns,
                data: []
            }
        },
        methods: {
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
                        callback: () => {
                            this.$refs['containerRef'].loadData()
                        }
                    },
                    component: () => import('./UserForm')
                })
            },
            editUser(user) {
                this.$message.warning('暂未实现')
                return false
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
            }
        }
    }
</script>

<style scoped>

</style>