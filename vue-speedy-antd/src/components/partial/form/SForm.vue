<template>
    <a-form :form="form"
            layout="horizontal"
            @submit.prevent="handleSubmit">
        <slot></slot>
        <a-form-item
                :wrapper-col="{ span: 16, offset: 8 }">
            <a-button
                    type="primary"
                    :loading="loading"
                    html-type="submit"
            >
                {{okText}}
            </a-button>
            <!--第二个按钮-->
            <slot name="otherBtn"></slot>
        </a-form-item>
    </a-form>
</template>

<script>
    export default {
        name: "SForm",
        data() {
            return {
                form: this.$form.createForm(this),
            }
        },
        mounted() {
        },
        props: {
            layout: {
                type: String,
                default: 'horizontal'
            },
            okText: {
                type: String,
                default: '提交'
            },
            loading: Boolean
        },
        methods: {
            getFieldValue(field){
                return this.form.getFieldValue(field)
            },
            handleSubmit() {
                this.form.validateFields((err, values) => {
                    if (!err) {
                        console.log('form data', values)
                        this.$emit('submit', values)
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>