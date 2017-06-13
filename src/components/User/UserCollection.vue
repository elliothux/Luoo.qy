<template>
    <div id="userCollection">
        <div id="userCollectionHeadBar">
            <div
                v-on:click.stop="changeView('vol')"
                :style="{ borderColor: this.viewStatus === 'vol' ?
                    'white' : 'rgba(0, 0, 0, 0)' }"
            >期刊</div>
            <div
                v-on:click.stop="changeView('volTrack')"
                :style="{ borderColor: this.viewStatus === 'volTrack' ?
                    'white' : 'rgba(0, 0, 0, 0)' }"
            >期刊单曲</div>
            <div
                v-on:click.stop="changeView('single')"
                :style="{ borderColor: this.viewStatus === 'single' ?
                    'white' : 'rgba(0, 0, 0, 0)' }"
            >单曲</div>
        </div>
        <div
            id="userCollectionVol"
            :style="{
                transform: `translateX(${this.viewStatus === 'vol' ? '0' : (
                    this.viewStatus === 'volTrack' ? '-100%' : '-200%'
                )})`
//                opacity: this.viewStatus === 'vol' ? 1 : 0
            }"
        >
            <Vol
                v-for="(vol, index) in vols"
                :data="Object.freeze(vol)"
                :index="index"
                :key="vol.vol"
            />
        </div>
        <div
            id="userCollectionVolTrack"
            :style="{
                transform: `translateX(${this.viewStatus === 'volTrack' ? '0' : (
                    this.viewStatus === 'vol' ? '100%' : '-100%'
                )})`
            }"
        >
            <VolTrack
                v-for="(track, index) in tracks"
                :data="Object.freeze(track)"
                :key="`${track.vol}-${track.order}`"
                :order="index"
            />
        </div>
        <div
            id="userCollectionSingle"
            :style="{
                transform: `translateX(${this.viewStatus === 'single' ? '0' : (
                    this.viewStatus === 'volTrack' ? '100%' : '200%'
                )})`
            }"
        >
            <h1>single</h1>
        </div>
    </div>
</template>


<script>
    import Vue from 'vue';
    import Vuex from 'vuex';
    import Vol from '../Vols/Vol.vue';
    import VolTrack from '../VolView/VolTrack.vue';

    Vue.use(Vuex);

    export default {
        name: 'userCollection',
        components: { Vol, VolTrack },
        data: function () { return {
            viewStatus: 'vol'
        }},
        computed: {
            vols: function () { return (
                this.$store.state.vols.filter(function (volData) {
                    return this.$store.state.user.likedVols.includes(volData.vol)
                }.bind(this))
            )},
            tracks: function () { return (
                this.$store.state.tracks.filter(function (track) {
                    return this.$store.state.user.likedTracks.includes(track.track_id)
                }.bind(this))
            )}
        },
        methods: {
            changeView: function (view) {
                this.viewStatus = view
            }
        }
    }
</script>


<style lang="sass">
    #userCollection
        width: 100%
        height: 100%

    #userCollectionHeadBar
        text-align: left
        margin-bottom: 35px
        position: fixed

        & > div
            display: inline-block
            font-size: 1.3em
            margin-top: -15px
            margin-right: 25px
            padding: 0 3px 2px 3px
            border-bottom: 1px solid white
            cursor: pointer

    #userCollectionVol, #userCollectionVolTrack, #userCollectionSingle
        width: 90%
        padding: 20px 5% 0 5%
        height: calc(100% - 90px)
        position: fixed
        top: 70px
        left: 0
        overflow-y: auto
        text-align: left
        display: flex
        flex-direction: row
        flex-wrap: wrap
        justify-content: space-between
        transition: all ease 800ms

    #userCollectionVolTrack
        justify-content: flex-start

</style>