<template>

    <div class="container">	
		
        <div class="row">
			<div class="col-12">
				<h1 class="text-center mt-5">API Laravel</h1>
				<h4 class="text-center mb-5">Faça seu Login</h4>
			</div>
		</div>

        <pagina-menu></pagina-menu>

        <div class="row">
            <div class="col-md-6 offset-md-3">
                <form>
                    <div class="form-group">
                        <label for="email">E-mail</label>
                        <input type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Entre com sua senha">
                        <small id="emailHelp" class="form-text text-muted">Nunca compartilharemos seu e-mail</small>
                    </div>
                    <div class="form-group">
                        <label for="password">Senha</label>
                        <input type="password" class="form-control" id="password" placeholder="Entre com sua senha">
                    </div>                    
                    <button type="submit" class="btn btn-primary">Enviar</button>
                </form>
            </div>
            
        </div>
        
    </div>
</template>

<script>
export default {
    data(){
        return {

        };
    }
}
</script>

<style>

</style>
