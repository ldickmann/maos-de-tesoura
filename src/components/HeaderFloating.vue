<template>
  <header class="header-floating">
    <nav class="toolbar">
      <div class="logo">
        <span class="logo-line1 text-uppercase">Mãos de</span>
        <span class="logo-line2 text-uppercase">Tesoura</span>
      </div>
      <div class="menu">
        <router-link to="/" class="nav-link">Home</router-link>
        <router-link to="/servicos" class="nav-link">Serviços</router-link>
        <router-link to="/about" class="nav-link">Sobre</router-link>
        <router-link to="/contato" class="nav-link">Contato</router-link>
      </div>
      <div class="action-button">
        <router-link to="/booking" class="btn-accent">Agendar Horário</router-link>
      </div>
    </nav>
  </header>
</template>

<script setup></script>

<style scoped lang="scss">
.header-floating {
  padding: 1rem 0;
  background: transparent;
  z-index: 1000;
  position: relative;
}

.toolbar {
  width: 1300px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  display: flex;
  flex-direction: column;
  font-weight: bold;
  font-size: 1.5rem;
  line-height: 1;
  font-family: 'Hanken Grotesk';
}

.menu {
  flex: 1;
  display: flex;
  justify-content: center;
  gap: 1rem;
  font-family: 'Hanken Grotesk';
}

.nav-link {
  text-decoration: none;
  color: white;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  transition: color 0.3s;
  position: relative;
}

.nav-link:hover {
  color: #ff7b42;
}

.nav-link.router-link-active {
  color: #ff7b42;
}

.nav-link.router-link-active::after {
  content: '';
  position: absolute;
  bottom: -0.5rem;
  left: 50%;
  transform: translateX(-50%);
  width: 20px;
  height: 2px;
  background: #ff7b42;
}

.action-button {
  display: flex;
  font-family: 'Hanken Grotesk';
}

.btn-accent {
  background: #ff7b42;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 5px;
  text-decoration: none;
  font-weight: bold;
  transition: background 0.3s;
  border: none;
  cursor: pointer;
}

.btn-accent:hover:not(:disabled) {
  background: #d65a2b;
}

.btn-accent:disabled {
  background: #a0a0a0;
  cursor: not-allowed;
}

.logo-line1 {
  font-size: 1.5rem;
}

.logo-line2 {
  font-size: 2rem;
}
</style>
