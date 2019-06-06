<template>  
    <div>        
        <b-modal ref="my-modal" :id="idmodal" :title="titulo" hide-footer>            
            <div class="d-block text-center">
                <h3 class="text-left mb-4">{{texto}}</h3>
                
                <form v-if="(tipo == 'editar') || (tipo == 'criar')" ref="formAtualizar">
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
                    </div>

                </form>

            </div>
            
            <div class="col-12" v-if='respostaText'>
                <div :class="respostaCss" role="alert">
                    {{ respostaText }}
                </div>
                
            </div>
            <div class="col-6 offset-6" v-if="tipo == 'criar'">
                <div class="row">
                    <b-button class="col-5 mt-3 mr-1" block @click="cancelar" :disabled="desabilitar">Cancelar</b-button>
                    <b-button class="col-5 mt-3 ml-1 btn-danger" block @click="criar" :disabled="desabilitar">Criar</b-button>
                </div>              
            </div>

            <div class="col-6 offset-6" v-if="tipo == 'editar'">
                <div class="row">
                    <b-button class="col-5 mt-3 mr-1" block @click="cancelar" :disabled="desabilitar">Cancelar</b-button>
                    <b-button class="col-5 mt-3 ml-1 btn-danger" block @click="atualizar" :disabled="desabilitar">Atualizar</b-button>
                </div>              
            </div>

            <div class="col-6 offset-6" v-if="tipo == 'deletar'">
                <div class="row">
                    <b-button class="col-5 mt-3 mr-1" block @click="cancelar" :disabled="desabilitar">Cancelar</b-button>
                    <b-button class="col-5 mt-3 ml-1 btn-danger" block @click="deletar" :disabled="desabilitar">Deletar</b-button>
                </div>              
            </div>
            
        </b-modal>       
    </div>
</template>

<script>

import { mapActions, mapState } from 'vuex'
import store from '../store/store';


export default {
    

    props: [
        'titulo', 'prod','idmodal', 'texto', 'tipo', 'dados'],
    data(){
        return {
            respostaText: '',
            respostaCss: '',  
            desabilitar: false          
        };
    },
    computed: {
        ...mapState({
            produto: state => state.produto // foi mapeado do state do store e deopis chamado direto do formulário
        }),      
    },
    beforeMount() {
		//console.log('before mount', this)
	},
    /*
    inject: ['deletarProd'], Não é preciso fazer injeção de métodos ou funcoes porque usamos o $parent
    */
    methods: {
    
        ...mapActions([	
			'deletarProduto',
            'atualizarProduto',
            'produtoCancelar', 
			'criarProduto'
        ]),
    
        showModal() {
            this.$refs['my-modal'].show();
            //console.log('modal do deletar');
            
        },
        hideModal() {
            this.$refs['my-modal'].hide()            
        },
        
        deletar() {
            console.log('veio para deletar')
            this.deletarProduto();
            //store.dispatch('deletarProduto');            
            this.hideModal();
            //this.$emit('delete', 'aqui vai vir algo')
        },
        
        atualizar() {
            this.desabilitar = true;         
            
            this.atualizarProduto((success) =>{

                if(success){
                    this.respostaCss = 'alert alert-success';
                    this.respostaText = 'Atualizado com sucesso!';
                    
                    setTimeout(() => {
                        this.hideModal();
                        this.respostaText = "";
                    }, 2000);  

                } else {
                    this.desabilitar = 'false';
                    this.respostaCss = 'alert alert-danger';
                    this.respostaText = 'Error! Verifique o console log';
                }
                
            });

            
            
        },
        cancelar() {
            this.produtoCancelar();
            this.hideModal();
        },
        criar() {
            this.desabilitar = true;
            this.criarProduto((success) =>{

                if(success){
                    this.respostaCss = 'alert alert-success';
                    this.respostaText = 'Incluído com sucesso!';
                    
                    setTimeout(() => {
                        this.hideModal();
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
