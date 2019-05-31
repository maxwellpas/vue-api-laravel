<template>  
    <div>
        <modal-delete @delete="testeDeletar" titulo="Atenção! - MODAL DELETAR"></modal-delete>
        <modal-edit></modal-edit>
    </div>
</template>

<script>
export default {
    methods: {
        testeDeletar(teste) {

            console.log('veio no modal', teste)
        }
    }
    
    
    
    
}
</script>

