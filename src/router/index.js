import { createWebHistory, createRouter } from 'vue-router'

import ListaUsuarios from '../components/ListaUsuarios.vue'
import FormularioUsuario from '../components/FormularioUsuario.vue'
//import { data } from 'jquery'

const routes = [
    { path: '/', name: 'Home', component: FormularioUsuario },
    { path: '/formulario', name: 'Formulario', component: FormularioUsuario },
    { path: '/lista', name: 'Lista', component: ListaUsuarios }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router 

