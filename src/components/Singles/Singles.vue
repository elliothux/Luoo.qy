<template>
    <div id="tracks">
        <Single/>
    </div>
</template>


<script>
    import Vue from 'vue';
    import Vuex from 'vuex';
    import Single from './Single.vue';

    Vue.use(Vuex);

    export default {
        name: 'singles',
        components: { Single }
    }
</script>


<style lang="sass">
    #tracks
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
        background-color: red

</style>