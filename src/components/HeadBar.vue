<template>
    <div id="headBar">
        <div id="headBarLeft">
            <div
                :style="backStyle()"
                v-on:click="changeView($store.state.preViewStatus)"
            >
                <img
                    :src="'../pic/head-back.svg'"
                />
                <p>返回</p>
            </div>
            <div v-on:click="changeView('vols')">
                <img
                    :src="this.$store.state.viewStatus === 'vols' ?
                        '../pic/head-vol-solid.svg' :
                        '../pic/head-vol-stroked.svg'"
                />
                <p>
                    {{ ($store.state.viewStatus === 'vols' || $store.state.viewStatus === 'singles') ?
                            '期刊' : '首页' }}
                </p>
            </div>
            <div v-on:click="changeView('singles')">
                <img
                    :src="this.$store.state.viewStatus === 'singles' ?
                        '../pic/head-single-solid.svg' :
                        '../pic/head-single-stroked.svg'"
                />
                <p>单曲</p>
            </div>
        </div>
        <div id="headBarLogo">
            <img id="headBarLogoImg" :src="'../pic/logo.png'"/>
            <p id="headBarLogoText">Luoo.qy</p>
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
        name: 'headBar',
        methods: {
            changeView: function (view) {
                if (view === this.$store.state.viewStatus) return;
                this.$store.commit('changeView', view);
            },
            backStyle: function () { return {
                display: (this.$store.state.viewStatus === 'playingTrack' ||
                    this.$store.state.viewStatus === 'user') ?
                        'inline-block' : 'none'
            }}
        }
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
        z-index: 2

        & > div
            height: 100%

    #headBarLeft
        height: 100%

        & > div
            height: 100%
            display: inline-block
            margin-right: 20px
            font-size: 0.9em
            cursor: pointer
            transition: all ease 300ms

            *
                cursor: pointer

            & > img
                height: 60%

    #headBarRight
        height: 100%
        font-size: 0.9em
        cursor: pointer

        *
            cursor: pointer

        & > img
            height: 70%
            width: auto
            border-radius: 100%

    #headBarLogo
        display: flex
        flex-direction: row
        align-items: center
        justify-content: center
        cursor: pointer
        position: absolute
        margin-top: -6px
        left: 40%
        width: 20%

        *
            cursor: pointer

        #headBarLogoImg
            height: 55%
            width: auto
            margin-right: 10px

        #headBarLogoText
            font-size: 1.5em
            letter-spacing: 0.05em
            font-family: "Savoye LET", sans-serif
            position: relative
            top: 3px

</style>