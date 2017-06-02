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
        <div id="headBarLogo">
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


<style lang="sass" scoped>
    #headBar
        width: 90%
        height: 40px
        position: fixed
        padding: 10px 5%
        top: 10px
        display: flex
        flex-direction: row
        justify-content: space-between

        & > div
            height: 100%

    #headBarLeft
        height: 100%

        & > div
            height: 100%
            display: inline-block
            margin-right: 15px
            font-size: 0.9em
            cursor: pointer

            & > img
                height: 60%

    #headBarRight
        height: 100%
        font-size: 0.9em
        cursor: pointer

        & > img
            height: 70%
            width: auto
            border-radius: 100%

    #headBarLogo
        display: flex
        flex-direction: row
        align-items: center
        cursor: pointer
        position: relative
        top: 8px

    #headBarLogoImg
        height: 90%
        width: auto
        margin-right: 10px

    #headBarLogoText
        height: 60%
        width: auto
        position: relative
        top: 4px

</style>