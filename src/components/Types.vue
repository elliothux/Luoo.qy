<template>
    <div
        id="types"
        :class="$store.getters.view === 'types' ?
            'typesShow' : 'typesHidden'"
        style="z-index: -2"
    >
        <template v-for="(type, index) in this.$store.state.vols.types">
            <div
                class="volsType"
                :key="index"
                v-on:click.stop="chooseType(index)"
            >
                <div
                    class="typesCover"
                    :style="{ backgroundImage: `url(../pic/types/${index}.png)` }"
                ></div>
                <p class="volsTypeZh">{{ type[0] }}</p>
                <p class="volsTypeEn">{{ type[1] }}</p>
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
                this.$store.dispatch('changeVolType', index);
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
        height: 33.33%
        background-color: #343434
        display: inline-flex
        flex-direction: column
        justify-content: space-around
        align-items: center
        cursor: pointer
        position: relative
        transition: all ease 400ms

        &:hover
            transform: scale(1.1)
            font-weight: 400
            z-index: 3

            .typesCover
                opacity: 0.8
                filter: none

            p
                z-index: 3

        .typesCover
            width: 100%
            height: 100%
            opacity: 0.5
            background-size: cover
            position: absolute
            left: 0
            top: 0
            transition: all ease 500ms

        .volsTypeZh
            font-size: 2.3em
            letter-spacing: 0.5em
            position: relative
            left: 2%
            margin-top: 20%

        .volsTypeEn
            font-size: 1.3em
            letter-spacing: 0.1em
            margin-bottom: 20%

        *
            cursor: pointer

</style>
