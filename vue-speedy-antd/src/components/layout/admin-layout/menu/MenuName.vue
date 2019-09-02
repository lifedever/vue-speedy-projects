<template>
    <div>
        <a-icon v-if="menu.icon" :type="menu.icon"/>
        <span v-if="(menu.children && menu.children.length > 0) || menu.url">{{menu.name}}</span>
        <span v-else>请设置[menu.url]</span>
    </div>
</template>

<script>
    export default {
        name: "MenuName",
        props: ['menu']
    }
</script>

<style scoped>

</style>