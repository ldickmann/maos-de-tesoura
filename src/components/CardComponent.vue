<template>
  <section :class="classSectionCard">
    <div class="my-card">
      <section class="card-section">
        <div class="card-content">
          <div class="card-badge">{{ badge }}</div>
          <div class="title-text">
            <h3 class="text-h5">{{ title }}</h3>
            <p class="text-caption">{{ lorem }}</p>
          </div>
        </div>

        <img class="card-image" :src="src" :alt="alt" />
      </section>
    </div>
  </section>
</template>

<script setup>
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
    default: 'Title',
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
@use '../assets/base.scss' as *;

.section-card {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.my-card {
  background: $tertiary;
  border: 1px solid #ddd;
  border-radius: 0.5rem;
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
}

.card-badge {
  background-color: $complementary-olive;
  color: $text-secondary;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: bold;
  align-self: flex-start;
  margin-bottom: 0.5rem;
}

.text-h5 {
  font-size: 1.25rem;
  margin: 0.5rem 0;
}

.text-caption {
  font-size: 0.875rem;
  color: $text-gray;
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
