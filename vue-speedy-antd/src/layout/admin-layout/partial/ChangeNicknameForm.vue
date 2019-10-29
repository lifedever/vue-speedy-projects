<template>
    <div>
        <s-form @submit="changeName" ref="form" :loading="loading">
            <template>
                <s-form-item label="账户名称">
                    <a-input v-decorator="['nickname', {rules: [{required: true, message: '请输入名称'}]}]"></a-input>
                </s-form-item>
            </template>
        </s-form>
    </div>
</template>

<script>
    import SForm from "../../../components/partial/form/SForm";
    import SFormItem from "../../../components/partial/form/SFormItem";
    import {toFormData} from "../../../utils/common";
    import {mapActions, mapGetters} from "vuex";

    export default {
        name: "ChangeNicknameForm",
        components: {SFormItem, SForm},
        data() {
            return {
                loading: false
            }
        },
        mounted() {
            this.$nextTick(() => {
                this.$refs['form'].setFieldsValue({'nickname': this.userInfo.nickname})
            })
        },
        computed: {
            ...mapGetters('user', {
                userInfo: 'userInfoGet'
            }),
        },
        methods: {
            ...mapActions('user', {
                loadUserInfo: 'loadUserInfoAction'
            }),
            changeName(values) {
                this.loading = true
                this.$http.post(`/api/holder/profiles/nickname`, toFormData(values)).then(res => {
                    this.loadUserInfo().then(_ => {
                        this.loading = false
                        this.$message.success('名称修改成功！')
                    })
                }).catch(error => {
                    this.$message.error('名称修改失败')
                })
            }
        }
    }
</script>

<style scoped>

</style>