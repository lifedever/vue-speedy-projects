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
    },
    {
        name: 'ErrorRoute',
        path: '*',
        children: [
            {
                path: '/403',
                meta: {
                    clearLoading: true
                },
                name: 'error_403',
                component: () => import('../pages/error-page/403.vue')
            },
            {
                path: '/500',
                meta: {
                    clearLoading: true
                },
                name: 'error_500',
                component: () => import('../pages/error-page/500.vue')
            },
            {
                path: '*',
                meta: {
                    clearLoading: true
                },
                name: 'error_404',
                component: () => import('../pages/error-page/404.vue')
            }
        ]
    }
]