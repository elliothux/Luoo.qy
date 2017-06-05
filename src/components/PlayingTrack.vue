<template>
    <div
        id="playingTrack"
        :class="this.$store.state.viewStatus === 'playingTrack' ?
            'playingTrackShow' : 'playingTrackHidden'"
        style="z-index: -2;"
    >
        <template v-if="$store.state.playingData">
            <div
                id="playingTrackBackground"
                :style="playingBackgroundStyle()"
            />
            <div id="playingTrackLeft">
                <div
                    id="playingTrackCover"
                    :style="playingCoverStyle()"
                />
                <div id="playingTrackController">
                    <img
                        id="playingTrackControllerPre"
                        :src="'../pic/controller-pre.svg'"
                        v-on:click="control('pre')"
                    />
                    <img
                        id="playingTrackControllerToggle"
                        :src="this.$store.state.playing ?
                            '../pic/controller-pause.svg' :
                            '../pic/controller-play.svg'"
                        v-on:click="control('toggle')"
                    />
                    <img
                        id="playingTrackControllerNext"
                        :src="'../pic/controller-next.svg'"
                        v-on:click="control('next')"
                    />
                </div>
                <div id="playingTrackOperate">
                    <div>
                        <img
                            v-on:click="changePlayingMode"
                            :src="`../pic/play-${['order', 'shuffle', 'loop'][this.$store.state.playingMode]}.svg`"
                        />
                        <p>
                            {{ ['顺序', '随机', '循环'][$store.state.playingMode] }}
                        </p>
                    </div>
                    <div>
                        <img :src="'../pic/liked.svg'"/>
                        <p>已喜欢</p>
                    </div>
                    <div>
                        <img :src="'../pic/volume-on.svg'"/>
                        <p>30</p>
                    </div>
                </div>
            </div>
            <div id="playingTrackRight">
                <div id="playingTrackInfo">
                    <p id="playingTrackTitle">
                        {{ $store.state.playingData.name }}
                    </p>
                    <p id="playingTrackAlbum" v-if="$store.state.playingType === 'vol'">
                        {{ $store.state.playingData.album }}
                    </p>
                    <p
                        id="playingTrackArtist"
                        v-if="$store.state.playingData.artist !== $store.state.playingData.album"
                    >
                        {{ $store.state.playingData.artist }}
                    </p>
                </div>
            </div>
            <div id="playingTrackBottom">
                <span>{{ $store.state.playingCurrentTime }}</span>
                <div id="playingTrackTimerContainer">
                    <input
                            min="0" max="100"
                            step="1" type="range"
                            v-on:change.stop="setPlayingTimeRatio"
                    />
                    <div id="playingTrackTimer">
                        <div :style="{ width: `${this.$store.state.playingTimeRatio}%` }"></div>
                    </div>
                </div>
                <span>{{ $store.state.playingDurationTime }}</span>
            </div>
        </template>
    </div>
</template>


<script>
    import Vue from 'vue';
    import Vuex from 'vuex';

    Vue.use(Vuex);

    export default {
        name: 'playingTrack',
        methods: {
            playingBackgroundStyle: function () { return {
                backgroundImage: `url(${this.$store.state.playingData ?
                    this.$store.state.playingData.cover : ''
                })`
            }},
            playingCoverStyle: function () { return {
                backgroundImage: `url(${this.$store.state.playingData ?
                    this.$store.state.playingData.cover : ''
                    })`,
                paddingBottom: this.$store.state.playingType === 'single' ?
                    '70%' : '100%'
            }},
            changePlayingMode: function () {
                this.$store.commit('changePlayingMode');
            },
            control: function(operate) {
                if (operate === 'toggle')
                    return this.$store.commit('togglePlay');
                else if (operate === 'next')
                    return this.$store.commit('control', 'next');
                else if (operate === 'pre')
                    return this.$store.commit('control', 'pre');
            },
            setPlayingTimeRatio: function (event) {
                this.$store.commit('setPlayingTimeRatio', event.target.value)
            }
        }
    }
</script>


<style lang="sass" scoped>
    #playingTrack
        position: fixed
        width: 90%
        height: calc(100% - 23px)
        top: 0
        left: 0
        padding: 25px 5% 0 5%
        display: flex
        flex-direction: row
        justify-content: space-between
        align-items: center

    .playingTrackShow
        transform: scale(1)
        opacity: 1
        transition: all ease 500ms 350ms

    .playingTrackHidden
        transform: scale(0.9)
        opacity: 0
        transition: all ease 500ms 0ms

    #playingTrackBackground
        width: calc(100% + 100px)
        height: calc(100% + 100px)
        position: fixed
        top: -50px
        left: -50px
        background-size: cover
        filter: blur(25px)
        z-index: -1
        transition: all ease 1200ms

    #playingTrackLeft
        width: 35%
        height: 80%
        display: flex
        flex-direction: column
        justify-content: center

        #playingTrackCover
            width: 100%
            height: 0
            padding-bottom: 100%
            box-shadow: 0 10px 50px 0 rgba(0,0,0,0.50)
            margin-bottom: 15%
            background-size: cover
            transition: all ease 1200ms

        #playingTrackController
            height: auto
            width: 100%
            display: flex
            flex-direction: row
            justify-content: space-around
            align-items: center
            margin-bottom: 7%

            #playingTrackControllerPre, #playingTrackControllerNext
                height: auto
                width: 9%
                cursor: pointer

            #playingTrackControllerToggle
                height: auto
                width: 7.5%
                cursor: pointer

        #playingTrackOperate
            height: auto
            width: 100%
            display: flex
            flex-direction: row
            justify-content: space-around
            align-items: center

            & > div
                width: 30%

                img
                    width: 20%
                    cursor: pointer

                p
                    font-size: 0.7em


    #playingTrackRight
        width: 55%
        height: 80%
        display: flex
        flex-direction: column
        justify-content: center
        position: relative
        left: -3%

        #playingTrackInfo
            position: relative
            top: -10%

            #playingTrackTitle
                font-size: 2em

            #playingTrackAlbum, #playingTrackArtist
                font-size: 1em
                opacity: 0.9

    #playingTrackBottom
        width: 94%
        padding: 0 3%
        position: fixed
        bottom: 5px
        left: 0
        display: flex
        flex-direction: row
        justify-content: space-between
        align-items: center

        span
            font-size: 0.8em
            opacity: 0.8

        #playingTrackTimerContainer
            position: relative
            width: 90%

            & > input
                position: absolute
                top: 0
                left: 0
                width: 100%
                height: 100%
                z-index: 2
                opacity: 0
                cursor: pointer

            #playingTrackTimer
                position: absolute
                top: 0
                left: 0
                width: 100%
                height: 2px
                background-color: rgba(255, 255, 255, 0.25)

                & > div
                    height: 100%
                    float: left
                    background-color: rgb(255, 255, 255)


</style>