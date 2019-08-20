<template>
    <div class="activation">
        <Card>
            <h3 slot="title">账户激活</h3>
            <div>
                <div v-if="loading">
                    账户激活中......
                </div>
                <div v-else-if="profile">
                    <Alert type="success">
                        恭喜：您的账号已激活！请设置登录密码
                    </Alert>
                    <Divider></Divider>
                    <Form :rules="rules" :model="userForm" :label-width="80" ref="formRef">
                        <FormItem label="登录账号">
                            <Input v-model="profile.loginName" readonly/>
                        </FormItem>
                        <FormItem label="设置密码" prop="password">
                            <Input v-model="userForm.password" type="password"/>
                        </FormItem>
                        <FormItem label="确认密码" prop="confirmPassword">
                            <Input v-model="userForm.confirmPassword" type="password"/>
                        </FormItem>
                    </Form>
                    <div class="text-center">
                        <Button type="primary" @click="submit" :loading="btnLoading">确认激活信息</Button>
                    </div>
                </div>
                <div v-else-if="!profile">
                    <Alert type="error">
                        抱歉：您的账号激活失败，请联系管理员重新发送激活邮件
                    </Alert>
                </div>
            </div>
        </Card>
    </div>
</template>

<script>
    export default {
        name: "Activation",
        data() {
            const validConfirmPwd = (rule, value, callback) => {
                if (value !== this.userForm.password) {
                    callback(new Error('两次输入的密码不一致'));
                } else {
                    callback();
                }
            }
            return {
                loading: true,
                btnLoading: false,
                profile: null,
                userForm: {
                    password: null,
                    confirmPassword: null
                },
                rules: {
                    password: [
                        {
                            required: true,
                            message: '请输入密码'
                        },
                        {
                            type: 'string',
                            min: 6,
                            message: '最小长度6位'
                        }
                    ],
                    confirmPassword: [
                        {
                            required: true,
                            message: '请确认密码'
                        },
                        {
                            validator: validConfirmPwd, message: '两次输入的密码不一致', trigger: 'change'
                        }
                    ]
                }
            }
        },
        created() {
            this.check()
        },
        methods: {
            check() {
                this.$http.get(`/api/holder/users/activation/${this.$route.params.code}`).then(res => {
                    this.loading = false
                    this.profile = res.data
                })
            },
            submit() {
                this.$refs.formRef.validate(valid => {
                    if (valid) {
                        this.btnLoading = true
                        let formData = new FormData()
                        formData.append("email", this.profile.loginName)
                        formData.append("password", this.userForm.password)
                        this.$http.post(`/api/holder/users/activation`, formData).then(res => {
                            this.$Message.success('密码设置成功，请登录！')
                            this.$router.push('/login')
                        })
                    }
                })
            }
        }
    }
</script>

<style scoped lang="less">
    @import "../../assets/css/base";

    .activation {
        background: darken(@background-color-base, 10%);
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        .ivu-card {
            width: 380px;
        }

    }
</style>
