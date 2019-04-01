import Main from '@/view/main'
export default {
    path: '/examples',
    name: 'Examples',
    meta: {
        icon: 'md-desktop',
        authenticated: true,
        title: '组件示例'
    },
    component: Main,
    children: [
        {
            path: '/two-col-container',
            name: 'TwoColContainer', // 一级目录下的二级页面
            meta: {
                authenticated: true,
                title: '两栏布局',
                holderNeedless: true
            },
            component: () => import('./two-col-container')
        }, {
            path: '/none',
            name: 'none', // 一级目录下的二级页面
            meta: {
                authenticated: true,
                title: '待定',
                holderNeedless: true
            }
        }
    ]
}
