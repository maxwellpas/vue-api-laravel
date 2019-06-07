<template>

    <div class="container">	
		
        <div class="row">
			<div class="col-12">
				<h1 class="text-center mt-5">API Laravel</h1>
				<h4 class="text-center mb-5">Criar Produto</h4>
			</div>
		</div>

        <pagina-menu></pagina-menu>

        <div class="row">
            <div class="col-md-6 offset-md-3">
                <form ref="formAtualizar">
                      <div class="row">
                        <div class="col-12">
                            <div class="form-group text-left">
                                <label for="nameProd">Nome</label>
                                <input type="text" class="form-control" v-model="produto.name" placeholder="Entre com seu nome">
                            </div>
                            <div class="form-group text-left">
                                <label for="priceProd">Preço</label>
                                <input type="text" class="form-control" v-model="produto.price" placeholder="Entre com o preço">
                            </div>
                            <div class="form-group text-left">
                                <label for="descriptionProd">Entre com a descrição</label>
                                <textarea class="form-control" v-model="produto.description" rows="3"></textarea>
                            </div>                
                        </div>
                        <div class="col-12" v-if='respostaText'>
                            <div :class="respostaCss" role="alert">
                                {{ respostaText }}
                            </div>
                            
                        </div>
                    </div>                                     
                    <b-button class="col-5 mt-3 ml-1 btn-danger" block @click="criar" :disabled="desabilitar">Criar</b-button>
                </form>
            </div>
            
        </div>
        
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import store from '../store/store';

export default {
    data(){
        return {
            respostaText: '',
            respostaCss: '',  
            desabilitar: false       
        };
    },
    created() {
        
        store.commit('SET_PRODUTO', ''); // setando os dados do produto buscado por id                  
        
    },
    computed: {
        ...mapState({
            produto: state => state.produto // foi mapeado do state do store e deopis chamado direto do formulário
        })        
    },
    methods: {
        ...mapActions([				                        
            'criarProduto',
            'produtoLimpar'
        ]),
        criar() {
            this.desabilitar = true;
            this.criarProduto((success) =>{

                if(success){
                    this.respostaCss = 'alert alert-success';
                    this.respostaText = 'Incluído com sucesso!';
                    this.produtoLimpar();

                    setTimeout(() => {                        
                        this.respostaText = "";                    
                    }, 2000);  

                } else {
                    this.desabilitar = false;
                    this.respostaCss = 'alert alert-danger';
                    this.respostaText = 'Error! Verifique o console log';
                }
                
            });
       
            
        }  
    }
}
</script>

<style>

</style>
