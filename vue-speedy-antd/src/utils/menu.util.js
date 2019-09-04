export const MenuUtil = {
    /**
     * 将父子菜单打平为一级
     */
    parallelMenus(menus) {
        let tempMenus = []
        menus.forEach(m => {
            tempMenus.push(m)
            if (m.children && m.children.length > 0) {
                m.children.forEach(c => {
                    tempMenus.push(c)
                })
            }
        })
        console.log('tempMenus', tempMenus)
        return tempMenus
    },
    /**
     * 根据菜单名称查找菜单
     */
    findByName(menus, name) {
        for (const menu of this.parallelMenus(menus)) {
            if (menu.name === name) {
                return menu
            }
        }
        return null
    },
    /**
     * 根据菜单URL查找菜单
     */
    findByUrl(menus, url) {
        for (const menu of this.parallelMenus(menus)) {
            if (menu.url === url) {
                return menu
            }
        }
        return null
    },
    /**
     * 根据菜单Id查找菜单
     */
    findById(menus, id) {
        for (const menu of this.parallelMenus(menus)) {
            if (menu.id === id) {
                return menu
            }
        }
        return null
    },
    /**
     * 返回父菜单
     */
    findParent(menus, menu) {
        let m = null
        for (const ms of menus) {
            if (ms.children && !!ms.children.find(m => m.id === menu.id)) {
                m = ms
            }
        }
        return m
    }
}