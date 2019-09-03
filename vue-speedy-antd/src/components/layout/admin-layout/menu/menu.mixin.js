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
            this.current = [value.id]
            if (this.currentChange) {
                this.currentChange(value)
            }
        }
    },
    methods: {
        ...mapActions('menuTab', {
            'addTab': 'addTabAction'
        }),
        menuSelect({item, key, selectedKeys}) {
            const menu = MenuUtil.findById(this.menus, key)
            this.addTab(menu)
            if (menu.url) {
                this.$router.push(menu.url).catch(err => {
                })
            }
        }
    },
    computed: {
        ...mapGetters('menuTab', {
            currentMenu: 'currentGet'
        })
    }
}