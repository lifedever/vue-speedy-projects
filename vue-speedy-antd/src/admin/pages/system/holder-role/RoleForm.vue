<template>
    <s-form @submit="handleSubmit"
            ok-text="保存"
            ref="form"
            :submit-btn-span="10"
            :loading="loading">
        <template>
            <s-form-item label="角色名称" :label-span="6" :horizontal="false">
                <a-input v-decorator="['name', {rules: [{required: true, message: '请输入角色名称'}]}]"></a-input>
            </s-form-item>
        </template>
    </s-form>
</template>

<script>
    import SForm from "../../../../components/partial/form/SForm";
    import SFormItem from "../../../../components/partial/form/SFormItem";

    export default {
        name: "RoleForm",
        components: {SFormItem, SForm},
        data() {
            return {
                loading: false,
            }
        },
        props: {
            role: Object,
            callback: Function
        },
        mounted() {
            if (this.role) {
                this.$refs['form'].setFieldsValue({
                    name: this.role.name,
                    autoAuthorized: this.role.autoAuthorized
                })
            }
        },
        methods: {
            handleSubmit(values) {
                this.loading = true
                if (this.role) {
                    values.id = this.role.id
                }
                this.$http.post('/api/holder/roles', values).then(res => {
                    this.$message.success('保存成功！');
                    this.$closeModal()
                    this.callback(res.data)
                    this.loading = false
                }).catch(err => {
                    this.loading = false
                });
            },
        }
    }
</script>

<style scoped>

</style>