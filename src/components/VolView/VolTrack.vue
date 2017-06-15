<template>
    <div
        class="track"
        :style="trackStyle"
        v-on:click.stop="show"
    >
        <div class="trackCoverContainer">
            <img
                class="trackOperateLike"
                :src="`../pic/${$store.state.user.likedTracks.includes(data.track_id) ?
                    'liked' : 'like'}.svg`"
            />
            <img
                class="trackOperateToggle"
                :src="isThisPlaying ?
                        '../pic/controller-pause.svg' :
                        '../pic/controller-play.svg'"
                v-on:click.stop="play"
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
        props: ['data', 'index', 'type'],
        data: function () { return {
            trackStyle: Object.freeze({
                marginRight: (this.index + 1) % 6 === 0 ?
                    '0' : '3.2%'
            }),
            trackCoverStyle: {
                backgroundImage: `url(${this.data.cover})`
            }
        }},
        methods: {
            show: function () {
                this.$store.dispatch('changeView', 'playingTrack');
                if (!this.isThisPlaying) this.play()
            },
            play: function () {
                const state = this.$store.state;
                state.play.type === this.type &&
                (this.type === 'likedTrack' ||
                state.play.vol.vol === this.data.vol) &&
                state.play.index === this.index ?
                    this.$store.dispatch('toggle', 'play') :
                    this.$store.dispatch('play', Object.freeze({
                        type: this.type,
                        index: this.index,
                        data: this.$store.state.view.vol
                    }))
            }
        },
        computed: {
            isThisPlaying: function () {
                const state = this.$store.state;
                return state.play.playing &&
                    state.play.type === this.type &&
                    (this.type === 'likedTrack' ||
                    state.play.vol.vol === this.data.vol) &&
                    state.play.index === this.index
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
            transform: scale(1.1)

            .trackOperateToggle
                display: block

            .trackCoverContainer
                box-shadow: none

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
        word-break: break-word

    .trackAlbum, .trackArtist
        font-size: 0.7em
        word-break: break-word

</style>