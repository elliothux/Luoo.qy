<template>
    <div id="app">
        <div
            id="background"
            :style="backgroundStyle()"
        />
        <HeadBar/>
        <Playing/>
        <Vols/>
        <Singles/>
        <VolView/>
        <PlayingTrack/>
    </div>
</template>

<script>
    import Vue from 'vue';
    import Vuex from 'vuex';
    import HeadBar from './HeadBar.vue';
    import Playing from './Playing.vue';
    import Vols from './Vols/Vols.vue';
    import Singles from './Singles/Singles.vue';
    import VolView from './VolView/VolView.vue';
    import PlayingTrack from './PlayingTrack.vue';


    Vue.use(Vuex);
    const store = new Vuex.Store({
        state: {
            viewStatus: 'vols',
            preViewStatus: null,
            vols: [],
            singles: [],
            volsShowIndex: 18,
            singlesShowIndex: 18,
            volViewData: null,
            playingData: null,
            playingType: null,
            playingVolIndex: -1,
            playingIndex: -1,
            playingMode: 0,
            playingAudio: null,
            playingCurrentTime: '00:00',
            playingDurationTime: '00:00',
            playingTimeRatio: 0,
            playingVolume: 80,
            playing: false,
        },
        mutations: {
            changeView: (state, viewStatus) => {
                const preView = state.viewStatus;
                state.viewStatus = viewStatus;
                state.preViewStatus = preView;
                setTimeout(function () {
                    document.getElementById(preView).style.zIndex = -2
                }, 500);
                document.getElementById(viewStatus).style.zIndex = 1;
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
            updateVolsData: (state, data) => {
                state.vols = Object.freeze(data)
            },
            updateSinglesData: (state, data) => {
                state.singles = Object.freeze(data)
            },
            loadMoreVols: (state) => {
                const preIndex = state.volsShowIndex;
                if (preIndex + 18 >= state.vols.length-1)
                    state.volsShowIndex = state.vols.length;
                else state.volsShowIndex = preIndex + 18
            },
            loadMoreSingles: (state) => {
                const preIndex = state.singlesShowIndex;
                if (preIndex + 18 >= state.singles.length-1)
                    state.singlesShowIndex = state.singles.length;
                else state.singlesShowIndex = preIndex + 18
            },
            play: (state, options) => {
                state.playing = true;
                state.playingTimeRatio = 0;
                options.type && (state.playingType = options.type);
                options.type === 'vol' && (state.playingVolIndex = options.volIndex);
                state.playingIndex = options.index;

                if (!state.playingAudio) {
                    state.playingAudio = new Audio();
                    addAudioEvent.bind(this)(state.playingAudio);
                    window.a = state.playingAudio;
                }
                const audio = state.playingAudio;
                audio.pause();
                audio.src = '';
                audio.load();
                audio.src = options.url;
                audio.load();

                function addAudioEvent(audio) {
                    audio.addEventListener('canplay', function (event) {
                        event.target.play()
                    });
                    audio.addEventListener('durationchange', function (event) {
                        this.default.store.commit('updatePlayingInfo', {
                            type: 'duration',
                            value: event.target.duration,
                        });
                    }.bind(this));
                    audio.addEventListener('timeupdate', function (event) {
                        this.default.store.commit('updatePlayingInfo', {
                            type: 'current',
                            value: event.target.currentTime,
                            ratio: Math.ceil(100 * (event.target.currentTime / event.target.duration))
                        });
                    }.bind(this));
                    audio.addEventListener('ended', function () {
                        if (state.playingMode === 2) return audio.play();
                        this.default.store.commit('control', {
                                operate: 'next',
                                scale: [1, parseInt(Math.random() * 50)][state.playingMode]
                        })
                    }.bind(this));
                }
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
                    const playingVolTracks = state.vols[state.playingVolIndex].tracks;
                    index = (state.playingIndex + (operate === 'next' ? 1 : -1) * scale) % playingVolTracks.length;
                    index < 0 && (index = playingVolTracks.length + index);
                    if (state.playingMode === 1 && (index === state.playingIndex || index === state.playingIndex + 1))
                        this.default.store.commit('control', Object.assign(option, { index: option.index + 2 }));
                    this.default.store.commit('play', {
                        index: index,
                        url: playingVolTracks[index].url
                    });
                    return state.playingData = Object.freeze(playingVolTracks[index])
                } else if (state.playingType === 'single') {
                    index = (state.playingIndex + (operate === 'next' ? 1 : -1) * scale) % state.singles.length;
                    index < 0 && (index = state.singles.length + index);
                    if (state.playingMode === 1 && (index === state.playingIndex || index === state.playingIndex + 1))
                        this.default.store.commit('control', Object.assign(option, { index: option.index + 2 }));
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
            }
        }
    });

    export default {
        name: 'app',
        components: { HeadBar, Playing, Vols, Singles, VolView, PlayingTrack },
        props: ['db'],
        store,
        data: function () { return {
            backgroundStyle: function () {
                let background;
                if (this.$store.state.vols.length === 0)
                    background = '../pic/background.jpg';
                else if (this.$store.state.volViewData)
                    background = this.$store.state.volViewData.cover;
                else
                    background = this.$store.state.vols[0].cover;
                return {
                    backgroundImage: `url(${background})`
                }
            }
        }},
        created: function() {
            this.db.getVolList().then(function (data) {
                this.$store.commit('updateVolsData', Object.freeze(data.slice(0, 20)));
            }.bind(this));
            this.db.getSingleList().then(function (data) {
                this.$store.commit('updateSinglesData', Object.freeze(data.slice(0, 20)))
            }.bind(this));
        }
    }
</script>

<style lang="sass" scoped>
    #app
        text-align: center
        position: fixed
        width: 100%
        height: 100%
        top: 0
        left: 0
        background-color: #000000
        color: white

        & > *
            z-index: 1

    #background
        width: calc(100% + 200px)
        height: calc(100% + 200px)
        position: fixed
        top: -100px
        left: -100px
        background-size: cover
        filter: blur(50px)
        z-index: -1
        transition: all ease 850ms

</style>
