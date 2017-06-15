
export default {
    updateData: ({commit}, options) =>
        options.type === 'user' ?
            commit('updateUserData', options.data) :
            commit('updateData', options),
    changeView: ({commit}, view) => commit('changeView', view),
    changeVolType: ({commit}, type) => {
        commit('changeVolType', type);
        commit('changeView', 'vols');
        commit('loadMoreVols', { init: true })
    },
    loadMore: ({commit}, options) => commit(`loadMore${options.type}`, options),
    showVol: ({commit}, vol) => {
        commit('changeViewVol', vol);
        commit('changeView', 'volView');
        setTimeout(function () {
            if (document.getElementById('volViewIntro')) {
                document.getElementById('volView').scrollTop = 0;
                document.getElementById('volViewIntro').scrollTop = 0;
            }
        }, 0);
    },
    play: ({commit, getters}, options) => commit('play', {options, getters, commit}),
    toggle: ({commit, getters}, type) => {
        if (type === 'play') return commit('toggle');
        commit('control', {type, getters, commit});
    },
    changePlayMode: ({commit}) => commit('changePlayMode'),
    changePlayInfo: ({commit}, options) => options.type === 'ratio' ?
        commit('changePlayRatio', options.value) : null,

}
