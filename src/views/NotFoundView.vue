<template>
  <div class="not-found">
    <div class="not-found__container">
      <h1>404</h1>
      <h2>Página não encontrada</h2>
      <p>Desculpe, a página que você está procurando não existe.</p>
      <router-link to="/" class="btn btn--primary not-found__button">
        Voltar para Home
      </router-link>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/scss/_variables.scss' as var;
@use '@/assets/styles/scss/_mixins.scss' as mx;

.not-found {
  @include mx.on-dark-surface;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
  background-color: var.$bg-dark;

  &__container {
    max-width: 500px;
    padding: 2rem;

    // Os títulos mantêm a Archivo Black que herdavam do body antes da 1.3
    h1 {
      font-family: var.$font-family-primary;
      font-size: 6rem;
      color: var.$secondary;
      margin: 0;
      line-height: 1;
    }

    h2 {
      font-family: var.$font-family-primary;
      font-size: 2rem;
      color: var.$text-secondary;
      margin: 1rem 0;
    }

    // 7,42:1 sobre $bg-dark
    p {
      color: var.$text-on-dark-muted;
      margin-bottom: 2rem;
    }
  }

  &__button {
    padding: 0.8rem 1.6rem;
  }
}
</style>
