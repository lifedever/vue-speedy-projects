import {mapActions, mapGetters} from "vuex";
import {MenuUtil} from "../../../utils/menu.util";
import {setSiteTitle} from "../../../utils/common";

export default {
    data() {
        return {
            current: null
        }
    },
    watch: {
        currentMenu(value) {
            this.current = [value.id]
            if (value && value.url) {
                this.$router.push(value.url).catch(err => {})
            }
            if (this.currentChange) {
                this.currentChange(value);
            }
            setSiteTitle(value.name)
        }
    },
    computed: {
        ...mapGetters('menu', {
            currentMenu: 'currentGet',
            allMenus: 'menusAndTabsGet'
        })
    },
    methods: {
        ...mapActions('menu', {
            'addTab': 'addTabAction',
        }),
        menuSelect({item, key, selectedKeys}) {
            console.log('menuId', key)
            const menu = MenuUtil.findById(this.allMenus, key)
            if (menu) {
                this.addTab(menu)
            }
        }
    }
}