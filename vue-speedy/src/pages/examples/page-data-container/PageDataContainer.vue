<template>
    <tree-container ref="treeContainerRef"
                    url="/api/categories/json"
                    @change="nodeChange"
                    @loaded="treeLoaded">
        <data-container slot="content"
                        v-if="current"
                        :url="`/api/categories/${current.id}/places`">
            <div slot="headerRight">
                ddddd
            </div>
            <ul-table-column prop="name" title="名称"></ul-table-column>
        </data-container>
    </tree-container>
</template>

<script>
    export default {
        name: "PageDataContainer",
        data() {
            return {
                current: null
            }
        },
        methods: {
            nodeChange(node) {
                if (node.current) {
                    this.current = node.current.original;
                } else {
                    this.current = null
                }
            },
            treeLoaded(node) {

            }
        }
    }
</script>

<style scoped>

</style>
