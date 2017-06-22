<template>
    <div
        class="track"
        :style="trackStyle"
        v-on:click.stop="show"
    >
        <div class="trackCoverContainer">
            <img
                class="trackOperateLike"
                :src="`../pic/${isThisLiked ? 'liked' : 'like'}.svg`"
                @click.stop="like"
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


    export default {
        name: 'volTrack',
        props: ['data', 'index', 'type', 'remote'],
        methods: {
            show: function () {
                this.$store.dispatch('changeView', {view: 'playingTrack'});
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
            },
            like: function () {
                this.$store.dispatch('like', {
                    type: 'track',
                    data: {
                        id: this.data.track_id,
                        from: this.data.from_id,
                        liked: !this.isThisLiked
                    },
                    remote: this.remote
                })
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
            },
            isThisLiked: function () {
                return this.$store.state.user.likedTracks.includes(this.data.track_id)
            },
            trackStyle: function () { return {
                marginRight: (this.index + 1) % 6 === 0 ?
                    '0' : '3.2%'
            }},
            trackCoverStyle: function () { return {
                backgroundImage: `url(${this.data.cover})`
            }}
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