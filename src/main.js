import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App.vue'
import Modal from './components/Modal.vue'
//import ModalEdit from './components/ModalEdit.vue'
//import ModalDelete from './components/ModalDelete.vue'

import $ from 'jquery'
window.jQuery = window.$ = $;


Vue.use(BootstrapVue);

Vue.config.productionTip = false

Vue.component('modal', Modal);
//Vue.component('modal-edit', ModalEdit);
//Vue.component('modal-delete', ModalDelete);

// app.js
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


new Vue({
  render: h => h(App),
}).$mount('#app')
