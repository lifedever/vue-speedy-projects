export default (routes) => {
    let router = [
        {
            path: '/login',
            name: 'login',
            meta: {
                title: 'Login - 登录',
                hide: true,
                anonymous: true,
                holderNeedless: true
            },
            component: () => import('@/view/login/login.vue')
        }
    ]
    router = router.concat(routes)
    router = router.concat([
        {
            path: '/403',
            name: 'error_403',
            meta: {
                hide: true
            },
            component: () => import('@/view/error-page/403.vue')
        },
        {
            path: '/500',
            name: 'error_500',
            meta: {
                hide: true
            },
            component: () => import('@/view/error-page/500.vue')
        },
        {
            path: '*',
            name: 'error_404',
            meta: {
                hide: true
            },
            component: () => import('@/view/error-page/404.vue')
        }
    ])
    return router
}
