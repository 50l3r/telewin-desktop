import Vue from 'vue';
import axios from 'axios';
import toasted from 'vue-toasted';
import moment from 'moment';
import vueMoment from 'vue-moment';
import $ from 'jquery';
import VueTippy, { TippyComponent } from 'vue-tippy';
import DevTools from '@vue/devtools';

import 'bootstrap';

// STYLES
import '@/assets/css/lib/bootstrap.min.css';
import 'tippy.js/dist/tippy.css';
import '@/assets/css/swipe.css';
import '@/assets/css/dark.css';
import '@/assets/css/telewin/login.scss';
import '@/assets/css/telewin/custom.scss';

// ROUTER & STORE
import router from './router';
import store from '../store';

// ERRORS
import errors from '../helpers/errors';
import emails from '../helpers/emails';

if (process.env.NODE_ENV === 'development') {
	DevTools.connect('127.0.0.1', 8098);
}

moment.locale('es');
window.$ = $;


Vue.config.productionTip = false;
Vue.prototype.$http = axios;
Vue.use(vueMoment, { moment });
Vue.use(toasted);
Vue.use(VueTippy);

Vue.component('tippy', TippyComponent);
export {
	Vue, router, store, errors, emails,
};
