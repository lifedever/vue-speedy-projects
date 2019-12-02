import Main from './Main'
export default [
    {
        name: 'Main',
        path: '/',
        component: Main,
        redirect: '/home',
        children: [
            {
                name: 'Home',
                path: 'home',
                component: () => import('../pages/home')
            },
            {
                name: 'Example',
                path: 'example',
                component: () => import('./examples')
            },
            {
                name: 'SplitExample',
                path: 'example/split',
                component: () => import('./examples/SplitContainerExample')
            },
            {
                name: 'TreeExample',
                path: 'example/tree',
                component: () => import('./examples/TreeContainerExample')
            },
            {
                name: 'TabExample',
                path: 'example/tabs',
                component: () => import('./examples/TabContainerExample')
            },
            {
                name: 'EditorExample',
                path: 'example/editor',
                component: () => import('./examples/EditorExample')
            },
            {
                name: 'OpenUser',
                path: 'open/users',
                component: () => import('./open/user/OpenUser')
            },
            {
                name: 'CustomerList',
                path: '/customer/list',
                component: () => import('./customer/CustomerList')
            },
            {
                name: 'OrderConsume',
                path: '/order/consume',
                component: () => import('./order/OrderConsume')
            },
        ]
    }
]