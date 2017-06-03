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
    </div>
</template>

<script>
    import Vue from 'vue';
    import Vuex from 'vuex';
    import HeadBar from './HeadBar.vue';
    import Playing from './Playing.vue';
    import Vols from './Vols/Vols.vue';
    import Singles from './Singles/Singles.vue';

    Vue.use(Vuex);
    const store = new Vuex.Store({
        state: {
            viewStatus: 'vols',
            vols: [],
            singles: [],
            background: '../pic/background.jpg'
        },
        mutations: {
            changeView: (state, viewStatus) => {
                state.viewStatus = viewStatus
            },
            updateVolsData: (state, data) => {
                state.vols = data
            },
            updateSinglesData: (state, data) => {
                state.singles = data
            },
            setBackground: (state, background) => {
                state.background = background
            }
        }
    });

    export default {
        name: 'app',
        components: { HeadBar, Playing, Vols, Singles },
        props: ['db'],
        store,
        data: function () { return {
            backgroundStyle: function () { return {
                backgroundImage: `url(${this.$store.state.background})`
            }}
        }},
        created: function() {
            this.db.getVolList().then(function (data) {
                this.$store.commit(
                    'updateVolsData',
                    data.slice(0, 20)
                );
                this.$store.commit(
                    'setBackground',
                    data[0].cover
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

</style>
