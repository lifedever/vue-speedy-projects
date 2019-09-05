<template>
    <div>
        <a-table v-bind="config" :columns="columns">
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
                columns: []
            }
        },
        mounted() {
            this.parseColumns()
        },
        methods: {
            parseColumns() {
                if(!this.$slots.default)
                    return false;
                this.$slots.default.forEach((o, index) => {
                    let column = o.componentInstance
                    console.log('column', column)
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

<style scoped>

</style>