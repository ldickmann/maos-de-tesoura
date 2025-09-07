<template>
  <footer class="footer">
    <div class="footer-main">
      <div class="container">
        <div class="footer-grid">
          <!-- Company Info -->
          <div class="footer-section">
            <div class="footer-logo">
              <h3>Mãos de Tesoura</h3>
              <p class="footer-tagline">A Barbearia dos Homens</p>
            </div>
            <p class="footer-description">
              Há mais de 20 anos oferecendo os melhores serviços de barbearia, combinando tradição,
              qualidade e um atendimento excepcional.
            </p>
            <div class="contact-info-footer">
              <div class="contact-item-footer">
                <i class="fas fa-map-marker-alt"></i>
                <span>Rua da Barbearia, 123 - Centro, Navegantes/SC</span>
              </div>
              <div class="contact-item-footer">
                <i class="fas fa-envelope"></i>
                <span>devluksjs@gmail.com</span>
              </div>
              <div class="contact-item-footer">
                <i class="fas fa-phone"></i>
                <span>(47) 55555-5555</span>
              </div>
            </div>
            <div class="social-links">
              <a
                href="https://github.com/ldickmann"
                target="_blank"
                class="social-link github"
                aria-label="GitHub"
              >
                <i class="fab fa-github"></i>
              </a>
              <a
                href="https://linkedin.com/in/lucasdickmann"
                target="_blank"
                class="social-link linkedin"
                aria-label="LinkedIn"
              >
                <i class="fab fa-linkedin-in"></i>
              </a>
              <a
                href="https://wa.me/5511987654321"
                target="_blank"
                class="social-link whatsapp"
                aria-label="WhatsApp"
              >
                <i class="fab fa-whatsapp"></i>
              </a>
              <a
                href="#"
                class="social-link instagram"
                aria-label="Instagram"
                @click="showNotImplemented"
              >
                <i class="fab fa-instagram"></i>
              </a>
            </div>
          </div>

          <!-- Quick Links -->
          <div class="footer-section">
            <h4>Links Rápidos</h4>
            <ul class="footer-links">
              <li><router-link to="/">Home</router-link></li>
              <li><router-link to="/servicos">Serviços</router-link></li>
              <li><router-link to="/about">Sobre Nós</router-link></li>
              <li><router-link to="/contato">Contato</router-link></li>
              <li><router-link to="/booking">Agendamento</router-link></li>
            </ul>
          </div>

          <!-- Services -->
          <div class="footer-section">
            <h4>Nossos Serviços</h4>
            <ul class="footer-links">
              <li><a href="#" @click="selectService(1)">Corte de Cabelo</a></li>
              <li><a href="#" @click="selectService(2)">Barba + Bigode</a></li>
              <li><a href="#" @click="selectService(3)">Combo Completo</a></li>
              <li><a href="#" @click="selectService(4)">Sobrancelha</a></li>
            </ul>
          </div>

          <!-- Contact Info -->
          <div class="footer-section">
            <h4>Contato</h4>
            <div class="contact-info">
              <div class="contact-item">
                <i class="fas fa-map-marker-alt"></i>
                <div>
                  <p>Rua da Barbearia, 123</p>
                  <p>Centro - Navegantes/SC</p>
                </div>
              </div>
              <div class="contact-item">
                <i class="fas fa-phone"></i>
                <div>
                  <p>(47) 55555-5555</p>
                  <small>Segunda a Sábado</small>
                </div>
              </div>
              <div class="contact-item">
                <i class="fas fa-clock"></i>
                <div>
                  <p>Seg-Sex: 9h às 19h</p>
                  <p>Sáb: 8h às 17h</p>
                </div>
              </div>
              <div class="contact-item">
                <i class="fas fa-envelope"></i>
                <div>
                  <p>devluksjs@gmail.com</p>
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
            <h3>Fique por Dentro das Novidades</h3>
            <p>Receba ofertas especiais, dicas de cuidados e novidades da barbearia</p>
          </div>
          <form @submit.prevent="subscribeNewsletter" class="newsletter-form">
            <div class="input-group">
              <input
                type="email"
                v-model="emailNewsletter"
                placeholder="Seu melhor email"
                required
                class="newsletter-input"
              />
              <button type="submit" class="newsletter-btn" :disabled="isSubscribing">
                <i v-if="isSubscribing" class="fas fa-spinner fa-spin"></i>
                <i v-else class="fas fa-paper-plane"></i>
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
  // Encontrar o serviço pelo ID
  const services = [
    { id: 1, name: 'Corte de Cabelo', duration: 30, price: 25.0 },
    { id: 2, name: 'Barba + Bigode', duration: 25, price: 20.0 },
    { id: 3, name: 'Combo Completo', duration: 45, price: 35.0 },
    { id: 4, name: 'Sobrancelha', duration: 15, price: 10.0 },
  ]

  const service = services.find((s) => s.id === serviceId)
  if (service) {
    bookingStore.setService(service)
    router.push('/booking')
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
</script>

<style scoped lang="scss">
.footer {
  background: #212121;
  color: white;
  font-family: 'Hanken Grotesk', sans-serif;
}

.container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 2rem;
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

  @media (max-width: 968px) {
    flex-direction: column;
    gap: 2rem;
  }
}

.footer-section {
  flex: 1;
  min-width: 250px;

  &:first-child {
    flex: 2;
    min-width: 300px;
  }

  h4 {
    color: #ff7b42;
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
  }
}

// Company Info
.footer-logo {
  margin-bottom: 1.5rem;

  h3 {
    font-family: 'Archivo Black', sans-serif;
    font-size: 1.5rem;
    color: white;
    margin-bottom: 0.5rem;
  }

  .footer-tagline {
    color: #ff7b42;
    font-weight: 500;
    margin: 0;
  }
}

.footer-description {
  color: #b0b0b0;
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
    transition: all 0.3s ease;
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
      box-shadow: 0 4px 15px rgba(255, 123, 66, 0.3);
    }

    i {
      color: white;
      font-size: 1.1rem;
    }
  }
}

// Contact info in footer
.contact-info-footer {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 1rem;

  .contact-item-footer {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    color: #b0b0b0;
    font-size: 0.9rem;

    i {
      color: #ff7b42;
      width: 16px;
      text-align: center;
    }
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
      color: #b0b0b0;
      text-decoration: none;
      transition: color 0.3s ease;
      cursor: pointer;

      &:hover {
        color: #ff7b42;
      }
    }
  }
}

// Contact Info
.contact-info {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.contact-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;

  i {
    color: #ff7b42;
    font-size: 1.1rem;
    margin-top: 0.25rem;
    flex-shrink: 0;
  }

  div {
    p {
      color: #b0b0b0;
      margin: 0 0 0.25rem 0;
      line-height: 1.4;
    }

    small {
      color: #888;
      font-size: 0.85rem;
    }
  }
}

// Newsletter Section
.newsletter-section {
  background: #2c2c2c;
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
  h3 {
    font-size: 1.5rem;
    color: white;
    margin-bottom: 0.5rem;
    font-weight: 600;
  }

  p {
    color: #b0b0b0;
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
    padding: 0.875rem 1rem;
    border: 1px solid #444;
    border-radius: 8px;
    background: #333;
    color: white;
    font-size: 1rem;

    &::placeholder {
      color: #888;
    }

    &:focus {
      outline: none;
      border-color: #ff7b42;
    }
  }

  .newsletter-btn {
    padding: 0.875rem 1.5rem;
    background: linear-gradient(135deg, #ff7b42 0%, #e66b32 100%);
    color: white;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    white-space: nowrap;

    &:hover:not(:disabled) {
      background: linear-gradient(135deg, #e66b32 0%, #d55a22 100%);
    }

    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
  }
}

// Footer Bottom
.footer-bottom {
  background: #1a1a1a;
  padding: 1.5rem 0;
  border-top: 1px solid #333;
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
      color: #888;
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
      color: #888;
      text-decoration: none;
      font-size: 0.9rem;
      transition: color 0.3s ease;
      cursor: pointer;

      &:hover {
        color: #ff7b42;
      }
    }
  }
}
</style>
