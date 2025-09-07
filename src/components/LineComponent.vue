<template>
  <!-- Componente de Line, que renderizará uma linha, com expessura, tamanho adaptavel e podendo ser vertical ou horizontal -->
  <div
    :class="['line', { 'line-vertical': isVertical, 'line-horizontal': !isVertical }]"
    :style="{ width: lineWidth, height: lineHeight }"
  ></div>
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
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

const lineStyle = computed(() => {
  return {
    width: props.isVertical ? props.lineHeight : props.lineWidth,
    height: props.isVertical ? props.lineWidth : props.lineHeight,
    backgroundColor: 'black',
  }
})

const isVertical = ref(props.isVertical)
const lineWidth = ref(props.lineWidth)
const lineHeight = ref(props.lineHeight)
</script>

<style scoped lang="scss">
@use 'sass:color';
@use '@/assets/styles/scss/_variables.scss' as var;

.line {
  background-color: var.$bg-light;
  transition: all 0.3s ease-in-out;
}

.line-vertical {
  width: 1px;
  height: 100%;
}

.line-horizontal {
  width: 100%;
  height: 1px;
}
</style>
