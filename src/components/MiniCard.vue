<template>
  <div class="mini-card">
    <section class="card-section">
      <div class="text-h6">Our Changing Planet</div>
      <div class="text-subtitle2">by John Doe</div>
    </section>

    <hr class="separator" />

    <div class="card-actions">
      <button class="action-btn">Action 1</button>
      <button class="action-btn">Action 2</button>
    </div>
  </div>
</template>

<script setup></script>

<style scoped lang="scss">
.mini-card {
  width: 100%;
  max-width: 250px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  padding: 16px;
  text-align: center;
}

.card-section {
  margin-bottom: 8px;
}

.text-h6 {
  font-size: 1.25rem;
  font-weight: bold;
}

.text-subtitle2 {
  font-size: 0.875rem;
  color: grey;
}

.separator {
  border: 0;
  height: 1px;
  background: #ddd;
  margin: 8px 0;
}

.card-actions {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.action-btn {
  background: none;
  border: none;
  color: #007bff;
  cursor: pointer;
  font-size: 1rem;
  padding: 8px;
}

.action-btn:hover {
  color: #0056b3;
}
</style>
