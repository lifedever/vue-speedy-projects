<template>
    <base-container class="table-container" ref="baseRef">
        <template v-slot:headerRight>
            <slot name="headerRight"></slot>
        </template>
        <s-table :config="tableConfig">
            <s-table-column title="#" prop="nickname" width="60px" align="center">
                <template slot-scope="{text, record, index}">
                    <div>{{index + 1}}</div>
                </template>
            </s-table-column>
            <slot></slot>

            <s-table-column title="操作" :width="operationWidth" v-if="operation" align="center">
                <template slot-scope="{text, record, index}">
                    <a-button size="small" type="primary" @click="() => {$emit('editItem', record)}">编辑</a-button>
                    &nbsp;
                    <a-button size="small" type="danger" @click="removeItem(record)">删除</a-button>
                    &nbsp;
                    <slot name="otherOperation" v-bind:record="record"></slot>
                </template>
            </s-table-column>
        </s-table>
    </base-container>
</template>

<script>
    import {Table} from 'ant-design-vue'
    import STable from "../../../components/partial/table/STable";
    import STableColumn from "../../../components/partial/table/STableColumn";

    export default {
        name: "TableContainer",
        components: {STableColumn, STable, ATable: Table},
        props: {
            columns: Array,
            url: String,
            pageable: Boolean,
            operation: {
                type: Boolean,
                default: true
            },
            operationWidth: {
                type: String,
                default: '150px'
            },
            // 数据主键
            itemKey: {
                type: String,
                default: 'id'
            },
        },
        data() {
            return {
                data: [],
                loading: false,
                tableHeight: null,
                pagination: false
            }
        },
        computed: {
            tableConfig() {
                return {
                    size: 'middle',
                    dataSource: this.data,
                    loading: this.loading,
                    rowKey: 'id',
                    scroll: {x: true, y: this.tableHeight},
                    pagination: this.pageable ? this.pagination : false
                }
            }
        },
        mounted() {
            this.loadData()
            window.addEventListener('resize', this.computedTableHeight)
        },
        methods: {
            loadData() {
                this.loading = true
                this.$http.get(this.url).then(res => {
                    this.data = res.data
                    this.loading = false
                    this.computedTableHeight()
                })
            },
            computedTableHeight() {
                this.$nextTick(() => {
                    this.tableHeight = this.$refs['baseRef'].$refs['contentRef'].$el.clientHeight - 75
                    if (this.tableConfig.pagination) {
                        this.tableHeight = this.tableHeight - 32
                    }
                })
            },
            removeItem(item) {
                this.$Modal.confirm({
                    message: '确认',
                    content: '确认要删除当前记录吗？',
                    okText: '确定删除',
                    cancelText: '再想想？',
                    onOk: () => {
                        if (this.url) {
                            let url = this.url.split(/[?#]/)[0]
                            this.loading = true
                            this.$http.delete(`${url}/${item[this.itemKey]}`).then(res => {
                                this.$message.success('删除成功')
                                this.loadData()
                            }).catch(err => {
                                this.$emit('deleteFail', err)
                            })
                        } else {
                            this.$emit('deleteItem', item)
                        }
                    }
                })
            }
        },
        beforeDestroy() {
            window.removeEventListener('resize', this.computedTableHeight)
        }
    }
</script>

<style scoped>

</style>