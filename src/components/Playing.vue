<template>
    <div id="playing">
        <div id="playingController">
            <img id="playingControllerPre" :src="'../pic/controller-pre.svg'"/>
            <img id="playingControllerToggle" :src="'../pic/controller-play.svg'"/>
            <img id="playingControllerNext" :src="'../pic/controller-next.svg'"/>
        </div>
        <div id="playingOperate">
            <div id="playingOperateLeft">
                <img :src="'../pic/play-shuffle.svg'"/>
                <p>00:48</p>
            </div>
            <div id="playingInfo">
                <p id="playingName">Big Fat Mouth</p>
                <div id="playingTimer">
                    <div></div>
                </div>
                <p id="playingAlbum">
                    <span>Janessa Evrist</span> - <span>Fall Apart</span>
                </p>
            </div>
            <div id="playingOperateRight">
                <img :src="'../pic/like.svg'"/>
                <p>03:37</p>
            </div>
            <div id="playingVolume">
                <img :src="'../pic/volume-on.svg'"/>
                <p>30</p>
            </div>
        </div>
        <div id="playingCover" :style="{ backgroundImage: 'url(../pic/playing-cover.png)' }"></div>
    </div>
</template>


<script>
    import Vue from 'vue';
    import Vuex from 'vuex';

    Vue.use(Vuex);

    export default {
        name: 'playing',
        data: () => ({

        })
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


</style>