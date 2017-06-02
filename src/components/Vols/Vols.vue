<template>
    <div id="vols" :style="volsStyle()">
        <Vol
            v-for="vol in this.$store.state.vols"
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
            volsStyle: function () { return {
                display: this.$store.state.viewStatus === 'vols' ?
                    'flex' : 'none'
            }}
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

</style>