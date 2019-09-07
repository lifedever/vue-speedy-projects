<template>
    <div class="padding-right-lg">
        <s-form @submit="handleSubmit"
                ok-text="保存"
                ref="form"
                :submit-btn-span="6"
                :loading="loading">
            <template>
                <s-form-item label="用户名" :label-span="6">
                    <a-input v-decorator="['nickname', {rules: [{required: true, message: '请输入用户名'}]}]"></a-input>
                </s-form-item>
                <s-form-item label="邮箱" :label-span="6">
                    <a-input v-decorator="['email', {rules: [{required: true, message: '请输入邮箱'}]}]"></a-input>
                </s-form-item>
            </template>
            <template v-slot:otherBtn>
                <a-button class="margin-left" @click="() => {$closeModal()}">取消</a-button>
            </template>
        </s-form>
    </div>
</template>

<script>
    import SForm from "../../../../components/partial/form/SForm";
    import SFormItem from "../../../../components/partial/form/SFormItem";
    import {getErrorCode, toFormData} from "../../../../utils/common";

    export default {
        name: "UserForm",
        components: {SFormItem, SForm},
        props: {
            callback: Function,
            user: Object
        },
        data() {
            return {
                loading: false
            }
        },
        mounted() {
            if (this.user) {
                this.$refs['form'].setFieldsValue({
                    nickname: this.user.nickname,
                    email: this.user.loginName
                });
            }
        },
        methods: {
            handleSubmit(values) {
                this.loading = true
                this.$http.post('/api/holder/users', toFormData(values)).then(res => {
                    this.$message.success('保存成功！');
                    this.$closeModal()
                    this.callback()
                    this.loading = false
                }).catch(err => {
                    this.loading = false
                    if (getErrorCode(err) === 'HOLDER_PROFILE_EXISTS') {
                        this.$message.warning('邮箱已被占用')
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>