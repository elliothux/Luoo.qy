<template>
    <div
        id="singles"
        :class="this.$store.state.viewStatus === 'singles' ?
            'singlesShow show' : 'singlesHidden hidden'"
        style="z-index: -2;"
    >
        <Single
            v-for="(single, index) in this.$store.state.singles.slice(0, this.$store.state.singlesShowIndex)"
            :data="single"
            :index="index"
            :key="single.date"
        />
        <div
            id="loadMoreSingles"
            v-if="this.$store.state.singles.length !== this.$store.state.singlesShowIndex"
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
    import Single from './Single.vue';

    Vue.use(Vuex);

    export default {
        name: 'singles',
        components: { Single },
        methods: {
            loadMore: function () {
                this.$store.commit('loadMoreSingles')
            }
        }
    }
</script>


<style lang="sass" scoped>
    #singles
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

    .singlesShow
        transform: scale(1)
        opacity: 1
        transition: all ease 500ms 350ms

    .singlesHidden
        transform: scale(0.9)
        opacity: 0
        transition: all ease 500ms 0ms

    #loadMoreSingles
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