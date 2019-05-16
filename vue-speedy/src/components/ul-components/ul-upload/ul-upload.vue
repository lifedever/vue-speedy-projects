<template>
    <div>
        <Upload type="drag"
                :before-upload="handleUpload"
                :multiple="multiple"
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
        <div v-if="file" class="file-item">
            待上传文件: {{ file.name }}
        </div>
        <div v-for="f in files" class="file-item">
            待上传文件: {{ f.name }}

            <div class="file-item-remove" @click="remove(f.id)">
                <Icon type="md-close" size="16"/>
            </div>
        </div>
        <slot></slot>
    </div>
</template>

<script>
    import ObjectId from 'bson-objectid'

    export default {
        name: "ul-upload",
        data() {
            return {
                file: null,
                files: []
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
                    return ['jpg', 'jpeg', 'png', 'gif']
                }
            },
            multiple: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            handleUpload(file) {
                if (!this.multiple) {   // 单文件上传
                    this.file = file;
                    this.$emit('input', file)
                } else {    // 多文件上传
                    file.id = ObjectId.generate()
                    this.files.push(file)
                    this.$emit('input', this.files)
                }
                return false
            },
            remove(id) {
                this.files = this.files.filter(f => f.id !== id)
            }
        }
    }
</script>

<style scoped lang="less">
    .file-item {
        font-size: 12px;
        transition: all .3s ease-in-out;
        user-select: none;
        line-height: 16px;
        &:hover {
            background: rgba(15, 145, 233, 0.07);

            .file-item-remove {
                opacity: 1;
            }
        }

        .file-item-remove {
            transition: all .3s ease-in-out;
            opacity: 0;
            color: rgba(0, 0, 0, 0.58);
            height: 20px;
            line-height: 18px;
            width: 22px;
            cursor: pointer;
            float: right;
        }
    }
</style>
