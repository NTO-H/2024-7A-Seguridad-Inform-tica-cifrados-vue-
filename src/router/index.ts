import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AboutView from '../views/AboutView.vue'; // Importa AboutView directamente

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView // Se carga directamente sin lazy loading
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
