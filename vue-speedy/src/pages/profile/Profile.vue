<template>
    <Container>
        <div slot="header">
            个人中心
        </div>
        <div style="width: 400px;">
            <Divider>修改密码</Divider>
            <Form :model="profileForm" label-position="top" ref="formValidate" :rules="ruleValidate">
                <FormItem label="原密码" prop="oldPassword">
                    <Input v-model="profileForm.oldPassword" type="password"></Input>
                </FormItem>
                <FormItem label="新密码" prop="password">
                    <Input v-model="profileForm.password" type="password"></Input>
                </FormItem>
                <FormItem label="确认新密码" prop="confirmPassword">
                    <Input v-model="profileForm.confirmPassword" type="password"></Input>
                </FormItem>
                <Button type="primary" @click="modifyPass">提交</Button>
            </Form>
        </div>
    </Container>
</template>

<script>
    import {toFormData} from "../../libs/util";

    export default {
        name: "Profile",
        data() {
            return {
                profileForm: {},
                ruleValidate: {
                    oldPassword: {required: true, message: '请输入原密码'},
                    password: {required: true, message: '请输入新密码'},
                    confirmPassword: {required: true, message: '请确认密码'}
                }
            }
        },
        methods: {
            modifyPass() {
                this.$refs['formValidate'].validate(valid => {
                    if(valid){
                        this.$http.post(`/api/pt/password`, toFormData(this.profileForm)).then(res => {
                            this.$Message.success('密码修改成功！')
                        }).catch(error => {
                            this.$Message.error('密码修改失败')
                        })
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>
