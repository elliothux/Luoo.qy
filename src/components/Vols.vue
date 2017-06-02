<template>
    <div id="vols">
        <h1>Vols</h1>
    </div>
</template>


<script>
    import Vue from 'vue';
    import Vuex from 'vuex';

    Vue.use(Vuex);

    export default {
        name: 'vols',
        data: () => ({

        })
    }
</script>


<style lang="sass">
    #vols
        position: fixed
        width: 100%
        height: calc(100% - 160px)
        top: 85px

</style>