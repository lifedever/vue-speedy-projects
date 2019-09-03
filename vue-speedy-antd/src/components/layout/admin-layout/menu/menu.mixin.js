import {mapActions, mapGetters} from "vuex";
import {MenuUtil} from "../../../../utils/menu.util";

export default {
    data() {
        return {
            current: null
        }
    },
    watch: {
        currentMenu(value) {
            console.log('current tab', value.url)
            this.current = [value.url]
        }
    },
    methods: {
        ...mapActions('menuTab', {
            'addTab': 'addTabAction'
        }),
        menuSelect({item, key, selectedKeys}) {
            const menu = MenuUtil.findByUrl(this.menus, key)
            this.addTab(menu)
        }
    },
    computed: {
        ...mapGetters('menuTab', {
            currentMenu: 'currentGet'
        })
    }
}