<template>
    <div>
        <a-spin v-if="loading"></a-spin>
        <a-tree v-else checkable
                ref="treeRef"
                v-model="checkedKeys"
                :tree-data="functions"
                defaultExpandAll>
            <template slot="title" slot-scope="data">
                <a-icon :type="data.icon" v-if="data.icon"></a-icon>
                {{data.title}}
            </template>
        </a-tree>
    </div>
</template>

<script>
    import {Tree} from 'ant-design-vue'
    import PageLoading from "../../../../components/partial/other/PageLoading";

    export default {
        name: "AuthorizeMenus",
        components: {
            PageLoading,
            ATree: Tree
        },
        mounted() {
            this.loadAllMenus()
            this.checkedKeys = this.role.allPermissions || []
        },
        data() {
            return {
                functions: [],
                checkedKeys: [],
                loading: true,
            }
        },
        props: {
            role: Object
        },
        methods: {
            loadAllMenus() {
                this.$http.get(`/api/functions`).then(res => {
                    res.data.forEach(o => {
                        this.$set(o, 'scopedSlots', {title: 'title'})
                    })
                    this.functions = res.data
                    this.loading = false
                })
            },
        }
    }
</script>

<style scoped>

</style>