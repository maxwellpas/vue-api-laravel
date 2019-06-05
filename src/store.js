import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const state = {    
    loading: true,
    token: '',
    dadosApi: ''
};


const mutations = {
    setToken(state, valor) {
        state.token = valor;
    },
    setDadosPai(state, valor) {
        state.dadosApi = valor;
    }
    
};

const actions = {
    /**
    configHead() {
        return {
            headers: {					
                'Authorization': 'Bearer ' + state.token
            }
        }
        
    },
     */
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
            context.commit('setToken', response.data.token)
            
        })
        .finally(() => {
            context.dispatch('buscaProdutos');
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
        //console.log('foi chamdo a partir do login', state.token);

        axios
        .get(
            'http://localhost:8001/public/api/products',
            // bodyParameters,
            {
                headers: {					
                    'Authorization': 'Bearer ' + state.token
                }
            }
            
        )
        .then( (response) => {				
            let dados = response.data.data;
            context.commit('setDadosPai', dados);
            //console.log('aqui', dados);

        })
        .finally(() => {
            state.loading = false;
        })
        .catch( (error) => {
            console.log("Erro ao buscar os produtos", error);

        });

    },
    buscaProdutosPorId() {
      
        axios
        .get(
            'http://localhost:8001/public/api/products/' + this.idProduto,
            //bodyParameters,
            {
                headers: {					
                    'Authorization': 'Bearer ' + state.token
                }
            }
        )
        .then( (response) => {
            console.log(response.data.data, "trouxe o prodotuo por id");
            this.nameProd = response.data.data.name;
            this.priceProd = response.data.data.price;
            this.descriptionProd = response.data.data.description;

            console.log(this.nameProd);

        })
        .finally(() => {
            this.loading = false;
        })
        .catch( (error) => {
            console.log("Erro ao buscar os produtos", error);

        });

    },
}

export default new Vuex.Store({
    state,
    getters: {        
        dadosApi: state => state.dadosApi         
    },
    mutations,
    actions
});