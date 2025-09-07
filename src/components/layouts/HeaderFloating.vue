<template>
  <header :class="['header-floating', { scrolled }]">
    <nav class="toolbar">
      <div class="logo">
        <a href="#" @click="navigateToSection('home')" class="nav-link-logo">
          <span class="logo-line">Mãos de</span>
        </a>
        <a href="#" @click="navigateToSection('home')" class="nav-link-logo">
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
          <!-- Item com rota normal -->
          <router-link v-else :to="item.to" class="nav-link">
            {{ item.label }}
          </router-link>
        </template>
      </div>
      <div class="mobile-menu" :class="{ active: mobileMenuOpen }">
        <template v-for="(item, index) in menuItems" :key="`mobile-${index}`">
          <a v-if="item.action" href="#" @click="item.action" class="mobile-nav-link">
            {{ item.label }}
          </a>
          <router-link v-else :to="item.to" class="mobile-nav-link" @click="closeMobileMenu">
            {{ item.label }}
          </router-link>
        </template>
        <button @click="handleBooking" class="mobile-btn-accent">Agendar Horário</button>
      </div>
      <div class="action-button">
        <button @click="handleBooking" class="btn-accent">Agendar Horário</button>
      </div>
      <button class="mobile-menu-toggle" @click="toggleMobileMenu">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </nav>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { useNotificationStore } from '@/stores/notification'

const router = useRouter()

const notificationStore = useNotificationStore()
const scrollY = ref(0)
const mobileMenuOpen = ref(false)
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

const handleBooking = () => {
  router.push('/booking')
  closeMobileMenu()
}

// Navegação suave para seções da home
const navigateToSection = (sectionId) => {
  closeMobileMenu()

  const doScroll = () => {
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      const element = document.getElementById(sectionId)
      if (element) {
        const headerHeight = 100
        const elementPosition = element.offsetTop - headerHeight
        window.scrollTo({ top: elementPosition, behavior: 'smooth' })
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
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', updateScroll)
})

const menuItems = [
  { label: 'Home', action: () => navigateToSection('home') },
  { label: 'Serviços', to: '/servicos' },
  { label: 'Sobre', to: '/about' },
  { label: 'Contato', to: '/contato' },
]
</script>

<style scoped lang="scss">
.header-floating {
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  padding: 1rem 0;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(15px);
  z-index: 1000;
  transition: all 0.3s ease-in-out;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  &.scrolled {
    background: rgba(0, 0, 0, 0.95);
    backdrop-filter: blur(25px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.4);
  }
}

.toolbar {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
}

.logo {
  display: flex;
  flex-direction: column;
  font-weight: bold;
  font-family: $font-family-secondary;
  line-height: 1;

  .nav-link-logo {
    text-decoration: none;
    text-transform: uppercase;
    color: $text-secondary;
    font-size: 1.5rem;
    transition: all 0.3s ease;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);

    &:hover {
      color: $text-accent;
      transform: translateY(-2px);
    }
  }

  .highlight {
    font-size: 2rem;
    color: $text-accent;
  }
}

.menu {
  flex: 1;
  display: flex;
  justify-content: center;
  gap: 1rem;
  font-family: $font-family-secondary;
  font-weight: bold;

  .nav-link {
    text-decoration: none;
    color: $text-secondary;
    font-size: 1.1rem;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    transition: all 0.3s ease;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
    position: relative;

    &:hover {
      color: $text-accent;
      background: rgba(255, 123, 66, 0.1);
      transform: translateY(-2px);
    }

    &.router-link-active {
      color: $text-accent;
      background: rgba(255, 123, 66, 0.2);
    }
  }
}

.action-button {
  display: flex;
  font-family: $font-family-secondary;

  .btn-accent {
    background: linear-gradient(135deg, #ff7b42 0%, #e66b32 100%);
    color: white;
    text-decoration: none;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    font-weight: 600;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(255, 123, 66, 0.3);

    &:hover {
      background: linear-gradient(135deg, #e66b32 0%, #d55a22 100%);
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(255, 123, 66, 0.4);
    }
  }
}

// Mobile Menu
.mobile-menu-toggle {
  display: none;
  flex-direction: column;
  justify-content: space-around;
  width: 25px;
  height: 25px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;

  span {
    width: 100%;
    height: 3px;
    background: white;
    border-radius: 2px;
    transition: all 0.3s ease;
  }

  @media (max-width: 968px) {
    display: flex;
  }
}

.mobile-menu {
  display: none;
  position: fixed;
  top: 80px;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(20px);
  flex-direction: column;
  padding: 2rem;
  z-index: 999;
  transform: translateY(-100%);
  transition: all 0.3s ease;

  &.active {
    display: flex;
    transform: translateY(0);
  }

  .mobile-nav-link {
    color: white;
    text-decoration: none;
    padding: 1rem 0;
    font-size: 1.2rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    text-align: center;
    transition: color 0.3s ease;

    &:hover {
      color: #ff7b42;
    }

    &.router-link-active {
      color: #ff7b42;
    }
  }

  .mobile-btn-accent {
    background: linear-gradient(135deg, #ff7b42 0%, #e66b32 100%);
    color: white;
    text-decoration: none;
    padding: 1rem 2rem;
    border-radius: 8px;
    text-align: center;
    margin-top: 1rem;
    font-weight: 600;
    transition: all 0.3s ease;

    &:hover {
      background: linear-gradient(135deg, #e66b32 0%, #d55a22 100%);
    }
  }
}

// Responsivo
@media (max-width: 968px) {
  .menu,
  .action-button {
    display: none;
  }

  .toolbar {
    padding: 0 1rem;
  }

  .logo .nav-link-logo {
    font-size: 1.2rem;
  }

  .logo .highlight {
    font-size: 1.5rem;
  }
}
</style>
