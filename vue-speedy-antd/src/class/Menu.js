class Menu {
    /**
     * 菜单构造方法
     * @param id 唯一标示
     * @param name 显示的名字
     * @param icon  图标
     * @param url 跳转地址
     * @param fixed 是否固定在tab，不可被关闭
     * @param children 子菜单
     */
    constructor(id, name, url, icon, fixed, children) {
        this.id = id
        this.name = name
        this.icon = icon
        this.url = url
        this.fixed = fixed
        this.children = children
    }

    toString() {
        return JSON.stringify(this)
    }

    toObject() {
        return JSON.parse(this.toString())
    }
}

export default Menu