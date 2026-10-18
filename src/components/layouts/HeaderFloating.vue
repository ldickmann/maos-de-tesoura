<template>
  <!-- Componente de Header Flutuante, que permanecerá fixo no topo da página com navegação responsiva -->
  <header :class="['header-floating', { scrolled }]">
    <nav class="toolbar">
      <div class="logo">
        <a href="#" @click="navigateToSection('home')" class="nav-link-logo">
          <span class="logo-line">Mãos de</span>
          <span class="logo-line highlight">Tesoura</span>
        </a>
      </div>
      <div class="menu">
        <template v-for="(item, index) in menuItems" :key="index">
          <!-- Item com ação personalizada (Home) -->
          <a
            v-if="item.action"
            href="#"
            @click="item.action"
            class="nav-link"
            :class="{ 'router-link-active': $route.path === '/' }"
          >
            {{ item.label }}
          </a>
          <router-link v-else :to="item.to" class="nav-link">
            {{ item.label }}
          </router-link>
        </template>
      </div>
      <div id="menu-mobile" class="mobile-menu" :class="{ active: mobileMenuOpen }">
        <template v-for="(item, index) in menuItems" :key="`mobile-${index}`">
          <a
            v-if="item.action"
            href="#"
            @click="item.action"
            class="mobile-nav-link"
            :class="{ 'router-link-active': $route.path === '/' }"
          >
            {{ item.label }}
          </a>
          <router-link v-else :to="item.to" class="mobile-nav-link" @click="closeMobileMenu">
            {{ item.label }}
          </router-link>
        </template>
        <button @click="handleBooking" class="btn btn--primary mobile-btn-accent">
          Agendar Horário
        </button>
      </div>
      <div class="action-button">
        <button @click="handleBooking" class="btn btn--primary btn-accent">Agendar Horário</button>
      </div>
      <button
        ref="menuToggle"
        class="mobile-menu-toggle"
        :aria-label="mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'"
        :aria-expanded="mobileMenuOpen"
        aria-controls="menu-mobile"
        @click="toggleMobileMenu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </nav>
  </header>
</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useNotificationStore } from '@/stores/notification'

const router = useRouter()
const route = useRoute()

const notificationStore = useNotificationStore()
const scrollY = ref(0)
const mobileMenuOpen = ref(false)
const menuToggle = ref(null)
const scrolled = computed(() => scrollY.value > 0)

const updateScroll = () => {
  scrollY.value = window.scrollY
}

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
}

// Esc fecha o menu e devolve o foco ao botão que o abriu
const onKeydown = (event) => {
  if (event.key === 'Escape' && mobileMenuOpen.value) {
    closeMobileMenu()
    menuToggle.value?.focus()
  }
}

// Fecha o menu quando a rota muda (inclusive pelo botão voltar)
watch(() => route.fullPath, closeMobileMenu)

const handleBooking = () => {
  router.push('/booking')
  closeMobileMenu()
}

// Rolagem suave, exceto com prefers-reduced-motion
const scrollBehavior = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'

// Navegação suave para seções da home
const navigateToSection = (sectionId) => {
  closeMobileMenu()

  const doScroll = () => {
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: scrollBehavior() })
    } else {
      const element = document.getElementById(sectionId)
      if (element) {
        const headerHeight = 100
        const elementPosition = element.offsetTop - headerHeight
        window.scrollTo({ top: elementPosition, behavior: scrollBehavior() })
      }
    }
  }

  if (router.currentRoute.value.path !== '/') {
    router.push('/').then(() => {
      setTimeout(doScroll, 100)
    })
  } else {
    doScroll()
  }
}

onMounted(() => {
  window.addEventListener('scroll', updateScroll)
  document.addEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', updateScroll)
  document.removeEventListener('keydown', onKeydown)
})

const menuItems = [
  { label: 'Home', action: () => navigateToSection('home') },
  { label: 'Serviços', to: '/servicos' },
  { label: 'Sobre', to: '/about' },
  { label: 'Contato', to: '/contato' },
]
</script>

<style scoped lang="scss">
@use '@/assets/styles/scss/_variables.scss' as var;
@use '@/assets/styles/scss/_mixins.scss' as mx;

.header-floating {
  @include mx.on-dark-surface;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  min-height: var.$header-height;
  padding: 1rem 0;
  background: rgba(var.$primary, 0.85);
  backdrop-filter: blur(15px);
  z-index: var.$z-header;
  transition:
    background-color var.$duration-base ease-in-out,
    border-color var.$duration-base ease-in-out,
    box-shadow var.$duration-base ease-in-out;
  border-bottom: 1px solid rgba(var.$accent-light, 0.1);

  &.scrolled {
    background: var.$primary; // Fundo sólido ao rolar
    backdrop-filter: blur(25px);
    border-bottom: 1px solid rgba(var.$accent-light, 0.2);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.4);
  }
}

.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  @include mx.container;
}

.logo {
  display: flex;
  flex-direction: column;
  font-weight: bold;
  font-family: var.$font-family-secondary;
  line-height: 1;

  .nav-link-logo {
    display: flex;
    flex-direction: column;
    text-decoration: none;
    text-transform: uppercase;
    color: var.$text-secondary;
    font-size: 1.5rem;
    transition:
      color var.$duration-base var.$ease,
      transform var.$duration-base var.$ease;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);

    &:hover {
      color: var.$text-accent;
      transform: translateY(-2px);
    }
  }

  .highlight {
    font-size: 2rem;
    color: var.$text-accent;
  }
}

.menu {
  flex: 1;
  display: flex;
  justify-content: center;
  gap: 1rem;
  font-family: var.$font-family-secondary;
  font-weight: bold;

  .nav-link {
    text-decoration: none;
    color: var.$text-secondary;
    font-size: 1.1rem;
    padding: 0.5rem 1rem;
    border-radius: var.$radius-md;
    transition:
      color var.$duration-base var.$ease,
      background-color var.$duration-base var.$ease,
      transform var.$duration-base var.$ease;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
    position: relative;

    &:hover {
      color: var.$text-accent;
      background: rgba(var.$secondary, 0.1);
      transform: translateY(-2px);
    }

    &.router-link-active {
      color: var.$text-accent;
      background: rgba(var.$secondary, 0.2);
    }
  }
}

.action-button {
  display: flex;
  font-family: var.$font-family-secondary;

  .btn-accent {
    padding: 0.75rem 1.5rem;
    box-shadow: var.$shadow-accent;

    &:hover {
      box-shadow: 0 6px 20px rgba(var.$secondary, 0.4);
    }
  }
}

// Mobile Menu
// Alvo de 44×44; o desenho continua com 25px e a margem negativa o mantém no mesmo lugar
.mobile-menu-toggle {
  display: none;
  flex-direction: column;
  justify-content: space-around;
  width: 44px;
  height: 44px;
  padding: 9.5px;
  margin: -9.5px;
  background: transparent;
  border: none;
  border-radius: var.$radius-md;
  cursor: pointer;

  span {
    width: 100%;
    height: 3px;
    background: var.$accent-light;
    border-radius: 2px;
  }

  @include mx.down(var.$bp-lg) {
    display: flex;
  }
}

.mobile-menu {
  display: none;
  position: fixed;
  top: var.$header-height-mobile;
  left: 0;
  right: 0;
  background: var.$primary;
  backdrop-filter: blur(20px);
  flex-direction: column;
  padding: 2rem;
  z-index: var.$z-menu;
  font-family: var.$font-family-secondary;

  // Só existe abaixo de 968px: alargar a janela com o menu aberto o esconde
  &.active {
    @include mx.down(var.$bp-lg) {
      display: flex;
    }
  }

  .mobile-nav-link {
    font-weight: bold; // como o menu do desktop
    color: var.$accent-light;
    text-decoration: none;
    padding: 1rem 0;
    font-size: 1.2rem;
    border-bottom: 1px solid rgba(var.$accent-light, 0.1);
    text-align: center;
    transition: color 0.3s ease;

    &:hover {
      color: var.$secondary;
    }

    &.router-link-active {
      color: var.$secondary;
    }
  }

  .mobile-btn-accent {
    padding: 1rem 2rem;
    margin-top: 1rem;
  }
}

// Responsividade
@include mx.down(var.$bp-lg) {
  .header-floating {
    min-height: var.$header-height-mobile;
  }

  .menu,
  .action-button {
    display: none;
  }

  .logo .nav-link-logo {
    font-size: 1.2rem;
  }

  .logo .highlight {
    font-size: 1.5rem;
  }
}
</style>
