<template>
  <div class="justify-center align-center" :class="classContainerCard">
    <div class="my-card">
      <section class="card-section">
        <div>
          <div :class="classOverline">{{ overline }}</div>
          <h3 class="text-h5">{{ title }}</h3>
          <p class="text-caption text-grey">{{ lorem }}</p>
        </div>

        <img class="card-image" :src="src" :alt="alt" />
      </section>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  classContainerCard: {
    type: String,
    default: 'container-card',
  },
  classOverline: {
    type: String,
    default: 'text-overline text-accent',
  },
  overline: {
    type: String,
    default: 'Overline',
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
.container-card {
  max-width: 1300px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.my-card {
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
}

.card-section {
  display: flex;
  align-items: center;
  gap: 16px;
}

.text-h5 {
  font-size: 1.25rem;
  margin: 8px 0;
}

.text-caption {
  font-size: 0.875rem;
  color: grey;
}

.card-image {
  width: 50%;
  border-radius: 8px;
}
</style>
