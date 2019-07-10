import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import flex from './assets/js/flexible.js'
import jqsry from './assets/js/jquery.min.js'
import layer from './assets/js/layer.js'
import laydate from './assets/js/laydate.js'
import axios from 'axios'
import wxConfig from './common/wx.js'

Vue.mixin(wxConfig)

Vue.config.productionTip = false

Vue.prototype.shareConfig = {
    title: '关于深圳市P2P平台的情况通告',
    desc: '平台投资人登记入口',
    link: 'http://' + window.location.host + '/h5/luohugongan/luohugongan.php?a=123',
    imgUrl: 'http://' + window.location.host + '/h5/luohugongan/template/fenx.png'
};

Vue.prototype.$axios = axios.create({
    baseURL: '/',
    timeout: 2000,
});

new Vue({
    router,
    store,
    flex,
    jqsry,
    layer,
    laydate,
    render: h => h(App)
}).$mount('#app')
