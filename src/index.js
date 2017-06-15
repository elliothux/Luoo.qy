import Vue from 'vue';
import store from './store';
import App from './components/App.vue';
import { remote, webFrame } from 'electron';


Vue.config.productionTip = false;
webFrame.setVisualZoomLevelLimits(1, 1);
const remoteMain = remote.require('./main.js');


new Vue({
    el: '#root',
    store,
    template: `<App :remote="remote"/>`,
    components: { App },
    data: () => ({ remote: remoteMain })
});
