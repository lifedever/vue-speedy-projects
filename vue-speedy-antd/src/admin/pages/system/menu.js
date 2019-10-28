export default {
    id: 'system',
    name: '系统管理',
    icon: 'setting',
    children: [
        {
            id: 'system_holder_user',
            name: '用户管理',
            url: '/system/users'
        },
        {
            id: 'system_holder_role',
            name: '角色管理',
            url: '/system/roles'
        },
        {
            id: 'system_holder_configuration',
            name: '配置管理',
            url: '/system/configurations'
        }
    ]
}