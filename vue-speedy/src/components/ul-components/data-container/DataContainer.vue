<template>
    <Container ref="containerRef">
        <div slot="headerRight">
            <slot name="headerRight"></slot>
        </div>
        <template slot-scope="scope">
            <ul-table v-if="items" :height="scope.mainHeight" v-model="items" :loading="loading">
                <ul-table-column label="#" width="80" align="center">
                    <template slot-scope="scope">
                        {{scope.index + 1}}
                    </template>
                </ul-table-column>
                <slot></slot>
            </ul-table>
        </template>
        <div slot="footer" v-if="pageable">
            <Page :total="pageable.totalElements"
                  :page-size="pageable.size"
                  show-total
                  :current="pageable.number + 1"
                  @on-change="loadData"
                  show-elevator></Page>
        </div>
    </Container>
</template>

<script>
    export default {
        name: "DataContainer",
        props: {
            url: String
        },
        data() {
            return {
                loading: false,
                pageable: null,
                items: null,
                params: null
            }
        },
        mounted() {
            this.loadData()
        },
        methods: {
            load(params) {
                this.params = params
                this.loadData(1)
            },
            loadData(page) {
                this.loading = true
                let params = {}
                if (page !== undefined) {
                    params.page = page - 1
                }
                Object.assign(params, this.params)
                this.$http.get(this.url, {
                    params: params
                }).then(res => {
                    if (res.data.content) {     // 属于分页
                        this.items = res.data.content;
                        this.pageable = res.data
                    } else {
                        this.items = res.data;
                    }
                    this.loading = false
                });
            },
        }
    }
</script>

<style scoped>

</style>
