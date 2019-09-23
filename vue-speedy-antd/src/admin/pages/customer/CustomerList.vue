<template>
    <table-container url="/api/customers"
                     ref="containerRef"
                     operation-width="240px"
                     :pageable="true"
                     :operation="false">
        <s-table-column title="用户名" prop="loginName" width="200px"></s-table-column>
        <s-table-column title="创建日期" prop="createdDate" width="200px"></s-table-column>
    </table-container>
</template>

<script>
    export default {
        name: "CustomerList"
    }
</script>

<style scoped>

</style>