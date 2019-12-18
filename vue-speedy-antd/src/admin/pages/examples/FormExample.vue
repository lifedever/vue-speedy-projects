<template>
    <s-form>
        <s-form-item label="姓名">
            <a-input v-decorator="['name', {rules: [{required: true, message: '请输入姓名'}]}]" />
        </s-form-item>
    </s-form>
</template>

<script>
    export default {
        name: "FormExample"
    }
</script>

<style scoped>

</style>