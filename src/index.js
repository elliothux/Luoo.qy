import Vue from 'vue';
import Vuex from 'vuex';
import App from './components/App.vue';
import { remote, webFrame } from 'electron';


Vue.use(Vuex);
Vue.config.productionTip = false;
webFrame.setVisualZoomLevelLimits(1, 1);
const main = remote.require('./main.js');


new Vue({
    el: '#root',
    template: `<App/>`,
    components: { App },
});
