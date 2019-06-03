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
                                <input type="text" class="form-control" v-model="nameProd" placeholder="Entre com seu nome">
                            </div>
                            <div class="form-group text-left">
                                <label for="priceProd">Preço</label>
                                <input type="text" class="form-control" v-model="priceProd" placeholder="Entre com o preço">
                            </div>
                            <div class="form-group text-left">
                                <label for="descriptionProd">Entre com a descrição</label>
                                <textarea class="form-control" v-model="descriptionProd" rows="3"></textarea>
                            </div>                
                        </div>
                    </div>

                    {{ nameProd }}
                    {{ priceProd }}
                    {{ descriptionProd }}     

                </form>

            </div>
            

            <div class="col-6 offset-6" v-if="tipo == 'criar'">
                <div class="row">
                    <b-button class="col-5 mt-3 mr-1" block @click="cancelar">Cancelar</b-button>
                    <b-button class="col-5 mt-3 ml-1 btn-danger" block @click="criar">Criar</b-button>
                </div>              
            </div>

            <div class="col-6 offset-6" v-if="tipo == 'editar'">
                <div class="row">
                    <b-button class="col-5 mt-3 mr-1" block @click="cancelar">Cancelar</b-button>
                    <b-button class="col-5 mt-3 ml-1 btn-danger" block @click="atualizar">Atualizar</b-button>
                </div>              
            </div>

            <div class="col-6 offset-6" v-if="tipo == 'deletar'" >
                <div class="row">
                    <b-button class="col-5 mt-3 mr-1" block @click="cancelar">Cancelar</b-button>
                    <b-button class="col-5 mt-3 ml-1 btn-danger" block @click="deletar">Deletar</b-button>
                </div>              
            </div>
            
        </b-modal>       
    </div>
</template>

<script>
export default {
    

    props: ['titulo', 'prod','idmodal', 'texto', 'tipo'],
    data(){
        return {
            nameProd: '',
            priceProd: '',
            descriptionProd: ''

        };
    },
    inject: ['deletarProd', 'cancelarProduto', 'atualizarProduto','criarProduto'],    
    methods: {
        showModal() {
            this.$refs['my-modal'].show();
            //console.log('modal do deletar');
        },
        hideModal() {
            this.$refs['my-modal'].hide()            
        },
        deletar() {
            this.deletarProd();            
            this.hideModal();
            //this.$emit('delete', 'aqui vai vir algo')
        },
        atualizar() {         
            //console.log('primeiro passou no component modal',this.nameProd, this.priceProd, this.descriptionProd);
            this.atualizarProduto(this.nameProd, this.priceProd, this.descriptionProd);
            this.hideModal();
            //console.log(ret, ' resposta ');
        },
        cancelar() {
            this.cancelarProduto();
            this.hideModal();
        },
        criar() {
            this.criarProduto(this.nameProd, this.priceProd, this.descriptionProd);
            this.hideModal();
            console.log('criado o produto');
        }      
    }
}
</script>
