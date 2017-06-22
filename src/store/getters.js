

export default {
    view: state => state.view._[state.view._.length - 1],
    _vols: state => Object.freeze(state.vols.type === 0 ?
        state.vols.data :
        state.vols.data.filter(vol => vol.tag.includes(`#${state.vols.types[state.vols.type][0]}`))
    ),
    vols: (state, getters) => getters._vols.slice(0, state.vols.index),
    likedVols: state => state.vols.liked.slice(0, state.vols.collectionIndex),
    singles: state => state.singles.data.slice(0, state.singles.index),
    likedSingles: state => state.singles.liked.slice(0, state.singles.collectionIndex),
    likedTracks: state => state.tracks.liked.slice(0, state.tracks.collectionIndex),
    playList: (state, getters) => {
        switch (state.play.type) {
            case 'vol': return state.play.vol.tracks;
            case 'single': return getters.singles;
            case 'likedVol': return state.play.vol.tracks;
            case 'likedTrack': return state.tracks.liked;
            case 'likedSingle': return state.singles.liked;
            default: return null;
        }
    },
    playData: (state, getters) => getters.playList ?
        getters.playList[state.play.index] : null,
    time: state => ({
        current: _formatTime(state.play.time.current),
        total: _formatTime(state.play.time.total),
        ratio: Math.ceil(100 * (state.play.time.current / state.play.time.total))
    }),
    task: state => state.tasks.length === 0 ?
            null : state.tasks[state.tasks.length - 1],
    taskText: (state, getters) => {
        if (getters.task) {
            if (getters.task.failed) return '失败, 点击重试';
            return getters.task.text
        }
        return '更新完成'
    }
}



function _formatTime(time) {
    const min = `0${parseInt(time / 60)}`;
    const sec = parseInt(time % 60);
    return `${min}:${sec < 10 ? 0 : ''}${sec}`
}
