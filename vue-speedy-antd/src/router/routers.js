import store from '../store'
export default [
    {
        name: 'Login',
        path: '/login',
        component: () => import('../pages/login')
    },
    {
        name: 'Logout',
        path: '/logout',
        redirect: '/login',
        beforeEnter: (to, from, next) => {
            store.dispatch('app/logoutAction')
            next()
        }
    }
]