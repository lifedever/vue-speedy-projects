import Main from '@/view/main'

export default {
    path: '/',
    name: 'Main',
    component: Main,
    meta: {
        title: '首页',
        authenticated: true,
        notClose: true
    },
    children: [
        {
            path: ':holder/home',
            name: 'Home',
            meta: {
                title: '首页',
                icon: 'md-home',
                hideInMenu: true,
                notClose: true,
                authenticated: true,
                matchByPath: false       // 根据路由path作为唯一匹配Id，默认为false，则根据name匹配
            },
            component: () => import('./home')
        }
    ]
}
