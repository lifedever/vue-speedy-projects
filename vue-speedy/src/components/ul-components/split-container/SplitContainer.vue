<template>
    <div :class="['two-col-container', noPad? 'two-col-container-no-pad': '', !hideHeader? 'top': '']">
        <Layout>
            <Header v-if="!hideHeader">
                <Container hideMain>
                    <div slot="header" v-if="$slots['header']">
                        <slot name="header"></slot>
                    </div>
                    <div slot="headerRight" v-if="$slots['headerRight']">
                        <slot name="headerRight"></slot>
                    </div>
                </Container>
            </Header>
            <Content>
                <Split v-model="split">
                    <div slot="left" class="split-item split-item-left">
                        <slot name="left"></slot>
                    </div>
                    <div slot="right" class="split-item split-item-right">
                        <slot name="right"></slot>
                    </div>
                </Split>
            </Content>
        </Layout>
    </div>
</template>

<script>
    export default {
        name: "TwoColContainer",
        data(){
            return {
                split: '300px'
            }
        },
        created(){
            this.split = this.value
        },
        watch: {
            split(value){
                this.$emit('input', value);
            }
        },
        props: {
            width: {
                type: [Number, String],
                default: 240
            },
            value: {
                type: [Number, String],
                default: 0.2
            },
            hideHeader: {
                type: Boolean,
                default: false
            },
            noPad: {
                type: Boolean,
                default: false
            }
        }
    }
</script>

<style lang="less">
    .two-col-container {
        height: 100%;
        .ivu-layout {
            height: 100%;
            flex-direction: column;
            position: relative;
            .ivu-layout-content {
                /*height: 100%;*/
                position: absolute;
                bottom: 0px;
                left: 0;
                right: 0;
                top: 0;
                /*display: flex;*/
                /*height: 100%;*/
            }
        }
        &.top {
            .ivu-layout .ivu-layout-content {
                top: 48px;
            }
        }
        .ivu-layout-header {
            height: 48px;
            line-height: 48px;
            background: #ffffff;
            padding: 0;
        }
        .ivu-layout-sider {
            background: #ffffff;
            margin-right: 8px;
        }
        .ivu-split-trigger {
            border: none;
            background: #f5f7f9;
        }
        .ivu-split-trigger .ivu-split-trigger-vertical {
            background: #f5f7f9;
            border: none;
        }
        .ivu-split-pane {
        }
        .split-item {
            background: #fff;
            height: 100%;
            overflow: auto;
        }
        .split-item-right {
            padding-left: 6px;
        }

        &.two-col-container-no-pad {
            .split-item-right {
                padding: 0;
            }
        }
    }
</style>
