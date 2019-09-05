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
            <s-table-column title="登录邮箱" prop="loginName"></s-table-column>
        </s-table>
        <!--<a-table :columns="defaultColumns"
                 size="middle"
                 :dataSource="data">
            <div slot="index" slot-scope="value, row, index">{{index + 1}}</div>
        </a-table>-->
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
            pageable: Boolean
        },
        data() {
            return {
                data: [],
                loading: false,
                tableHeight: null,
                pagination: false,
                defaultColumns: [
                    {
                        title: '#',
                        dataIndex: 'id',
                        scopedSlots: {customRender: 'index'},
                    }
                ]
            }
        },
        computed: {
            tableConfig() {
                return {
                    size: 'middle',
                    dataSource: this.data,
                    loading: this.loading,
                    rowKey: 'id',
                    scroll: {y: this.tableHeight},
                    pagination: this.pageable ? this.pagination : false
                }
            }
        },
        mounted() {
            this.defaultColumns = this.defaultColumns.concat(this.columns)
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
            }
        },
        beforeDestroy() {
            window.removeEventListener('resize', this.computedTableHeight)
        }
    }
</script>

<style scoped>

</style>