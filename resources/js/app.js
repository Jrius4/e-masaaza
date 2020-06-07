/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');
import Vue from 'vue';
import axios from 'axios';
import 'animate.css/animate.min.css';
import router from './routes/index.js';
import store from './store';

import Form from "./utilities/Form";
window.Form = Form;



// import {BootstrapVue,IconsPlugin} from 'bootstrap-vue';

// Vue.use(BootstrapVue);
// Vue.use(IconsPlugin);
// import Layout from './components/Layout.vue';

// window.axios = require('axios');

// window.Vue = require('vue');

// axios.defaults.headers.common = {
//     'X-Requested-With':'XMLHttpRequest'
// }

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */
//routes
router.beforeEach((to,from,next)=>{
    if(to.matched.some(record=>record.meta.requiresAuth)){
        if(!store.getters.loggedIn){
            next({
                name:'login'
            })
        }else{
            next()
        }
    }else{
        next()
    }
})
Vue.use(axios);
// Vue.use(AuthUser);
// const files = require.context('./', true, /\.vue$/i);
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default));

// Vue.component('example-component', require('./components/ExampleComponent.vue').default);
// Vue.component('vue-layout', require('./components/VueLayout.vue').default);
// Vue.component('profile-component', require('./components/ProfileComponent.vue').default);
// Vue.component('admin-layout',require('./views/Layout/AdminLayout.vue').default)
Vue.component('upload-files', require('./components/common/UploadFiles.vue').default);
/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */
 Vue.component('v-select-file',require('./components/common/SelectFile.vue').default);

// import 'vuetify/dist/vuetify.min.css';
// import '@mdi/font/css/materialdesignicons.css';
// import '@fortawesome/fontawesome-free/css/all.css';
import './plugins/base'
import './plugins/chartist'
import './plugins/vee-validate'
import vuetify from './plugins/vuetify';



import moment from 'moment';
Vue.use(moment);

import App from './components/dashboard/App.vue';

const app = new Vue({
    el: '#app',
    router,
    store,
    vuetify,
    data:{
        eventBus:new Vue()
    },
    render: h => h(App),
});
