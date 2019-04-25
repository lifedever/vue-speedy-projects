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
        },{
            path: '/page-data-container',
            name: 'PageDataContainer', // 一级目录下的二级页面
            meta: {
                authenticated: true,
                title: '分页数据',
                holderNeedless: true
            },
            component: () => import('./page-data-container')
        },{
            path: '/tree-data-container',
            name: 'TreeDataContainer', // 一级目录下的二级页面
            meta: {
                authenticated: true,
                title: '树数据组件',
                holderNeedless: true
            },
            component: () => import('./tree-data-container')
        }, {
            path: '/aaa',
            name: 'aaa', // 一级目录下的二级页面
            meta: {
                authenticated: true,
                hideInMenu: true
            },
            component: () => import('./tree-data-container')
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
