import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App.vue'
//import Modal from './components/Modal.vue'
//import ModalEdit from './components/ModalEdit.vue'
//import ModalDelete from './components/ModalDelete.vue'
import { Dialog } from 'element-ui'

import $ from 'jquery'
import Teste from './components/Teste.vue'

window.jQuery = window.$ = $;

Vue.use(Dialog);
Vue.use(BootstrapVue);

Vue.config.productionTip = false;

//Vue.component('modal', Modal);
//Vue.component('modal-edit', ModalEdit);
//Vue.component('modal-delete', ModalDelete);
Vue.component('teste', Teste);

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
//import './element-variables.scss'

new Vue({
  render: h => h(App),
}).$mount('#app')
