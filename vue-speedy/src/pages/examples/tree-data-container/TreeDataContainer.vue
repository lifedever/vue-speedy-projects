<template>
    <tree-container @addRoot="addRootHandler">
        <div slot="header">ddd</div>
        <div slot="headerRight">33333</div>
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
