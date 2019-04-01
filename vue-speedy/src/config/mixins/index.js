import {mapActions, mapGetters, mapMutations} from 'vuex';
import {hasOneOf} from "../../libs/tools";
import {getNewTagList} from "../../libs/util";
import dayjs from '../../libs/dayjs'

export default {
    data() {
        return {
            dayjs: dayjs
        }
    },
    computed: {
        ...mapGetters([
            'accessGet'
        ]),
        tagNavList() {
            return this.$store.state.app.tagNavList
        }
    },
    methods: {
        ...mapMutations([
            'setTagNavList'
        ]),
        hasPermission(permission) {
            return hasOneOf(this.accessGet, [permission])
        },
        setNewTab(tab) {
            this.setTagNavList(getNewTagList(this.tagNavList, tab))
        },
        postWithValid(formRef, url, data) {
            return new Promise((resolve, reject) => {
                formRef.validate((valid) => {
                    if (valid) {
                        this.$http.post(url, data)
                            .then(resolve)
                            .catch(reject)
                    } else {
                        reject({valid: false})
                    }
                })
            })
        }
    }
}
