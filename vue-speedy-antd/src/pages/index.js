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
                component: () => import('./home')
            },
            {
                name: 'Example',
                path: 'example',
                component: () => import('./examples')
            }
        ]
    }
]