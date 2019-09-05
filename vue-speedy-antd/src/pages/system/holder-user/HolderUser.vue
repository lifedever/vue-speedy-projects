<template>
    <table-container :columns="columns" url="/api/holder/users">
        <template v-slot:headerRight>
            <a-button type="primary">添加用户</a-button>
        </template>
    </table-container>
</template>

<script>
    const columns = [
        {
            title: '用户名',
            dataIndex: 'nickname',
        }, {
            title: '邮箱',
            dataIndex: 'loginName'
        }
    ];
    export default {
        name: "HolderUser",
        data() {
            return {
                columns,
                data: []
            }
        }
    }
</script>

<style scoped>

</style>