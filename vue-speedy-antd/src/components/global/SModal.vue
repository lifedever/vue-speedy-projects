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
    export default {
        name: "SModal",
        data() {
            return {
                visible: false,
                view: {
                    modal: null,
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
                this.view = Object.assign({}, this.view, view)
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