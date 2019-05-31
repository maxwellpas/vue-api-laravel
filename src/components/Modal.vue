<template>  
    <div>        
        <b-modal ref="my-modal" :id="idmodal" :title="titulo" hide-footer>            
            <div class="d-block text-center">
                <h3>{{texto}}</h3>
            </div>

            <div class="col-6 offset-6" v-if="!tipo">
                <div class="row">
                    <b-button class="col-5 mt-3 mr-1" block @click="hideModal">Cancelar</b-button>
                    <b-button class="col-5 mt-3 ml-1 btn-danger" block @click="showModal">Atualizar</b-button>
                </div>              
            </div>

            <div class="col-6 offset-6" v-else >
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
        return {};
    },
    inject: ['deletarProd', 'cancelarProduto'],    
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
            //this.$emit('delete', 'aqui vai vir algo')
        },
        cancelar() {
            this.cancelarProduto();
            this.hideModal();
        }      
    }
}
</script>
