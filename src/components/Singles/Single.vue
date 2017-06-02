<template>
    <div class="single" :style="singleStyle">
        <div class="singleTop">
            <div class="singleCover">
                <img :src="data.cover"/>
            </div>
            <div class="singleInfo">
                <div class="singleOperate">
                    <img class="singleOperateLike" :src="'../pic/like.svg'"/>
                    <img class="singleOperateToggle" :src="'../pic/controller-play.svg'"/>
                </div>
                <p class="singleInfoName">{{ data.name }}</p>
                <p class="singleInfoArtist">{{ data.artist }}</p>
                <p class="singleInfoDate">
                    <img :src="'../pic/logo.png'"/>
                    <span>{{ data.recommender }}</span> · <span>{{ data.date }}</span>
                </p>
            </div>
        </div>
        <div class="singleBottom">
            <p class="singleDescription">{{ data.description }}</p>
        </div>
    </div>
</template>


<script>
    import Vue from 'vue';
    import Vuex from 'vuex';
    import { getAverageColor } from '../../lib/colorLib';

    Vue.use(Vuex);

    export default {
        name: 'single',
        props: ['data'],
        data: () => ({
            singleStyle: {
                backgroundColor: 'rgba(255, 255, 255, 0.55)'
            }
        }),
        created: function () {
            const cover = new Image();
            cover.src = this.data.cover;
            cover.onload = function () {
                const color = getAverageColor(cover);
                this.singleStyle.backgroundColor = `rgba(${color.r}, ${color.g}, ${color.b}, 0.55)`
            }.bind(this)
        }
    }
</script>


<style lang="sass">
    .single
        width: 47%
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

    .singleTop
        width: 100%
        height: auto
        display: flex
        flex-direction: row
        justify-content: space-between
        align-items: center

    .singleCover
        width: 50%
        height: auto

        & > img
            width: 100%
            height: auto
            box-shadow: 0 10px 50px 0 rgba(0,0,0,0.50)

    .singleInfo
        width: 46%
        height: 100%

        .singleOperate
            margin-bottom: 8px

            & > img
                width: 10%
                height: auto
                cursor: pointer
                transition: all ease 300ms
                opacity: 0.8

                &:hover
                    transform: scale(1)
                    opacity: 1

            .singleOperateLike
                margin-right: 15px



        .singleInfoName
            font-size: 1.2em
            margin-bottom: 1px
            width: 100%
            word-break: break-word

        .singleInfoArtist
            font-size: 0.9em
            opacity: 0.7
            margin-bottom: 8px
            font-weight: 400

        .singleInfoDate
            font-size: 0.6em
            font-weight: 400

            & > img
                width: 6%
                height: auto
                position: relative
                top: 1px
                margin-right: 2px

    .singleBottom
        width: 100%
        display: flex
        justify-items: center

    .singleDescription
        font-size: 0.8em
        width: calc(100% - 40px)
        margin: 15px 20px
        font-weight: 400

</style>