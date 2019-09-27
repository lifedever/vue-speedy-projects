<template>
    <div>
        <s-form @submit="handleSubmit"
                ok-text="保存"
                ref="form"
                :loading="loading">
            <template>
                <s-form-item label="配置名称" :horizontal="false">
                    <div class="padding-left text-bold">
                        {{config.configKeyTitle}}
                    </div>
                </s-form-item>
                <s-form-item label="配置内容" :horizontal="false">
                    <a-input v-decorator="['value', {rules: [{required: true, message: '请输入配置内容'}]}]"></a-input>
                </s-form-item>
            </template>
            <template v-slot:otherBtn>
                <a-button class="margin-left" @click="() => {$closeModal()}">取消</a-button>
            </template>
        </s-form>
    </div>
</template>

<script>
    import SFormItem from "../../../../components/partial/form/SFormItem";
    import SForm from "../../../../components/partial/form/SForm";
    import {toFormData} from "../../../../utils/common";
    export default {
        name: "ConfigurationForm",
        components: {SForm, SFormItem},
        data() {
            return {
                loading: false
            }
        },
        props: {
            config: Object,
            callback: Function
        },
        mounted() {
            this.$refs['form'].setFieldsValue({
                value: this.config.configValue,
            });
        },
        methods: {
            handleSubmit(values){
                this.loading = true
                this.$http.post(`/api/holder/configurations/${this.config.id}`, toFormData(values)).then(res => {
                    this.$message.success('保存成功！');
                    this.$closeModal()
                    this.callback(res.data)
                    this.loading = false
                })
            }
        }
    }
</script>

<style scoped>

</style>