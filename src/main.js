import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App.vue'
import store from './store/store'
import Modal from './components/Modal.vue'
//import ModalEdit from './components/ModalEdit.vue'
//import ModalDelete from './components/ModalDelete.vue'

import VueRouter from 'vue-router'
import routes from './routes' // componente onde vai ficar as rotas

import PaginaMenu from './components/PaginaMenu'

import $ from 'jquery'
window.jQuery = window.$ = $;


Vue.use(BootstrapVue);
Vue.use(VueRouter);

Vue.config.productionTip = false

Vue.component('modal', Modal);
Vue.component('pagina-menu', PaginaMenu);

//Vue.component('modal-edit', ModalEdit);
//Vue.component('modal-delete', ModalDelete);

// app.js
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

const router = new VueRouter({
	routes // variavel importada em cima
});

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
