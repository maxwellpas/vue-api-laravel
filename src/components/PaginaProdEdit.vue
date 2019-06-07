<template>

    <div class="container">	
		
        <div class="row">
			<div class="col-12">
				<h1 class="text-center mt-5">API Laravel</h1>
				<h4 class="text-center mb-5">Alterar Produto</h4>
			</div>
		</div>

        <div class="row">
            <div class="col-md-6 offset-md-3">
                <form>
                    <div class="form-group">
                        <label for="name">Name Product</label>
                        <input type="text" class="form-control" id="name" placeholder="Enter name">                        
                    </div>
                    <div class="form-group">
                        <label for="price">Product price</label>
                        <input type="text" class="form-control" id="price" placeholder="Enter price">                        
                    </div>
                    <div class="form-group">
                        <label for="description">Product description</label>
                        <textarea class="form-control" id="description" rows="3"></textarea>
                    </div>                   
                    <button type="submit" class="btn btn-primary">Enviar</button>
                </form>
            </div>
            
        </div>
        
    </div>
</template>

<script>
export default {
    data() {
        return {

        };
    }
}
</script>

<style>

</style>
