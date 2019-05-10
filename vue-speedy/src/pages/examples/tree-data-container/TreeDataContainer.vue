<template>
    <tree-container @addRoot="addRootHandler"
                    url="/api/navigators/24cc038445ad11e9927800163e06c3fc">
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
