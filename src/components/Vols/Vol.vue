<template>
    <div
        class="vol"
        :style="volStyle"
        v-on:click.stop="show"
    >
        <img :src="data.cover" class="volCover"/>
        <div class="volInfo">
            <p class="volInfoNum">vol.<span>{{ data.vol }}</span></p>
            <p class="volInfoTitle">{{ data.title }}</p>
            <div class="volOperate">
                <img
                    class="volLike"
                    :src="$store.state.user.likedVols.includes(data.vol) ?
                    '../pic/liked.svg' :
                    '../pic/like.svg'"
                />
                <img
                    class="volPlay"
                    :src="isThisPlaying ?
                            '../pic/controller-pause.svg' :
                            '../pic/controller-play.svg'"
                    v-on:click.stop="play"
                />
            </div>
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
        props: ['data', 'index', 'type'],
        data: function() { return {
            volStyle: {
                backgroundColor: 'rgba(255, 255, 255, 0.55)',
                marginRight: (this.index + 1) % 3 === 0 ? 0 : '8%'
            }
        }},
        created: function () {
            const cover = new Image();
            cover.src = this.data.cover;
            cover.onload = function () {
                const color = getAverageColor(cover);
                this.volStyle.backgroundColor = `rgba(${color.r}, ${color.g}, ${color.b}, 0.55)`
            }.bind(this)
        },
        methods: {
            show: function () {
                this.$store.dispatch('showVol', Object.freeze(
                    Object.assign(
                        { index: this.index, type: this.type },
                        this.volStyle, this.data)
                ));
            },
            play: function () {
                this.$store.state.play.type === this.type &&
                this.$store.state.play.vol.vol === this.data.vol ?
                    this.$store.dispatch('toggle', 'play') :
                    this.$store.dispatch('play', Object.freeze({
                        type: this.type,
                        data: this.data,
                        index: 0
                    }))
            }
        },
        computed: {
            isThisPlaying: function () {
                const state = this.$store.state;
                return state.play.type === this.type &&
                    state.play.playing &&
                    state.play.vol.vol === this.data.vol
            }
        },
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
        display: inline-block

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


        .volOperate
            position: absolute
            right: 25px
            top: 20px

            & > img
                width: 18px
                height: auto
                margin-left: 15px
                opacity: 0.8

                &:hover
                    opacity: 1

</style>