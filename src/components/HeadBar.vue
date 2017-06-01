<template>
    <div id="headBar">
        <div id="left">
            <div>
                <img :src="'../pic/head-vol-solid.svg'"/>
                <span>期刊</span>
            </div>
            <div>
                <img :src="'../pic/head-track-stroked.svg'"/>
                <span>单曲</span>
            </div>
        </div>
        <div id="logo">
            <img :src="'../pic/logo.png'"/>
            <img :src="'../pic/logoText.svg'"/>
        </div>
        <div id="right">
            <img :src="'../pic/head-track-stroked.svg'"/>
            <span>抖腿侠</span>
        </div>
    </div>
</template>


<script>
    import Vue from 'vue';
    import Vuex from 'vuex';

    Vue.use(Vuex);

    export default {
        name: 'heaBar',
        props: ['viewStatus'],
        data: () => ({

        })
    }
</script>


<style lang="sass">

</style>