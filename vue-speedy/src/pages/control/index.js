import Main from '@/view/main'
export default {
    path: '/control',
    name: 'HolderIndex',
    meta: {
        icon: 'md-desktop',
        authenticated: true,
        title: '访问控制'
    },
    component: Main,
    children: [
        {
            path: '/:holder/roles',
            name: 'HolderRole', // 一级目录下的二级页面
            meta: {
                authenticated: true,
                title: '角色管理'
            },
            component: () => import('./role')
        },
        {
            path: '/:holder/users',
            name: 'HolderProfile',
            meta: {
                authenticated: true,
                title: '用户管理',
            },
            component: () => import('./user')
        },
        {
            path: '/:holder/permission',
            name: 'HolderRolePermission',
            meta: {
                authenticated: true,
                title: '用户授权'
            }
        }
    ]
}
