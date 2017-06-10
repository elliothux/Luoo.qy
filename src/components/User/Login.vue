<template>
    <div id="login">
        <p>登录</p>
        <input type="text" placeholder="邮 箱"/>
        <input type="password" placeholder="密 码"/>
        <img :src="'../pic/head-back.svg'"/>
        <a>没有账号? 点击这里注册</a>
    </div>
</template>


<script>
    import Vue from 'vue';
    import Vuex from 'vuex';

    Vue.use(Vuex);

    export default {
        name: 'login'
    }
</script>


<style lang="sass" scoped>
    #login
        width: 100%
        height: 100%
        text-align: center
        display: flex
        flex-direction: column
        flex-wrap: wrap
        justify-content: center
        align-items: center

        p
            font-size: 2em
            margin-bottom: 30px

        input
            width: 200px
            height: 25px
            line-height: 25px
            padding: 3px 15px
            border-radius: 40px
            border: 1px solid rgba(255, 255, 255, 0.7)
            background-color: rgba(255,255,255,0.1)
            margin-bottom: 20px
            text-align: center
            color: white
            font-size: 0.9em
            transition: all ease 300ms

            &::-webkit-input-placeholder
                color: rgba(255, 255, 255, 0.7)

            &:focus
                transform: scale(1.05)
                background-color: rgba(255,255,255,0)
                box-shadow: 0 3px 32px 0 rgba(0,0,0,0.35)


        img
            transform: rotate(180deg)
            width: 30px
            height: 30px
            margin: 20px 0 80px 0
            cursor: pointer
            transition: all ease 300ms

            &:hover
                transform: scale(1.1) rotate(-181deg)

        a
            position: fixed
            bottom: 15px
            font-size: 0.8em
            opacity: 0.8
            cursor: pointer

            &:hover
                opacity: 1
                text-decoration: underline

</style>