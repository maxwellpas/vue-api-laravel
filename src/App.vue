<template>
	<div class="container">		
        <modal 
				idmodal="modal-edit" 
				titulo="Editar Dados - Modal EDITAR" 
				texto="Hello From My Modal!">
				</modal>
		<modal 
				idmodal="modal-delete" 
				titulo="Deletando os daods- Modal EDITAR" 
				texto="Hello From My Modal!"
				tipo="deletar"
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
			<div class="col-12">		
				<p><input type="text" class="form-control" v-model="busca" placeholder="Digite aqui para fazer sua busca do poduto" ></p>
				<table class="table table-striped">
					<thead>
						<tr>
							<th scope="col">#</th>
							<th scope="col">Name</th>
							<th scope="col">Description</th>
							<th scope="col">Price</th>
							<th scope="col" class="text-center">Actions</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(prod, indice) in dadosSalvos" v-bind:key="indice">
							<th scope="row">{{ indice }}</th>
							<td>{{ prod.name }}</td>
							<td>{{ prod.description }}</td>
							<td>{{ prod.price }}</td>
							<td class="text-center">
								<button class="btn btn-secondary mr-1" :prodedit="prod.id" v-b-modal.modal-edit>edit</button>
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
			idProduto: ''
		};
	},
	created() {
		this.login();	
	},
	provide() {
		return {
			deletarProd: this.deletarProduto,
			cancelarProduto: this.produtoCancelar		
		};

	},
	computed: {
		dadosSalvos() {			
			let self = this;
			return _.filter(this.produtos, function(produtos) {				
				var busca = self.busca.toLowerCase(); // pega os dados dos campos				
                return produtos.name.toLowerCase().indexOf(busca) >= 0;
            });
		},
	},
	methods: {
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
			let config = {
				headers: {
					'Authorization': 'Bearer ' + this.token
				}
			}

			// let bodyParameters = {
			//     product: idProduct
			// }

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
			console.log(this.idProduto, 'delentando depois da confirmaçcão');
		}

	}
}
</script>

<style scoped>
	
</style>

