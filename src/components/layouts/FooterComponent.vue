<template>
  <!-- Componente Footer, que exibirá o rodapé do site com informações de contato, links rápidos e inscrição na newsletter -->
  <footer class="footer">
    <div class="footer-main">
      <div class="container">
        <div class="footer-grid">
          <!-- Company Info -->
          <div class="footer-section">
            <div class="footer-logo">
              <h2>Mãos de Tesoura</h2>
              <p class="footer-tagline">A Barbearia dos Homens</p>
            </div>
            <p class="footer-description">
              Há mais de 16 anos oferecendo os melhores serviços de barbearia, combinando tradição,
              qualidade e um atendimento excepcional.
            </p>
            <div class="social-links">
              <a
                href="https://github.com/ldickmann"
                target="_blank"
                rel="noopener noreferrer"
                class="social-link github"
                aria-label="GitHub"
              >
                <i class="fab fa-github" aria-hidden="true"></i>
              </a>
              <a
                href="https://linkedin.com/in/lucasdickmann"
                target="_blank"
                rel="noopener noreferrer"
                class="social-link linkedin"
                aria-label="LinkedIn"
              >
                <i class="fab fa-linkedin-in" aria-hidden="true"></i>
              </a>
              <a
                href="https://wa.me/5547555555555"
                target="_blank"
                rel="noopener noreferrer"
                class="social-link whatsapp"
                aria-label="WhatsApp"
              >
                <i class="fab fa-whatsapp" aria-hidden="true"></i>
              </a>
              <a
                href="#"
                class="social-link instagram"
                aria-label="Instagram"
                @click="showNotImplemented"
              >
                <i class="fab fa-instagram" aria-hidden="true"></i>
              </a>
            </div>
          </div>

          <!-- Quick Links -->
          <div class="footer-section">
            <h2>Links Rápidos</h2>
            <ul class="footer-links">
              <li>
                <router-link :to="{ path: '/', hash: '#home' }" @click="scrollToTop"
                  >Home</router-link
                >
              </li>
              <li><router-link to="/servicos" @click="scrollToTop">Serviços</router-link></li>
              <li><router-link to="/about" @click="scrollToTop">Sobre Nós</router-link></li>
              <li><router-link to="/contato" @click="scrollToTop">Contato</router-link></li>
              <li><router-link to="/booking" @click="scrollToTop">Agendamento</router-link></li>
            </ul>
          </div>

          <!-- Services -->
          <div class="footer-section">
            <h2>Nossos Serviços</h2>
            <ul class="footer-links">
              <li><a href="#" @click="selectService(1)">Corte de Cabelo</a></li>
              <li><a href="#" @click="selectService(2)">Barba + Bigode</a></li>
              <li><a href="#" @click="selectService(3)">Combo Completo</a></li>
              <li><a href="#" @click="selectService(4)">Sobrancelha</a></li>
            </ul>
          </div>

          <!-- Contact Info -->
          <div class="footer-section">
            <h2>Contato</h2>
            <div class="contact-info">
              <div class="contact-item">
                <i class="fas fa-map-marker-alt" aria-hidden="true"></i>
                <div>
                  <p>Rua da Barbearia, 123</p>
                  <p>Centro - Navegantes/SC</p>
                </div>
              </div>
              <div class="contact-item">
                <i class="fas fa-phone" aria-hidden="true"></i>
                <div>
                  <p><a href="tel:+5547555555555" class="contact-link">(47) 55555-5555</a></p>
                  <small>Segunda a Sábado</small>
                </div>
              </div>
              <div class="contact-item">
                <i class="fas fa-clock" aria-hidden="true"></i>
                <div>
                  <p>Seg-Sex: 9h às 19h</p>
                  <p>Sáb: 8h às 17h</p>
                </div>
              </div>
              <div class="contact-item">
                <i class="fas fa-envelope" aria-hidden="true"></i>
                <div>
                  <p>
                    <a href="mailto:devluksjs@gmail.com" class="contact-link"
                      >devluksjs@gmail.com</a
                    >
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Newsletter Section -->
    <div class="newsletter-section">
      <div class="container">
        <div class="newsletter-content">
          <div class="newsletter-text">
            <h2>Fique por Dentro das Novidades</h2>
            <p>Receba ofertas especiais, dicas de cuidados e novidades da barbearia</p>
          </div>
          <form @submit.prevent="subscribeNewsletter" class="newsletter-form">
            <div class="input-group">
              <label for="newsletter-email" class="sr-only">Seu e-mail</label>
              <input
                id="newsletter-email"
                type="email"
                v-model="emailNewsletter"
                placeholder="Seu melhor email"
                required
                class="form-input form-input--dark newsletter-input"
              />
              <button
                type="submit"
                class="btn btn--primary newsletter-btn"
                :disabled="isSubscribing"
              >
                <i v-if="isSubscribing" class="fas fa-spinner fa-spin" aria-hidden="true"></i>
                <i v-else class="fas fa-paper-plane" aria-hidden="true"></i>
                {{ isSubscribing ? 'Enviando...' : 'Inscrever' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Footer Bottom -->
    <div class="footer-bottom">
      <div class="container">
        <div class="footer-bottom-content">
          <div class="copyright">
            <p>&copy; {{ currentYear }} Mãos de Tesoura. Todos os direitos reservados.</p>
          </div>
          <div class="footer-bottom-links">
            <a href="#" @click.prevent="openModal('privacy')">Política de Privacidade</a>
            <a href="#" @click.prevent="openModal('terms')">Termos de Uso</a>
            <a href="#" @click.prevent="openModal('cookies')">Cookies</a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useBookingStore } from '@/stores/booking'
import { useNotificationStore } from '@/stores/notification'

const router = useRouter()
const bookingStore = useBookingStore()
const notificationStore = useNotificationStore()

const emailNewsletter = ref('')
const isSubscribing = ref(false)

const currentYear = computed(() => new Date().getFullYear())

// Newsletter subscription
const subscribeNewsletter = async () => {
  try {
    isSubscribing.value = true

    // Validar email
    if (!emailNewsletter.value || !emailNewsletter.value.includes('@')) {
      throw new Error('Email inválido')
    }

    // Simular envio
    await new Promise((resolve) => setTimeout(resolve, 1500))

    notificationStore.showSuccess('Inscrição realizada com sucesso! Obrigado por se juntar a nós.')
    emailNewsletter.value = ''
  } catch (error) {
    notificationStore.showError(error.message || 'Erro ao realizar inscrição. Tente novamente.')
  } finally {
    isSubscribing.value = false
  }
}

// Select service and redirect
const selectService = (serviceId) => {
  const services = [
    {
      id: 1,
      name: 'Corte de Cabelo',
      duration: 30,
      price: 25.0,
      description: 'Corte de cabelo masculino com finalização.',
    },
    {
      id: 2,
      name: 'Barba + Bigode',
      duration: 25,
      price: 20.0,
      description: 'Design e cuidados para barba e bigode.',
    },
    {
      id: 3,
      name: 'Combo Completo',
      duration: 45,
      price: 35.0,
      description: 'Combo completo para um visual harmonioso.',
    },
    {
      id: 4,
      name: 'Sobrancelha',
      duration: 15,
      price: 10.0,
      description: 'Design de sobrancelha masculina.',
    },
  ]

  const service = services.find((s) => s.id === serviceId)
  if (service) {
    bookingStore.setService(service)
    router.push('/booking').then(() => {
      window.scrollTo(0, 0)
    })
  }
}

// Open modal (placeholder) - apenas para funcionalidades que precisam de backend
const openModal = (type) => {
  notificationStore.showWarning(`Função não implementada: ${type}`)
}

// Show not implemented alert - para funcionalidades que precisam de backend
const showNotImplemented = () => {
  notificationStore.showWarning('Função não implementada')
}

const scrollToTop = () => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
}
</script>

<style scoped lang="scss">
@use '@/assets/styles/scss/_variables.scss' as var;
@use '@/assets/styles/scss/_mixins.scss' as mx;

.footer {
  @include mx.on-dark-surface;
  background: var.$primary;
  color: var.$accent-light;
  font-family: var.$font-family-tertiary;
}

.container {
  @include mx.container;
}

// Footer Main
.footer-main {
  padding: 3rem 0;
}

.footer-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 3rem;
  justify-content: space-between;

  @include mx.down(var.$bp-lg) {
    flex-direction: column;
    gap: 2rem;
    text-align: center;
  }
}

.footer-section {
  flex: 1;
  min-width: 220px;

  &:first-child {
    flex: 2;
    min-width: 300px;
  }

  @media (max-width: 968px) {
    min-width: auto;

    &:first-child {
      min-width: auto;
    }
  }

  h2 {
    color: var.$secondary;
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
  }
}

// Company Info
.footer-logo {
  margin-bottom: 1.5rem;

  h2 {
    font-family: var.$font-family-primary;
    font-size: 1.5rem;
    color: var.$accent-light;
    margin-bottom: 0.5rem;
  }

  .footer-tagline {
    color: var.$secondary;
    font-weight: 500;
    margin: 0;
  }
}

.footer-description {
  color: var.$text-on-dark-muted;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.social-links {
  display: flex;
  gap: 1rem;

  .social-link {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition:
      transform var.$duration-base var.$ease,
      box-shadow var.$duration-base var.$ease;
    text-decoration: none;

    &.github {
      background: #333;
    }

    &.linkedin {
      background: #0077b5;
    }

    &.instagram {
      background: linear-gradient(135deg, #e4405f, #c13584);
    }

    &.whatsapp {
      background: #25d366;
    }

    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 4px 15px rgba(var.$secondary, 0.3);
    }

    i {
      color: var.$accent-light;
      font-size: 1.1rem;
    }
  }

  @include mx.down(var.$bp-lg) {
    align-items: center;
    justify-content: center;
  }
}

// Footer Links
.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    margin-bottom: 0.75rem;

    a {
      display: inline-flex;
      align-items: center;
      min-height: 24px;
      color: var.$text-on-dark-muted;
      text-decoration: none;
      transition: color var.$duration-base var.$ease;
      cursor: pointer;

      &:hover {
        color: var.$secondary;
      }
    }
  }
}

// Contact Info
.contact-info {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @include mx.down(var.$bp-lg) {
    align-items: center;
  }
}

.contact-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;

  i {
    color: var.$secondary;
    font-size: 1.1rem;
    margin-top: 0.25rem;
    flex-shrink: 0;
  }

  div {
    p {
      color: var.$text-on-dark-muted;
      margin: 0 0 0.25rem 0;
      line-height: 1.4;
    }

    // Telefone e e-mail: mesmo estilo dos links do rodapé
    .contact-link {
      display: inline-flex;
      align-items: center;
      min-height: 24px;
      color: inherit;
      text-decoration: none;
      transition: color var.$duration-base var.$ease;

      &:hover {
        color: var.$secondary;
      }
    }

    small {
      color: var.$text-on-dark-subtle;
      font-size: 0.85rem;
    }
  }
}

// Newsletter Section
.newsletter-section {
  background: var.$surface-dark-2;
  padding: 2.5rem 0;
}

.newsletter-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 1.5rem;
  }
}

.newsletter-text {
  h2 {
    font-size: 1.5rem;
    color: var.$accent-light;
    margin-bottom: 0.5rem;
    font-weight: 600;
  }

  p {
    color: var.$text-on-dark-muted;
    margin: 0;
    line-height: 1.5;
  }
}

.newsletter-form {
  .input-group {
    display: flex;
    gap: 0.5rem;

    @media (max-width: 480px) {
      flex-direction: column;
    }
  }

  .newsletter-input {
    flex: 1;
  }

  .newsletter-btn {
    white-space: nowrap;
  }
}

// Footer Bottom
.footer-bottom {
  background: var.$bg-footer;
  padding: 1.5rem 0;
  border-top: 1px solid var.$surface-dark-3;
}

.footer-bottom-content {
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }

  .copyright {
    p {
      color: var.$text-on-dark-subtle;
      margin: 0;
      font-size: 0.9rem;
    }
  }

  .footer-bottom-links {
    display: flex;
    gap: 2rem;

    @media (max-width: 480px) {
      flex-direction: column;
      gap: 0.5rem;
    }

    a {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-height: 24px;
      color: var.$text-on-dark-subtle;
      text-decoration: none;
      font-size: 0.9rem;
      transition: color var.$duration-base var.$ease;
      cursor: pointer;

      &:hover {
        color: var.$secondary;
      }
    }
  }
}
</style>
