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
                    :style="playingBackgroundStyle()"
                />
                <div id="playingTrackController">
                    <img id="playingTrackControllerPre" :src="'../pic/controller-pre.svg'"/>
                    <img id="playingTrackControllerToggle" :src="'../pic/controller-play.svg'"/>
                    <img id="playingTrackControllerNext" :src="'../pic/controller-next.svg'"/>
                </div>
                <div id="playingTrackOperate">
                    <div>
                        <img :src="'../pic/play-shuffle.svg'"/>
                        <p>随机</p>
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
                    <p id="playingTrackAlbum">
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
                <span>00:48</span>
                <div id="playingTrackTimer">
                    <div></div>
                </div>
                <span>03:37</span>
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
            }}
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
                width: 8%
                position: relative
                left: 3px
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

            #playingTrackAlbum,#playingTrackArtist
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
            opacity: 0.5

        #playingTrackTimer
            width: 90%
            height: 2px
            background-color: rgba(255, 255, 255, 0.25)

            & > div
                width: 20%
                height: 100%
                float: left
                background-color: rgb(255, 255, 255)

</style>