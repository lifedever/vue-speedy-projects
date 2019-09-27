import store from '../store'
import Main from "../pages/Main";

export default [
    {
        name: 'Main',
        path: '/',
        component: Main,
        redirect: {name: 'Home'},
        children: [
            {
                name: 'SystemHolderProfiles',
                path: 'system/users',
                component: () => import('../pages/system/holder-user')
            },
            {
                name: 'SystemHolderRoles',
                path: 'system/roles',
                component: () => import('../pages/system/holder-role')
            },
            {
                name: 'SystemHolderConfigurations',
                path: 'system/configurations',
                component: () => import('../pages/system/holder-configuration')
            },
        ]
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
    },
    {
        name: 'iFrameMain',
        component: Main,
        path: '/frame',
        children: [
            {
                name: 'iFrameRoute',
                path: ':menuId',
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