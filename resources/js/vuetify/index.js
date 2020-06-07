import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import i18n from '@/i18n'
import '@/sass/overrides.sass'

Vue.use(Vuetify);
const opts = {};

export default new Vuetify(opts);
