<template>
	<Modal :value="visible"
		   :title="title"
           :width="width"
           :footer-hide="footerHide"
		   :class-name="vertical? 'vertical-center-modal': ''"
		   @on-cancel="handleClose"
           @on-visible-change="handleVisibleChange">
		<slot></slot>
		<div slot="footer" v-if="!footerHide">
			<Button @click="handleClose">取消</Button>
			<Button type="primary" @click="handleOk" :loading="loading">确定</Button>
		</div>
	</Modal>
</template>

<script>
    export default {
        name: "FormModal",
        data() {
            return {
                okLoading: false
            }
        },
        props: {
            visible: {
                type: Boolean,
                default: false
            },
            footerHide: {
                type: Boolean,
                default: false
            },
            title: String,
            vertical: Boolean,
            loading: Boolean,
            width: {
                type: [String, Number],
                default: 500
            }
        },
        methods: {
            handleVisibleChange(visible) {
            },
            handleClose() {
                this.$emit('update:visible', false);
                this.$emit('close');
            },
            handleOk() {
                this.$emit('ok', this.$slots.default[0].componentInstance);
            }
        }
    }
</script>

<style scoped lang="less">

</style>
