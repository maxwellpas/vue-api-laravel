<template>  
    <div>
        <b-modal ref="my-modal" id="modal-delete" :title="titulo" hide-footer>
            <div class="d-block text-center">
                <h3>Hello From My Modal!</h3>
            </div>
            <div class="col-6 offset-6">
                <div class="row">
                    <b-button class="col-5 mt-3 mr-1" block @click="hideModal">Fechar</b-button>
                    <b-button class="col-5 mt-3 ml-1 btn-danger" block @click="deletar">Deletar</b-button>
                </div>              
            </div>
            
        </b-modal>
    </div>
</template>

<script>
export default {
    props: ['titulo', 'prod'],
    data(){
        return {};
    },
    inject: ['deletarProd'],    
    methods: {
        showModal() {
            this.$refs['my-modal'].show();
            //console.log('modal do deletar');
        },
        hideModal() {
            this.$refs['my-modal'].hide()            
        },
        deletar() {
            console.log('this.prod', this.prod);
            this.$emit('delete', 'aqui vai vir algo')
        }      
    }
    
    
}
</script>
