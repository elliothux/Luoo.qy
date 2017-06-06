<template>
    <div
        id="vols"
        :class="this.$store.state.viewStatus === 'vols' ?
            'volsShow' : 'volsHidden'"
    >
        <Vol
            v-for="(vol, index) in this.$store.state.vols.slice(0, this.$store.state.volsShowIndex)"
            :data="vol"
            :index="index"
            :key="vol.vol"
        />
        <div
            id="loadMoreVols"
            v-if="this.$store.state.vols.length !== this.$store.state.volsShowIndex"
        >
            <div v-on:click="loadMore">
                <img :src="'../pic/loadMore-stroked.svg'"/>
                <p>更多</p>
            </div>
        </div>
    </div>
</template>


<script>
    import Vue from 'vue';
    import Vuex from 'vuex';
    import Vol from './Vol.vue';

    Vue.use(Vuex);

    export default {
        name: 'vols',
        components: { Vol },
        methods: {
            loadMore: function () {
                this.$store.commit('loadMoreVols')
            }
        }
    }
</script>


<style lang="sass" scoped>
    #vols
        position: fixed
        width: 90%
        height: calc(100% - 180px)
        top: 80px
        left: 0
        padding: 25px 5% 0 5%
        overflow-y: auto
        display: flex
        flex-direction: row
        flex-wrap: wrap
        justify-content: space-between

    .volsShow
        transform: scale(1)
        opacity: 1
        transition: all ease 500ms 350ms

    .volsHidden
        transform: scale(0.9)
        opacity: 0
        transition: all ease 500ms 0ms

    #loadMoreVols
        width: 100%
        margin: 15px 0 30px 0

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