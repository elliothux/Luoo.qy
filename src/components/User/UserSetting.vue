<template>
    <div id="userSetting">
        <div id="userSettingHeadBar">
            <div
                v-on:click.stop="changeView('common')"
                :style="{ borderColor: view === 'common' ?
                    'white' : 'rgba(0, 0, 0, 0)' }"
            >通用</div>
            <div
                v-on:click.stop="changeView('about')"
                :style="{ borderColor: view === 'about' ?
                    'white' : 'rgba(0, 0, 0, 0)' }"
            >关于</div>
        </div>
        <div
            id="userSettingCommon"
            :style="{ transform: `translateX(${view === 'common' ?
                '0' : '-100%' })`
            }"
        >
            <h1>Common</h1>
        </div>
        <div
            id="userSettingAbout"
            :style="{ transform: `translateX(${view === 'about' ?
                '0' : '100%'
            })`
        }"
        >
            <h1>About</h1>
        </div>
    </div>
</template>


<script>
    import Vue from 'vue';


    export default {
        name: 'userSetting',
        data: function () { return {
            view: 'common'
        }},
        methods: {
            changeView: function (view) {
                this.view = view
            }
        }
    }
</script>


<style lang="sass" scoped>
    #userSetting
        width: 100%
        height: 100%

        #userSettingHeadBar
            text-align: left
            margin-bottom: 35px
            position: fixed

            & > div
                display: inline-block
                font-size: 1.3em
                margin-top: -15px
                margin-right: 25px
                padding: 0 3px 2px 3px
                border-bottom: 1px solid white
                cursor: pointer

        #userSettingCommon, #userSettingAbout
            width: 90%
            padding: 20px 5% 0 5%
            height: calc(100% - 90px)
            position: fixed
            top: 70px
            left: 0
            overflow-y: auto
            text-align: left
            display: flex
            flex-direction: row
            flex-wrap: wrap
            justify-content: flex-start
            transition: all ease 900ms

</style>