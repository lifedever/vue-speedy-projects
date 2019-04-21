import Main from '@/view/main'
import i18n from '../../locale'

export default {
    path: '/',
    name: 'Main',
    component: Main,
    meta: {
        title: i18n.t('router.home'),
        authenticated: true,
        notClose: true
    },
    children: [
        {
            path: ':holder/home',
            name: 'Home',
            meta: {
                title: i18n.t('router.home'),
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
