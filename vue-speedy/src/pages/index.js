import home from './home'
import profile from './profile'
import control from './control'
import activation from './activation'
import examples from './examples'

export default [
    home,
    {
        path: '/',
        name: "DocumentIndex",
        meta: {

            authenticated: true,
        },
        component: () => import('../view/main'),
        children: [
            {
                path: '/help',
                name: 'Document',
                meta: {
                    icon: 'ios-book',
                    iframe: 'https://lison16.github.io/iview-admin-doc/',
                    title: '帮助文档',
                    authenticated: true,
                }
            }
        ]
    },
    {
        path: '/',
        name: "TenoworkIndex",
        meta: {
            authenticated: true,
        },
        component: () => import('../view/main'),
        children: [
            {
                path: '/tenowork',
                name: 'Tenowork',
                meta: {
                    icon: 'ios-book',
                    iframe: 'https://app.tenowork.com',
                    title: 'Tenowork',
                    authenticated: true,
                }
            }
        ]
    },
    profile,
    control,
    activation,
    examples
]
