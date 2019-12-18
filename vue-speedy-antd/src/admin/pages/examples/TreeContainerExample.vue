<template>
    <tree-container :data="data"
                    @load="handleLoad"
                    :expandedKeys="expandedKeys"
                    :config="{asyncLoad: false}">
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
                expandedKeys: [],
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

        },
        methods: {
            handleLoad(data){
                this.$nextTick(() => {
                    this.expandedKeys = [data[0].key]
                })
            }
        }
    }
</script>

<style scoped>

</style>