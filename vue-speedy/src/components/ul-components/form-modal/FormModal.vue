<template>
	<Modal :value="visible"
		   :title="title"
           :mask-closable="maskClosable"
           :width="width"
           :footer-hide="footerHide"
		   :class-name="vertical? 'vertical-center-modal': ''"
		   @on-cancel="handleClose"
           @on-visible-change="handleVisibleChange">
		<slot></slot>
		<div slot="footer" v-if="!footerHide">
			<Button @click="handleClose">
                {{cancelText || '取消'}}
            </Button>
			<Button type="primary" @click="handleOk" :loading="loading">
                {{okText || '保存'}}
            </Button>
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
            maskClosable: {
                type: Boolean,
                default: true
            },
            visible: {
                type: Boolean,
                default: false
            },
            footerHide: {
                type: Boolean,
                default: false
            },
            title: String,
            okText: String,
            cancelText: String,
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
