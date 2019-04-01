<template>
    <div>
        <Form :rules="ruleValidate" ref="form" :model="roleForm" @keydown.native.enter.prevent >
            <FormItem label="角色名称" prop="name">
                <Input v-model="roleForm.name" ref="roleName"/>
            </FormItem>
        </Form>
    </div>
</template>

<script>
    export default {
        name: "Edit",
        data() {
            return {
                roleForm: {
                    name: ''
                },
                ruleValidate: {
                    name: {
                        required: true,
                        message: '请填写角色名称'
                    }
                }
            }
        },
        mounted(){},
        computed: {},
        methods: {
            saveRole() {
                return new Promise((resolve, reject) => {
                    this.postWithValid(this.$refs['form'], '/api/holder/roles', this.roleForm)
                        .then(resolve)
                        .catch(reject)
                })
            }
        }
    }
</script>

<style scoped>

</style>
