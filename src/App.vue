<template>	
	<div class="container">	
		
		<modal 
				idmodal="modal-edit" 
				titulo="Editar Dados - Modal EDITAR" 
				texto="Atenção ao alterar o produto"
				tipo="editar"
				:nameProd="nameProd"
				:priceProd="priceProd"
				:descriptionProd="descriptionProd"
				>
				</modal>
		<modal 
				idmodal="modal-delete" 
				titulo="Deletando os dados- Modal DELETE" 
				texto="Atenção! Tenha certeza que deseja excluir esse produto?"
				tipo="deletar"	
				:nameProd="nameProd"
				:priceProd="priceProd"
				:descriptionProd="descriptionProd"				
				>
				</modal>

		<modal 
				idmodal="modal-criar" 
				titulo="Criando Produtos- Modal CRIAR" 
				texto="Preencha os campos abaixo para criar o produto."				
				tipo="criar"
				:nameProd="nameProd"
				:priceProd="priceProd"
				:descriptionProd="descriptionProd"
				>
				</modal>

		<p>Produto a ser deletado {{idProduto}}</p>
		
		<div class="row">
			<div class="col-12">
				<h1 class="text-center mt-5">API Laravel</h1>
				<h4 class="text-center mb-5">Produtos - Listar</h4>
			</div>
		</div>
		<div class="row">
			<div class="col-8">
				<p><input type="text" class="form-control" v-model="busca" placeholder="Digite aqui para fazer sua busca do poduto" ></p>
			</div>
			<div class="col-4">
				<button :disabled="loading" class="btn btn-secondary" v-b-modal.modal-criar>Novo cadastro</button>
			</div>	
		</div>
		<div class="row">
			<div class="col-12">		

				<div v-if="loading" class="container">
					<h1>Carregando...</h1>
				</div>
				
				<table v-else class="table table-striped">
					<thead>
						<tr>							
							<th scope="col" v-for="(coluna, indice) in ordem.colunas" v-bind:key="indice">
								<a href="#" @click.prevent="ordenar(indice)">
									{{ coluna }}
								</a>
							</th>
							
							<th scope="col">Price</th>
							<th scope="col" class="text-center">Actions</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(prod, indice) in dadosSalvos" v-bind:key="indice">
							<th scope="row">{{ (prod.id) }}</th>
							<td>{{ prod.name }}</td>
							<td>{{ prod.description }}</td>
							<td>{{ prod.price }}</td>
							<td class="text-center">
								<button class="btn btn-secondary mr-1" @click="produtoEscolherEdit(prod.id)" v-b-modal.modal-edit>edit</button>
								<button class="btn btn-danger" @click="produtoEscolher(prod.id)" v-b-modal.modal-delete>delete</button>
							</td>
						</tr>
					</tbody>
				</table>

			</div>
		</div>



	</div>	
</template>

<script>
import axios from 'axios';
import _ from 'lodash';
import store from './store/store';

import { mapActions } from 'vuex'

export default {
	//props: ['proddel'],
	data() {
		return {			
			info: null,
			busca: '',		
			idProduto: '',
			ordem: {
                colunas: ['id', 'name', 'description'],
                orientacao: ['desc', 'desc', 'desc']
			}			
		};
	},
	created() {
		store.dispatch('login');	
		///this.login();
		//console.log('created app', produtos);
	},	
	provide() {
		return {};
	},
	computed: {
		dadosSalvos() {			
			let self = this;
			return _.filter(this.dadosOrdenados, function(produtos) {				
				var busca = self.busca.toLowerCase(); // pega os dados dos campos				
                return (produtos.name.toLowerCase().indexOf(busca) >= 0) || (produtos.description.toLowerCase().indexOf(busca) >= 0);
            });
		},
		dadosOrdenados() {
            return _.orderBy(this.dadosApi, this.ordem.colunas, this.ordem.orientacao);
		},		
		loading() {
			return store.state.loading;
		},
		dadosApi(){	
			if(store.state.dadosApi == ""){
				return store.dispatch('buscaProdutos'); 
			}

			return store.state.dadosApi;				
		},
		nameProd: () => store.state.produto.name,
		priceProd: () => store.state.produto.price,
		descriptionProd: () => store.state.produto.description,
		
		
	},
	methods: {
		/**
		...mapActions([
			'buscaProdutos', 
			'buscaProdutosPorId', 
			'produtoEscolher', 
			'produtoEscolherEdit', 
			'produtoCancelar', 
			'deletarProduto',
			'atualizarProduto',
			'criarProduto'
		]),
		 */
		produtoEscolherEdit(payload) {
			console.log(payload);	
			store.dispatch('produtoEscolherEdit', payload);
		},
		ordenar(indice) {
            this.$set(this.ordem.orientacao, indice, this.ordem.orientacao[indice] == 'desc' ? 'asc' : 'desc')
		},

	}
}
</script>

<style scoped>
	
</style>

