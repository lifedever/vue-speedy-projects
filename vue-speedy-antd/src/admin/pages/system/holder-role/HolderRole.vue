<template>
    <table-container url="/api/holder/roles" ref="conRef" @load="handleLoad" @editItem="editRole" operation-width="200px">
        <template v-slot:headerRight>
            <a-button type="primary" icon="plus" @click="addRole">添加角色</a-button>
        </template>
        <s-table-column title="角色名称"
                        width="150px"
                        prop="name" />
        <s-table-column title="系统默认"
                        width="100px">
            <template slot-scope="{record}">
                <a-tag color="green" v-if="record.administrator">是</a-tag>
                <a-tag color="red" v-else>否</a-tag>
            </template>
        </s-table-column>
        <s-table-column title="权限列表">
            <template slot-scope="{record}">
                <a-tag class="margin-bottom-sm" v-for="fun in record.functions">
                    {{fun.name}}: {{fun.id}}
                </a-tag>
            </template>
        </s-table-column>
        <template v-slot:otherOperation="{record}">
            <a-button class="btn-success" size="small" @click="authorizeRole(record)">授权</a-button>
        </template>
    </table-container>
</template>

<script>
    export default {
        name: "HoleRole",
        methods: {
            handleLoad(roles) {
                roles.forEach(u => {
                    this.$set(u, 'disableDelete', u.administrator)
                })
            },
            addRole() {
                this.$openFormModal({
                    modal: {
                        title: '添加角色',
                        width: 400,
                    },
                    props: {
                        callback: _ => {
                            this.$refs['conRef'].loadData()
                        }
                    },
                    component: () => import('./RoleForm')
                })
            },
            editRole(role) {
                this.$openFormModal({
                    modal: {
                        title: '添加角色',
                        width: 400,
                    },
                    props: {
                        role: role,
                        callback: _ => {
                            this.$refs['conRef'].loadData()
                        }
                    },
                    component: () => import('./RoleForm')
                })
            },
            authorizeRole(role) {
                this.$openModal({
                    modal: {
                        title: '功能菜单授权',
                        width: 380
                    },
                    props: {
                        role: role
                    },
                    component: () => import('./AuthorizeMenus'),
                    ok: (modal) => {
                        let checkedKeys = modal.$refs['treeRef'].checkedKeys
                        this.$okLoadingModal(true)
                        let form = new FormData()
                        form.append('functions', checkedKeys.join(','))
                        this.$http.post(`/api/holder/roles/${role.id}/authorize`, form).then(res => {
                            this.$closeModal()
                            this.$refs['conRef'].loadData()
                            this.$message.success('授权成功！')
                        })
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>