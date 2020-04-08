<template>
    <div ref="editor" class="s-editor"><p v-html="defaultValue"></p></div>
</template>

<script>
    import E from 'wangeditor'
    import {oneOf} from "../../../utils/common";

    export default {
        name: "SEditor",
        mounted() {
            this.init()
        },
        data() {
            return {
                editor: null,
                defaultValue: ''
            }
        },
        props: {
            value: {
                type: String,
                default: ''
            },
            /**
             * 绑定的值的类型, enum: ['html', 'text']
             */
            valueType: {
                type: String,
                default: 'html',
                validator: (val) => {
                    return oneOf(val, ['html', 'text'])
                }
            },
            /**
             * @description 设置change事件触发时间间隔
             */
            changeInterval: {
                type: Number,
                default: 200
            },
            /**
             * @description 是否开启本地存储
             */
            cache: {
                type: Boolean,
                default: false
            },
            menus: {
                type: Array,
                default() {
                    return [
                        'head',  // 标题
                        'bold',  // 粗体
                        'fontSize',  // 字号
                        'fontName',  // 字体
                        'italic',  // 斜体
                        'underline',  // 下划线
                        'strikeThrough',  // 删除线
                        'foreColor',  // 文字颜色
                        'backColor',  // 背景颜色
                        'link',  // 插入链接
                        'list',  // 列表
                        'justify',  // 对齐方式
                        'quote',  // 引用
                        //'emoticon',  // 表情
                        'image',  // 插入图片
                        //'table',  // 表格
                        // 'video',  // 插入视频
                        // 'code',  // 插入代码
                        // 'undo',  // 撤销
                        // 'redo'  // 重复
                    ]
                }
            },
            /**
             * 额外的菜单项
             */
            extraMenus: {
                type: Array,
                default() {
                    return []
                }
            },
            uploadImgServer: String,     // 上传图片的服务地址，与base64不能并存,
            uploadImgTimeout: {
                type: Number,
                default: 60000
            }
        },
        watch: {
            value(value) {
                // this.defaultValue = value
            }
        },
        methods: {
            setContent(val) {
                this.defaultValue = val
            },
            init() {
                if (this.value){
                    this.defaultValue = this.value
                }
                this.editor = new E(this.$refs.editor)

                this.editor.customConfig.onchange = (html) => {
                    let text = this.editor.txt.text()
                    this.$emit('input', this.valueType === 'html' ? html : text)
                    this.$emit('on-change', html, text)
                }
                this.editor.customConfig.zIndex = 1
                this.editor.customConfig.menus = this.menus.concat(this.extraMenus)
                if (this.uploadImgServer) {
                    this.editor.customConfig.uploadFileName = 'file'
                    this.editor.customConfig.uploadImgServer = this.uploadImgServer
                    this.editor.customConfig.uploadImgTimeout = this.uploadImgTimeout
                } else {
                    this.editor.customConfig.uploadImgShowBase64 = true
                }

                // create这个方法一定要在所有配置项之后调用
                this.editor.create();

            }
        }
    }
</script>

<style lang="less">
    .s-editor {
        height: 100%;
        display: flex;
        flex-direction: column;

        .w-e-text-container {
            flex: 1;
        }
    }
</style>