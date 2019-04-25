<template>
    <div>
        <Upload type="drag"
                :before-upload="handleUpload"
                :accept="accept"
                :max-size="maxSize"
                :format="format"
                style="display: inline-block; width: 100%;"
                action="#">
            <div style="padding: 15px 0">
                <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                <p>点击或拖拽到此</p>
            </div>
        </Upload>
        <div v-if="file">待上传文件: {{ file.name }}</div>
    </div>
</template>

<script>
    export default {
        name: "ul-upload",
        data(){
            return {
                file: null
            }
        },
        props: {
            accept: {
                type: String,
                default: "image/jpeg,image/gif,image/png,image/jpg,image/bmp"
            },
            maxSize: {
                type: Number,
                default: 2048
            },
            format: {
                type: Array,
                default: () => {
                    return ['jpg','jpeg','png', 'gif']
                }
            }
        },
        methods: {
            handleUpload(file) {
                this.file = file
                this.$emit('input', file)
                return false
            },
        }
    }
</script>

<style scoped>

</style>
