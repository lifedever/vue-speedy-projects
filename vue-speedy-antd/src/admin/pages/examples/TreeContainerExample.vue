<template>
    <tree-container
        :data="data"
        @load="handleLoad"
        splitWidth="250px"
        :expandedKeys="expandedKeys"
        :config="{asyncLoad: false, draggable: true}" @drop="handleDrop">
        <a-button slot="headerRight" @click="handleAdd">添加</a-button>
        <table-container url="/api/holder/users" hide-header pageable :operation="false">
            <s-table-column title="名称" prop="name"></s-table-column>
        </table-container>
    </tree-container>
</template>

<script>
import STableColumn from "../../../components/partial/table/STableColumn";

export default {
    name: "TreeContainerExample",
    components: { STableColumn },
    data() {
        return {
            expandedKeys: ['节点1'],
            data: [
                {
                    key: '节点1',
                    title: '节点1',
                    children: [
                        {
                            key: '节点11',
                            title: '节点11'
                        }, {
                            key: '节点12',
                            title: '节点12'
                        }, {
                            key: '节点13',
                            title: '节点13'
                        },
                    ]
                },
                {
                    key: '节点2',
                    title: '节点2',
                    children: [
                        {
                            key: '节点21',
                            title: '节点21'
                        },{
                            key: '节点22',
                            title: '节点22'
                        },{
                            key: '节点23',
                            title: '节点23'
                        },
                    ]
                }
            ]
        }
    },
    computed: {},
    watch: {},
    methods: {
        handleLoad(data) {
            this.$nextTick(() => {
                this.expandedKeys = [data[0].key]
            })
        },
        handleAdd() {
            this.$openModal({
                modal: {
                    title: '测试标题',
                    footer: null
                },
                component: () => import('./FormExample')
            })
        },
        handleDrop(data) {
            console.log(data)
        }
    }
}
</script>

<style scoped>
</style>