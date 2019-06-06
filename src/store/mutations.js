export default {

    'SET_TOKEN'(state, payload) {
        state.token = payload;
    },
    'SET_DADOS_API'(state, payload) {
        state.dadosApi = payload;
    },
    'SET_PRODUTO_ID'(state, payload) {
        state.produto.id = payload;        
    },
    'SET_PRODUTO'(state, payload) {
        state.produto.id = payload.id;
        state.produto.name = payload.name;
        state.produto.description = payload.description;
        state.produto.price = payload.price;
    }
    
}