<template>
  <div class="contact-page">
    <div class="page-header">
      <h1>Entre em Contato</h1>
      <p>Adoraríamos ouvir de você. Preencha o formulário ou use nossos contatos diretos.</p>
    </div>
    <div class="contact-content">
      <div class="contact-form-container">
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label for="name">Nome</label>
            <input type="text" id="name" name="name" required />
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div class="form-group">
            <label for="subject">Assunto</label>
            <input type="text" id="subject" name="subject" required />
          </div>
          <div class="form-group">
            <label for="message">Mensagem</label>
            <textarea id="message" name="message" rows="5" required></textarea>
          </div>
          <button type="submit" class="submit-btn">Enviar Mensagem</button>
        </form>
      </div>
      <div class="contact-info-container">
        <h3>Nossas Informações</h3>
        <div class="info-item">
          <strong>Endereço:</strong>
          <p>Rua da Barbearia, 123, Centro</p>
        </div>
        <div class="info-item">
          <strong>Telefone:</strong>
          <p>(11) 98765-4321</p>
        </div>
        <div class="info-item">
          <strong>Email:</strong>
          <p>contato@maosdetesoura.com</p>
        </div>
        <div class="map-placeholder">
          <p>[Aqui vai um mapa incorporado]</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const handleSubmit = () => {
  alert('Formulário enviado! (Funcionalidade de envio real não implementada neste protótipo)');
};
</script>

<style scoped lang="scss">
.contact-page {
  padding: 88px 2rem 2rem;
  background-color: #ffffff;
  min-height: 100vh;
  font-family: 'Hanken Grotesk', sans-serif;
}
.page-header {
  text-align: center;
  margin: 2rem 0 4rem;
}
.page-header h1 {
  font-size: 3rem;
  font-family: 'Bungee Hairline', sans-serif;
  color: #212121;
}
.page-header p {
  font-size: 1.2rem;
  color: #6c6c6c;
}
.contact-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  gap: 3rem;
}
.contact-form-container {
  flex: 2;
  min-width: 300px;
}
.contact-info-container {
  flex: 1;
  min-width: 300px;
}
.form-group {
  margin-bottom: 1.5rem;
}
label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: #333;
}
input,
textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  font-family: 'Hanken Grotesk', sans-serif;
  transition: border-color 0.3s;
}
input:focus,
textarea:focus {
  outline: none;
  border-color: #ff7b42;
}
.submit-btn {
  background: #ff7b42;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 5px;
  border: none;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s;
  font-size: 1rem;
  font-family: 'Hanken Grotesk', sans-serif;
}
.submit-btn:hover {
  background: #d65a2b;
}
h3 {
  font-family: 'Archivo Black', sans-serif;
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
}
.info-item {
  margin-bottom: 1.5rem;
}
.info-item strong {
  color: #212121;
  font-size: 1.1rem;
}
.info-item p {
  color: #6c6c6c;
  margin: 0.25rem 0 0;
}
.map-placeholder {
  width: 100%;
  height: 200px;
  background: #f4f4f4;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  margin-top: 2rem;
  color: #999;
  border: 1px dashed #ccc;
}
</style>
