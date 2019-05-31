<template>  
    <div>        
        <b-modal ref="my-modal" id="modal-edit" title="Editar Dados - Modal EDITAR" hide-footer>            
            <div class="d-block text-center">
                <h3>Hello From My Modal!</h3>
            </div>
            <div class="col-6">
                <div class="row">
                    <b-button class="col-5 mt-3 mr-1" block @click="hideModal">Fechar</b-button>
                    <b-button class="col-5 mt-3 ml-1" block @click="hideModal">Alterar</b-button>
                </div>              
            </div>
            
        </b-modal>       
    </div>
</template>

<script>
export default {
    methods: {
        showModal() {
            this.$refs['my-modal'].show();
            console.log('modal do editar');
        },
        hideModal() {
            this.$refs['my-modal'].hide()
            console.log('modal do editar');
        }
    }
    
}
</script>
