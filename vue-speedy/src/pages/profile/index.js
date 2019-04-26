import Main from '@/view/main'
export default {
    path: '/profilehome',
    name: 'ProfileHome',
    meta: {
        title: '个人中心',
        authenticated: true,
        hideInMenu: true,
    },
    component: Main,
    children: [
        {
            path: '/profile',
            name: 'Profile',
            meta: {
                authenticated: true,
                title: '个人中心',
                holderNeedless: true                    // 当前路由是否需要属于租户，路径类似 :holderId/xxx
            },
            component: () => import('./Profile'),
        }
    ]
}
