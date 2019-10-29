<template>
    <base-container>
        <div class="profile">
            <a-divider orientation="left">修改名称</a-divider>
            <change-nickname-form/>
            <a-divider orientation="left">修改密码</a-divider>
            <change-password-form></change-password-form>
        </div>
    </base-container>
</template>

<script>
    import ChangePasswordForm from "../../../layout/admin-layout/partial/ChangePasswordForm";
    import SForm from "../../../components/partial/form/SForm";
    import ChangeNicknameForm from "../../../layout/admin-layout/partial/ChangeNicknameForm";
    export default {
        name: 'Profile',
        components: {ChangeNicknameForm, SForm, ChangePasswordForm},
        data(){
            return {

            }
        },
        methods: {
            changeName(){

            }
        }
    }
</script>
<style>
    .profile {
        width: 500px;
    }
</style>