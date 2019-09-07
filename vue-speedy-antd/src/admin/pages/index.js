import Main from './Main'
export default [
    {
        name: 'Main',
        path: '/',
        component: Main,
        redirect: '/home',
        children: [
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
            }
        ]
    }
]