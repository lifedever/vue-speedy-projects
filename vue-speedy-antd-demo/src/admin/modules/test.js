export default {
    path: 'test',
    module: {
        namespaced: true,
        state: {
            name: 'VueSpeedyAntD'
        },
        getters: {
            nameGet: state => state.name
        }
    }
}