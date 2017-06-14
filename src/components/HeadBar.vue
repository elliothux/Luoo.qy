<template>
    <div
        id="headBar"
        :style="{ display: this.$store.state.view.pre === 'types' ? 'none' : 'flex' }"
    >
        <div id="headBarLeft">
            <div
                v-if="this.$store.state.view.pre === 'playingTrack' ||
                    (this.$store.state.view.pre === 'volView' &&
                    this.$store.state.view.prev === 'userCollection')"
                v-on:click.stop="changeView($store.state.view.prev)"
            >
                <img :src="'../pic/head-back.svg'"/>
                <p>返回</p>
            </div>
            <div v-on:click.stop="changeView('vols')">
                <img
                    :src="this.$store.state.view.pre === 'vols' ?
                        '../pic/head-vol-solid.svg' :
                        '../pic/head-vol-stroked.svg'"
                />
                <p>
                    {{ ($store.state.view.pre === 'vols' || $store.state.view.pre === 'singles') ?
                        '期刊' : '首页' }}
                </p>
            </div>
            <div v-on:click.stop="changeView('singles')">
                <img
                    :src="this.$store.state.view.pre === 'singles' ?
                        '../pic/head-single-solid.svg' :
                        '../pic/head-single-stroked.svg'"
                />
                <p>单曲</p>
            </div>
            <div
                v-if="$store.state.view.pre === 'playingTrack' &&
                    $store.state.play.type === 'vol'"
                v-on:click.stop="changeView('source')"
            >
                <img :src="'../pic/head-link.svg'"/>
                <p>来源</p>
            </div>
            <div id="headBarButtons">
                <div
                    v-if="$store.state.view.pre === 'vols'"
                    v-on:click.stop="changeView('types')"
                >
                    <img :src="'../pic/head-type.svg'"/>
                    <span>{{ $store.state.vols.types[$store.state.vols.type][0] }}</span>
                </div>
                <div
                    v-if="this.$store.state.user.name !== '' && $store.state.view.pre.includes('user')"
                    :style="{ borderColor: $store.state.view.pre === 'userCollection' ?
                        'white' : 'rgba(0, 0, 0, 0)' }"
                >
                    <img :src="'../pic/head-collection.svg'"/>
                    <span>收藏</span>
                </div>
                <div
                    v-if="$store.state.view.pre.includes('user')"
                    :style="{ borderColor: $store.state.view.pre === 'userSetting' ?
                        'white' : 'rgba(0, 0, 0, 0)' }"
                >
                    <img :src="'../pic/head-setting.svg'"/>
                    <span>设置</span>
                </div>
            </div>
        </div>
        <div id="headBarLogo">
            <img id="headBarLogoImg" :src="'../pic/logo.png'"/>
            <p id="headBarLogoText">
                {{ $store.state.view.pre === 'volView' ?
                    `vol.${$store.state.view.vol.vol}` : 'Luoo.qy' }}
            </p>
        </div>
        <div
            id="headBarRight"
            v-on:click.stop="changeView('userCollection')"
        >
            <img
                :src="this.$store.state.user.avatar === '' ?
                    '../pic/avatar.png' : this.$store.state.user.avatar"
            />
            <p>
                {{ $store.state.user.name === '' ?
                    '未登录' :
                    $store.state.user.name }}
            </p>
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
                if (view === this.$store.state.view.pre) return;
                if (view === 'source') {
                    setTimeout(function () {
                        if (document.getElementById('volViewIntro')) {
                            document.getElementById('volView').scrollTop = 0;
                            document.getElementById('volViewIntro').scrollTop = 0;
                        }
                    }, 0);
//                    this.$store.dispatch('changeVolViewData',
//                        Object.freeze(this.$store.state.playingVolData));
                    view =  'volView';
                }
                this.$store.dispatch('changeView', view);
            }
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
        flex-direction: row
        justify-content: space-between
        z-index: 3
        font-weight: 400

        & > div
            height: 100%

    #headBarLeft
        display: flex
        flex-direction: row
        align-items: center
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
                filter: drop-shadow(0 0 5px rgba(0, 0, 0, 0.3))

        #headBarButtons
            display: flex
            height: auto
            margin-top: 6px

            & > div
                display: flex
                height: auto
                align-items: center
                border-bottom: 1px solid white
                padding-bottom: 5px
                margin-left: 15px

                span
                    display: inline-block
                    font-size: 1em
                    position: relative
                    left: -4px

                img
                    width: 13px
                    margin-right: 10px
                    position: relative
                    left: 3px

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
            filter: drop-shadow(0 0 5px rgba(0, 0, 0, 0.3))

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
            filter: drop-shadow(0 0 5px rgba(0, 0, 0, 0.3))

        #headBarLogoText
            font-size: 1.5em
            letter-spacing: 0.05em
            font-family: "Savoye LET", sans-serif
            position: relative
            top: 3px
</style>