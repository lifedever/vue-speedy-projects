<template>
    <div>
        <s-table :config="{dataSource: data, loading: loading}">
            <s-table-column title="#">
                <template slot-scope="{index}">
                    {{index + 1}}
                </template>
            </s-table-column>
            <s-table-column title="账号">
                <template slot-scope="{record}">
                    <a-tag color="green" v-for="c in record.userCertificates">
                        {{c.loginName}}
                    </a-tag>
                </template>
            </s-table-column>
            <s-table-column title="创建日期" prop="createdDate"></s-table-column>
            <s-table-column title="操作" width="60px">
                <template slot-scope="{record}">
                    <a-button size="small" :loading="record.id === btnLoading" type="primary" @click="addPlatformUser(record)">添加</a-button>
                </template>
            </s-table-column>
        </s-table>
    </div>
</template>

<script>
    import STable from "../../../../components/partial/table/STable";

    export default {
        name: "PlatformUsers",
        components: {STable},
        mounted() {
            this.loadOtherPlatformUsers()
        },
        data() {
            return {
                data: [],
                loading: true,
                btnLoading: null
            }
        },
        props: {
            callback: Function
        },
        methods: {
            loadOtherPlatformUsers() {
                this.$http.get(`/api/pt/otherplatform/users`).then(res => {
                    this.data = res.data
                    this.loading = false
                })
            },
            addPlatformUser(record) {
                this.btnLoading= record.id
                this.$http.post(`/api/holder/users/plaformusers/${record.id}`).then(res => {
                    this.btnLoading = null
                    this.callback(res.data)
                    this.$closeModal()
                })
            }
        }
    }
</script>

<style scoped>

</style>