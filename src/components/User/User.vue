<template>
    <div
        id="user"
        :class="$store.getters.view === 'user' ? 'userShow' : 'userHidden'"
        style="z-index: -2"
    >
        <Login
            :remote="this.remote"
            :style="collectionStyle"
            v-if="this.$store.state.user.name === ''"
        />
        <UserCollection
            :style="collectionStyle"
            v-else
        />
        <UserSetting
            :style="settingStyle"
        />
    </div>
</template>


<script>
    import Vue from 'vue';
    import Login from './Login.vue';
    import UserCollection from './UserCollection.vue';
    import UserSetting from './UserSetting.vue';


    export default {
        name: 'user',
        props: ['remote'],
        components: { Login, UserCollection, UserSetting },
        computed: {
            collectionStyle: function () { return {
                transform: `translateX(${this.$store.state.view.user === 'collection' ?
                        '0%' : '-100%'})`
            }},
            settingStyle: function () { return {
                transform: `translateX(${this.$store.state.view.user === 'setting' ?
                    '0%' : '100%'})`
            }}
        }
    }
</script>


<style lang="sass" scoped>
    #user
        position: fixed
        width: 100%
        height: calc(100% - 150px)
        top: 80px
        left: 0
        overflow: hidden
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