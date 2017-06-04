<template>
    <div
        id="vols"
        :class="this.$store.state.viewStatus === 'vols' ?
            'volsShow show' : 'volsHidden hidden'"
    >
        <Vol
            v-for="vol in this.$store.state.vols.slice(0, this.$store.state.volsShowIndex)"
            :data="vol"
            :key="vol.vol"
        />
    </div>
</template>


<script>
    import Vue from 'vue';
    import Vuex from 'vuex';
    import Vol from './Vol.vue';

    Vue.use(Vuex);

    export default {
        name: 'vols',
        components: { Vol },
        data: function () { return {

        }}
    }
</script>


<style lang="sass" scoped>
    #vols
        position: fixed
        width: 90%
        height: calc(100% - 180px)
        top: 80px
        left: 0
        padding: 25px 5% 0 5%
        overflow-y: auto
        display: flex
        flex-direction: row
        flex-wrap: wrap
        justify-content: space-between

    .volsShow
        transform: scale(1)
        opacity: 1
        transition: all ease 500ms 350ms

    .volsHidden
        transform: scale(0.9)
        opacity: 0
        transition: all ease 500ms 0ms

</style>