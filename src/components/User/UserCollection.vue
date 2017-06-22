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
                :remote="remote"
            />
            <div
                class="loadMoreCollection"
                :style="{ opacity: $store.state.vols.collectionIndex <
                    $store.state.vols.liked.length ? 1 : 0 }"
            >
                <div @click.stop="loadMore('CollectionVols')">
                    <img :src="'../pic/loadMore-stroked.svg'"/>
                    <p>更多</p>
                </div>
            </div>
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
                :remote="remote"
            />
            <div
                class="loadMoreCollection"
                :style="{ opacity: $store.state.tracks.collectionIndex <
                    $store.state.tracks.liked.length ? 1 : 0 }"
            >
                <div @click.stop="loadMore('CollectionTracks')">
                    <img :src="'../pic/loadMore-stroked.svg'"/>
                    <p>更多</p>
                </div>
            </div>
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
                v-for="(single, index) in  $store.getters.likedSingles"
                :data="Object.freeze(single)"
                :type="'likedSingle'"
                :index="index"
                :key="`${single.single_id}-${index}`"
                :remote="remote"
            />
            <div
                class="loadMoreCollection"
                :style="{ opacity: $store.state.singles.collectionIndex <
                    $store.state.singles.liked.length ? 1 : 0 }"
            >
                <div v-on:click.stop="loadMore('CollectionSingles')">
                    <img :src="'../pic/loadMore-stroked.svg'"/>
                    <p>更多</p>
                </div>
            </div>
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
        props: ['remote'],
        components: { Vol, VolTrack, Single },
        data: function () { return {
            view: 'vols'
        }},
        methods: {
            changeView: function (view) {
                this.view = view
            },
            loadMore: function (type) {
                this.$store.dispatch('loadMore', {type: type})
            }

        }
    }
</script>


<style lang="sass" scoped>
    #userCollection
        width: 100%
        height: calc(100% - 20px)
        margin-top: 20px
        overflow-x: hidden
        transition: all ease 900ms

    #userCollectionHeadBar
        text-align: left
        position: fixed
        margin-left: 5%

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
        padding: 10px 5% 0 5%
        height: calc(100% - 60px)
        position: fixed
        top: 45px
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

    .loadMoreCollection
        width: 100%
        margin: 15px 0 30px 0
        font-weight: 400
        text-align: center

        & > div
            margin-left: 47%
            cursor: pointer
            font-size: 0.9em
            opacity: 0.8
            width: 6%

            &:hover
                opacity: 1

            img
                height: 50%

            *
                cursor: pointer

</style>