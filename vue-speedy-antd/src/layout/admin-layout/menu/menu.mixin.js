import {mapActions, mapGetters} from "vuex";
import {MenuUtil} from "../../../utils/menu.util";
import {setSiteTitle} from "../../../utils/common";

export default {
    data() {
        return {
            current: null,
            currentTab: null
        }
    },
    watch: {
        currentMenu(value) {
            this.current = [value.selecedKey || value.id]
            this.currentTab = [value.id]
            console.log('current Menu Id', this.current)
            if (value && value.url && !value.iframe) {
                let path = (value.route ? value.route.fullPath : value.url) || value.url
                this.$router.push(path)
            } else {
                this.$router.push(`/frame/${value.id}`)
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
            const menu = MenuUtil.findById(this.allMenus, key)
            if (menu) {
                this.addTab(menu)
            }
        }
    }
}