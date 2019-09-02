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
    }
}