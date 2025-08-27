<template>
  <header :class="['header-floating', { scrolled }]">
    <nav class="toolbar">
      <div class="logo">
        <router-link to="/" class="nav-link-logo">
          <span class="logo-line">Mãos de</span>
        </router-link>
        <router-link to="/" class="nav-link-logo">
          <span class="logo-line highlight">Tesoura</span>
        </router-link>
      </div>
      <div class="menu">
        <router-link v-for="(item, index) in menuItems" :key="index" :to="item.to" class="nav-link">
          {{ item.label }}
        </router-link>
      </div>
      <div class="action-button">
        <router-link to="/agendamento" class="btn-accent">Agendar Horário</router-link>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const scrollY = ref(0)
const scrolled = computed(() => scrollY.value > 0)

const updateScroll = () => {
  scrollY.value = window.scrollY
}

onMounted(() => {
  window.addEventListener('scroll', updateScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', updateScroll)
})

const menuItems = [
  { label: 'Home', to: '/' },
  { label: 'Serviços', to: '/servicos' },
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
  background: transparent;
  z-index: 1000;
  transition: background 0.3s ease-in-out;

  &.scrolled {
    background: rgba(0, 0, 0, 0.8);
  }
}

.toolbar {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
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
    transition: color 0.3s;

    &:hover {
      color: $text-accent;
    }
  }

  .highlight {
    font-size: 2rem;
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
    font-size: 1.2rem;
    padding: 0.5rem 1rem;
    transition: color 0.3s;

    &:hover {
      color: $text-accent;
    }
  }
}

.action-button {
  display: flex;
  font-family: $font-family-secondary;

  .btn-accent {
    background: $bg-accent;
    color: $text-secondary;
    padding: 0.75rem 1.5rem;
    border-radius: 4px;
    text-decoration: none;
    font-weight: bold;
    transition: background 0.3s;

    &:hover {
      background: $hover-accent;
    }
  }
}
</style>
