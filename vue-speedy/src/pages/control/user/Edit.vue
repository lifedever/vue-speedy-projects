<template>
    <div>
        <Form :rules="userValidate" ref="form" :model="userForm" @keydown.native.enter.prevent >
            <FormItem label="用户名" prop="nickname">
                <Input type="text" v-model="userForm.nickname" ref="nickname"/>
            </FormItem>
            <FormItem label="邮箱" prop="email">
                <Input type="email" :readonly="!!userForm.id" v-model="userForm.email" ref="email"  @input="emailChange"/>
            </FormItem>
        </Form>
    </div>
</template>

<script>
    import {toFormData} from "../../../libs/util";

    export default {
        name: "Edit",
        props: {
            itemId: String
        },
        data(){
            return {
                userValidate: {
                    nickname: {
                        required: true,
                        message: '请填写用户名称'
                    }
                    ,
                    email: {
                        required: true,
                        message: '请填写正确的邮箱格式'
                    }
                },
                userForm: {
                    id: null,
                    email: '',
                    nickname: ''
                },
                current: null
            }
        },
        mounted(){
            if (this.itemId) {
                this.loadCurrent(this.itemId)
            }
        },
        methods: {
            loadCurrent(id) {
                this.$http.get(`/api/holder/users/${id}`).then(res => {
                    this.userForm.id = res.data.id
                    this.userForm.email = res.data.loginName
                    this.userForm.nickname = res.data.nickname
                })
            },
            emailChange(){
                if (this.userForm.email) {
                    this.userForm.email = this.userForm.email.toLowerCase()
                }
            },
            saveUser(){
                return new Promise((resolve, reject) => {
                    this.postWithValid(this.$refs['form'], '/api/holder/users', toFormData(this.userForm))
                        .then(resolve)
                        .catch(reject)
                })
            }
        }
    }
</script>

<style scoped>

</style>
