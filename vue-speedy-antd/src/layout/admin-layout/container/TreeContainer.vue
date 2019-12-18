<template>
    <split-container v-model="split">
        <div slot="left">
            <a-spin v-if="loading"/>
            <template v-else>
                <a-input-search v-model="key" v-if="defaultConfig.searchable" class="margin-bottom-sm"
                                placeholder="关键词搜索" @change="onSearch"/>
                <a-tree :treeData="gData"
                        v-bind="defaultConfig"
                        @dragenter="onDragEnter"
                        @check="handleCheck"
                        @load="handleLoad"
                        @select="handleSelect"
                        @drop="onDrop">
                    <template slot="custom" slot-scope="data">
                        <slot name="icon" v-bind:data="data"></slot>
                    </template>
                </a-tree>
            </template>
        </div>
        <div slot="right" class="height100">
            <slot></slot>
        </div>
    </split-container>
</template>

<script>
    import {Tree} from 'ant-design-vue'
    import _merge from 'lodash/merge'
    import {clearObj} from "../../../utils/common";

    export default {
        name: "TreeContainer",
        components: {ATree: Tree},
        props: {
            url: String,
            data: Array,
            value: Array,
            config: {
                type: Object,
                default: {}
            },
            splitWidth: [Number, String]
        },
        data() {
            return {
                split: '250px',
                loading: false,
                parent: null,
                key: null,
                gData: [],
                defaultConfig: {
                    selectedKeys: []
                }
            }
        },
        computed: {
            showIcon() {
                return !!this.$scopedSlots.icon
            },
            defaultConfig2() {
                return {
                    autoExpandParent: true,
                    showLine: false,
                    showIcon: this.showIcon,
                    draggable: false,
                    asyncLoad: true,            // 异步树
                    // searchable: true
                }
            }
        },
        created() {
            this.defaultConfig = _merge({}, this.defaultConfig, this.defaultConfig2, this.config)
            // 判断是否异步
            if (this.defaultConfig.asyncLoad) {
                this.defaultConfig.loadData = this.onLoadData
            }
            console.log('defaultConfig', this.defaultConfig)

            if (this.data) {
                this.gData = this.data
                this.decorationTreeNode(this.data)
            } else {
                this.loadData().then(data => {
                    this.gData = data
                });
            }

            // 设置默认选中
            if (this.value) {
                this.value.forEach(o => {
                    this.defaultConfig.selectedKeys.push(o.id)
                })
            }
        },
        watch: {
            url() {
                this.loadData()
            }
        },
        methods: {
            initLoad() {
                this.parent = null
                this.key = null
            },
            onSearch() {
                this.loadData().then(data => {
                    this.gData = data
                })
            },
            handleCheck(checkedKeys, e) {
                this.$emit('check', checkedKeys, e)
            },
            handleLoad(loadedKeys, e) {
                this.$emit('load', loadedKeys, e)
            },
            handleSelect(selectedKeys, e) {
                this.$emit('select', selectedKeys, e)
                let nodes = []
                e.selectedNodes.forEach(o => {
                    nodes.push(o.data.props.dataRef)
                })
                this.$emit('input', nodes)
            },
            /**
             * 处理树节点
             * @param items
             */
            decorationTreeNode(items) {
                console.log(items)
                items.forEach(item => {
                    if (this.showIcon) {
                        this.$set(item, 'scopedSlots', {icon: 'custom'})
                    }
                    if (!item.key) {
                        this.$set(item, 'key', item.id)
                    }
                    if (item.children) {
                        this.decorationTreeNode(item.children);
                    }
                })
            },
            loadData() {
                return new Promise((resolve, reject) => {
                    this.$http.get(this.url, {
                        params: clearObj({
                            key: this.key,
                            parent: this.parent
                        })
                    }).then(res => {
                        let items = res.data
                        this.decorationTreeNode(items)
                        this.loading = false
                        this.initLoad()
                        this.handleLoad(res.data)
                        resolve(items)
                    }).catch(reject)
                })
            },
            // 异步加载
            onLoadData(treeNode) {
                this.parent = treeNode.dataRef.id
                return new Promise((resolve) => {
                    this.loadData().then(data => {
                        treeNode.dataRef.children = data
                        this.gData = [...this.gData]
                        resolve()
                    })
                })
            },
            onDragEnter(info) {
                this.$emit('drag-enter', info)
            },
            onDrop(info) {
                const dropKey = info.node.eventKey
                const dragKey = info.dragNode.eventKey
                const dropPos = info.node.pos.split('-')
                const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1])
                const loop = (data, key, callback) => {
                    data.forEach((item, index, arr) => {
                        if (item.key === key) {
                            return callback(item, index, arr)
                        }
                        if (item.children) {
                            return loop(item.children, key, callback)
                        }
                    })
                }
                const data = [...this.gData]

                // Find dragObject
                let dragObj
                loop(data, dragKey, (item, index, arr) => {
                    arr.splice(index, 1)
                    dragObj = item
                })
                if (!info.dropToGap) {
                    // Drop on the content
                    loop(data, dropKey, (item) => {
                        item.children = item.children || [];
                        // where to insert 示例添加到尾部，可以是随意位置
                        item.children.push(dragObj);
                    });
                } else if (
                    (info.node.children || []).length > 0 // Has children
                    && info.node.expanded // Is expanded
                    && dropPosition === 1 // On the bottom gap
                ) {
                    loop(data, dropKey, (item) => {
                        item.children = item.children || [];
                        // where to insert 示例添加到尾部，可以是随意位置
                        item.children.unshift(dragObj);
                    });
                } else {
                    let ar;
                    let i;
                    loop(data, dropKey, (item, index, arr) => {
                        ar = arr;
                        i = index;
                    });
                    if (dropPosition === -1) {
                        ar.splice(i, 0, dragObj);
                    } else {
                        ar.splice(i + 1, 0, dragObj);
                    }
                }
                this.gData = data
                this.$emit('drop', info)
            }
        }
    }
</script>

<style scoped>

</style>