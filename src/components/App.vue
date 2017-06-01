<template>
    <div id="app">
        <div id="background" :style="{ backgroundImage: 'url(../pic/background.jpg)' }"/>
        <HeadBar/>
    </div>
</template>

<script>
    import Vue from 'vue';
    import Vuex from 'vuex';
    import HeadBar from './HeadBar.vue';

    Vue.use(Vuex);
    const store = new Vuex.Store({
        state: {
            viewStatus: 'vols',
        },
        mutations: {
            changeView: (state, viewStatus) => {
                state.viewStatus = viewStatus
            }
        }
    });

    export default {
        name: 'app',
        components: { HeadBar },
        data: () => ({

        }),
        store
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
