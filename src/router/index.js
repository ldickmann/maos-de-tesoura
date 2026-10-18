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
      meta: { title: 'Serviços' },
      component: () => import('../views/ServicosView.vue'),
    },
    {
      path: '/booking',
      name: 'booking',
      meta: { title: 'Agendamento' },
      component: () => import('../views/BookingView.vue'),
    },
    {
      path: '/contato',
      name: 'contato',
      meta: { title: 'Contato' },
      component: () => import('../views/ContatoView.vue'),
    },
    {
      path: '/about',
      name: 'about',
      meta: { title: 'Sobre' },
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/:catchAll(.*)*',
      name: 'NotFound',
      meta: { title: 'Página não encontrada' },
      component: () => import('../views/NotFoundView.vue'),
    },
  ],
})

// Título da aba por rota (WCAG 2.4.2)
router.afterEach((to) => {
  document.title = to.meta.title ? `${to.meta.title} | Mãos de Tesoura` : 'Mãos de Tesoura'
})

export default router
