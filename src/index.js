import Vue from 'vue';
import App from './components/App.vue';
import { remote, webFrame } from 'electron';


Vue.config.productionTip = false;
const main = remote.require('./main.js');
webFrame.setVisualZoomLevelLimits(1, 1);


new Vue({
    el: '#root',
    template: `<App/>`,
    components: { App },
});
