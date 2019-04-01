import { login, logout, getUserInfo } from '@/api/user'
import {setTagNavListInLocalstorage} from '@/libs/util'
import { setToken, getToken } from '@/libs/util'

export default {
	state: {
		username: '',
		userId: '',
		avatorImgPath: '',
		token: '',
		access: '',
		userInfo: null
	},
	getters: {
		tokenGet: state => state.token,
		userInfoGet: state => state.userInfo,
        accessGet: state => state.access
	},
	mutations: {
		setAvator (state, avatorPath) {
			state.avatorImgPath = avatorPath
		},
		setUserId (state, id) {
			state.userId = id
		},
		setUserName (state, name) {
			state.username = name
		},
		setAccess (state, access) {
			state.access = access
		},
		setToken (state, token) {
			state.token = token
			setToken(token)
		},
		setUserInfo(state, user) {
			state.userInfo = user
		}
	},
	actions: {
		// 登录
		handleLogin ({ commit }, {username, password}) {
			return new Promise((resolve, reject) => {
				login({
                    username,
					password
				}).then(res => {
					console.log('token', res.data.token)
					commit('setToken', res.data.token)
					resolve(res)
				}).catch(err => {
					reject(err)
				})
			})
		},
		// 退出登录
		handleLogOut ({ state, commit }) {
			return new Promise((resolve, reject) => {
				logout(state.token).then(() => {
					commit('setToken', '')
					commit('setAccess', [])
                    window.sessionStorage.clear()
                    setTagNavListInLocalstorage([])
					resolve()
				}).catch(err => {
					reject(err)
				})
				// 如果你的退出登录无需请求接口，则可以直接使用下面三行代码而无需使用logout调用接口
				// commit('setToken', '')
				// commit('setAccess', [])
				// resolve()
			})
		},
		// 获取用户相关信息
		getUserInfo ({ state, commit }) {
			return new Promise((resolve, reject) => {
			    console.log('load current userInfo')
				getUserInfo().then(res => {
					const data = res.data
					commit('setUserInfo', data)
					commit('setUserName', data.loginName)
					commit('setUserId', data.userId)
					commit('setAccess', data.access)
					resolve(data)
				}).catch(err => {
					reject(err)
				})
			})
		}
	}
}
