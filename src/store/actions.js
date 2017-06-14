
export default {
    updateData: ({commit}, options) =>
        options.type === 'user' ?
            commit('updateUserData', options.data) :
            commit('updateData', options),
    changeView: ({commit}, view) => commit('changeView', view),
    loadMore: ({commit}, options) => commit(`loadMore${options.type}`, options),
    showVol: ({commit}, data) => {
        commit('changeView', 'volView');

    }
}

