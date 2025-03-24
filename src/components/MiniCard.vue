<template>
  <section class="mini-card">
    <div class="card-section">
      <div class="text-h6">Our Changing Planet</div>
      <div class="text-subtitle2">by John Doe</div>
    </div>

    <hr class="separator" />

    <div class="card-actions">
      <button class="action-btn">Action 1</button>
      <button class="action-btn">Action 2</button>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use '../assets/base.scss' as *;

.mini-card {
  width: 100%;
  max-width: 250px;
  background: $color-bg-light;
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  text-align: center;

  .card-section {
    margin-bottom: 0.5rem;

    .text-h6 {
      font-size: 1.25rem;
      font-weight: bold;
    }

    .text-subtitle2 {
      font-size: 0.875rem;
      color: $color-text-gray;
    }
  }

  .separator {
    border: 0;
    height: 2px;
    background: $color-bg-gray;
    margin: 0.5rem 0;
  }

  .card-actions {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    .action-btn {
      background: none;
      border: none;
      color: $primary;
      cursor: pointer;
      font-size: 1rem;
      padding: 0.5rem;
    }

    .action-btn:hover {
      color: $color-hover-primary;
    }
  }
}
</style>
