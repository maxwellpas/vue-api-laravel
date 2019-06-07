import PaginaIndex from '../components/PaginaIndex'
import PaginaLogin from '../components/PaginaLogin'
import PaginaProductCreate from '../components/PaginaProdCreate'
import PaginaEditCreate from '../components/PaginaProdEdit'

export default [
    { path: '/', component: PaginaIndex },
    { path: '/login', component: PaginaLogin },
    { path: '/product/create', component: PaginaProductCreate },
    { path: '/product/edit/:id', component: PaginaEditCreate }
]