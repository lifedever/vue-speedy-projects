<template>
    <split-container>
        <div slot="left">
            <a-spin v-if="loading"/>
            <a-tree v-else
                    :treeData="gData"
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
        </div>
    </split-container>
</template>

<script>
    import {Tree} from 'ant-design-vue'
    import _merge from 'lodash/merge'

    export default {
        name: "TreeContainer",
        components: {ATree: Tree},
        props: {
            url: String,
            config: {
                type: Object,
                default: {}
            }
        },
        data() {
            return {
                loading: false,
                gData: [],
                defaultConfig: {}
            }
        },
        computed: {
            showIcon() {
                return !!this.$scopedSlots.icon
            },
            defaultConfig2() {
                return {
                    showLine: false,
                    showIcon: this.showIcon,
                    draggable: false
                }
            }
        },
        mounted() {
            this.defaultConfig = _merge({}, this.defaultConfig, this.defaultConfig2, this.config)
            this.loadData()
        },
        methods: {
            handleCheck(checkedKeys, e) {
                this.$emit('check', checkedKeys, e)
            },
            handleLoad(loadedKeys, e) {
                this.$emit('load', loadedKeys, e)
            },
            handleSelect(selectedKeys, e) {
                this.$emit('select', selectedKeys, e)
            },
            /**
             * 处理树节点
             * @param items
             */
            decorationTreeNode(items) {
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
                this.loading = true
                this.$http.get(this.url).then(res => {
                    this.gData = res.data
                    this.decorationTreeNode(this.gData)
                    this.loading = false
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