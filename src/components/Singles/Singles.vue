<template>
    <div
        id="singles"
        :class="this.$store.state.viewStatus === 'singles' ?
            'singlesShow show' : 'singlesHidden hidden'"
    >
        <Single
            v-for="single in this.$store.state.singles"
            :data="single"
            :key="single.date"
        />
    </div>
</template>


<script>
    import Vue from 'vue';
    import Vuex from 'vuex';
    import Single from './Single.vue';

    Vue.use(Vuex);

    export default {
        name: 'singles',
        components: { Single },
        data: function () { return {

        }}
    }
</script>


<style lang="sass" scoped>
    #singles
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

    .singlesShow
        transform: scale(1)
        opacity: 1
        transition: all ease 500ms 300ms

    .singlesHidden
        transform: scale(0.9)
        opacity: 0
        transition: all ease 500ms 0ms

</style>