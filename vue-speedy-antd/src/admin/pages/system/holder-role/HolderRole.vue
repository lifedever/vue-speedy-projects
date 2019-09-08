<template>
    <table-container url="/api/holder/roles" ref="conRef">
        <template v-slot:headerRight>
            <a-button type="primary" icon="plus" @click="addRole">添加角色</a-button>
        </template>
        <s-table-column title="角色名称" prop="name"></s-table-column>
        <template v-slot:otherOperation="{record}">
            <a-button class="btn-success" size="small" @click="authorizeRole(record)">授权</a-button>
        </template>
    </table-container>
</template>

<script>
    export default {
        name: "HoleRole",
        methods: {
            addRole() {

            },
            authorizeRole(role) {
                this.$openModal({
                    modal: {
                        title: '功能菜单授权',
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