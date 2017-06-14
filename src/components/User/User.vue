<template>
    <div
        id="user"
        :class="this.$store.state.view.pre.includes('user') ?
            'userShow' : 'userHidden'"
        style="z-index: -2"
    >
        <UserCollection
            v-if="this.$store.state.user.name !== ''"
        />
        <Login
            v-else
            :login="this.user.login"
            :config="this.config"
        />
    </div>
</template>


<script>
    import Vue from 'vue';
    import Vuex from 'vuex';
    import Login from './Login.vue';
    import UserCollection from './UserCollection.vue';

    Vue.use(Vuex);

    export default {
        name: 'user',
        props: ['user', 'config'],
        components: { Login, UserCollection }
    }
</script>


<style lang="sass" scoped>
    #user
        position: fixed
        width: 90%
        height: calc(100% - 180px)
        top: 80px
        left: 0
        padding: 25px 5% 0 5%
        overflow-y: auto
        text-align: center
        display: flex
        flex-direction: column
        flex-wrap: wrap
        justify-content: center
        align-items: center

    .userShow
        transform: scale(1)
        opacity: 1
        transition: all ease 500ms 350ms

    .userHidden
        transform: scale(0.9)
        opacity: 0
        transition: all ease 500ms 0ms

</style>