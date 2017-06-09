<template>
    <div
        id="volView"
        :class="this.$store.state.viewStatus === 'volView' ?
            'volViewShow' : 'volViewHidden'"
        style="z-index: -2;"
    >
        <template v-if="this.$store.state.volViewData">
            <div id="volViewInfo" :style="{
                backgroundColor: this.$store.state.volViewData ?
                    this.$store.state.volViewData.backgroundColor :
                    'rgba(255, 255, 255, 0.55)'
            }">
                <div
                    id="volViewCover"
                    :style="{ backgroundImage: `url(${this.$store.state.volViewData ?
                    this.$store.state.volViewData.cover :
                    'rgba(255, 255, 255, 0.55)'
                    })`
            }"></div>
                <div id="volViewIntro">
                    <div id="volViewIntroContainer">
                        <div id="volViewOperate">
                            <div>
                                <img id="volViewOperateLike" :src="'../pic/like.svg'"/>
                                <img
                                    id="volViewToggle"
                                    :src="(this.$store.state.playing &&
                                        this.$store.state.playingType === 'vol' &&
                                        this.$store.state.playingVolData.vol === this.$store.state.volViewData.vol) ?
                                            '../pic/controller-pause.svg' :
                                            '../pic/controller-play.svg'"
                                    v-on:click.stop="playVol"
                                />
                            </div>
                            <p><span v-for="tag in $store.state.volViewData.tag">
                                &nbsp;&nbsp;&nbsp;&nbsp;{{ tag }}
                            </span></p>
                        </div>
                        <p id="volViewIntroTitle">{{ $store.state.volViewData.title }}</p>
                        <p
                            id="volViewIntroDesc"
                            v-html="$store.state.volViewData.description.slice(4)"
                        />
                        <p id="volViewIntroDate">
                            <img :src="'../pic/logo.png'"/>
                            落在低处・{{ $store.state.volViewData.date }}
                        </p>
                    </div>
                </div>
            </div>
            <div id="tracks">
                <VolTrack
                    v-for="track in $store.state.volViewData.tracks"
                    :data="Object.freeze(track)"
                    :key="`${track.vol}-${track.order}`"
                />
            </div>
        </template>
    </div>
</template>


<script>
    import Vue from 'vue';
    import Vuex from 'vuex';
    import VolTrack from './VolTrack.vue';

    Vue.use(Vuex);

    export default {
        name: 'volView',
        components: { VolTrack },
        methods: {
            playVol: function () {
                const { state, commit } = this.$store;
                if (state.playingType === 'vol' &&
                    state.playingVolIndex === state.volViewData.index)
                    return commit('togglePlay');
                commit('play', Object.freeze({
                    type: 'vol',
                    volIndex: state.volViewData.index,
                    index: 0,
                    url: state.volViewData.tracks[0].url,
                    data: Object.freeze(this.$store.state.volViewData)
                }));
                commit('changePlayingData', Object.freeze(state.volViewData.tracks[0]))
            }
        }
    }
</script>


<style lang="sass" scoped>
    #volView
        position: fixed
        width: 90%
        height: calc(100% - 180px)
        top: 80px
        left: 0
        padding: 25px 5% 0 5%
        overflow-y: auto

    .volViewShow
        transform: scale(1)
        opacity: 1
        transition: all ease 500ms 350ms

    .volViewHidden
        transform: scale(0.9)
        opacity: 0
        transition: all ease 500ms 0ms

    #volViewInfo
        width: 100%
        height: 0
        padding-bottom: 31.8%
        display: flex
        flex-direction: row
        justify-content: space-between
        text-align: left
        box-shadow: 0 10px 50px 0 rgba(0,0,0,0.50)
        overflow: hidden

    #volViewCover
        width: 44%
        height: 0
        padding-bottom: 31.8%
        background-size: cover
        box-shadow: 10px 0 50px 0 rgba(0,0,0,0.50)

    #volViewIntro
        width: 48%
        height: 0
        padding-bottom: 31.8%
        padding-right: 3%
        overflow-y: auto

    #volViewIntroContainer
        margin-bottom: -100%

    #volViewIntroTitle
        font-size: 1.5em
        margin: 10px 0

    #volViewIntroDesc
        font-size: 0.8em
        margin-bottom: 15px
        line-height: 1.49em

    #volViewIntroDate
        font-size: 0.7em
        font-weight: 400
        margin-bottom: 25px

        & > img
            width: 3%
            height: auto
            position: relative
            top: 3px
            margin-right: 2px

    #volViewOperate
        margin-top: 25px
        display: flex
        flex-direction: row
        justify-content: space-between
        align-items: center

        p
            font-size: 0.8em

        & > div
            width: 40%

        img
            width: 10%
            height: auto
            cursor: pointer
            transition: all ease 300ms
            opacity: 0.8

            &:hover
                transform: scale(1)
                opacity: 1

        #volViewOperateLike
            margin-right: 15px
            width: 11.4%

    #tracks
        width: 100%
        height: auto
        margin: 30px 0
        display: flex
        flex-direction: row
        flex-wrap: wrap

</style>