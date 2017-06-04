<template>
    <div
        class="vol"
        :style="volStyle"
        v-on:click="showVolView"
    >
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
        props: ['data', 'index'],
        data: () => ({
            volStyle: {
                backgroundColor: 'rgba(255, 255, 255, 0.55)'
            }
        }),
        created: function () {
            const cover = new Image();
            cover.src = this.data.cover;
            cover.onload = function () {
                const color = getAverageColor(cover);
                this.volStyle.backgroundColor = `rgba(${color.r}, ${color.g}, ${color.b}, 0.55)`
            }.bind(this)
        },
        methods: {
            showVolView: function () {
                this.$store.commit(
                    'changeVolViewData',
                    Object.assign(
                        { index: this.index },
                        this.volStyle, this.data
                    )
                );
                this.$store.commit(
                    'changeView',
                    'volView'
                );
                document.getElementById('volView').scrollTop = 0;
                this.$store.state.volViewData &&
                    (document.getElementById('volViewIntro').scrollTop = 0);
            }
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

        *
            cursor: pointer

    .volCover
        width: 100%
        height: auto
        box-shadow: 0 10px 50px 0 rgba(0,0,0,0.50)

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