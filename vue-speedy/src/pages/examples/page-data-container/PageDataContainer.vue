<template>
    <DataContainer url="/api/vmall/orders">
        <ul-table-column prop="orderNumber" title="订单编号"></ul-table-column>
        <ul-table-column prop="orderDate" title="下单日期"></ul-table-column>
    </DataContainer>
</template>

<script>
    export default {
        name: "PageDataContainer"
    }
</script>

<style scoped>

</style>
