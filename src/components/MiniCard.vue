<template>
  <!-- Componente MiniCard, que exibirá um cartão compacto com título, subtítulo e ícone -->
  <section :class="miniCardSection">
    <div class="card-section">
      <div v-if="title" :class="titleClass">{{ title }}</div>
      <div v-if="subtitle" :class="subtitleClass">{{ subtitle }}</div>
    </div>

    <hr class="separator" />

    <div class="card-actions">
      <template v-if="iconLibrary === 'material'">
        <span class="material-symbols-outlined" :class="iconStyled">{{ icon }}</span>
      </template>
      <template v-else-if="iconLibrary === 'mdi'">
        <i :class="['mdi', 'mdi-' + icon, iconStyled]"></i>
      </template>
      <template v-else>
        <span :class="iconStyled">{{ icon }}</span>
      </template>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  miniCardSection: {
    type: String,
    default: 'mini-card',
  },
  titleClass: {
    type: String,
    default: 'text-h6',
  },
  title: {
    type: String,
    default: 'Lorem Ipsum',
  },
  subtitleClass: {
    type: String,
    default: 'text-subtitle2',
  },
  subtitle: {
    type: String,
    default: 'Dolor sit amet, consectetur adipiscing elit.',
  },
  icon: {
    type: String,
    default: 'content_cut',
  },
  iconStyled: {
    type: String,
    default: 'icon-styled',
  },
  iconLibrary: {
    type: String,
    default: 'material',
  },
})
</script>

<style scoped lang="scss">
@use 'sass:color';
@use '@/assets/styles/scss/_variables.scss' as var;

.mini-card {
  width: 100%;
  max-width: 270px;
  background-color: var.$complementary-charcoal;
  border: 1px solid var.$bg-gray;
  border-radius: 0.5rem;
  box-shadow: 0 0 10px rgba(var.$bg-dark, 0.5);
  padding: 1rem;
  text-align: center;

  .card-section {
    margin-bottom: 0.5rem;

    .text-h6 {
      font-size: 1.25rem;
      font-weight: bold;
      color: var.$text-secondary;
    }

    .text-subtitle2 {
      font-size: 0.875rem;
      color: var.$text-gray;
    }
  }

  .separator {
    border: 0;
    height: 1px;
    background: var.$complementary-gold;
    margin: 1rem 0;
  }

  .card-actions {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    .icon-styled {
      color: var.$complementary-gold;
      font-size: 5rem;
      padding: 0.5rem;
      line-height: 1.5;
    }
  }
}
</style>
