<template>
    <div
        id="types"
        :class="this.$store.state.viewStatus === 'types' ?
            'typesShow' : 'typesHidden'"
    >
        <template
            v-for="(type, index) in this.$store.state.volsTypes"
        >
            <div
                class="volsType"
                v-on:click.stop="chooseType(index)"
            >
                <img :src="`../pic/types/${index % 8}.jpg`"/>
                <div>
                    <p class="volsTypeZh">{{ type[0] }}</p>
                    <div></div>
                    <p class="volsTypeEn">{{ type[1] }}</p>
                </div>
            </div>
        </template>
    </div>
</template>


<script>
    import Vue from 'vue';
    import Vuex from 'vuex';

    Vue.use(Vuex);

    export default {
        name: 'Types',
        methods: {
            chooseType: function (index) {
                this.$store.commit('changeView', 'vols');
                this.$store.commit('setVolsShowType', index);
                setTimeout(() => {
                    document.getElementById('types').scrollTop = 0;
                }, 0)
            }
        }
    }
</script>


<style lang="sass" scoped>
    #types
        position: fixed
        width: 100%
        height: 100%
        left: 0
        top: 0
        overflow-y: auto
        display: block
        text-align: left
        background-color: black

    .typesShow
        transform: scale(1)
        opacity: 1
        transition: all ease 500ms 350ms

    .typesHidden
        transform: scale(0.9)
        opacity: 0
        transition: all ease 500ms 0ms

    .volsType
        width: 33.33%
        height: 0
        padding-bottom: 20%
        margin-bottom: -5px
        background-color: black
        display: inline-block
        cursor: pointer
        position: relative
        transition: all ease 300ms

        &:hover
            z-index: 3
            transform: scale(1.05)

            img
                opacity: 0.9

        & > img
            width: 100%
            height: 100%
            opacity: 0.3
            background-size: cover
            position: absolute
            left: 0
            top: 0
            transition: all ease 600ms

        & > div
            width: 100%
            position: absolute
            top: calc(50% - 50px)

        .volsTypeZh
            width: 100%
            text-align: center
            font-size: 2.3em
            letter-spacing: 0.5em
            position: relative
            left: 2%

        .volsTypeEn
            width: 100%
            text-align: center
            font-size: 1.3em
            letter-spacing: 0.1em

        *
            cursor: pointer

</style>