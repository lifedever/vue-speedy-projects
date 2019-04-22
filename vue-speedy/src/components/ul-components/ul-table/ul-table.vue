<template>
	<div>
		<Table :columns="columns"
			   ref="tableRef"
			   :data="data"
			   :stripe="stripe"
			   :border="border"
			   :show-header="showHeader"
			   :width="width"
			   :height="height"
			   :loading="loading"
               :disabled-hover="disabledHover"
			   :highlight-row="highlightRow"
			   :row-class-name="rowClassName"
			   :size="size" :no-data-text="noDataText"
			   :no-filtered-data-text="noFilteredDataText">
			<div slot="header" v-if="$slots['header']">
				<slot name="header"></slot>
			</div>
			<div slot="footer" v-if="$slots['footer']">
				<slot name="footer"></slot>
			</div>
			<div slot="loading" v-if="$slots['loading']">
				<slot name="loading"></slot>
			</div>
		</Table>
		<slot></slot>
	</div>
</template>

<script>
    import {oneOf} from "@/libs/tools";

    export default {
        name: "ul-table",
        data() {
            return {
                columns: [],
                data: []
            }
        },
        mounted() {
            this.data = this.value
            this.parseColumns();
        },
        watch: {
            value() {
                this.data = this.value
            }
        },
        methods: {
            parseColumns() {
                if(!this.$slots.default)
                    return false;
                this.$slots.default.forEach((o, index) => {
                    let column = o.componentInstance
                    let item = {
                        title: column.title,
                        key: column.prop,
                        type: column.type,
                        width: column.width,
                        minWidth: column.minWidth,
                        maxWidth: column.maxWidth,
                        align: column.align,
                        className: column.className,
                        fixed: column.fixed,
                        ellipsis: column.ellipsis,
                        tooltip: column.tooltip,
                        indexMethod: column.indexMethod,
                        sortable: column.sortable,
                        sortMethod: column.sortMethod,
                        sortType: column.sortType,
                        filters: column.filters,
                        filterMethod: column.filterMethod,
                        filterMultiple: column.filterMultiple,
                        filteredValue: column.filteredValue || [],
                        filterRemote: column.filterRemote
                    }
                    if (column.$scopedSlots.default) {
                        item.render = (h, params) => {
                            return column.$scopedSlots.default(params)
                        }
                    }
                    this.columns.push(item);
                })
            }
        },
        /*
		 * data	显示的结构化数据，其中，字段 cellClassName 用于设置任意单元格的样式名称，因此数据不能使用该字段，详见示例特定样式。	Array	[]
         * columns	表格列的配置描述，具体项见后文	Array	[]
         * stripe	是否显示间隔斑马纹	Boolean	false
         * border	是否显示纵向边框	Boolean	false
         * show-header	是否显示表头	Boolean	true
         * width	表格宽度，单位 px	Number | String	自动
         * height	表格高度，单位 px，设置后，如果表格内容大于此值，会固定表头	Number | String	-
         * loading	表格是否加载中	Boolean	false
         * disabled-hover	禁用鼠标悬停时的高亮	Boolean	false
         * highlight-row	是否支持高亮选中的行，即单选	Boolean	false
         * row-class-name	行的 className 的回调方法，传入参数： row：当前行数据 index：当前行的索引
         * size	表格尺寸，可选值为 large、small、default 或者不填	String	-
         * no-data-text	数据为空时显示的提示内容	String	暂无数据
         * no-filtered-data-text	筛选数据为空时显示的提示内容	String	暂无筛选结果
         */
        props: {
            value: {
                type: Array,
                default() {
                    return [];
                }
            },
            size: {
                validator(value) {
                    return oneOf(value, ['small', 'large', 'default']);
                },
                default() {
                    return 'default'
                }
            },
            width: {
                type: [Number, String]
            },
            height: {
                type: [Number, String]
            },
            stripe: {
                type: Boolean,
                default: false
            },
            border: {
                type: Boolean,
                default: false
            },
            showHeader: {
                type: Boolean,
                default: true
            },
            highlightRow: {
                type: Boolean,
                default: false
            },
            rowClassName: {
                type: Function,
                default() {
                    return '';
                }
            },
            noDataText: {
                type: String
            },
            noFilteredDataText: {
                type: String
            },
            disabledHover: {
                type: Boolean
            },
            loading: {
                type: Boolean,
                default: false
            }
        }
    }
</script>

<style scoped>

</style>
