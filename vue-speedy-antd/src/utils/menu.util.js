export const MenuUtil = {
    findByName(menus, name) {
        for (const menu of menus) {
            if (menu.name === name) {
                return menu
            }
            if (menu.children) {
                return this.findByName(menu.children, name)
            }
        }
    },
    findByUrl(menus, url) {
        for (const menu of menus) {
            if (menu.url === url) {
                return menu
            }
            if (menu.children) {
                return this.findByUrl(menu.children, url)
            }
        }
    },
    findById(menus, id) {
        for (const menu of menus) {
            if (menu.id === id) {
                return menu
            }
            if (menu.children) {
                let m = this.findById(menu.children, id)
                if (m) {
                    return m
                }
            }
        }
    },
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