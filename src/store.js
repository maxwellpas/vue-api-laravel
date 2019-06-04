import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const state = {    
    loading: false,
    token: ''
};


const mutations = {
    
};

const actions = {
    'configHead'() {
        return {
            headers: {					
                'Authorization': 'Bearer ' + state.token
            }
        }
        
    },
    'login'(context) {
        console.log('veioo aqui');
        /*
        axios({
            method: 'post', // verbo http
            url: 'http://localhost:8001/public/api/login', // url
            data: {
                email: 'user@user.com',
                password: 'secret'
            }
        })
        .then(response => {
            state.token = response.data.token;
            
        })
        .finally(() => {
            context.commit('buscaProdutos');
        })
        .catch(error => {
            console.log("Erro ao fazer login", error)
        })*/
    },
    'buscaProdutos'(context) {
        let config = context.commit('configHead');

        axios
        .get(
            'http://localhost:8001/public/api/products',
            // bodyParameters,
            config
        )
        .then( (response) => {				
            return response.data.data;

        })
        .finally(() => {
            state.loading = false;
        })
        .catch( (error) => {
            console.log("Erro ao buscar os produtos", error);

        });

    },
}

export default new Vuex.Store({
    state,
    mutations,
    actions
});