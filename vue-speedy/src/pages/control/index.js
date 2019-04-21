import Main from '@/view/main'
import i18n from '../../locale'
export default {
    path: '/control',
    name: 'HolderIndex',
    meta: {
        icon: 'md-desktop',
        authenticated: true,
        title: i18n.t('router.control')
    },
    component: Main,
    children: [
        {
            path: '/:holder/roles',
            name: 'HolderRole', // 一级目录下的二级页面
            meta: {
                authenticated: true,
                title: i18n.t('router.roles')
            },
            component: () => import('./role')
        },
        {
            path: '/:holder/users',
            name: 'HolderProfile',
            meta: {
                authenticated: true,
                title: i18n.t('router.users')
            },
            component: () => import('./user')
        },
        {
            path: '/:holder/permission',
            name: 'HolderRolePermission',
            meta: {
                authenticated: true,
                title: i18n.t('router.permission')
            }
        }
    ]
}
