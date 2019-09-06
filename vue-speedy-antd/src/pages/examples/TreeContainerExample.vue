<template>
    <tree-container url="/api/cascadecontents/byparent"
                    :config="{}" @select="nodeSelect">
        <div v-for="node in selectedNodes">
            {{node.data.props.dataRef}}
        </div>
        <table-container url="/api/categories/1IcwnGBCkVPNAT2byiQ/places"
                         hide-header
                         pageable
                         :operation="false">
            <s-table-column title="名称" prop="name"></s-table-column>
        </table-container>
    </tree-container>
</template>

<script>
    import STableColumn from "../../components/partial/table/STableColumn";
    export default {
        name: "TreeContainerExample",
        components: {STableColumn},
        data() {
            return {
                selectedNodes: []
            }
        },
        computed: {

        },
        methods: {
            nodeSelect(selectKey, e) {
                this.selectedNodes = e.selectedNodes
            }
        }
    }
</script>

<style scoped>

</style>