<template>
    <div>
        <a-modal v-model="visible"
                 v-if="visible"
                 @ok="handleOk"
                 @cancel="view.cancel"
                 v-bind="view.modal">
            <component ref="comRef" :is="view.component" v-bind="view.props"></component>
        </a-modal>
    </div>
</template>

<script>
    import _assign from 'lodash/merge'

    export default {
        name: "SModal",
        data() {
            return {
                visible: false,
                view: null
            }
        },
        created() {
        },
        mounted() {
            this.$bus.on('bus_openModal', this.openModal)
            this.$bus.on('bus_closeModal', this.closeModal)
            this.$bus.on('bus_okLoadingModal', this.okLoadingModal)
        },
        watch: {
            visible() {

            }
        },
        methods: {
            init() {
                this.view = {
                    modal: {
                        okText: '确定',
                        cancelText: '取消'
                    },
                    component: null,
                    props: null,
                    ok: () => {
                    },
                    cancel: () => {
                    }
                }
                console.log('init modal', this.view)
            },
            okLoadingModal(loading) {
                if (this.view)
                    this.$set(this.view.modal, 'confirmLoading', loading)
            },
            openModal(view) {
                this.init()
                console.log('openModal', view)
                this.view = _assign({}, this.view, view)
                this.visible = true
            },
            closeModal() {
                this.visible = false
            },
            handleOk() {
                if (this.view.ok) {
                    this.view.ok(this.$refs['comRef'])
                }
            }
        }
    }
</script>

<style scoped>

</style>