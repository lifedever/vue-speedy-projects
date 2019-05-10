<template>
    <tree-container @addRoot="addRootHandler" ref="containerRef">
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
        mounted(){
            this.loadNodes()
        },
        methods: {
            loadNodes(){
                this.$http.get(`/api/navigators/24cc038445ad11e9927800163e06c3fc`).then(res => {
                    this.$refs['containerRef'].bindTree(res.data)
                })
            },
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
