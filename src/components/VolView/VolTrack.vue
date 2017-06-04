<template>
    <div
        class="track"
        :style="trackStyle"
        v-on:click.stop="showPlayingTrack"
    >
        <div class="trackCoverContainer">
            <img class="trackOperateLike" :src="'../pic/like.svg'"/>
            <img
                class="trackOperateToggle"
                :src="'../pic/controller-play.svg'"
                v-on:click.stop="playTrack"
            />
            <div class="trackCover" :style="trackCoverStyle"/>
        </div>
        <p class="trackName">{{ data.name }}</p>
        <p class="trackAlbum" v-if="data.album !== data.artist">
            {{ data.album }}
        </p>
        <p class="trackArtist">{{ data.artist }}</p>
    </div>
</template>


<script>
    import Vue from 'vue';
    import Vuex from 'vuex';

    Vue.use(Vuex);

    export default {
        name: 'volTrack',
        props: ['data'],
        data: function () { return {
            trackStyle: {
                marginRight: this.data.order % 6 === 0 ?
                    '0' : '3.2%'
            },
            trackCoverStyle: {
                backgroundImage: `url(${this.data.cover})`
            }
        }},
        methods: {
            showPlayingTrack: function () {
                this.playTrack();
                this.$store.commit('changeView', 'playingTrack');
            },
            playTrack: function () {
                this.$store.commit('changePlayingData', this.data);
                this.$store.commit('changePlayingType', 'vol');
                this.$store.commit('play', {
                    type: 'vol',
                    volIndex: this.$store.state.volViewData.index,
                    index: this.data.order - 1,
                    url: this.data.url
                })
            }
        }
    }

</script>


<style lang="sass">
    .track
        width: 14%
        text-align: left
        margin-bottom: 15px
        cursor: pointer
        transition: all ease 600ms

        *
            cursor: pointer

        &:hover
            transform: scale(1.07)
            box-shadow: none

            .trackOperateToggle
                display: block

    .trackCoverContainer
        width: 100%
        height: auto
        position: relative
        box-shadow: 0 10px 30px 0 rgba(0, 0, 0, 0.5)

        & > img
            position: absolute
            z-index: 2

        .trackOperateToggle
            width: 30%
            left: calc(35% + 4px)
            top: 35%
            filter: drop-shadow(0 5px 5px rgba(0, 0, 0, 0.5))
            opacity: 0.9
            display: none

            &:hover
                opacity: 1

        .trackOperateLike
            filter: drop-shadow(0 0 5px rgba(0, 0, 0, 0.5))
            width: 14%
            right: 5%
            bottom: 5%

        .trackCover
            width: 100%
            height: 0
            padding-bottom: 100%
            background-size: cover
            margin-bottom: 8px
            z-index: 1

    .trackName
        font-size: 1em
        margin-bottom: 7px

    .trackAlbum, .trackArtist
        font-size: 0.7em

</style>