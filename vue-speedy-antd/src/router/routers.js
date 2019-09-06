import store from '../store'
import Main from "../pages/Main";

export default [
    {
        name: 'Main',
        path: '/',
        component: Main,
        redirect: '/home',
        children: [
            {
                name: 'Home',
                path: 'home',
                component: () => import('../pages/home')
            },
            {
                name: 'SystemHolderProfiles',
                path: 'system/users',
                component: () => import('../pages/system/holder-user')
            },
        ]
    },
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
        name: 'ProfileMain',
        component: Main,
        path: '/profile',
        children: [
            {
                name: 'Profile',
                path: '/profile',
                component: () => import('../pages/profile')
            }
        ]
    },{
        name: 'iFrameMain',
        component: Main,
        path: '*',
        children: [
            {
                name: 'iFrameRoute',
                path: '/frame',
                component: () => import('../pages/iframe')
            }
        ]
    },
    {
        name: 'ErrorRoute',
        path: '*',
        component: Main,
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