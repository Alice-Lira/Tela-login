import { createRouter, createWebHashHistory } from 'vue-router'
import Cadastro from '../views/Cadastro.vue';
import Login from '../views/Login.vue';
import Home from '../views/Home.vue';

const routes = [
    { path: "/cadastro", name: 'cadastro', component: Cadastro },
    { path: "/login", name: 'login', component: Login },
    { path: "/", name: 'home', component: Home },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
