<template>
    <div id="app">
        <router-view/>
        <!--通用Modal-->
        <form-modal :visible.sync="visible"
                    :title="view? view.title: ''"
                    :loading="okLoading"
                    @close="handleClose"
                    :width="view? view.width: null"
                    :footer-hide="view? view.footerHide: false"
                    @ok="handleOk"
                    v-bind="view? view.props: null">
            <transition name="fade">
                <component ref="formRef" v-if="view && view.component" :is="view.component"
                           v-bind="view.props"></component>
            </transition>
        </form-modal>
    </div>
</template>

<script>
    import FormModal from "./components/ul-components/form-modal";

    export default {
        name: 'App',
        components: {FormModal},
        data() {
            return {
                view: null,
                visible: false,
                okLoading: false
            }
        },
        created() {
        },
        mounted() {

            /**
             * 弹出modal
             */
            this.$bus.$on('MODAL_OPEN', view => {
                console.log('call modal open ', view);
                this.visible = true
                this.view = view
            })
            /**
             * 关闭modal
             * val 为true表示点击确定后不关闭model
             */
            this.$bus.$on('MODAL_CLOSE', (val) => {
                console.log('call modal close ');
                if (val) {
                    this.okLoading = false;
                } else {
                    this.visible = false
                    this.initClose()
                }
            })
        },

        methods: {
            initClose() {
                this.view = null
                this.okLoading = false;
            },
            handleClose() {
                this.initClose();
                if (this.view && this.view.close) {
                    this.view.close()
                }
            },
            handleOk(instance) {
                if (this.view && this.view.ok) {
                    this.okLoading = true;
                    this.view.ok(this.$refs['formRef'], this.handleOkError)
                } else {
                    console.warn('请在view参数中实现ok方法！{ok(){}}')
                }
            },
            handleOkError(err) {
                this.okLoading = false
            }
        }
    }
</script>

<style lang="less">
    .size {
        width: 100%;
        height: 100%;
    }

    html, body {
        .size;
        overflow: hidden;
        margin: 0;
        padding: 0;
    }

    #app {
        .size;
    }
</style>
