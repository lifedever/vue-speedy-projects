<template>
    <div class="padding-right-lg">
        <s-form @submit="handleSubmit"
                ok-text="保存"
                ref="form"
                :submit-btn-span="6"
                :loading="loading">
            <template>
                <s-form-item label="用户名" :horizontal="false">
                    <a-input v-decorator="['nickname', {rules: [{required: true, message: '请输入用户名'}]}]"></a-input>
                </s-form-item>
                <s-form-item v-if="!user" label="登录账号" :horizontal="false">
                    <a-input v-decorator="['loginName', {rules: [{required: true, message: '请输入账号信息'}]}]"></a-input>
                </s-form-item>
                <s-form-item label="角色授权" :horizontal="false">
                    <a-spin v-if="roleLoading"></a-spin>
                    <a-checkbox-group
                            v-decorator="['roles', {initialValue: initialValue}]"
                            style="width: 100%;">
                        <a-row>
                            <a-col :span="8" v-for="role in roles">
                                <a-checkbox :value="role.id">
                                    {{role.name}}
                                </a-checkbox>
                            </a-col>
                        </a-row>
                    </a-checkbox-group>
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
    import {_map, getErrorCode, toFormData} from "../../../../utils/common";

    export default {
        name: "UserForm",
        components: {SFormItem, SForm},
        props: {
            callback: Function,
            user: Object
        },
        data() {
            return {
                loading: false,
                roleLoading: false,
                roles: [],
                initialValue: []
            }
        },
        mounted() {
            if (this.user) {
                this.$refs['form'].setFieldsValue({
                    nickname: this.user.nickname,
                    loginName: this.user.loginName
                });

                this.initialValue = _map(this.user.roles, 'id')
            }
            this.loadRoles()
        },
        methods: {
            loadRoles() {
                this.roleLoading = true
                this.$http.get(`/api/holder/roles`).then(res => {
                    this.roles = res.data
                    this.roleLoading = false
                })
            },
            handleSubmit(values) {
                this.loading = true
                this.$http.post(this.user? `/api/holder/users/${this.user.id}`: '/api/holder/users', toFormData(values)).then(res => {
                    this.$message.success('保存成功！');
                    this.$closeModal()
                    this.callback(res.data)
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