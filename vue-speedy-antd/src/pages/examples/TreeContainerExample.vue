<template>
    <tree-container url="/api/cascadecontents/byparent"
                    v-model="selectedNodes"
                    :config="{}">
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
                selectedNodes: [{
                    id: "Cd6ATXSIRfbi1cM8yWh"
                }]
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