<template>
	<div class="container">		
        <modal 
				idmodal="modal-edit" 
				titulo="Editar Dados - Modal EDITAR" 
				texto="Atenção ao alterar o produto"
				tipo="editar"
				>
				</modal>
		<modal 
				idmodal="modal-delete" 
				titulo="Deletando os dados- Modal DELETE" 
				texto="Atenção! Tenha certeza que deseja excluir esse produto?"
				tipo="deletar"
				>
				</modal>

		<modal 
				idmodal="modal-criar" 
				titulo="Criando Produtos- Modal CRIAR" 
				texto="Preencha os campos abaixo para criar o produto."
				dados=""
				tipo="criar"
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
				<button class="btn btn-secondary" v-b-modal.modal-criar>Novo cadastro</button>
			</div>	
		</div>
		<div class="row">
			<div class="col-12">		
				
				<table class="table table-striped">
					<thead>
						<tr>							
							<th scope="col" v-for="(coluna, indice) in ordem.colunas" v-bind:key="indice">
								<a href="#" @click.prevent="ordenar(indice)">
									{{ coluna | ucwords}}
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
								<button class="btn btn-secondary mr-1" @click="produtoEscolher(prod.id)" v-b-modal.modal-edit>edit</button>
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

export default {
	//props: ['proddel'],
	data() {
		return {
			info: null,
			produtos: null,
			token: null,
			busca: '',
			idProduto: '',
			ordem: {
                colunas: ['id', 'name', 'description'],
                orientacao: ['desc', 'desc', 'desc']
            }
		};
	},
	created() {
		this.login();	
	},
	provide() {
		return {
			deletarProd: this.deletarProduto,
			cancelarProduto: this.produtoCancelar,
			atualizarProduto: this.atualizarProduto,
			criarProduto: this.criarProduto		
		};

	},
	computed: {
		dadosSalvos() {			
			let self = this;
			return _.filter(this.dadosOrdenados, function(produtos) {				
				var busca = self.busca.toLowerCase(); // pega os dados dos campos				
                return produtos.name.toLowerCase().indexOf(busca) >= 0;
            });
		},
		dadosOrdenados() {
            return _.orderBy(this.produtos, this.ordem.colunas, this.ordem.orientacao);
        }
	},
	methods: {
		ordenar(indice) {
            this.$set(this.ordem.orientacao, indice, this.ordem.orientacao[indice] == 'desc' ? 'asc' : 'desc')
        },
		configHead() {
			return {
				headers: {					
					'Authorization': 'Bearer ' + this.token
				}
			}
			
		},
		login() {			
			axios({
				method: 'post', // verbo http
				url: 'http://localhost:8001/public/api/login', // url
				data: {
					email: 'user@user.com',
					password: 'secret'
				}
			})
			.then(response => {
				this.token = response.data.token;
				this.buscaProdutos();
			})
			.catch(error => {
				console.log("Erro ao fazer login", error)
			})
		},
		buscaProdutos() {
			let config = this.configHead();

			axios
			.get(
				'http://localhost:8001/public/api/products',
				// bodyParameters,
				config
			)
			.then( (response) => {
				console.log(response.data.data);
				this.produtos = response.data.data;

			})
			.catch( (error) => {
				console.log(error);

			});

		},
		produtoEscolher(item) {
			this.idProduto = item;

		},
		produtoCancelar() {
			this.idProduto = '';			
			console.log('Cancelando o produto', this.idProduto);

		},
		deletarProduto(){
			let config = this.configHead();

			let bodyParameters = {
				"_method" : 'DELETE'
			}

			axios
			.post(
				'http://localhost:8001/public/api/products/' + this.idProduto,
				bodyParameters,
				config
			)
			.then( (response) => {
				console.log(this.idProduto, 'delentando depois da confirmaçcão');				
				this.buscaProdutos();
				//this.produtos = response.data.data;

			})
			.catch( (error) => {
				console.log(error);

			});
		},
		atualizarProduto(name, price, description) {
			//console.log('chegou no APP', name, price, description);			
			
			let config = this.configHead();

			let bodyParameters = {
				"_method": "PUT",
				"name" : name,
				"price": price,
				"description": description
			}

			axios
			.post(
				'http://localhost:8001/public/api/products/' + this.idProduto,
				bodyParameters,
				config
			)
			.then( (response) => {
				//console.log(this.idProduto, 'atualizando o produto');				
				this.buscaProdutos();
				
				//this.$emit('atualizarProduto', 'ALTERADO MAX');
				//this.produtos = response.data.data;

			})
			.catch( (error) => {
				console.log(error);

			});
		},
		criarProduto(name, price, description) {
			let config = this.configHead();

			let bodyParameters = {
				//"_method": "POST",
				"name" : name,
				"price": price,
				"description": description
			}

			console.log(config, bodyParameters);


			axios
			.post(
				'http://localhost:8001/public/api/products',
				bodyParameters,
				config
			)
			.then( (response) => {
				console.log('Produto criado | APP');				
				this.buscaProdutos();
				
				//this.$emit('atualizarProduto', 'ALTERADO MAX');
				//this.produtos = response.data.data;

			})
			.catch( (error) => {
				console.log(error);

			});


		}

	}
}
</script>

<style scoped>
	
</style>

