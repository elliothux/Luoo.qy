<template>
    <div id="userCollection">
        <h1>{{ $store.state.user.name }}</h1>
    </div>
</template>


<script>
    import Vue from 'vue';
    import Vuex from 'vuex';

    Vue.use(Vuex);

    export default {
        name: 'userCollection'
    }
</script>


<style lang="sass">
    #userCollection
        width: 100%
        height: 100%
        text-align: center
        display: flex
        flex-direction: column
        flex-wrap: wrap
        justify-content: center
        align-items: center
        background-color: aquamarine

</style>