export default [
    {
        name: 'Index',
        path: '/',
        meta: {
            anonymous: true
        },
        component: () => import('vue-speedy-antd/src/index/pages/index/Index')
    }
]