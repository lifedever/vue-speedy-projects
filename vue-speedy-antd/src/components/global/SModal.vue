<template>
    <div>
        <a-modal v-model="visible"
                 @ok="view.ok"
                 @cancel="view.cancel"
                 v-bind="view.modal">
            <component :is="view.component" v-bind="view.props"></component>
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
                view: {
                    modal: {
                        okText: '确定',
                        cancelText: '取消'
                    },
                    component: null,
                    props: null,
                    ok: () => {},
                    cancel: () => {}
                }
            }
        },
        created() {
        },
        mounted() {
            this.$bus.on('bus_openModal', this.openModal)
            this.$bus.on('bus_closeModal', this.closeModal)
        },
        methods: {
            openModal(view) {
                console.log('openModal', view)
                this.view = _assign({}, this.view, view)
                this.visible = true
            },
            closeModal() {
                this.visible = false
            }
        }
    }
</script>

<style scoped>

</style>