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
            <div @click.stop="set('autoUpdate')">
                <Toggle :on="$store.state.user.autoUpdate"/>
                <span>自动更新</span>
            </div>
            <div @click.stop="set('autoSync')">
                <Toggle :on="$store.state.user.autoSync"/>
                <span>启动时自动同步</span>
            </div>
            <div id="settingOperate">
                <div @click.stop="logout" v-if="$store.state.user.mail">
                    <img :src="'../pic/logout.svg'"/>
                    <span>登出</span>
                </div>
                <div @click.stop="update">
                    <img :src="'../pic/update.svg'"/>
                    <span>检查更新</span>
                </div>
                <div @click.stop="openUrl('http://l.page.中国/')">
                    <img :src="'../pic/website.svg'"/>
                    <span>访问网站</span>
                </div>
                <div @click.stop="openUrl('http://page.中国/')">
                    <img :src="'../pic/page.svg'"/>
                    <span>Page.qy</span>
                </div>
            </div>
        </div>
        <div
            id="userSettingAbout"
            :style="{ transform: `translateX(${view === 'about' ?
                '0' : '100%'
            })`
        }"
        >
            <p>
                版本: V{{ remote.info.version }}<br/>
                上次更新: {{ remote.info.latestUpdate }}
            </p>
            <p>
                Luoo.qy 是独立音乐网站<span class="userSettingLink" @click.stop="openUrl('http://www.luoo.net/')">落网</span>的第三方电脑客户端, 软件内的所有内容均来自于落网。<br/>
                软件基于 Electron、Vue、Node.js、Koa、Python 等开源项目构建, 感谢所有为这些开源项目做出贡献的软将工程师们, 你们的开源项目是 Luoo.qy 的基础!<br/>
                同时, Luoo.qy 开源并将代码托管在 <span class="userSettingLink" @click.stop="openUrl('https://github.com/HuQingyang')">GitHub</span>, 欢迎 Star、提交 Issues 或者参与共同开发。<br/>
                另外, 欢迎关注我的<span class="userSettingLink" @click.stop="openUrl('https://www.zhihu.com/people/hu-qing-yang-67/pins/posts')">知乎</span>向我提出建议或者Bug。<br/>
            </p>
        </div>
    </div>
</template>


<script>
    import Vue from 'vue';
    import Toggle from '../Common/Toggle.vue';


    export default {
        name: 'userSetting',
        props: ['remote'],
        components: { Toggle },
        data: function () { return {
            view: 'common'
        }},
        methods: {
            changeView: function (view) {
                this.view = view
            },
            logout: function () {
                if (this.$store.state.user.mail === '') return;
                if (this.remote.dialog.showMessageBox({
                    type: 'question',
                    buttons: ['取消', '确认'],
                    defaultId: 0,
                    title: '登出',
                    message: '确认登出吗'
                }) === 1) {
                    this.remote.config.init();
                    this.remote.app.relaunch();
                    this.remote.app.exit(0);
                }
            },
            update: function () {
                this.$store.dispatch('checkUpdate', this.remote)
            },
            set: function (key) {
                const option = Object.assign({}, this.$store.state.user);
                option[key] = !option[key];
                this.$store.dispatch('updateData', {
                    type: 'user',
                    data: option
                });
                this.remote.config.set(option)
            },
            openUrl: function (url) {
                this.remote.openURL(url)
            }
        }
    }
</script>


<style lang="sass" scoped>
    #userSetting
        width: 100%
        height: calc(100% - 20px)
        margin-top: 20px
        position: absolute
        overflow-x: hidden
        transition: all ease 900ms

    #userSettingHeadBar
        text-align: left
        position: fixed
        margin-left: 5%

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
        padding: 30px 5% 0 5%
        height: calc(100% - 60px)
        position: fixed
        top: 35px
        left: 0
        overflow-y: auto
        text-align: left
        transition: all ease 900ms

    #userSettingCommon

        *
            cursor: pointer

        & > div
            height: 40px
            display: flex
            flex-direction: row
            flex-wrap: nowrap
            justify-content: flex-start
            align-items: center

            & > span
                display: inline-block
                margin-left: 20px

    #settingOperate
        margin-top: 50px

        & > div
            height: 55px
            display: flex
            flex-direction: column
            justify-content: space-between
            align-items: center
            margin-right: 30px

            img
                width: auto
                height: 42%

    #userSettingAbout p
        margin-bottom: 50px
        line-height: 30px

    .userSettingLink
        border-bottom: solid 1px rgba(255, 255, 255, 0.6)
        cursor: pointer

        &:hover
            border-bottom: solid 1px rgba(255, 255, 255, 1)


</style>