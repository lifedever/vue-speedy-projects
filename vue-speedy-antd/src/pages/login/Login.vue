<template>
    <div class="login">
        <div>
            <h1 class="text-center margin-bottom-lgg"> {{config.title}}</h1>
            <a-card title="账号登录" class="login-card"
                    :bordered="false">
                <a-form :form="form"
                        layout="horizontal"
                        @submit.prevent="handleSubmit">
                    <a-form-item label="请输入登录名"
                                 :label-col="{ span: 8 }"
                                 :wrapper-col="{ span: 16 }">
                        <a-input
                                v-decorator="[
                              'username',
                              { rules: [{ required: true, message: '请输入用户名!' }] }
                            ]"
                                placeholder="登录名"
                        >
                        </a-input>
                    </a-form-item>
                    <a-form-item label="请输入密码"
                                 :label-col="{ span: 8 }"
                                 :wrapper-col="{ span: 16 }">
                        <a-input
                                v-decorator="[
                                      'password',
                                      { rules: [{ required: true, message: '请输入密码!' }] }
                                    ]"
                                placeholder="登录密码"
                        >
                        </a-input>
                    </a-form-item>
                    <a-form-item
                            :wrapper-col="{ span: 16, offset: 8 }">
                        <a-button
                                type="primary"
                                :loading="loading"
                                html-type="submit"
                        >
                            登录
                        </a-button>
                        <a-button type="link" class="margin-left" @click="() => {$message.info('请联系系统管理员！');}">注册
                        </a-button>
                    </a-form-item>
                </a-form>
            </a-card>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from "vuex";

    export default {
        name: "Login",
        data() {
            return {
                form: this.$form.createForm(this),
                loading: false
            }
        },
        mounted() {
        },
        computed: {
            ...mapGetters('app', {
                config: 'configGet'
            })
        },
        methods: {
            ...mapActions('app', {
                storeToken: 'storeTokenAction'
            }),
            handleSubmit() {
                this.form.validateFields((err, values) => {
                    if (!err) {
                        this.loading = true
                        this.$http.post('/api/login', values).then(res => {
                            this.storeToken(res.data.token).then(_ => {
                                this.$message.success('登录成功，欢迎回来！')
                                this.$router.push('/')
                            })
                        }).catch(err => {
                            this.loading = false
                            this.$message.warning('用户名或密码错误，登录失败！')
                        })
                    }
                });
            }
        }
    }
</script>

<style scoped lang="less">
    .login {
        height: 100%;
        background: #f0f2f5 url("../../assets/imgs/bg.svg") no-repeat center 100px;
        background-size: 100% 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .login-card {
            width: 430px;
        }
    }
</style>