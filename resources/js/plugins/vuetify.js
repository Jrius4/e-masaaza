import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import '@mdi/font/css/materialdesignicons.css';
import '@fortawesome/fontawesome-free/css/all.css';
Vue.use(Vuetify);

export default new Vuetify({
    icons:{
        iconfont:'mdi' || 'fa'
    },
    theme:{
        dark:false
    },
    themes:{
        light:{
            primary:'#1471bd',
            secondary:'#1c2136',
            accent:'#f8f7b3',
            error:'#b71c1c',
        }
    }

});
