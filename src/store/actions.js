
import axios from 'axios';


export default {
     
    
    login(context) {
        console.log('veioo aqui store');
        
        axios({
            method: 'post', // verbo http
            url: 'http://localhost:8001/public/api/login', // url
            data: {
                email: 'user@user.com',
                password: 'secret'
            }
        })
        .then(response => {
            context.commit('SET_TOKEN', response.data.token)
            
        })
        .finally((context) => {
            //console.log('chamou o login - na action');
            context.dispatch('buscaProdutos');            
            
            //console.log('chamou o buscaProd - na action');
        })
        .catch(error => {
            console.log("Erro ao fazer login", error)
        })
    },

    buscaProdutos(context) {        
        axios
        .get(
            'http://localhost:8001/public/api/products',            
            {
                headers: {					
                    'Authorization': 'Bearer ' + context.state.token
                }
            }            
        )
        .then( (response) => {				
            let dados = response.data.data;
            context.commit('SET_DADOS_API', dados);
            return dados;
            //console.log('buscaProdutos chamado', dados);
            //context.commit('SET_DADOS_API', dados);
            

        })
        .finally(() => {
            context.state.loading = false;
        })
        .catch( (error) => {
            console.log("Erro ao buscar os produtos", error);

        });

    },

    buscaProdutosPorId(context, payload) {
      
        axios
        .get(
            'http://localhost:8001/public/api/products/' + payload,
            //bodyParameters,
            {
                headers: {					
                    'Authorization': 'Bearer ' + context.state.token
                }
            }
        )
        .then( (response) => {
            //console.log(response.data.data, "trouxe o prodotuo por id");
            context.commit('SET_PRODUTO', response.data.data); // setando os dados do produto buscado por id            

        })
        .finally(() => {
            context.state.loading = false;
        })
        .catch( (error) => {
            console.log("Erro ao buscar os produtos", error);

        });

    },

    produtoEscolher(context, item) {
        context.commit('SET_PRODUTO_ID', item);        

    },
    produtoEscolherEdit(context, payload) {
        //context.commit('SET_PRODUTO_ID', payload);        
        context.dispatch('buscaProdutosPorId', payload);

    },
    produtoCancelar(context) {
        context.commit('SET_PRODUTO_ID', '');        
        //console.log('Cancelando o produto', this.idProduto);

    },
    produtoLimpar(context) {
        context.commit('SET_PRODUTO_LIMPAR', '');                

    },
    deletarProduto(context){
            
        let bodyParameters = {
            "_method" : 'DELETE'
        }

        axios
        .post(
            'http://localhost:8001/public/api/products/' + context.state.produto.id,
            bodyParameters,
            {
                headers: {					
                    'Authorization': 'Bearer ' + context.state.token
                }
            }
        )
        .then( (response) => {
           // console.log('delentando depois da confirmaçcão', response);				
            return context.dispatch('buscaProdutos');
            //this.produtos = response.data.data;
            //this.$emit('deletar', true);

        })
        .catch( (error) => {
            console.log(error);

        });
    },
    atualizarProduto(context, callback) {
        //console.log('chegou no APP', context.state.produto);			        

        let bodyParameters = {
            "_method": "PUT",
            "name" : context.state.produto.name,
            "price": context.state.produto.price,
            "description": context.state.produto.description
        }

        axios
        .post(
            'http://localhost:8001/public/api/products/' + context.state.produto.id,
            bodyParameters,
            {
                headers: {					
                    'Authorization': 'Bearer ' + context.state.token
                }
            }
        )
        .then( (response) => {
            callback(true);
            //console.log('atualizando o produto');				
            return context.dispatch('buscaProdutos');
            
            //this.$emit('atualizarProduto', 'ALTERADO MAX');
            //this.produtos = response.data.data;

        })
        .catch( (error) => {
            callback(false);
            console.log(error);

        });
    },
    criarProduto(context, callback) {
        //let config = this.configHead();

        //console.log(context.state.produto);

        let bodyParameters = {
           // "_method": "POST",
            "name" : context.state.produto.name,
            "price": context.state.produto.price,
            "description": context.state.produto.description
        }

        //console.log(bodyParameters);


        axios
        .post(
            'http://localhost:8001/public/api/products',
            bodyParameters,
            {
                headers: {					
                    'Authorization': 'Bearer ' + context.state.token
                }
            }
        )
        .then( () => {          
            callback(true);
            return context.dispatch('buscaProdutos');
          

        })
        .catch( (error) => { 
            callback(false);
            console.log(error, 'erro ao criarProduto');
            

        });


    }
}