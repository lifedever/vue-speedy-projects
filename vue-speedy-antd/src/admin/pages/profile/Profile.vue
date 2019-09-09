<template>
    <base-container>
        <change-password-form></change-password-form>
    </base-container>
</template>

<script>
    import ChangePasswordForm from "../../../layout/admin-layout/partial/ChangePasswordForm";
    export default {
        name: 'Profile',
        components: {ChangePasswordForm}
    }
</script>