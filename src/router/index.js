import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), // Usa a base URL do Vite
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/servicos',
      name: 'servicos',
      component: () => import('../views/ServicosView.vue'),
    },
    {
      path: '/booking',
      name: 'booking',
      component: () => import('../views/BookingView.vue'),
    },
    {
      path: '/contato',
      name: 'contato',
      component: () => import('../views/ContatoView.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/:catchAll(.*)*',
      name: 'NotFound',
      component: () => import('../views/NotFoundView.vue'),
    },
  ],
})

export default router
