<template>
    <base-container>
        <div class="profile">
            <s-form @submit="modifyPass" ref="form">
                <template v-slot:default>
                    <s-form-item label="输入原密码">
                        <a-input v-decorator="[
                                      'oldPassword',
                                      { rules: [{ required: true, message: '请输入原密码!' }] }
                                    ]"
                                 type="password"
                        >
                        </a-input>
                    </s-form-item>
                    <s-form-item label="输入新密码">
                        <a-input v-decorator="[
                                      'password',
                                      { rules: [{ required: true, message: '请输入新密码!', min: 5, message: '密码不能小于5位' }] }
                                    ]"
                                 type="password"
                        >
                        </a-input>
                    </s-form-item>
                    <s-form-item label="确认新密码">
                        <a-input v-decorator="[
                                      'confirmPassword',
                                      { rules: [{validator: handleConfirmPassword }] }
                                    ]"
                                 type="password"
                        >
                        </a-input>
                    </s-form-item>
                </template>
            </s-form>
        </div>
    </base-container>
</template>

<script>
    import SForm from "../../components/partial/form/SForm";
    import SFormItem from "../../components/partial/form/SFormItem";
    import {toFormData} from "../../utils/common";

    export default {
        name: "Profile",
        components: {SFormItem, SForm},
        methods: {
            modifyPass(values) {
                this.$http.post(`/api/pt/password`, toFormData(values)).then(res => {
                    this.$message.success('密码修改成功，请重新登录')
                    this.$router.push('/logout')
                }).catch(error => {
                    this.$message.error('密码修改失败')
                })
            },
            handleConfirmPassword(rule, value, callback) {
                let password = this.$refs['form'].getFieldValue('password')
                if (value === password) {
                    callback()
                } else {
                    callback('两次输入不一致！');
                }
            }
        }
    }
</script>

<style scoped>
    .profile {
        width: 500px;
    }
</style>