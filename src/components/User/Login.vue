<template>
    <div id="login">
        <p>登录</p>
        <input v-model="mail" type="text" placeholder="邮 箱"/>
        <input v-model="password" type="password" placeholder="密 码"/>
        <img v-if="this.isLoading" id="loginLoading" :src="'../pic/loading.svg'"/>
        <img
            v-else
            id="loginButton"
            :src="'../pic/head-back.svg'"
            v-on:click.stop="login"
        />
        <a>没有账号? 点击这里注册</a>
    </div>
</template>


<script>
    import Vue from 'vue';


    export default {
        name: 'login',
        props: ['remote'],
        data: function () { return {
            mail: '',
            password: '',
            isLoading: false
        }},
        methods: {
            login: function () {
                if (this.isLoading || this.mail.trim() === '' || this.password.trim() === '') return;
                this.isLoading = true;
                this.remote.user.login(this.mail, this.password).then(async function () {
                    await this.remote.user.getCollection();
                    this.$store.dispatch('updateFromDb', this.remote);
                    this.isLoading = false;
                }.bind(this)).catch(function (error) {
                    this.isLoading = false;
                    console.error(error)
                }.bind(this))
            }
        }
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
        transition: all ease 900ms

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


        #loginButton
            width: 30px
            height: 30px
            margin: 20px 0 80px 0
            cursor: pointer
            transform: rotate(180deg)
            transition: all ease 300ms

            &:hover
                transform: scale(1.1) rotate(-179deg)

        #loginLoading
            width: 30px
            height: 30px
            margin: 20px 0 80px 0
            cursor: pointer
            animation: loading ease-out 800ms infinite

        @keyframes loading
            0%
                transform: rotate(0deg)
            100%
                transform: rotate(180deg)

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