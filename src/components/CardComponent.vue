<template>
  <section :class="classSectionCard">
    <div class="my-card">
      <section class="card-section">
        <div class="card-content">
          <div class="card-badge">{{ badge }}</div>
          <div class="title-text">
            <h3 class="text-h5">{{ title }}</h3>
            <LineComponent
              :isVertical="false"
              lineWidth="70px"
              lineHeight="1px"
              class="line-card"
            />
            <p class="text-caption">{{ lorem }}</p>
          </div>
        </div>

        <img class="card-image" :src="src" :alt="alt" />
      </section>
    </div>
  </section>
</template>

<script setup>
import LineComponent from './LineComponent.vue'

const props = defineProps({
  classSectionCard: {
    type: String,
    default: 'section-card',
  },
  badge: {
    type: String,
    default: 'Badge',
  },
  title: {
    type: String,
    default: 'Title Lorem Ipsum',
  },
  lorem: {
    type: String,
    default: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
  },
  src: {
    type: String,
    default: 'images/image-1-card.jpg',
  },
  alt: {
    type: String,
    default: 'Imagem de um barbeiro cortando o cabelo de um cliente',
  },
})
</script>

<style scoped lang="scss">
@use 'sass:color';
@use '@/assets/styles/scss/_variables.scss' as var;

.section-card {
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.my-card {
  background: var.$bg-gray-light;
  padding: 2rem;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
}

.card-section {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.card-content {
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  padding: 5rem 2rem 5rem 10rem;
  gap: 2rem;
}

.card-badge {
  background-color: var.$bg-gold;
  color: var.$text-secondary;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: bold;
  align-self: flex-start;
  margin-bottom: 0.5rem;
}

.text-h5 {
  color: var.$text-secondary;
  font-size: 3rem;
  margin: 0.5rem 0;
  text-transform: uppercase;
}

.line-card {
  margin: 2rem 0;
}

.text-caption {
  font-size: 0.875rem;
  color: var.$text-gold;
  line-height: 1.5rem;
}

.card-image {
  width: 50%;
  border-radius: 0.5rem;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
}
</style>
