<template>
  <a href="#conteudo" class="skip-link" @click.prevent="focusMain">Pular para o conteúdo</a>

  <HeaderFloating />

  <main id="conteudo" ref="mainContent" tabindex="-1">
    <RouterView />
  </main>

  <FooterComponent />

  <AssinaturaTraco tom="escuro" />

  <!-- Sistema de Notificações Global -->
  <NotificationSystem />
</template>

<script setup>
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import HeaderFloating from '@/components/layouts/HeaderFloating.vue'
import FooterComponent from '@/components/layouts/FooterComponent.vue'
import AssinaturaTraco from '@/components/AssinaturaTraco.vue'
import NotificationSystem from '@/components/NotificationSystem.vue'

const mainContent = ref(null)

// Leva o foco ao conteúdo sem acrescentar #conteudo à URL
const focusMain = () => {
  mainContent.value?.focus()
}
</script>
