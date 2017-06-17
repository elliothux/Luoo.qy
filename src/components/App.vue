<template>
    <div id="app">
        <div
            id="background"
            :style="{ backgroundImage: `url(${this.$store.state.view.vol ?
                this.$store.state.view.vol.cover :
                '../pic/background.jpg'})` }"
        />
        <HeadBar/>
        <Types/>
        <Playing/>
        <Vols/>
        <Singles/>
        <User :remote="remote"/>
        <VolView/>
        <PlayingTrack/>
    </div>
</template>


<script>
    import Vue from 'vue';
    import HeadBar from './HeadBar.vue';
    import Playing from './Playing.vue';
    import Vols from './Vols/Vols.vue';
    import Singles from './Singles/Singles.vue';
    import VolView from './VolView/VolView.vue';
    import PlayingTrack from './PlayingTrack.vue';
    import Types from './Types.vue';
    import User from './User/User.vue';


    export default {
        name: 'app',
        components: { HeadBar, Playing, Vols, Singles, VolView, PlayingTrack, Types, User },
        props: ['remote'],
        created: async function () {
            this.$store.dispatch('updateFromDb', this.remote);
            setTimeout(() => document.getElementById('bootScreen').className = 'bootImageHidden', 1200);
            setTimeout(() => document.getElementById('bootScreen').style.display = 'none', 2000)
        }
    }
</script>


<style lang="sass" scoped>
    #app
        text-align: center
        position: fixed
        width: 100%
        height: 100%
        top: 0
        left: 0
        background-color: #000000
        color: white

        & > *
            z-index: 1

    #background
        width: calc(100% + 120px)
        height: calc(100% + 120px)
        position: fixed
        top: -60px
        left: -60px
        background-size: cover
        filter: blur(30px)
        z-index: -1
        transition: all ease 850ms
        opacity: 0.8

</style>
