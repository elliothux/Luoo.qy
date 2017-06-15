

export default {
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
    playData: (state, getters) => {
        const index = state.play.index;
        switch (state.play.type) {
            case 'vol': return state.play.vol.tracks[index];
            case 'single': return getters.singles[index];
            case 'likedVol': return state.play.vol.tracks[index];
            case 'likedTrack': return getters.likedTracks[index];
            case 'likedSingle': return getters.likedSingles[index];
            default: return null;
        }
    }
}
