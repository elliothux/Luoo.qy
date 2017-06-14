<template>
    <div
        class="vol"
        :style="volStyle"
        v-on:click.stop="showVol"
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
                    :src="(this.$store.state.play.type === 'vol' &&
                        this.$store.state.play.data.vol === data.vol &&
                        this.$store.state.play.playing) ?
                            '../pic/controller-pause.svg' :
                            '../pic/controller-play.svg'"
                    v-on:click.stop="playVol"
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
        props: ['data', 'index'],
        data: function() { return {
            volStyle: {
                backgroundColor: 'rgba(255, 255, 255, 0.55)'
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
            showVol: function () {
                this.$store.dispatch('showVol', Object.assign(
                    { index: this.index },
                    this.volStyle, this.data));
            },

            playVol: function () {
                const commit = this.$store.commit;
                if (this.$store.state.playingType === 'vol' &&
                    this.$store.state.playingVolData.vol === this.data.vol)
                        return commit('togglePlay');
                commit('play', Object.freeze({
                    type: 'vol',
                    volIndex: this.index,
                    index: 0,
                    url: this.data.tracks[0].url,
                    data: Object.freeze(this.data)
                }));
                commit('changePlayingData', Object.freeze(this.data.tracks[0]))
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