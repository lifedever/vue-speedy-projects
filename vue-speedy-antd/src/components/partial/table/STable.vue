<template>
    <div class="s-table" ref="tableRef">
        <a-table v-bind="config" :scroll="{ x: scrollX, y: scrollY }" :columns="columns" @change="handleChange">
        </a-table>
        <slot></slot>
    </div>
</template>

<script>
    import {Table} from 'ant-design-vue'
    import {clearObj} from "../../../utils/common";

    export default {
        name: "STable",
        components: {ATable: Table},
        props: {
            config: Object
        },
        data() {
            return {
                columns: [],
                scrollY: 0,
                defaultConfig: {
                    rowKey: 'id'
                }
            }
        },
        mounted() {
            if (!this.config.rowKey) {
                this.config.rowKey = 'id'
            }
            this.parseColumns();
            this.getScrollY()
        },
        computed: {
            scrollX(){
                let width = 0
                this.columns.forEach(c => {
                    width += (c.width || 100)
                })
                return width;
            }
        },
        methods: {
            getScrollY() {
                setTimeout(() => {
                    this.scrollY = this.$el.clientHeight - 50
                    console.log(this.scrollY)
                }, 100)
            },
            handleChange(pagination, filters, sorter) {
                this.$emit('change', pagination, filters, sorter)
            },
            parseColumns() {
                if (!this.$slots.default)
                    return false;
                this.$slots.default.forEach((o, index) => {
                    let column = o.componentInstance
                    if (column) {
                        let item = {
                            align: column.align || 'left',
                            colSpan: column.colSpan,
                            dataIndex: column.prop,
                            title: column.title,
                            filterDropdown: column.filterDropdown,
                            filterDropdownVisible: column.filterDropdownVisible,
                            filtered: column.filtered || false,
                            filteredValue: column.filteredValue,
                            filterIcon: column.filterIcon || false,
                            filterMultiple: column.filterMultiple || true,
                            filters: column.filters,
                            fixed: column.fixed || false,
                            key: column.dataIndex || column.id || column.title,
                            sorter: column.sorter,
                            sortOrder: column.sortOrder,
                            width: column.width,
                            customCell: column.customCell,
                            customHeaderCell: column.customHeaderCell,
                            onFilter: column.onFilter,
                            onFilterDropdownVisibleChange: column.onFilterDropdownVisibleChange,
                        };
                        if (column.$scopedSlots.default) {
                            item.customRender = (text, record, index) => {
                                return column.$scopedSlots.default({text, record, index})
                            }
                        }
                        this.columns.push(clearObj(item));
                    }
                })
            }
        }
    }
</script>

<style lang="less">
    .s-table {
        .ant-table-pagination.ant-pagination {
            margin: 8px 0;
        }
    }
</style>