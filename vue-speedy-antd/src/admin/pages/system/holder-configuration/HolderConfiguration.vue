<template>
    <base-container v-if="!status || status === 'NONE' || (status === 'INCOMPLETE' && configs.length === 0)">
        <div v-if="status === 'INCOMPLETE'" class="s-config-incomplete">
            <a-icon type="meh" class="text-primary" :style="{fontSize: '48px', marginBottom: '20px'}"/>
            <div class="s-config-incomplete-message">
                当前平台还未初始化相关配置项！
            </div>
            <div class="margin-top">
                <a-button type="primary" :loading="initing" @click="initConfigs">马上初始化</a-button>
            </div>
        </div>
        <div v-if="status === 'NONE'" class="s-config-incomplete">
            <a-icon type="meh" class="text-primary" :style="{fontSize: '48px', marginBottom: '20px'}"/>
            <div class="s-config-incomplete-message">
                当前平台暂不支持配置项管理！
            </div>

        </div>
        <a-spin class="mar-top-lg" v-if="!status"></a-spin>
    </base-container>
    <table-container v-else
                     :operation="false"
                     :dataLoading="dataLoading"
                     :tableData="configs" :fixedIndex="false" :fixedOperation="false">
        <template v-slot:headerRight
                  v-if="status === 'INCOMPLETE'">
            <a-button type="primary" :loading="initing" icon="database" @click="initConfigs">导入配置项</a-button>
        </template>
        <s-table-column title="主键" prop="configKey" :width="200"></s-table-column>
        <s-table-column title="配置名称" prop="configKeyTitle" :width="300"></s-table-column>
        <s-table-column title="配置内容" prop="configValue"></s-table-column>
        <s-table-column title="操作" :width="100" align="center">
            <template slot-scope="{record}">
                <a-button size="small" type="primary" @click="editConfig(record)">编辑</a-button>
            </template>
        </s-table-column>
    </table-container>
</template>

<script>
    export default {
        name: "HolderConfiguration",
        data() {
            return {
                status: null,
                configs: [],
                initing: false,
                dataLoading: false
            }
        },
        mounted() {
            this.checkIfInitd()
        },
        methods: {
            loadConfigs() {
                this.dataLoading = true
                this.$http.get(`/api/holder/configurations`).then(res => {
                    this.configs = res.data
                    this.dataLoading = false
                })
            },
            checkIfInitd() {
                this.$http.get(`/api/holder/configurations/status`).then(res => {
                    this.status = res.data
                    if (this.status !== 'NONE') {
                        this.loadConfigs()
                    }
                })
            },
            initConfigs() {
                this.initing = true
                this.$http.get(`/api/holder/configurations/init`).then(res => {
                    this.checkIfInitd()
                })
            },
            editConfig(config){
                this.$openModal({
                    modal: {
                        width: 400,
                        title: '编辑配置',
                        footer: null
                    },
                    props: {
                        config: config,
                        callback: () => {
                            this.loadConfigs()
                        }
                    },
                    component: () => import('./ConfigurationForm')
                })
            }
        }
    }
</script>

<style scoped lang="less">
    .s-config-incomplete {
        width: 400px;
        padding-top: 60px;
        margin: 0 auto;
        text-align: center;
        .s-config-incomplete-message {
            font-size: 18px;
        }
    }
</style>