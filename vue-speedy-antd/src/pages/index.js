import Home from './home'
export default [
    {
        name: 'Home',
        path: '/',
        component: () => import('./home')
    }
]