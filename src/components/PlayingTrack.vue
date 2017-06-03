<template>
    <div
        id="playingTrack"
        :class="this.$store.state.viewStatus === 'playingTrack' ?
            'playingTrackShow' : 'playingTrackHidden'"
        style="z-index: -2;"
    >
        <h1>Hi</h1>
    </div>
</template>


<script>
    import Vue from 'vue';
    import Vuex from 'vuex';

    Vue.use(Vuex);

    export default {
        name: 'playingTrack'
    }
</script>


<style lang="sass" scoped>
    #playingTrack
        position: fixed
        width: 90%
        height: calc(100% - 180px)
        top: 80px
        left: 0
        padding: 25px 5% 0 5%
        background-color: red

    .playingTrackShow
        transform: scale(1)
        opacity: 1
        transition: all ease 500ms 350ms

    .playingTrackHidden
        transform: scale(0.9)
        opacity: 0
        transition: all ease 500ms 0ms

</style>