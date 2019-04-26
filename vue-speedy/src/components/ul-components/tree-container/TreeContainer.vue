<template>
    <split-container class="tree-container">
        <div slot="header" v-if="$slots['header']">
            <slot name="header"></slot>
        </div>
        <div slot="headerRight" v-if="$slots['headerRight']">
            <slot name="headerRight"></slot>
        </div>
        <div slot="left">
            <div id="ksTree"></div>
        </div>
        <div slot="right">
            <slot name="content"></slot>
        </div>
    </split-container>
</template>

<script>
    import jstree from 'jstree'
    import ObjectID from 'bson-objectid';
    import '../../../assets/jstree/proton/style.less'

    export default {
        name: "TreeContainer",
        mounted() {
            this.bindTree(this.value)
        },
        data() {
            return {
                treeRef: null,
                currentNode: null
            }
        },
        props: ['value', 'url'],
        watch: {
            value() {
                if (this.value) {
                    this.bindTree(this.value)
                }
            }
        },
        methods: {
            initJsTree(nodes) {
                let options = {
                    core: {
                        'strings': {
                            'Loading ...': '数据加载中 ...'
                        },
                        multiple: false,
                        force_text: true,
                        themes: {
                            'name': 'proton',
                            'responsive': true
                        },
                        data: nodes || {url: this.url},
                        "check_callback": true
                    },
                    types: {
                        default: {
                            icon: false
                        }
                    },
                    plugins: ['contextmenu', 'dnd', 'types'],
                    dnd: {
                        is_draggable: false
                    },
                    contextmenu: {
                        items: {}
                    }
                }
                options.dnd.is_draggable = true
                this.treeRef = $('#ksTree').jstree(options);
                this.treeRef
                    .on('loaded.jstree', () => {	// 加载完
                        this.treeRef.jstree('open_all');
                        if (this.$route.params.storyId) {
                            this.$nextTick(() => {
                            })
                        }
                    })
                    .on('move_node.jstree', () => {	// 移动完
                        this.treeRef.jstree('open_all');
                    })
                    .on('destroy.jstree', () => {
                    });
                // drop end
                $(document).on('dnd_stop.vakata', () => {
                    this.treeRef.jstree('open_all');
                });

                // 重写键盘事件
                this.treeRef.on("keydown.tree", '.jstree-anchor', e => {
                    if (!this.currentNode || (e.target.tagName && e.target.tagName.toLowerCase() === "input")) {
                        return true;
                    }
                    switch (e.which) {
                        case 32: // space
                            this.setNodeEditable();
                            break;
                        case 13: // enter
                            let parent = this.getParent(this.currentNode.id);
                            let children = parent.children;
                            let index = children.indexOf(this.currentNode.id);
                            this.createNewNode(parent, index + 1);
                            break;
                        case 9:	// tab
                            e.preventDefault()
                            if (e.shiftKey) {
                                let parent = this.getParent(this.currentNode.id);
                                if (parent) {
                                    let pParent = this.getParent(parent.id);
                                    let pos;
                                    if (pParent && pParent.children) {
                                        pos = pParent.children.indexOf(parent.id)
                                    }
                                    this.moveNode(this.currentNode, this.getParent(parent.id), pos + 1);
                                }
                            } else {
                                let prev = this.getPrev(this.currentNode.id);
                                if (prev)
                                    this.moveNode(this.currentNode, prev);
                                this.getTreeRef().select_node(this.currentNode.id)
                            }
                            break;
                        case 37:
                            this.$nextTick(() => {
                                this.setNodeSelect(this.hoverNode.id);
                            });
                            break;
                        case 38:
                            this.$nextTick(() => {
                                this.setNodeSelect(this.hoverNode.id);
                            });
                            break;
                        case 39:
                            this.$nextTick(() => {
                                this.setNodeSelect(this.hoverNode.id);
                            });
                            break;
                        case 40:
                            this.$nextTick(() => {
                                this.setNodeSelect(this.hoverNode.id);
                            });
                            break;
                        default:
                            // do nothing, propagate to jstree internal events
                            return true;
                    }
                    e.stopImmediatePropagation();
                    return false;
                }).on('changed.jstree', (e, data) => {
                }).on("select_node.jstree", (e, data) => {
                    this.currentNode = data.node
                    this.emitChange({e, data})
                }).on("hover_node.jstree", (e, data) => {
                    this.hoverNode = data.node;
                    this.emitHover({e, data})
                }).on('set_text.jstree', (node, text) => {
                }).on('rename_node.jstree', (event, val) => {
                    let text = val.text;
                    this.currentNode.text = text;
                    this.currentNode.original.text = text;
                    this.emitRename({event, val})
                }).on('create_node.jstree', (node, text) => {
                    this.emitCreated({node, text})
                });
            },
            getTreeRef() {
                return this.treeRef.jstree(true);
            },
            // 绑定树
            bindTree(nodes) {
                if (this.treeRef && this.getTreeRef()) {
                    this.getTreeRef().destroy();
                }

                this.$nextTick(() => {
                    this.initJsTree(nodes)
                })
            },
            // 设置选中节点（单选）
            setNodeSelect(id) {
                this.getTreeRef().deselect_all();
                this.getTreeRef().select_node(id);
            },
            // 获取节点数据
            getNode(id) {
                if (id) {
                    return this.getTreeRef().get_node(id)
                } else {
                    return this.getSelectNodeOriginal();
                }
            },
            // 获取父节点
            getParent(id) {
                let node = this.getNode(id);
                if (node && node.parent)
                    return this.getNode(node.parent)
            },
            // 获取前兄弟节点
            getPrev(id) {
                let parent = this.getParent(id);
                if (parent && parent.children && parent.children.length > 0) {
                    let index = parent.children.indexOf(id || this.currentNode.id);
                    if (index > 0) {
                        return this.getNode(parent.children[index - 1]);
                    }
                }
            },
            // 移动节点
            moveNode(current, parent, defaultPos) {
                if (!parent)
                    return;
                let children = parent.children;
                let pos = defaultPos || (children && children.length > 0 ? children.length : 0);
                this.getTreeRef().move_node(current, parent, pos)
            },
            // 设置当前节点可选
            setNodeEditable() {
                let sel = this.getSelectedNode();
                if (sel)
                    this.getTreeRef().edit(sel);
            },
            // 获取选中的节点
            getSelectedNode() {
                let sel = this.getTreeRef().get_selected();
                if (!sel.length) {
                    return null;
                }
                return sel[0];
            },
            // 获取选中节点上的数据
            getSelectNodeOriginal() {
                let selected = this.getSelectedNode();
                if (selected)
                    return this.getTreeRef().get_node(selected)
            },
            createNewNode(parent, pos) {
                let newNode = {
                    id: ObjectID.generate(),
                    text: '新节点',
                    story: null
                };
                if (pos === undefined) {
                    pos = this.currentNode.children ? this.currentNode.length : 0;
                }
                parent = parent || this.currentNode;
                this.getTreeRef().create_node(parent, newNode, pos);
                this.setNodeSelect(newNode.id);
                this.setNodeEditable();
            },
            emitChange(evt) {
                let obj = {
                    current: this.currentNode,
                    json: this.getTreeRef().get_json(),
                    evt
                }
                console.log('change', obj)
                this.$emit('change', obj)
            },
            emitCreated(data) {
                console.log('createdNode', data)
                this.$emit('createdNode', data);
            },
            emitRename(data) {
                console.log('renamedNode', data)
                this.$emit('renamedNode', data);
            },
            emitHover(data) {
                console.log('hover', data)
                this.$emit('hover', data);
            },
            addRootHandler() {
                this.$emit('addRoot')
            }
        }
    }
</script>

<style lang="less">
    .tree-container {
        .split-item {
            padding: 5px 12px 12px 5px;
        }

        .split-item.split-item-right {
            padding: 10px 10px 10px 18px;
        }

        #ksTree {
        }
    }
</style>
