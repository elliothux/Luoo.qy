

export default {
    view: state => state.view._[state.view._.length - 1],
    _vols: state => Object.freeze(state.vols.type === 0 ?
        state.vols.data :
        state.vols.data.filter(vol => vol.tag.includes(`#${state.vols.types[state.vols.type][0]}`))
    ),
    vols: (state, getters) => Object.freeze(getters._vols.slice(0, state.vols.index)),
    singles: state => Object.freeze(state.singles.data.slice(0, state.singles.index)),
    likedVols: state => state.vols.data.filter(
        vol => state.user.likedVols.includes(vol.vol)),
    likedTracks: state => state.tracks.data.filter(
        track => state.user.likedTracks.includes(track.track_id)),
    likedSingles: state => state.singles.data.filter(
        single => state.user.likedTracks.includes(single.single_id)),
    playList: (state, getters) => {
        switch (state.play.type) {
            case 'vol': return state.play.vol.tracks;
            case 'single': return getters.singles;
            case 'likedVol': return state.play.vol.tracks;
            case 'likedTrack': return getters.likedTracks;
            case 'likedSingle': return getters.likedSingles;
            default: return null;
        }
    },
    playData: (state, getters) => getters.playList ?
        getters.playList[state.play.index] : null,
    time: state => ({
        current: _formatTime(state.play.time.current),
        total: _formatTime(state.play.time.total),
        ratio: Math.ceil(100 * (state.play.time.current / state.play.time.total))
    })
}



function _formatTime(time) {
    const min = `0${parseInt(time / 60)}`;
    const sec = parseInt(time % 60);
    return `${min}:${sec < 10 ? 0 : ''}${sec}`
}