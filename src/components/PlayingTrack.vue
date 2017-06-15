<template>
    <div
        id="playingTrack"
        :class="$store.getters.view === 'playingTrack' ?
            'playingTrackShow' : 'playingTrackHidden'"
        style="z-index: -2;"
    >
        <template v-if="$store.getters.playData">
            <div
                id="playingTrackBackground"
                :style="{ backgroundImage: `url(${ $store.getters.playData.cover})` }"
            />
            <div id="playingTrackLeft">
                <div
                    id="playingTrackCover"
                    :style="{
                        backgroundImage: `url(${$store.getters.playData.cover})`,
                        paddingBottom: this.$store.state.play.type === 'single' ||
                            this.$store.state.play.type === 'likedSingle' ?
                                '70%' : '100%',
                        transform: `scale(${this.$store.state.play.playing ? 1 : 0.9})`,
                        boxShadow: this.$store.state.play.playing ?
                            `0 10px 50px 0 rgba(0,0,0,0.50)` : 'none'

            }"
                />
                <div id="playingTrackController">
                    <img
                        id="playingTrackControllerPre"
                        :src="'../pic/controller-pre.svg'"
                        v-on:click.stop="toggle('prev')"
                    />
                    <img
                        id="playingTrackControllerToggle"
                        :src="this.$store.state.play.playing ?
                            '../pic/controller-pause.svg' :
                            '../pic/controller-play.svg'"
                        v-on:click.stop="toggle('play')"
                    />
                    <img
                        id="playingTrackControllerNext"
                        :src="'../pic/controller-next.svg'"
                        v-on:click.stop="toggle('next')"
                    />
                </div>
                <div id="playingTrackOperate">
                    <div>
                        <img
                            v-on:click.stop="changePlayMode"
                            :src="`../pic/play-${['order', 'shuffle', 'loop'][this.$store.state.play.mode]}.svg`"
                        />
                        <p>
                            {{ ['顺序', '随机', '单曲'][$store.state.play.mode] }}
                        </p>
                    </div>
                    <div>
                        <img
                            :src="`../pic/${$store.state.user.likedTracks.includes(
                                $store.getters.playData.track_id || $store.getters.playData.single_id) ?
                                    'liked' : 'like'}.svg`"
                        />
                        <p>{{ $store.state.user.likedTracks.includes(
                                $store.getters.playData.track_id || $store.getters.playData.single_id) ?
                                    '已喜欢' : '喜欢' }}</p>
                    </div>
                    <div>
                        <img
                            :src="`../pic/volume-${ this.$store.state.play.volume > 0 ? 'on' : 'off'}.svg`"
                            v-on:click.stop="showVolumeController = !showVolumeController"
                        />
                        <p>{{ $store.state.play.volume }}</p>
                        <div
                            id="playingTrackVolumeController"
                            v-if="showVolumeController"
                        >
                            <input
                                class="volumeTrackController"
                                min="0" max="100"
                                step="1" type="range"
                                :value="$store.state.play.volume"
                                v-on:change.stop="changePlayInfo"
                            />
                            <div id="playingTrackVolumeTriangle"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="playingTrackRight">
                <div id="playingTrackInfo">
                    <p id="playingTrackTitle">
                        {{ $store.getters.playData.name }}
                    </p>
                    <p
                        id="playingTrackAlbum"
                        v-if="$store.state.playingType === 'vol'"
                    >
                        {{ $store.getters.playData.album }}
                    </p>
                    <p
                        id="playingTrackArtist"
                        v-if="$store.getters.playData.artist !== $store.getters.playData.album"
                    >
                        {{ $store.getters.playData.artist }}
                    </p>
                </div>
                <div id="lyric">
                    <p>ㄟ(▔,▔)ㄏ 歌词功能正在努力施工中...</p>
                </div>
            </div>
            <div id="playingTrackBottom">
                <span>{{ $store.getters.time.current }}</span>
                <div id="playingTrackTimerContainer">
                    <input
                        min="0" max="100"
                        step="1" type="range"
                        v-on:change.stop="changePlayInfo"
                    />
                    <div id="playingTrackTimer">
                        <div :style="{ width: `${$store.getters.time.ratio }%` }"></div>
                    </div>
                </div>
                <span>{{ $store.getters.time.total }}</span>
            </div>
        </template>
    </div>
</template>


<script>
    import Vue from 'vue';


    export default {
        name: 'playingTrack',
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
            toggle: function(operate) {
                return this.$store.dispatch('toggle', operate);
            },
            changePlayInfo: function (event) {
                return this.$store.dispatch('changePlayInfo', {
                    type: event.target.className === 'volumeTrackController' ?
                        'volume' : 'ratio',
                    value: event.target.value
                })
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
        background-color: #000000

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
        opacity: 0.8

    #playingTrackLeft
        width: 35%
        height: 80%
        display: flex
        flex-direction: column
        justify-content: center
        z-index: 2
        font-weight: 400

        #playingTrackCover
            width: 100%
            height: 0
            padding-bottom: 100%
            margin-bottom: 15%
            background-size: cover
            transition: all ease 800ms

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
                position: relative

                img
                    width: 20%
                    cursor: pointer

                p
                    font-size: 0.7em

            #playingTrackVolumeController
                width: 160px
                height: 36px
                position: absolute
                bottom: -50px
                left: calc(50% - 80px)
                background-color: rgba(255, 255, 255, 0.3)

                & > input
                    cursor: pointer
                    width: 86%
                    height: 100%
                    background-color: transparent

                #playingTrackVolumeTriangle
                    float: left
                    position: absolute
                    top: -10px
                    right: 70px
                    width: 0
                    height: 0
                    border-style: solid
                    border-width: 0 10px 10px 10px
                    border-color: transparent transparent rgba(255, 255, 255, 0.3) transparent

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