<template>
  <!-- Componente de Line, que renderizará uma linha, com expessura, tamanho adaptavel e podendo ser vertical ou horizontal -->
  <div
    :class="['line', { 'line-vertical': isVertical, 'line-horizontal': !isVertical }]"
    :style="{ width: lineWidth, height: lineHeight }"
  ></div>
</template>

<script setup>
defineProps({
  isVertical: {
    type: Boolean,
    default: false,
  },
  lineWidth: {
    type: String,
    default: '100%',
  },
  lineHeight: {
    type: String,
    default: '1px',
  },
})
</script>

<style scoped lang="scss">
@use '@/assets/styles/scss/_variables.scss' as var;

// Largura e altura vêm das props, pelo :style do template
.line {
  background-color: var.$bg-light;
}
</style>
