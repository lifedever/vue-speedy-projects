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
    }
}