<template>
    <a-form-item v-if="horizontal"
                 :label="label"
                 :label-col="{ span: labelSpan }"
                 :wrapper-col="{ span: 24-labelSpan }">
        <slot></slot>
    </a-form-item>
    <a-form-item v-else
                 :label="label">
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
            },
            horizontal: {
                type: Boolean,
                default: true
            }
        }
    }
</script>

<style scoped>

</style>