<template>
    <div class="vol" :style="volStyle">
        <img :src="data.cover" class="volCover"/>
        <div class="volInfo">
            <p class="volInfoNum">vol.<span>{{ data.vol }}</span></p>
            <p class="volInfoTitle">{{ data.title }}</p>
            <img class="volPlay" :src="'../pic/controller-play.svg'"/>
        </div>
    </div>
</template>


<script>
    import Vue from 'vue';
    import Vuex from 'vuex';
    import { getAverageColor } from '../../lib/colorLib';

    Vue.use(Vuex);

    export default {
        name: 'vol',
        data: () => ({
            volStyle: {
                backgroundColor: 'rgb(255, 255, 255)'
            }
        }),
        props: ['data'],
        created: function () {
            const cover = new Image();
            cover.src = this.data.cover;
            cover.onload = function () {
                const color = getAverageColor(cover);
                this.volStyle.backgroundColor = `rgba(${color.r}, ${color.g}, ${color.b}, 0.4)`
            }.bind(this)
        }
    }
</script>


<style lang="sass">
    .vol
        width: 28%
        height: auto
        margin-bottom: 50px
        cursor: pointer
        box-shadow: 0 10px 50px 0 rgba(0,0,0,0.50)
        text-align: left
        transition: all ease 600ms
        overflow: hidden

        &:hover
            transform: scale(1.05)
            box-shadow: none

    .volCover
        width: 100%
        height: auto

    .volInfo
        width: calc(100% - 36px)
        padding: 10px 18px
        position: relative

        .volInfoNum
            font-size: 2.5em
            letter-spacing: 0.05em
            font-family: "Savoye LET", sans-serif

        .volInfoTitle
            font-size: 1.3em
            position: relative
            top: -5px

        .volPlay
            width: 18px
            display: inline-block
            cursor: pointer
            transition: all ease 300ms
            opacity: 0.8
            position: absolute
            right: 30px
            top: 20px

            &:hover
                transform: scale(1)
                opacity: 1
</style>