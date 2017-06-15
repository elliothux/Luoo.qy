<template>
    <div id="app">
        <div
            id="background"
            :style="{ backgroundImage: `url(${this.$store.state.volViewData ?
                this.$store.state.volViewData.cover :
                '../pic/background.jpg'})` }"
        />
        <HeadBar/>
        <Types/>
        <!--<Playing/>-->
        <Vols/>
        <Singles/>
        <User :user="this.user" :config="this.config"/>
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
        props: ['db', 'user', 'config'],
        created: function() {
            this.db.vol.get().then(data =>
                this.$store.dispatch('updateData', { type: 'vols', data: data })
            );
            this.db.single.get().then(data =>
                this.$store.dispatch('updateData', { type: 'singles', data: data })
            );
            this.db.track.get().then( data =>
                this.$store.dispatch('updateData', { type: 'tracks', data: data })
            );
            this.$store.dispatch('updateData', { type: 'user', data: this.config.get() })
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
        width: calc(100% + 200px)
        height: calc(100% + 200px)
        position: fixed
        top: -100px
        left: -100px
        background-size: cover
        filter: blur(50px)
        z-index: -1
        transition: all ease 850ms

</style>
