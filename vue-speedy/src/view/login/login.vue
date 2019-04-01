<style lang="less">
</style>

<template>
	<div class="login">
		<div class="login-con">
			<Card icon="log-in" :title="'登录 ' + this.$site.title" :bordered="false">
				<div class="form-con">
					<login-form @on-success-valid="handleSubmit" :loading="loading"></login-form>
				</div>
			</Card>
		</div>
	</div>
</template>

<script>
    import {mapActions} from 'vuex'
    import LoginForm from '../../components/login-form'
    import OauthItems from "./oauth-items";

    export default {
        components: {
            OauthItems,
            LoginForm
        },
        data() {
            return {
                loading: false
            }
        },
        methods: {
            ...mapActions([
                'handleLogin',
                'getUserInfo'
            ]),
            handleSubmit({username, password}) {
                this.loading = true;
                this.handleLogin({username, password}).then(res => {
					this.getUserInfo().then(res => {
                        this.$router.push('/')
                    }).catch(error => {
                        this.loading = false;
                    })
                }).catch(error => {
                    this.loading = false;
                    if (error.response && error.response.status === 401) {
                        this.$Message.error('登录失败，请检查用户名或密码是否正确')
                    }
                })
            }
        }
    }
</script>

<style>

</style>
