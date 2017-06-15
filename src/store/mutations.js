
export default {
    updateData: (state, options) =>
        state[options.type].data = Object.freeze(options.data),
    updateUserData: (state, data) => state.user = data,
    changeView: (state, view) => {
        if (state.view.pre === view) return;
        state.view.prev = state.view.pre;
        state.view.pre = view;
        setTimeout(() => {
            document.getElementById(state.view.prev.includes('user') ?
                'user' : state.view.prev).style.zIndex = -2
        }, 500);
        document.getElementById(state.view.pre.includes('user') ?
            'user' : state.view.pre).style.zIndex = 2;
    },
    changeViewVol: (state, vol) => state.view.vol = vol,
    changeVolType: (state, type) => state.vols.type = type,
    loadMoreVols: (state, options) => {
        if (options.init)
            return state.vols.index = 18;
        const preIndex = state.vols.index;
        if (preIndex + 18 >= options.max)
            state.vols.index = options.max;
        else state.vols.index = preIndex + 18
    },
    loadMoreSingles: (state, options) => {
        if (options.init)
            return state.singles.index = 18;
        const preIndex = state.singles.index;
        if (preIndex + 18 >= state.singles.data.length)
            state.singles.index = state.singles.data.length;
        else state.vols.index = preIndex + 18
    },
    play:(state, {options, getters, commit}) => {
        if (options.type) {
            state.play.type = options.type;
            if (options.type === 'vol' || options.type === 'likedVol')
                state.play.vol = options.data;
        }
        state.play.index = options.index;
        state.play.playing = true;

        if (!state.play.audio) {
            state.play.audio = new Audio();
            addAudioEvent.bind(this)(state.play.audio, getters, commit);
        }
        const audio = state.play.audio;
        audio.pause();
        audio.src = '';
        audio.load();
        audio.src = getters.playData.url;
        audio.load();
    },
    toggle: state => {
        if (!state.play.audio) return;
        if (state.play.playing) {
            state.play.playing = false;
            state.play.audio.pause();
        }
        else
            (state.play.playing = true) && state.play.audio.play();
    },
    control: (state, {type, getters, commit}) => {
        if (!state.play.audio) return;
        let index = state.play.index;
        if (state.play.mode === 1) do {
            index = (index + Math.ceil(Math.random() * 30)) % getters.playList.length;
        } while (index === state.play.index);
        else if (type === 'next')
            index = index + 1 === getters.playList.length ?
                0 : index + 1;
        else index = index - 1 === -1 ?
                getters.playList.length - 1 : index - 1;
        const options = { index : index };
        commit('play', {options, getters})
    },
    changePlayMode: state => state.play.mode === 2 ?
        state.play.mode = 0 : state.play.mode ++,
    updateTime: (state, {type, value}) => state.play.time[type] = value,

}


function addAudioEvent(audio, getters, commit) {
    audio.addEventListener('canplay', event => event.target.play());
    audio.addEventListener('durationchange', event =>
        commit('updateTime', {
            type: 'total',
            value: event.target.duration
        })
    );
    audio.addEventListener('timeupdate', event =>
        commit('updateTime', {
            type: 'current',
            value: event.target.currentTime,
        })
    );
    audio.addEventListener('ended', () =>
        commit('control'), {type: 'next', getters, commit});
}

let temp = {
    changeView: (state, viewStatus) => {
        const preView = state.viewStatus;
        state.viewStatus = viewStatus;
        state.preViewStatus = preView;
        setTimeout(() => {
            document.getElementById(preView).style.zIndex = -2
        }, 500);
        document.getElementById(viewStatus).style.zIndex = 2;
    },
    changePlayingType: (state, type) => {
        state.playingType = type
    },
    changePlayingMode: (state) => {
        let mode = state.playingMode;
        if (mode === 2) mode = 0;
        else mode ++;
        state.playingMode = mode
    },
    changePlayingData: (state, data) => {
        state.playingData = Object.freeze(data)
    },
    changeVolViewData: (state, data) => {
        state.volViewData = Object.freeze(data)
    },
    updateConfig: (state, data) => {
        state.user = Object.freeze(Object.assign({}, state.user, data))
    },
    updateVolsData: (state, data) => {
        state.vols = Object.freeze(data);
        this.default.store.commit('setVolsShowType', 0);
    },
    updateSinglesData: (state, data) => {
        state.singles = Object.freeze(data)
    },
    updateTracksData: (state, data) => {
        state.tracks = Object.freeze(data)
    },
    loadMoreVols: (state, init) => {
        if (init) {
            state.volsShowIndex = 18;
            return document.getElementById('vols').scrollTop = 0;
        }
        const preIndex = state.volsShowIndex;
        if (preIndex + 18 >= state.filteredVols.length - 1)
            state.volsShowIndex = state.filteredVols.length;
        else state.volsShowIndex = preIndex + 18
    },
    loadMoreSingles: (state) => {
        const preIndex = state.singlesShowIndex;
        if (preIndex + 18 >= state.singles.length-1)
            state.singlesShowIndex = state.singles.length;
        else state.singlesShowIndex = preIndex + 18
    },
    togglePlay: (state) => {
        if (state.playing) {
            state.playingAudio.pause();
            state.playing = false;
        }
        else {
            state.playingAudio.play();
            state.playing = true;
        }
    },
    control: (state, option) => {
        let index;
        const { operate, scale } = option;
        if (state.playingType === 'vol') {
            const playingVolTracks = state.playingVolData.tracks;
            index = (state.playingIndex + (operate === 'next' ? 1 : -1) * scale) % playingVolTracks.length;
            index < 0 && (index = playingVolTracks.length + index);
            if (state.playingMode === 1 && (index === state.playingIndex || index === state.playingIndex + 1))
                return this.default.store.commit('control',
                    Object.assign(option, { index: option.index + 2 }));
            this.default.store.commit('play', {
                index: index,
                url: playingVolTracks[index].url
            });
            return state.playingData = Object.freeze(playingVolTracks[index])
        } else if (state.playingType === 'single') {
            index = (state.playingIndex + (operate === 'next' ? 1 : -1) * scale) % state.singles.length;
            index < 0 && (index = state.singles.length + index);
            if (state.playingMode === 1 && (index === state.playingIndex || index === state.playingIndex + 1))
                return this.default.store.commit('control',
                    Object.assign(option, { index: option.index + 2 }));
            this.default.store.commit('play', {
                index: index,
                url: state.singles[index].url
            });
            return state.playingData = Object.freeze(state.singles[index])
        }
    },
    updatePlayingInfo: (state, option) => {
        if (option.type === 'current')
            state.playingCurrentTime = formatTime(option.value);
        else if (option.type === 'duration')
            state.playingDurationTime = formatTime(option.value);
        option.ratio &&
        (state.playingTimeRatio = option.ratio);

        function formatTime(time) {
            const min = `0${parseInt(time / 60)}`;
            const sec = parseInt(time % 60);
            return `${min}:${sec < 10 ? 0 : ''}${sec}`
        }
    },
    setPlayingTimeRatio: (state, value) => {
        state.playingTimeRatio = value;
        state.playingAudio.currentTime = state.playingAudio.duration * value / 100
    },
    setPlayingVolume: (state, volume) => {
        state.playingVolume = volume;
        state.playingAudio && (state.playingAudio.volume = volume / 100);
    },
    setVolsShowType: (state, type) => {
        state.volsShowType = type;
        setTimeout(() => {
            document.getElementById('types').scrollTop = 0;
        }, 0)
    }
}