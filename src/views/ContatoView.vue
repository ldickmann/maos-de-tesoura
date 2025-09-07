<template>
  <div class="contact-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-content">
        <h1>Entre em Contato</h1>
        <p>
          Estamos aqui para ajudar você. Entre em contato conosco através do formulário ou de nossos
          canais diretos.
        </p>
      </div>
    </section>

    <!-- Contact Content -->
    <section class="contact-content">
      <div class="container">
        <div class="content-grid">
          <!-- Contact Form -->
          <div class="contact-form-container">
            <div class="form-header">
              <h2>Envie uma Mensagem</h2>
              <p>Preencha o formulário abaixo e responderemos em breve</p>
            </div>

            <LoadingSpinner v-if="isLoading" message="Enviando mensagem..." />

            <form v-else @submit.prevent="handleSubmit" class="contact-form">
              <div class="form-group">
                <label for="name" class="form-label">Nome Completo</label>
                <input
                  type="text"
                  id="name"
                  v-model="formData.name"
                  class="form-input"
                  :class="{ error: errors.name }"
                  placeholder="Digite seu nome completo"
                />
                <div v-if="errors.name" class="error-message">
                  {{ errors.name }}
                </div>
              </div>

              <div class="form-group">
                <label for="email" class="form-label">Email</label>
                <input
                  type="email"
                  id="email"
                  v-model="formData.email"
                  class="form-input"
                  :class="{ error: errors.email }"
                  placeholder="seu.email@exemplo.com"
                />
                <div v-if="errors.email" class="error-message">
                  {{ errors.email }}
                </div>
              </div>

              <div class="form-group">
                <label for="phone" class="form-label">Telefone (opcional)</label>
                <input
                  type="tel"
                  id="phone"
                  v-model="formData.phone"
                  @input="formatPhoneInput"
                  class="form-input"
                  placeholder="(11) 99999-9999"
                  maxlength="15"
                />
              </div>

              <div class="form-group">
                <label for="subject" class="form-label">Assunto</label>
                <select
                  id="subject"
                  v-model="formData.subject"
                  class="form-select"
                  :class="{ error: errors.subject }"
                >
                  <option value="">Selecione um assunto</option>
                  <option value="agendamento">Dúvidas sobre Agendamento</option>
                  <option value="servicos">Informações sobre Serviços</option>
                  <option value="reclamacao">Reclamação</option>
                  <option value="sugestao">Sugestão</option>
                  <option value="outros">Outros</option>
                </select>
                <div v-if="errors.subject" class="error-message">
                  {{ errors.subject }}
                </div>
              </div>

              <div class="form-group">
                <label for="message" class="form-label">Mensagem</label>
                <textarea
                  id="message"
                  v-model="formData.message"
                  class="form-textarea"
                  :class="{ error: errors.message }"
                  rows="5"
                  placeholder="Digite sua mensagem aqui..."
                ></textarea>
                <div v-if="errors.message" class="error-message">
                  {{ errors.message }}
                </div>
                <div class="character-count">{{ formData.message.length }}/500 caracteres</div>
              </div>

              <button type="submit" class="submit-btn" :disabled="isLoading">
                <i v-if="isLoading" class="fas fa-spinner fa-spin"></i>
                <i v-else class="fas fa-paper-plane"></i>
                {{ isLoading ? 'Enviando...' : 'Enviar Mensagem' }}
              </button>
            </form>
          </div>

          <!-- Contact Information -->
          <div class="contact-info-container">
            <div class="info-card">
              <h3>Informações de Contato</h3>

              <div class="info-list">
                <div class="info-item">
                  <div class="info-icon">
                    <i class="fas fa-map-marker-alt"></i>
                  </div>
                  <div class="info-details">
                    <strong>Endereço</strong>
                    <p>Rua da Barbearia, 123<br />Centro - Navegantes/SC<br />CEP: 88370-000</p>
                  </div>
                </div>

                <div class="info-item">
                  <div class="info-icon">
                    <i class="fas fa-phone"></i>
                  </div>
                  <div class="info-details">
                    <strong>Telefone</strong>
                    <p>(47) 55555-5555</p>
                    <small>Segunda a Sábado, 8h às 19h</small>
                  </div>
                </div>

                <div class="info-item">
                  <div class="info-icon">
                    <i class="fas fa-envelope"></i>
                  </div>
                  <div class="info-details">
                    <strong>Email</strong>
                    <p>devluksjs@gmail.com</p>
                    <small>Resposta em até 24h</small>
                  </div>
                </div>

                <div class="info-item">
                  <div class="info-icon">
                    <i class="fas fa-clock"></i>
                  </div>
                  <div class="info-details">
                    <strong>Horário de Funcionamento</strong>
                    <p>
                      Segunda a Sexta: 9h às 19h<br />
                      Sábado: 8h às 17h<br />
                      Domingo: Fechado
                    </p>
                  </div>
                </div>
              </div>

              <div class="social-links">
                <h4>Nossas Redes Sociais</h4>
                <div class="social-buttons">
                  <a href="https://github.com/ldickmann" target="_blank" class="social-btn github">
                    <i class="fab fa-github"></i>
                    GitHub
                  </a>
                  <a
                    href="https://linkedin.com/in/lucasdickmann"
                    target="_blank"
                    class="social-btn linkedin"
                  >
                    <i class="fab fa-linkedin-in"></i>
                    LinkedIn
                  </a>
                  <a href="https://wa.me/5511987654321" target="_blank" class="social-btn whatsapp">
                    <i class="fab fa-whatsapp"></i>
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>

            <!-- Map Section -->
            <div class="map-container">
              <h3>Nossa Localização</h3>
              <div class="map-placeholder">
                <div class="map-content">
                  <i class="fas fa-map-marker-alt"></i>
                  <p>Mapa Interativo</p>
                  <small>Rua da Barbearia, 123 - Centro</small>
                </div>
              </div>
              <div class="map-actions">
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=Rua+da+Barbearia+123+Centro+Navegantes+SC"
                  target="_blank"
                  class="map-link"
                >
                  <i class="fas fa-directions"></i>
                  Como Chegar
                </a>
                <a href="#" class="map-link" @click.prevent="showNotImplemented">
                  <i class="fas fa-street-view"></i>
                  Street View
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="faq-section">
      <div class="container">
        <h2>Perguntas Frequentes</h2>
        <div class="faq-grid">
          <div v-for="faq in faqs" :key="faq.id" class="faq-item">
            <h3>{{ faq.question }}</h3>
            <p>{{ faq.answer }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useNotificationStore } from '@/stores/notification'
import { validateContact, formatPhone } from '@/utils/validation'
import LoadingSpinner from '@/components/LoadingSpinner.vue'

const notificationStore = useNotificationStore()

const isLoading = ref(false)
const errors = ref({})

const formData = reactive({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
})

const faqs = ref([
  {
    id: 1,
    question: 'Como posso agendar um horário?',
    answer:
      'Você pode agendar através do nosso site, telefone ou WhatsApp. Recomendamos agendamento online para maior comodidade.',
  },
  {
    id: 2,
    question: 'Qual o tempo de antecedência para cancelar?',
    answer:
      'Solicitamos pelo menos 2 horas de antecedência para cancelamentos, permitindo que outros clientes utilizem o horário.',
  },
  {
    id: 3,
    question: 'Vocês aceitam cartão de crédito?',
    answer:
      'Sim, aceitamos dinheiro, cartão de débito, crédito e PIX. Todos os pagamentos são processados com segurança.',
  },
  {
    id: 4,
    question: 'Posso levar meu filho para cortar cabelo?',
    answer:
      'Claro! Temos experiência com cortes infantis e criamos um ambiente acolhedor para os pequenos.',
  },
])

const formatPhoneInput = (event) => {
  const value = event.target.value
  formData.phone = formatPhone(value)
}

const clearErrors = () => {
  errors.value = {}
}

const showNotImplemented = () => {
  notificationStore.showWarning('Função não implementada')
}

const handleSubmit = async () => {
  try {
    isLoading.value = true
    clearErrors()

    // Validar formulário
    const validation = validateContact(formData)

    if (!validation.isValid) {
      errors.value = validation.errors
      notificationStore.showError('Por favor, corrija os erros no formulário')
      return
    }

    // Simular envio
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Sucesso
    notificationStore.showSuccess('Mensagem enviada com sucesso! Entraremos em contato em breve.', {
      duration: 6000,
    })

    // Reset formulário
    Object.keys(formData).forEach((key) => {
      formData[key] = ''
    })
  } catch (error) {
    notificationStore.showError('Erro ao enviar mensagem. Tente novamente.')
    console.error('Contact form error:', error)
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped lang="scss">
.contact-page {
  padding-top: 88px;
  font-family: 'Hanken Grotesk', sans-serif;
}

.container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 2rem;
}

// Hero Section
.hero-section {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  padding: 4rem 0;
  text-align: center;
}

.hero-content {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 2rem;

  h1 {
    font-family: 'Archivo Black', sans-serif;
    font-size: 3rem;
    color: #212121;
    margin-bottom: 1.5rem;

    @media (max-width: 768px) {
      font-size: 2.5rem;
    }
  }

  p {
    font-size: 1.2rem;
    color: #6c757d;
    line-height: 1.6;
    margin: 0;
  }
}

// Contact Content
.contact-content {
  padding: 5rem 0;
  background: white;
}

.content-grid {
  display: flex;
  gap: 4rem;
  flex-wrap: wrap;

  @media (max-width: 968px) {
    flex-direction: column;
    gap: 3rem;
  }
}

// Contact Form
.contact-form-container {
  flex: 1.5;
  min-width: 300px;

  .form-header {
    margin-bottom: 2rem;

    h2 {
      font-family: 'Archivo Black', sans-serif;
      font-size: 2rem;
      color: #212121;
      margin-bottom: 0.5rem;
    }

    p {
      color: #6c757d;
      margin: 0;
    }
  }
}

.contact-form {
  display: grid;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-label {
  font-weight: 600;
  color: #333;
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
}

.form-input,
.form-select,
.form-textarea {
  padding: 0.875rem;
  border: 2px solid #dee2e6;
  border-radius: 8px;
  font-size: 1rem;
  font-family: inherit;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #ff7b42;
    box-shadow: 0 0 0 3px rgba(255, 123, 66, 0.1);
  }

  &.error {
    border-color: #dc3545;

    &:focus {
      box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.1);
    }
  }

  &::placeholder {
    color: #adb5bd;
  }
}

.form-select {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.5rem center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
  padding-right: 2.5rem;
}

.form-textarea {
  resize: vertical;
  min-height: 120px;
}

.character-count {
  font-size: 0.8rem;
  color: #6c757d;
  text-align: right;
  margin-top: 0.25rem;
}

.submit-btn {
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #ff7b42 0%, #e66b32 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover:not(:disabled) {
    background: linear-gradient(135deg, #e66b32 0%, #d55a22 100%);
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(255, 123, 66, 0.3);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
}

.error-message {
  color: #dc3545;
  font-size: 0.85rem;
  margin-top: 0.5rem;
  font-weight: 500;
}

// Contact Info
.contact-info-container {
  flex: 1;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.info-card {
  background: #f8f9fa;
  border-radius: 16px;
  padding: 2rem;
  border: 1px solid #e9ecef;

  h3 {
    font-family: 'Archivo Black', sans-serif;
    font-size: 1.5rem;
    color: #212121;
    margin-bottom: 1.5rem;
  }
}

.info-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.info-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.info-icon {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #ff7b42 0%, #e66b32 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  i {
    color: white;
    font-size: 1rem;
  }
}

.info-details {
  flex: 1;

  strong {
    color: #212121;
    font-size: 1rem;
    font-weight: 600;
    display: block;
    margin-bottom: 0.25rem;
  }

  p {
    color: #495057;
    margin: 0 0 0.25rem 0;
    line-height: 1.5;
  }

  small {
    color: #6c757d;
    font-size: 0.85rem;
  }
}

.social-links {
  border-top: 1px solid #dee2e6;
  padding-top: 1.5rem;

  h4 {
    color: #212121;
    margin-bottom: 1rem;
    font-weight: 600;
  }
}

.social-buttons {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.social-btn {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;

  &.github {
    background: linear-gradient(135deg, #333 0%, #24292e 100%);
    color: white;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 15px rgba(51, 51, 51, 0.3);
    }
  }

  &.linkedin {
    background: linear-gradient(135deg, #0077b5 0%, #005885 100%);
    color: white;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 15px rgba(0, 119, 181, 0.3);
    }
  }

  &.whatsapp {
    background: linear-gradient(135deg, #25d366 0%, #128c7e 100%);
    color: white;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 15px rgba(37, 211, 102, 0.3);
    }
  }
}

// Map Section
.map-container {
  h3 {
    font-family: 'Archivo Black', sans-serif;
    font-size: 1.3rem;
    color: #212121;
    margin-bottom: 1rem;
  }
}

.map-placeholder {
  background: #f8f9fa;
  border: 2px dashed #dee2e6;
  border-radius: 12px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  transition: all 0.3s ease;

  &:hover {
    border-color: #ff7b42;
    background: #fff5f2;
  }
}

.map-content {
  text-align: center;
  color: #6c757d;

  i {
    font-size: 2rem;
    color: #ff7b42;
    margin-bottom: 0.5rem;
  }

  p {
    font-weight: 500;
    margin: 0.5rem 0;
  }

  small {
    font-size: 0.85rem;
  }
}

.map-actions {
  display: flex;
  gap: 1rem;

  @media (max-width: 480px) {
    flex-direction: column;
  }
}

.map-link {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: white;
  color: #ff7b42;
  text-decoration: none;
  border: 2px solid #ff7b42;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    background: #ff7b42;
    color: white;
    transform: translateY(-2px);
  }
}

// FAQ Section
.faq-section {
  padding: 4rem 0;
  background: #f8f9fa;

  h2 {
    font-family: 'Archivo Black', sans-serif;
    font-size: 2.2rem;
    color: #212121;
    text-align: center;
    margin-bottom: 3rem;

    @media (max-width: 768px) {
      font-size: 1.8rem;
    }
  }
}

.faq-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.faq-item {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-4px);
  }

  h3 {
    color: #212121;
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 1rem;
    line-height: 1.4;
  }

  p {
    color: #6c757d;
    line-height: 1.6;
    margin: 0;
  }
}

@media (max-width: 768px) {
  .hero-content {
    padding: 0 1rem;
  }

  .container {
    padding: 0 1rem;
  }

  .contact-content {
    padding: 3rem 0;
  }

  .info-item {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 0.5rem;
  }

  .info-icon {
    margin-bottom: 0.5rem;
  }
}
</style>
