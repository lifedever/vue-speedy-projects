import homeMenu from 'vue-speedy-antd/src/admin/pages/home/menu'
import systemMenu from 'vue-speedy-antd/src/admin/pages/system/menu'

export default [
    homeMenu,
    {
        id: 'tenowork',
        name: 'Tenowork',
        icon: 'project',
        url: 'https://app.tenowork.com',
        iframe: true
    },
    {
        id: 'vue-speedy-antd',
        name: 'Ant.Design-Vue',
        icon: 'ant-design',
        url: 'https://vue.ant.design/docs/vue/introduce-cn/',
        iframe: true
    },
    {
        id: 'example',
        name: '示例',
        icon: 'appstore',
        children: [
            {
                id: 'exampleBase',
                name: '基础示例',
                url: '/example',
            },
            {
                id: 'exampleSplit',
                name: '分割容器',
                url: '/example/split',
            },
            {
                id: 'exampleTree',
                name: '树容器',
                url: '/example/tree',
            },
        ]
    },
    systemMenu
]