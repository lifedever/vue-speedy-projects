<template>
    <Container ref="containerRef">
        <div slot="headerRight">
            <slot name="headerRight"></slot>
        </div>
        <template slot-scope="scope">
            <ul-table :height="scope.mainHeight" v-model="items" :loading="loading">
                <ul-table-column label="#" width="80" align="center">
                    <template slot-scope="scope">
                        {{scope.index + 1}}
                    </template>
                </ul-table-column>
                <slot></slot>
                <ul-table-column title="操作" v-if="!readonly" :width="operationWidth" align="center">
                    <template slot-scope="scope">
                        <Button type="primary" size="small" v-if="editable" @click="editItem(scope.row)">编辑</Button>
                        <slot name="itemOperation" v-bind:scope="scope"></slot>
                        <Button type="error" size="small" v-if="deletable" @click="deleteItem(scope.row)">删除</Button>
                    </template>
                </ul-table-column>
            </ul-table>
        </template>
        <div slot="footer" v-if="pageable">
            <Page :total="pageable.totalElements"
                  :page-size="pageable.size"
                  show-total
                  :current="pageable.number + 1"
                  @on-change="loadData"
                  show-elevator></Page>
        </div>
    </Container>
</template>

<script>
    export default {
        name: 'DataContainer',
        props: {
            // 数据列表地址
            url: {
                type: String,
                required: true
            },
            // 是否可编辑
            editable: {
                type: Boolean,
                default: true
            },
            // 是否可删除
            deletable: {
                type: Boolean,
                default: true
            },
            // 数据主键
            itemKey: {
                type: String,
                default: 'id'
            },
            // 是否显示操作列
            readonly: {
                type: Boolean,
                default: false
            },
            // 编辑行的modal定义
            editModal: {
                type: Object
            },
            // 操作列宽度，默认150
            operationWidth: {
                type: Number,
                default: 150
            }
        },
        data () {
            return {
                loading: false,
                pageable: null,
                items: [],
                params: null
            }
        },
        mounted () {
            this.loadData()
        },
        methods: {
            load (params) {
                this.params = params
                this.loadData(1)
            },
            loadData (page) {
                this.loading = true
                let params = {}
                if (page !== undefined) {
                    params.page = page - 1
                }
                Object.assign(params, this.params)
                this.$http.get(this.url, {
                    params: params
                }).then(res => {
                    if (res.data.content) {     // 属于分页
                        this.items = res.data.content
                        this.pageable = res.data
                    } else {
                        this.items = res.data
                    }
                    this.loading = false
                    this.$emit('loadSuccess', res.data)
                }).catch(error => {
                    this.loading = false
                    console.error(error)
                    this.$emit('loadError', error)
                })
            },
            checkEditModal () {
                return new Promise((resolve, reject) => {
                    if (!this.editModal) {
                        console.error('请设置 editModal 属性！')
                        reject()
                    } else {
                        resolve()
                    }
                })
            },
            addItem () {
                this.checkEditModal().then(_ => {
                    this.$mountModal({
                        component: this.editModal.component,
                        title: '添加' + (this.editModal.title || ''),
                        width: this.editModal.width || 500,
                        ok: (formIns, error) => {
                            formIns.save().then(res => {
                                this.$Message.success('保存成功！')
                                this.$unmountModal()
                                this.loadData()
                            }).catch(err => {
                                error()
                            })
                        }
                    })
                })
            },
            editItem (item) {
                this.checkEditModal().then( _ => {
                    this.$mountModal({
                        component: this.editModal.component,
                        title: '编辑' + (this.editModal.title || ''),
                        width: this.editModal.width || 450,
                        props: {
                            itemId: item.id
                        },
                        ok: (formIns, error) => {
                            formIns.save().then(res => {
                                this.$Message.success('保存成功！')
                                this.$unmountModal()
                                this.loadData()
                            }).catch(err => {
                                error()
                            })
                        }
                    })
                })
            },
            deleteItem (item) {
                this.$Modal.confirm({
                    title: '确认',
                    content: '确认要删除当前记录吗？',
                    onOk: () => {
                        this.$http.delete(`${this.url}/${item[this.itemKey]}`).then(res => {
                            this.$Message.success('删除成功')
                            this.loadData()
                        })
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>
