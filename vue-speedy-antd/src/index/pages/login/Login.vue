<template>
    <div class="login">
        <div style="margin-top: -100px;">
            <h1 class="text-center margin-bottom-lgg"> {{config.title}}</h1>
            <a-card title="账号登录" class="login-card"
                    :bordered="false">
                <s-form @submit="handleSubmit" ok-text="登录" :loading="loading">
                    <template v-slot:default>
                        <s-form-item label="请输入登录名称"
                                     :label-span="8">
                            <a-input v-decorator="[
                                      'username',
                                      { rules: [{ required: true, message: '请输入用户名!' }] }
                                    ]"
                                     placeholder="登录名">
                            </a-input>
                        </s-form-item>
                        <s-form-item label="请输入登录密码"
                                     :label-span="8">
                            <a-input type="password"
                                     v-decorator="[
                                      'password',
                                      { rules: [{ required: true, message: '请输入密码!' }] }
                                    ]"
                                     placeholder="登录密码"
                            >
                            </a-input>
                        </s-form-item>
                    </template>
                    <template v-slot:otherBtn>
                        <a-button type="link"
                                  class="margin-left"
                                  @click="() => {$message.info('请联系系统管理员！');}">
                            注册
                        </a-button>
                    </template>
                </s-form>
            </a-card>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from "vuex";
    import SForm from "../../../components/partial/form/SForm";
    import SFormItem from "../../../components/partial/form/SFormItem";

    export default {
        name: "Login",
        components: {SFormItem, SForm},
        data() {
            return {
                form: this.$form.createForm(this),
                loading: false
            }
        },
        mounted() {
            this.logout()
        },
        computed: {
            ...mapGetters('app', {
                config: 'configGet'
            })
        },
        methods: {
            ...mapActions('app', {
                storeToken: 'storeTokenAction',
                logout: 'logoutAction'
            }),
            ...mapActions('user', {
                loadUserActiveHolders: 'loadUserActiveHoldersAction'
            }),
            ...mapActions('holder', {
                storeHolders: 'storeHoldersAction',
                setCurrentHolder: 'setCurrentHolderAction'
            }),
            setHolder(holder, expires) {
                this.storeHolders(this.holders)
                this.setCurrentHolder({holder, expires: 365}).then(() => {
                    this.$message.success('登录成功，欢迎回来！');
                    this.$router.push('/')
                })
            },
            handleSubmit(values) {
                this.loading = true
                this.$http.post('/api/login', values).then(loginRes => {
                    this.storeToken(loginRes.data).then(_ => {
                        this.loadUserActiveHolders().then(res => {
                            if (res.data.length === 0) {
                                this.$message.warning('无相关平台授权账号，请联系平台管理员！')
                                this.$router.push('/logout')
                                this.loading = false
                            } else if(res.data.length === 1){
                                this.setHolder(res.data[0], loginRes.data.expires)
                            } else {
                                this.$openModal({
                                    modal: {
                                        title: '请选择要访问的平台',
                                        okText: '确定',
                                        footer: null
                                    },
                                    props: {
                                        holders: res.data,
                                        selected: (holder) => {
                                            this.setHolder(holder, loginRes.data.expires)
                                        }
                                    },
                                    component: () => import('./HolderSelect'),
                                    ok: () => {
                                        this.loading = false
                                    },
                                    cancel: () => {
                                        this.loading = false
                                    }
                                })

                            }
                        })
                    })
                }).catch(err => {
                    this.loading = false
                    this.$message.warning('用户名或密码错误，登录失败！')
                })
            }
        }
    }
</script>

<style scoped lang="less">
    .login {
        height: 100%;
        background: #f0f2f5 url("../../../assets/imgs/bg.svg") no-repeat center 100px;
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