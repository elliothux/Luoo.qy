K<template>
    <div
        id="playing"
        :style="{
            display: $store.getters.view === 'types' ?
                'none' : 'flex',
            transform: `translateY(${
                $store.getters.view === 'playingTrack' ?
                    '63px' : '0'}` }"
    >
        <div id="playingController">
            <img
                id="playingControllerPre"
                :src="'../pic/controller-pre.svg'"
                v-on:click.stop="toggle('prev')"
            />
            <img
                id="playingControllerToggle"
                :src="$store.state.play.playing ?
                    '../pic/controller-pause.svg' :
                    '../pic/controller-play.svg'"
                v-on:click.stop="toggle('play')"
            />
            <img
                id="playingControllerNext"
                :src="'../pic/controller-next.svg'"
                v-on:click.stop="toggle('next')"
            />
        </div>
        <div id="playingOperate">
            <div id="playingOperateLeft">
                <img
                    v-on:click.stop="changePlayMode"
                    :src="`../pic/play-${['order', 'shuffle', 'loop'][this.$store.state.play.mode]}.svg`"
                />
                <p>{{ $store.getters.time.current }}</p>
            </div>
            <div id="playingInfo">
                <p id="playingName">
                    {{ $store.getters.playData ? $store.getters.playData.name : '-' }}
                </p>
                <div id="playingTimerContainer">
                    <input
                        min="0" max="100"
                        step="1" type="range"
                        v-on:change.stop="changePlayInfo"
                    />
                    <div id="playingTimer">
                        <div :style="{ width: `${$store.getters.time.ratio }%` }"></div>
                    </div>
                </div>
                <p id="playingAlbum">
                    <span>
                        {{ $store.getters.playData ? $store.getters.playData.album : '-' }}
                    </span>
                    <span v-if="this.$store.state.play.type === 'vol'"> - </span>
                    <span>
                        {{ $store.getters.playData ? $store.getters.playData.artist : '' }}
                    </span>
                </p>
            </div>
            <div id="playingOperateRight">
                <img
                    :src="`../pic/${($store.getters.playData && $store.state.user.likedTracks.includes(
                        $store.getters.playData.track_id || $store.getters.playData.single_id)) ?
                            'liked' : 'like'}.svg`"
                />
                <p>{{ $store.getters.time.total }}</p>
            </div>
        </div>
        <div id="playingVolumeContainer">
            <div id="playingVolume">
                <img
                    :src="`../pic/volume-${ this.$store.state.play.volume > 0 ? 'on' : 'off'}.svg`"
                    v-on:click.stop="showVolumeController = !showVolumeController"
                />
                <p>{{ $store.state.play.volume }}</p>
                <div
                    id="playingVolumeController"
                    v-if="showVolumeController"
                >
                    <input
                        class="volumePlayingController"
                        min="0" max="100"
                        step="1" type="range"
                        :value="$store.state.play.volume"
                        v-on:change.stop="changePlayInfo"
                    />
                    <div id="playingVolumeTriangle"></div>
                </div>
            </div>
            <div
                id="playingCover"
                :style="{
                    backgroundImage: `url(${$store.getters.playData ?
                        $store.getters.playData.cover :
                        '../pic/playing-cover.png'})` }"
                v-on:click.stop="showPlayingTrack"
            ></div>
        </div>
    </div>
</template>


<script>
    import Vue from 'vue';
    import Vuex from 'vuex';

    Vue.use(Vuex);

    export default {
        name: 'playing',
        data: function () { return {
            showVolumeController: false,
        }},
        created: function () {
            window.addEventListener('click', function () {
                this.showVolumeController = false;
            }.bind(this))
        },
        methods: {
            changePlayMode: function () {
                this.$store.dispatch('changePlayMode');
            },
            showPlayingTrack: function () {
                if (!this.$store.getters.playData) return;
                this.$store.dispatch('changeView', {view: 'playingTrack'});
            },
            toggle: function(operate) {
                return this.$store.dispatch('toggle', operate);
            },
            changePlayInfo: function (event) {
                return this.$store.dispatch('changePlayInfo', {
                    type: event.target.className === 'volumePlayingController' ?
                        'volume' : 'ratio',
                    value: event.target.value
                })
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
        z-index: 3

    #playingController
        height: 100%
        width: 15%
        display: flex
        flex-direction: row
        justify-content: space-around
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
        justify-content: space-around
        align-items: center

    #playingOperateLeft, #playingOperateRight
        height: 70%
        position: relative
        top: 5px

        & > img
            height: 45%
            width: auto
            cursor: pointer

        & > p
            font-size: 0.7em
            opacity: 0.5
            font-weight: 400

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

        #playingTimerContainer
            position: relative

            & > input
                position: absolute
                top: 0
                left: 0
                width: 100%
                height: 100%
                z-index: 2
                opacity: 0
                cursor: pointer
                transform: scaleY(2)

            #playingTimer
                position: absolute
                top: 0
                left: 0
                width: 100%
                height: 2px
                background-color: rgba(255, 255, 255, 0.25)
                z-index: 1

                & > div
                    height: 100%
                    float: left
                    background-color: rgb(255, 255, 255)

    #playingVolumeContainer
        width: 15%
        height: 100%
        display: flex
        flex-direction: row
        justify-content: space-around
        align-items: center

        #playingVolume
            position: relative
            top: 5px
            height: 70%
            font-weight: 400

            & > img
                height: 45%
                width: auto
                cursor: pointer

            p
                font-size: 0.7em
                opacity: 0.5

            #playingVolumeController
                width: 160px
                height: 36px
                position: absolute
                right: calc(15% + 10px - 80px)
                bottom: 120px
                background-color: rgba(255, 255, 255, 0.3)
                transform: rotate(-90deg)

                & > input
                    cursor: pointer
                    width: 86%
                    height: 100%
                    background-color: transparent

                #playingVolumeTriangle
                    float: left
                    position: absolute
                    bottom: 7px
                    left: -10px
                    width: 0
                    height: 0
                    border-style: solid
                    border-width: 10px 10px 10px 0
                    border-color: transparent rgba(255, 255, 255, 0.3) transparent transparent

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