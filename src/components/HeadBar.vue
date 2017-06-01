<template>
    <img :src="'../pic/head-vol-stroked.svg'"/>
</template>


<script>
    import Vue from 'vue';
    import Vuex from 'vuex';

    Vue.use(Vuex);

    export default {
        name: 'heaBar',
        props: ['viewStatus'],
        data: () => ({

        })
    }
</script>


<style lang="sass">

</style>