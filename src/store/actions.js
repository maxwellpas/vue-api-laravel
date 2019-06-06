
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
            console.log('chamou o login - na action');
            context.dispatch('buscaProdutos');            
            
            console.log('chamou o buscaProd - na action');
        })
        .catch(error => {
            console.log("Erro ao fazer login", error)
        })
    },

    buscaProdutos(context) {
        
        //let config = context.dispatch('configHead');
        /*
        let auth = { headers: {					
            'Authorization': 'Bearer ' + state.token
        }}
        */
        console.log('foi chamdo a partir do login', context.state.token);

        axios
        .get(
            'http://localhost:8001/public/api/products',
            // bodyParameters,
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
            state.loading = false;
        })
        .catch( (error) => {
            console.log("Erro ao buscar os produtos", error);

        });

    },

    buscaProdutosPorId(context) {
      
        axios
        .get(
            'http://localhost:8001/public/api/products/' + context.state.produtos.id,
            //bodyParameters,
            {
                headers: {					
                    'Authorization': 'Bearer ' + context.state.token
                }
            }
        )
        .then( (response) => {
            console.log(response.data.data, "trouxe o prodotuo por id");
            context.state.produtos.name = response.data.data.name;
            context.state.produtos.price = response.data.data.price;
            context.state.produtos.description = response.data.data.description;

            //console.log(this.nameProd);

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
    produtoEscolherEdit(context, item) {
        context.commit('SET_PRODUTO_ID', item);        
        context.dispatch('buscaProdutosPorId');

    },
    produtoCancelar(context) {
        context.commit('SET_PRODUTO_ID', '');        
        //console.log('Cancelando o produto', this.idProduto);

    },
    deletarProduto(){
        
        let bodyParameters = {
            "_method" : 'DELETE'
        }

        axios
        .post(
            'http://localhost:8001/public/api/products/' + context.state.produtos.id,
            bodyParameters,
            {
                headers: {					
                    'Authorization': 'Bearer ' + context.state.token
                }
            }
        )
        .then( (response) => {
            //console.log(this.idProduto, 'delentando depois da confirmaçcão');				
            context.dispatch('buscaProdutos');
            //this.produtos = response.data.data;
            //this.$emit('deletar', true);

        })
        .catch( (error) => {
            console.log(error);

        });
    },
    atualizarProduto(name, price, description) {
        //console.log('chegou no APP', name, price, description);			        

        let bodyParameters = {
            "_method": "PUT",
            "name" : name,
            "price": price,
            "description": description
        }

        axios
        .post(
            'http://localhost:8001/public/api/products/' + context.state.produtos.id,
            bodyParameters,
            {
                headers: {					
                    'Authorization': 'Bearer ' + context.state.token
                }
            }
        )
        .then( (response) => {
            //console.log(this.idProduto, 'atualizando o produto');				
            context.dispatch('buscaProdutos');
            
            //this.$emit('atualizarProduto', 'ALTERADO MAX');
            //this.produtos = response.data.data;

        })
        .catch( (error) => {
            console.log(error);

        });
    },
    criarProduto(name, price, description) {
        //let config = this.configHead();

        let bodyParameters = {
            //"_method": "POST",
            "name" : name,
            "price": price,
            "description": description
        }

        console.log(config, bodyParameters);


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
        .then( (response) => {
            console.log('Produto criado | APP');				
            context.dispatch('buscaProdutos');
            
            //this.$emit('atualizarProduto', 'ALTERADO MAX');
            //this.produtos = response.data.data;

        })
        .catch( (error) => {
            console.log(error);

        });


    }
}