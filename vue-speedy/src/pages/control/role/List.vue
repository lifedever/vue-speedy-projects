<template>
    <DataContainer url="/api/holder/roles" ref="containerRef">
        <div slot="headerRight">
            <Button type="primary"
                    icon="md-add"
                    @click="addRole">
                添加新角色
            </Button>
        </div>
        <ul-table-column prop="name" title="名称">
            <template slot-scope="scope">
                {{scope.row.name}}
            </template>
        </ul-table-column>
        <ul-table-column width="150" title="操作" align="center">
            <template slot-scope="scope">
                <Button type="primary" size="small">编辑</Button>
                <Button type="error" size="small">删除</Button>
            </template>
        </ul-table-column>
    </DataContainer>
</template>

<script>
    export default {
        name: "Role",
        data() {
            return {
                roles: [
                ],
                loading: false
            }
        },
        created(){
        },
        methods: {
            addRole() {
                this.$mountModal({
                    component: () => import('./Edit'),
                    title: '添加角色',
                    width: 300,
                    ok: (formIns, error) => {
                        formIns.saveRole().then(res => {
                            this.$Message.success('保存成功！');
                            this.$unmountModal()
                            this.$refs['containerRef'].loadData()
                        }).catch(err => {
                            error()
                        })
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>
