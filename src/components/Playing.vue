K<template>
    <div
        id="playing"
        :style="playingStyle()"
    >
        <div id="playingController">
            <img
                id="playingControllerPre"
                :src="'../pic/controller-pre.svg'"
                v-on:click="control('pre')"
            />
            <img
                id="playingControllerToggle"
                :src="this.$store.state.playing ?
                    '../pic/controller-pause.svg' :
                    '../pic/controller-play.svg'"
                v-on:click="control('toggle')"
            />
            <img
                id="playingControllerNext"
                :src="'../pic/controller-next.svg'"
                v-on:click="control('next')"
            />
        </div>
        <div id="playingOperate">
            <div id="playingOperateLeft">
                <img
                    v-on:click="changePlayingMode"
                    :src="`../pic/play-${['order', 'loop', 'shuffle'][this.$store.state.playingMode]}.svg`"
                />
                <p v-if="this.$store.state.playingAudio &&
                    this.$store.state.playingAudio.readyState > 0">
                    {{ formatTime($store.state.playingAudio.currentTime) }}
                </p>
            </div>
            <div id="playingInfo">
                <p id="playingName">
                    {{ $store.state.playingData ? $store.state.playingData.name : '' }}
                </p>
                <div id="playingTimer">
                    <div></div>
                </div>
                <p id="playingAlbum">
                    <span>
                        {{ $store.state.playingData ? $store.state.playingData.album : '' }}
                    </span>
                    <span v-if="this.$store.state.playingType !== 'single'"> - </span>
                    <span>
                        {{ $store.state.playingData ? $store.state.playingData.artist : '' }}
                    </span>
                </p>
            </div>
            <div id="playingOperateRight">
                <img :src="'../pic/like.svg'"/>
                <p v-if="this.$store.state.playingAudio &&
                    this.$store.state.playingAudio.readyState > 0">
                    {{ formatTime($store.state.playingAudio.duration) }}
                </p>
            </div>
            <div id="playingVolume">
                <img :src="'../pic/volume-on.svg'"/>
                <p>30</p>
            </div>
        </div>
        <div
            id="playingCover"
            :style="playingCoverStyle()"
            v-on:click="showPlayingTrack"
        ></div>
    </div>
</template>


<script>
    import Vue from 'vue';
    import Vuex from 'vuex';

    Vue.use(Vuex);

    export default {
        name: 'playing',
        created: function () {
            this.store.watch(

            )
        },
        methods: {
            playingStyle: function () { return {
                transform: `translateY(${
                    this.$store.state.viewStatus === 'playingTrack' ?
                        '63px' : '0'}`
            }},
            playingCoverStyle: function () { return {
                backgroundImage: `url(${this.$store.state.playingData ?
                    this.$store.state.playingData.cover :
                    '../pic/playing-cover.png'})`
            }},
            formatTime: function (time) {
                const min = `0${parseInt(time / 60)}`;
                const sec = parseInt(time % 60);
                return `${min}:${sec < 10 ? 0 : ''}${sec}`
            },
            changePlayingMode: function () {
                this.$store.commit('changePlayingMode');
            },
            showPlayingTrack: function () {
                if (!this.$store.state.playingData) return;
                this.$store.commit('changeView', 'playingTrack');
            },
            control: function(operate) {
                if (operate === 'toggle')
                    return this.$store.commit('togglePlay');
                else if (operate === 'next')
                    return this.$store.commit('control', 'next');
                else if (operate === 'pre')
                    return this.$store.commit('control', 'pre');
            }
        }
    }
</script>


<style lang="sass" scoped>
    #playing
        width: calc(100% - 20px)
        height: 55px
        position: fixed
        padding: 0 10px 4px 10px
        bottom: 0
        display: flex
        flex-direction: row
        justify-content: space-between
        align-items: center
        transition: all ease 600ms

    #playingController
        height: 100%
        width: 15%
        display: flex
        flex-direction: row
        justify-content: space-between
        align-items: center

    #playingControllerPre, #playingControllerNext
        height: 25%
        width: auto
        cursor: pointer

    #playingControllerToggle
        height: 35%
        width: auto
        position: relative
        left: 3px
        cursor: pointer

    #playingOperate
        width: calc(100% - 15% - 50px - 40px)
        height: 100%
        display: flex
        flex-direction: row
        justify-content: space-between
        align-items: center

    #playingOperateLeft, #playingOperateRight, #playingVolume
        height: 70%
        width: 8%
        position: relative
        top: 5px

        & > img
            height: 45%
            width: auto
            cursor: pointer

        & > p
            font-size: 0.7em
            opacity: 0.5

    #playingVolume > p
        opacity: 1

    #playingInfo
        width: 76%
        height: 100%
        display: flex
        flex-direction: column
        justify-content: space-between

        #playingName
            font-size: 1.1em

        #playingAlbum
            font-size: 0.7em
            opacity: 0.8

        #playingTimer
            width: 100%
            height: 2px
            background-color: rgba(255, 255, 255, 0.25)

            & > div
                width: 20%
                height: 100%
                float: left
                background-color: rgb(255, 255, 255)

    #playingCover
        width: 55px
        height: 55px
        background-size: cover
        box-shadow: 0 0 30px 5px rgba(0,0,0,0.35)
        cursor: pointer
        position: relative
        top: -4px
        transition: all ease 300ms

        &:hover
            transform: scale(1.1)
            box-shadow: none


</style>