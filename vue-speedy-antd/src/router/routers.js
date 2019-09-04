import store from '../store'
import Main from "../pages/Main";

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
    }
]