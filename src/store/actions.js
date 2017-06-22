
export default {
    updateData: ({commit}, options) =>
        options.type === 'user' ?
            commit('updateUserData', options.data) :
            commit('updateData', options),
    changeView: ({commit, getters}, {view, _getters}) => {
        if (getters) return commit('changeView', {view, getters});
        commit('changeView', {view, _getters})
    },
    changeUserView: ({commit}, view) => commit('changeUserView', view),
    changeViewVol: ({commit}, vol) => commit('changeViewVol', vol),
    changeVolType: ({commit, getters, state}, type) => {
        commit('changeView', {view: 'vols', getters});
        if (type === state.vols.type) return;
        commit('changeVolType', type);
        commit('loadMoreVols', { init: true })
    },
    loadMore: ({commit, getters}, options) => commit(`loadMore${options.type}`, {options, getters}),
    showVol: ({commit, getters}, vol) => {
        commit('changeViewVol', vol);
        commit('changeView', {view: 'volView', getters});
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
    changePlayInfo: ({commit}, options) => commit(options.type === 'ratio' ?
        'changePlayRatio' : 'changePlayVolume', options.value),
    task: ({commit}, task) => {
        switch (task.type) {
            case 'add': return commit('addTask', {task, commit});
            case 'retry': return commit('execTask', {task, commit});
        }
    },
    updateFromDb: ({commit}, remote) => commit('updateFromDb', {remote, commit}),
    updateFromServer: ({commit}, remote) => commit('updateFromServer', {remote, commit}),
    like: ({commit}, {type, data, remote}) => commit('like', {type, data, remote, commit})
}
