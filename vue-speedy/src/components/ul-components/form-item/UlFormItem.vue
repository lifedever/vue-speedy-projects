<template>
    <div class="form-item">
        <div class="form-label">
            {{label}}
        </div>
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "UlFormItem",
        props: ['label']
    }
</script>

<style scoped>

</style>
