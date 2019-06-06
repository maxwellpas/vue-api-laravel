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
    'SET_PRODUTO_NAME'(state, payload) {
        state.produto.name = payload;
    },
    'SET_PRODUTO_DESCRIPTION'(state, payload) {
        state.produto.description = payload;
    },
    'SET_PRODUTO_PRICE'(state, payload) {
        state.produto.price = payload;
    }
    
}