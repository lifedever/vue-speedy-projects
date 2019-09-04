import {mapActions} from "vuex";

export default {
    methods: {
        ...mapActions('menu', {
            addTab: 'addTabAction'
        }),
        openTab(menu) {
            this.addTab(menu)
            this.$router.push(menu.url).catch(err=>{})
        }
    }
}