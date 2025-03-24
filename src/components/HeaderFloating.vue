<template>
  <header class="header-floating">
    <nav class="toolbar">
      <div class="logo">
        <router-link to="/" class="nav-link-logo">
          <span class="logo-line1">Corte</span>
        </router-link>
        <router-link to="/" class="nav-link-logo">
          <span class="logo-line2 text-uppercase">Supremo</span>
        </router-link>
      </div>
      <div class="menu">
        <router-link to="/" class="nav-link">Home</router-link>
        <router-link to="/servicos" class="nav-link">Serviços</router-link>
        <router-link to="/contato" class="nav-link">Contato</router-link>
      </div>
      <div class="action-button">
        <router-link to="/agendamento" class="btn-accent">Agendar Horário</router-link>
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
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
}

.toolbar {
  width: 1400px;
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
  font-size: 1.2rem;
  padding: 0.5rem 1rem;
  transition: color 0.3s;
}

.nav-link:hover {
  color: #ff7b42;
}

.nav-link-logo {
  text-decoration: none;
  text-transform: uppercase;
  color: white;
  font-size: 1.5rem;
  padding: 0rem 1rem;
  transition: color 0.3s;
}

.nav-link-logo:hover {
  color: #ff7b42;
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
}

.btn-accent:hover {
  background: #d65a2b;
}

.logo-line1 {
  font-size: 1.5rem;
}

.logo-line2 {
  font-size: 2rem;
}
</style>
