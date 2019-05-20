<template>
    <tree-container @addRoot="addRootHandler" ref="containerRef" @loaded="setCurrent">
        <div slot="header">ddd</div>
        <div slot="headerRight">33333</div>
        <div slot="content">
            <Button @click="setCurrent">设置当前选中节点</Button>

            <ul-upload multiple v-model="files"></ul-upload>

            <Button @click="fileUpload">文件上传</Button>
        </div>
    </tree-container>
</template>

<script>
    export default {
        name: "TreeDataContainer",
        mounted(){
            this.loadNodes()
        },
        data(){
            return {
                files: null
            }
        },
        methods: {
            loadNodes(){
                this.$http.get(`/api/categories/json`).then(res => {
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
            },
            setCurrent(){
                this.$refs['containerRef'].setNodeSelect("701d98f645c411e9927800163e06c3fc")
            },
            fileUpload(){
                console.log(this.files)
            }
        }
    }
</script>

<style scoped>

</style>
