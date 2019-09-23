<template>
    <table-container url="/api/transactions"
                     ref="containerRef"
                     operation-width="240"
                     :pageable="true"
                     :operation="false">
        <s-table-column title="订单号" prop="transactionNumber" :width="220" fixed="left"></s-table-column>
        <s-table-column title="用户" prop="paymentAccount.user.loginName" :width="150"></s-table-column>
        <s-table-column title="创建日期" prop="createdDate" :width="200"></s-table-column>
        <s-table-column title="总报价" prop="quotedPrice" :width="80">
            <template slot-scope="{record}">
                {{record.quotedPrice}}元
            </template>
        </s-table-column>
        <s-table-column title="折扣价" prop="discount" :width="100">
            <template slot-scope="{record}">
                {{record.discount}}元
            </template>
        </s-table-column>
        <s-table-column title="成交价" prop="amount" :width="100">
            <template slot-scope="{record}">
                {{record.amount}}元
            </template>
        </s-table-column>
        <s-table-column title="支付状态" prop="paid" :width="100" align="center">
            <template slot-scope="{record}">
                <span v-if="record.paid">已支付</span>
                <span v-else>未支付</span>
            </template>
        </s-table-column>
        <s-table-column title="支付方式" prop="channel" :width="100">
            <template slot-scope="{record}">
                <!--<order-pay-channel :channel="record.channel"></order-pay-channel>-->
            </template>
        </s-table-column>
        <s-table-column title="操作" :width="250" fixed="right">
            <template slot-scope="{record}">

            </template>
        </s-table-column>
    </table-container>
</template>

<script>

    export default {
        name: "OrderConsume"
    }
</script>

<style scoped>

</style>