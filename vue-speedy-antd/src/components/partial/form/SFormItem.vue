<template>
    <a-form-item :label="label"
                 :label-col="{ span: labelSpan }"
                 :wrapper-col="{ span: 24-labelSpan }">
        <slot></slot>
    </a-form-item>
</template>

<script>
    export default {
        name: "SFormItem",
        props: {
            label: String,
            labelSpan: {
                type: Number,
                default: 8
            }
        }
    }
</script>

<style scoped>

</style>