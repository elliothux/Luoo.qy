<template>
    <div id="userCollection">
        <div id="userCollectionHeadBar">
            <div
                v-on:click.stop="changeView('vols')"
                :style="{ borderColor: view === 'vols' ?
                    'white' : 'rgba(0, 0, 0, 0)' }"
            >期刊</div>
            <div
                v-on:click.stop="changeView('tracks')"
                :style="{ borderColor: view === 'tracks' ?
                    'white' : 'rgba(0, 0, 0, 0)' }"
            >期刊单曲</div>
            <div
                v-on:click.stop="changeView('singles')"
                :style="{ borderColor: view === 'singles' ?
                    'white' : 'rgba(0, 0, 0, 0)' }"
            >单曲</div>
        </div>
        <div
            id="userCollectionVol"
            :style="{
                transform: `translateX(${view === 'vols' ?
                    '0' : (view === 'tracks' ? '-100%' : '-200%')
                })`
            }"
        >
            <Vol
                v-for="(vol, index) in $store.getters.likedVols"
                :data="Object.freeze(vol)"
                :type="'likedVol'"
                :index="index"
                :key="`${vol.vol}-${index}`"
            />
        </div>
        <div
            id="userCollectionVolTrack"
            :style="{
                transform: `translateX(${view === 'tracks' ?
                    '0' : (view === 'vols' ? '100%' : '-100%')
                })`
            }"
        >
            <VolTrack
                v-for="(track, index) in $store.getters.likedTracks"
                :data="Object.freeze(track)"
                :type="'likedTrack'"
                :key="`${track.track_id}-${index}`"
                :index="index"
            />
        </div>
        <div
            id="userCollectionSingle"
            :style="{
                transform: `translateX(${view === 'singles' ?
                    '0' : ( view === 'tracks' ? '100%' : '200%')
                })`
            }"
        >
            <Single
                v-for="(single, index) in $store.getters.likedSingles"
                :data="Object.freeze(single)"
                :type="'likedSingle'"
                :index="index"
                :key="`${single.single_id}-${index}`"
            />
        </div>
    </div>
</template>


<script>
    import Vue from 'vue';
    import Vol from '../Vols/Vol.vue';
    import VolTrack from '../VolView/VolTrack.vue';
    import Single from '../Singles/Single.vue';


    export default {
        name: 'userCollection',
        components: { Vol, VolTrack, Single },
        data: function () { return {
            view: 'vols'
        }},
        methods: {
            changeView: function (view) {
                this.view = view
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
        justify-content: flex-start
        transition: all ease 900ms

    #userCollectionSingle
        justify-content: space-between

</style>