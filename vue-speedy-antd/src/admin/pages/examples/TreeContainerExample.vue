<template>
    <tree-container :data="data"
                    v-model="selectedNodes"
                    :config="{asyncLoad: false, autoExpandParent: true, defaultExpandAll: true}">
        <table-container url="/api/categories/1IcwnGBCkVPNAT2byiQ/places"
                         hide-header
                         pageable
                         :operation="false">
            <s-table-column title="名称" prop="name"></s-table-column>
        </table-container>
    </tree-container>
</template>

<script>
    import STableColumn from "../../../components/partial/table/STableColumn";
    export default {
        name: "TreeContainerExample",
        components: {STableColumn},
        data() {
            return {
                selectedNodes: [{
                    id: "Cd6ATXSIRfbi1cM8yWh"
                }],
                data: [
                    {
                        key: '节点1',
                        title: '节点1',
                        children: [
                            {
                                key: '节点11',
                                title: '节点11'
                            },{
                                key: '节点12',
                                title: '节点12'
                            },
                        ]
                    }
                ]
            }
        },
        computed: {

        },
        watch: {
            selectedNodes() {
                console.log(this.selectedNodes)
            }
        },
        methods: {

        }
    }
</script>

<style scoped>

</style>