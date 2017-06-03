<template>
    <div id="app">
        <div
            id="background"
            :style="backgroundStyle()"
        />
        <HeadBar/>
        <Playing/>
        <Vols/>
        <Singles/>
        <VolView/>
        <PlayingTrack/>
    </div>
</template>

<script>
    import Vue from 'vue';
    import Vuex from 'vuex';
    import HeadBar from './HeadBar.vue';
    import Playing from './Playing.vue';
    import Vols from './Vols/Vols.vue';
    import Singles from './Singles/Singles.vue';
    import VolView from './VolView/VolView.vue';
    import PlayingTrack from './PlayingTrack.vue';


    Vue.use(Vuex);
    const store = new Vuex.Store({
        state: {
            viewStatus: 'vols',
            vols: [],
            singles: [],
            volViewData: null,
            playingData: null,
            playingType: null
        },
        mutations: {
            changeView: (state, viewStatus) => {
                const preView = state.viewStatus;
                state.viewStatus = viewStatus;
                setTimeout(function () {
                    document.getElementById(preView).style.zIndex = -2
                }, 500);
                document.getElementById(viewStatus).style.zIndex = 1;
            },
            changePlayingType: (state, type) => {
                state.playingType = type
            },
            changePlayingData: (state, data) => {
                state.playingData = data
            },
            changeVolViewData: (state, data) => {
                state.volViewData = data
            },
            updateVolsData: (state, data) => {
                state.vols = data
            },
            updateSinglesData: (state, data) => {
                state.singles = data
            }
        }
    });

    export default {
        name: 'app',
        components: { HeadBar, Playing, Vols, Singles, VolView, PlayingTrack },
        props: ['db'],
        store,
        data: function () { return {
            backgroundStyle: function () {
                let background;
                if (this.$store.state.vols.length === 0)
                    background = '../pic/background.jpg';
                else if (this.$store.state.volViewData)
                    background = this.$store.state.volViewData.cover;
                else
                    background = this.$store.state.vols[0].cover;
                return {
                    backgroundImage: `url(${background})`
                }
            }
        }},
        created: function() {
            this.db.getVolList().then(function (data) {
                this.$store.commit(
                    'updateVolsData',
                    data.slice(0, 20)
                );
            }.bind(this));
            this.db.getSingleList().then(function (data) {
                this.$store.commit(
                    'updateSinglesData',
                    data.slice(0, 20)
                )
            }.bind(this));
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

        &>*
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
