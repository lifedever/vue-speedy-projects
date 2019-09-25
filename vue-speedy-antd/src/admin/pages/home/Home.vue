<template>
    <base-container>
        哈哈， 这是首页
        <div style="width: 400px;">
            <a-input class="s-input-with-button-right">
                <a-button slot="addonAfter" type="primary">
                    获取验证码
                </a-button>
            </a-input>
        </div>
    </base-container>
</template>

<script>
export default {
    name: 'Home'
}
</script>

<style scoped></style>