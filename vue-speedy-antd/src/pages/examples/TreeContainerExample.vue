<template>
    <tree-container url="/api/cascadecontents/byparent"
                    :config="{}" @select="nodeSelect">
        <div v-for="node in selectedNodes">
            {{node.data.props.dataRef}}
        </div>
    </tree-container>
</template>

<script>
    export default {
        name: "TreeContainerExample",
        data() {
            return {
                selectedNodes: []
            }
        },
        methods: {
            nodeSelect(selectKey, e) {
                this.selectedNodes = e.selectedNodes
            }
        }
    }
</script>

<style scoped>

</style>