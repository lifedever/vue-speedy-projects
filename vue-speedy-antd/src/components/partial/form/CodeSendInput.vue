<template>
    <a-input class="s-input-with-button-right">
        <a-button slot="addonAfter"
                  type="primary"
                  :loading="loading"
                  :disabled="!!time"
                  @click="send">
            <span v-if="time">{{time}} 秒后重试</span>
            <span v-else>{{btnText}}</span>
        </a-button>
    </a-input>
</template>

<script>
    import {localGet, localRemove, localSave} from "../../../utils/storage";

    export default {
        name: "CodeSendInput",
        props: {
            url: String,
            timeout: {
                type: Number,
                default: 60
            },
            btnText: {
                type: String,
                default: '获取验证码'
            },
            localKey: {
                type: String,
                default: 's-code-send-flag'
            }
        },
        data() {
            return {
                time: null,
                interval: null,
                loading: false,
                localKey: 's-code-send-flag'
            }
        },
        mounted() {
            let localTime = localGet(this.localKey)
            if (localTime) {
                let time = (new Date().getTime() - Number(localTime)) / 1000
                if (time < this.timeout) {
                    this.time = (this.timeout - time).toFixed(0)
                    this.beginInterval();
                }else{
                    localRemove(this.localKey)
                }
            }
        },
        methods: {
            send() {
                this.loading = true
                this.$http.get(this.url).then(res => {
                    this.$emit('send')
                    this.time = this.timeout
                    this.loading = false
                    localSave(this.localKey, new Date().getTime())
                    this.beginInterval()
                })
            },
            beginInterval() {
                this.interval = setInterval(() => {
                    this.time--
                    if (this.time === 0) {
                        this.timeoutFinish()
                    }
                }, 1000)
            },
            timeoutFinish() {
                this.$emit('finish')
                this.time = null
                window.clearInterval(this.interval)
                localRemove(this.localKey)
            }
        }
    }
</script>

<style scoped>

</style>