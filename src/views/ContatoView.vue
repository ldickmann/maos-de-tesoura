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

            <form @submit.prevent="handleSubmit" class="contact-form">
              <div class="form-group">
                <label for="name" class="form-label">Nome Completo</label>
                <input
                  type="text"
                  id="name"
                  v-model="formData.name"
                  class="form-input"
                  :class="{ error: errors.name }"
                  :aria-invalid="!!errors.name"
                  :aria-describedby="errors.name ? 'name-error' : undefined"
                  :disabled="isLoading"
                  placeholder="Digite seu nome completo"
                />
                <div v-if="errors.name" id="name-error" class="form-error" role="alert">
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
                  :aria-invalid="!!errors.email"
                  :aria-describedby="errors.email ? 'email-error' : undefined"
                  :disabled="isLoading"
                  placeholder="seu.email@exemplo.com"
                />
                <div v-if="errors.email" id="email-error" class="form-error" role="alert">
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
                  :disabled="isLoading"
                />
              </div>

              <div class="form-group">
                <label for="subject" class="form-label">Assunto</label>
                <select
                  id="subject"
                  v-model="formData.subject"
                  class="form-select"
                  :class="{ error: errors.subject }"
                  :aria-invalid="!!errors.subject"
                  :aria-describedby="errors.subject ? 'subject-error' : undefined"
                  :disabled="isLoading"
                >
                  <option value="">Selecione um assunto</option>
                  <option value="agendamento">Dúvidas sobre Agendamento</option>
                  <option value="servicos">Informações sobre Serviços</option>
                  <option value="reclamacao">Reclamação</option>
                  <option value="sugestao">Sugestão</option>
                  <option value="outros">Outros</option>
                </select>
                <div v-if="errors.subject" id="subject-error" class="form-error" role="alert">
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
                  :aria-invalid="!!errors.message"
                  :aria-describedby="errors.message ? 'message-error' : undefined"
                  :disabled="isLoading"
                  rows="5"
                  placeholder="Digite sua mensagem aqui..."
                ></textarea>
                <div v-if="errors.message" id="message-error" class="form-error" role="alert">
                  {{ errors.message }}
                </div>
                <div class="character-count">{{ formData.message.length }}/500 caracteres</div>
              </div>

              <button type="submit" class="btn btn--primary btn--lg" :disabled="isLoading">
                <i v-if="isLoading" class="fas fa-spinner fa-spin" aria-hidden="true"></i>
                <i v-else class="fas fa-paper-plane" aria-hidden="true"></i>
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
                    <i class="fas fa-map-marker-alt" aria-hidden="true"></i>
                  </div>
                  <div class="info-details">
                    <strong>Endereço</strong>
                    <p>Rua da Barbearia, 123<br />Centro - Navegantes/SC<br />CEP: 88370-000</p>
                  </div>
                </div>

                <div class="info-item">
                  <div class="info-icon">
                    <i class="fas fa-phone" aria-hidden="true"></i>
                  </div>
                  <div class="info-details">
                    <strong>Telefone</strong>
                    <p><a href="tel:+5547555555555" class="contact-link">(47) 55555-5555</a></p>
                    <small>Segunda a Sábado, 8h às 19h</small>
                  </div>
                </div>

                <div class="info-item">
                  <div class="info-icon">
                    <i class="fas fa-envelope" aria-hidden="true"></i>
                  </div>
                  <div class="info-details">
                    <strong>Email</strong>
                    <p>
                      <a href="mailto:devluksjs@gmail.com" class="contact-link"
                        >devluksjs@gmail.com</a
                      >
                    </p>
                    <small>Resposta em até 24h</small>
                  </div>
                </div>

                <div class="info-item">
                  <div class="info-icon">
                    <i class="fas fa-clock" aria-hidden="true"></i>
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
                  <a
                    href="https://github.com/ldickmann"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="social-btn github"
                  >
                    <i class="fab fa-github" aria-hidden="true"></i>
                    GitHub
                  </a>
                  <a
                    href="https://linkedin.com/in/lucasdickmann"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="social-btn linkedin"
                  >
                    <i class="fab fa-linkedin-in" aria-hidden="true"></i>
                    LinkedIn
                  </a>
                  <a
                    href="https://wa.me/5547555555555"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="social-btn whatsapp"
                  >
                    <i class="fab fa-whatsapp" aria-hidden="true"></i>
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
                  <i class="fas fa-map-marker-alt" aria-hidden="true"></i>
                  <p>Mapa Interativo</p>
                  <small>Rua da Barbearia, 123 - Centro</small>
                </div>
              </div>
              <div class="map-actions">
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=Rua+da+Barbearia+123+Centro+Navegantes+SC"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="btn btn--outline map-link"
                >
                  <i class="fas fa-directions" aria-hidden="true"></i>
                  Como Chegar
                </a>
                <a href="#" class="btn btn--outline map-link" @click.prevent="showNotImplemented">
                  <i class="fas fa-street-view" aria-hidden="true"></i>
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
import { ref, reactive, nextTick } from 'vue'
import { useNotificationStore } from '@/stores/notification'
import { validateContact, formatPhone } from '@/utils/validation'

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

// Ordem dos campos no formulário, para levar o foco ao primeiro com erro
const fieldOrder = ['name', 'email', 'phone', 'subject', 'message']

const focusFirstError = async () => {
  await nextTick()
  const first = fieldOrder.find((field) => errors.value[field])
  if (first) document.getElementById(first)?.focus()
}

const showNotImplemented = () => {
  notificationStore.showWarning('Função não implementada')
}

const handleSubmit = async () => {
  clearErrors()

  // Validar formulário (antes de desabilitar os campos, para o foco poder ir ao primeiro erro)
  const validation = validateContact(formData)

  if (!validation.isValid) {
    errors.value = validation.errors
    notificationStore.showError('Por favor, corrija os erros no formulário')
    await focusFirstError()
    return
  }

  try {
    isLoading.value = true

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
@use '@/assets/styles/scss/_variables.scss' as var;
@use '@/assets/styles/scss/_mixins.scss' as mx;

// O topo compensa exatamente a altura do header (sem faixa clara no mobile)
.contact-page {
  padding-top: var.$header-height;
  font-family: var.$font-family-tertiary;

  @include mx.down(var.$bp-lg) {
    padding-top: var.$header-height-mobile;
  }
}

.container {
  @include mx.container;
}

// Hero Section
.hero-section {
  background: linear-gradient(135deg, var.$bg-light 0%, var.$bg-light-2 100%);
  padding: 4rem 0;
  text-align: center;
}

.hero-content {
  @include mx.container;

  h1 {
    font-family: var.$font-family-primary;
    font-size: 3rem;
    color: var.$primary;
    margin-bottom: 1.5rem;

    @include mx.down(var.$bp-md) {
      font-size: 2.5rem;
    }
  }

  p {
    font-size: 1.2rem;
    color: var.$text-gray;
    line-height: 1.6;
    margin: 0;
  }
}

// Contact Content
.contact-content {
  padding: 5rem 0;
  background: var.$accent-light;
}

.content-grid {
  display: flex;
  gap: 4rem;
  flex-wrap: wrap;

  @include mx.down(var.$bp-lg) {
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
      font-family: var.$font-family-primary;
      font-size: 2rem;
      color: var.$primary;
      margin-bottom: 0.5rem;
    }

    p {
      color: var.$text-gray;
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

.form-textarea {
  min-height: 120px;
}

.character-count {
  font-size: 0.8rem;
  color: var.$text-gray;
  text-align: right;
  margin-top: 0.25rem;
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
  background: var.$bg-light;
  border-radius: 16px;
  padding: 2rem;
  border: 1px solid var.$bg-light-2;

  h3 {
    font-family: var.$font-family-primary;
    font-size: 1.5rem;
    color: var.$primary;
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
  background: var.$gradient-primary;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  i {
    color: var.$accent-light;
    font-size: 1rem;
  }
}

.info-details {
  flex: 1;

  strong {
    color: var.$primary;
    font-size: 1rem;
    font-weight: 600;
    display: block;
    margin-bottom: 0.25rem;
  }

  p {
    color: var.$text-body;
    margin: 0 0 0.25rem 0;
    line-height: 1.5;
  }

  small {
    color: var.$text-gray;
    font-size: 0.85rem;
  }

  // Telefone e e-mail: sublinhados para se distinguir do texto em volta
  .contact-link {
    color: inherit;
    text-decoration: underline;
    text-underline-offset: 2px;

    &:hover {
      text-decoration-thickness: 2px;
    }
  }
}

.social-links {
  border-top: 1px solid var.$border-color;
  padding-top: 1.5rem;

  h4 {
    color: var.$primary;
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
  transition:
    transform var.$duration-base var.$ease,
    box-shadow var.$duration-base var.$ease;

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
    font-family: var.$font-family-primary;
    font-size: 1.3rem;
    color: var.$primary;
    margin-bottom: 1rem;
  }
}

.map-placeholder {
  background: var.$bg-light;
  border: 2px dashed var.$border-color;
  border-radius: 12px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  transition:
    border-color var.$duration-base var.$ease,
    background-color var.$duration-base var.$ease;

  &:hover {
    border-color: var.$secondary;
    background: var.$secondary-tint;
  }
}

.map-content {
  text-align: center;
  color: var.$text-gray;

  i {
    font-size: 2rem;
    color: var.$secondary;
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

  @include mx.down(var.$bp-sm) {
    flex-direction: column;
  }
}

.map-link {
  flex: 1;
  padding: 0.75rem 1rem;
}

// FAQ Section
.faq-section {
  padding: 4rem 0;
  background: var.$bg-light;

  h2 {
    font-family: var.$font-family-primary;
    font-size: 2.2rem;
    color: var.$primary;
    text-align: center;
    margin-bottom: 3rem;

    @include mx.down(var.$bp-md) {
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
  background: var.$accent-light;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: var.$shadow-sm;

  h3 {
    color: var.$primary;
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 1rem;
    line-height: 1.4;
  }

  p {
    color: var.$text-gray;
    line-height: 1.6;
    margin: 0;
  }
}

@include mx.down(var.$bp-md) {
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
