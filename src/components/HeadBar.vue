<template>
    <div id="headBar">
        <div id="headBarLeft">
            <div>
                <img :src="'../pic/head-vol-solid.svg'"/>
                <p>期刊</p>
            </div>
            <div>
                <img :src="'../pic/head-track-stroked.svg'"/>
                <p>单曲</p>
            </div>
        </div>
        <div>
            <img id="headBarLogoImg" :src="'../pic/logo.png'"/>
            <img id="headBarLogoText" :src="'../pic/logoText.svg'"/>
        </div>
        <div id="headBarRight">
            <img :src="'../pic/avatar.png'"/>
            <p>抖腿侠</p>
        </div>
    </div>
</template>


<script>
    import Vue from 'vue';
    import Vuex from 'vuex';

    Vue.use(Vuex);

    export default {
        name: 'heaBar',
        data: () => ({

        })
    }
</script>


<style lang="sass">
    #headBar
        width: 80%
        height: 60px
        position: fixed
        padding: 10px 10%
        top: 0
        display: flex
        flex-direction: row
        justify-content: space-between

        & > div
            height: 100%

    #headBarLeft
        & > div
            display: inline-block

    #headBarRight
        & > img
            height: 60%
            width: auto
            border-radius: 100%

    #headBarLogoImg
        height: 100%
        width: auto

</style>