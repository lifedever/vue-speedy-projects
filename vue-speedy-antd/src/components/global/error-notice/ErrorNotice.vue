<template>
    <div class="error-notice">
        <p>遇到了一个{{type === 'SERVER_ERROR'? '服务器': '未知'}}错误，您可以选择：</p>
        <ul>
            <li v-if="type !== 'SERVER_ERROR'"><a :class="view === 'resolve'? 'active': ''" href="#"
                                                  @click.prevent="showResolve">查看解决方法</a></li>
            <li><a :class="view === 'feedback'? 'active': ''" href="#" @click.prevent="feedback">反馈问题</a></li>
        </ul>

        <div v-if="view === 'resolve'" class="mar-top-sm">
            <ol v-if="view === 'resolve'">
                <li><code>Ctrl+Shift+F5</code> 强制刷新浏览器</li>
                <li>更换高版本的浏览器：<a href="https://www.baidu.com/s?wd=Google%20Chrome浏览器下载" target="_blank">Chrome</a> / <a
                        href="https://www.mozilla.org/zh-CN/firefox/new/" target="_blank">Firefox</a></li>
                <li>联系客服：<a href="mailto:feedback@manyibar.com">feedback@manyibar.com</a></li>
            </ol>
        </div>
        <div v-if="view === 'feedback'" class="mar-top-sm">
            <pre>{{content}}</pre>
            <div>
                <Button size="small" @click="send" type="primary" :loading="loading">发送反馈</Button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ErrorNotice",
        data() {
            return {
                view: null,
                loading: false
            }
        },
        props: {
            error: Error,
            type: String,
            name: String
        },
        mounted() {
            if (this.type === 'SERVER_ERROR') {
                this.view = 'feedback'
            } else {
                this.view = 'resolve'
            }
        },
        computed: {
            title() {
                if (this.type === 'SERVER_ERROR') {
                    return this.error.response ? this.error.response.data.message : ''
                } else {
                    this.error.message
                }
            },
            content() {
                if (this.type === 'SERVER_ERROR') {
                    return this.error.response ? this.error.response.data : ''
                } else {
                    return this.error.stack
                }
            }
        },
        methods: {
            showResolve() {
                if (this.view === 'resolve') {
                    this.view = null
                } else {
                    this.view = 'resolve'
                }
            },
            feedback() {
                if (this.view === 'feedback') {
                    this.view = null
                } else {
                    this.view = 'feedback'
                }
            },
            send() {
                this.loading = true
                this.$http.post(`/page/general/feedback`, {
                    title: this.title,
                    type: this.type,
                    link: location.href,
                    content: JSON.stringify(this.content)
                }).then(res => {
                    this.loading = false
                    this.$Message.success('已收到您的反馈，谢谢！')
                    console.log(this.name)
                    this.$Notice.close(this.name)
                })
            }
        }
    }
</script>

<style scoped lang="less">
    .error-notice {
        line-height: 24px;

        ul, ol {
            margin-left: 18px;
            margin-top: 3px;

            li {
                a {
                    font-weight: bold;
                    color: #313131;
                    text-decoration: underline;

                    &.active {
                        color: #0a65ff;
                    }
                }
            }
        }
    }
</style>