<template>
    <tree-container @addRoot="addRootHandler"
                    url="/api/course/wares/5cbe77fe4cfc3d5db1ec8fec/sections">
        <div slot="header">ddd</div>
        <div slot="headerRight">33333</div>
        <div slot="content">
            ddd
        </div>
    </tree-container>
</template>

<script>
    export default {
        name: "TreeDataContainer",
        methods: {
            addRootHandler(){
                this.$router.push({
                    name: 'aaa',
                    params: {
                        tabTitle: '这是二级标题'
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>
