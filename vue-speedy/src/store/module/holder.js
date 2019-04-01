import axios from '../../libs/axios'
export default {
    state: {
        holders: null
    },
    getters: {

    },
    mutations: {
        setHolders(state, holders){
            state.holders = holders
        }
    },
    actions: {
        loadHolders({ state, commit }){
            return new Promise((resolve, reject) => {
                axios.get('/api/holders/active').then(res => {
                    commit('setHolders', res.data);
                    resolve(res.data)
                }).catch(reject)
            })
        }
    }
}
