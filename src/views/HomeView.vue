<template>
  <div>
    <!-- Banner Section -->
    <section class="section-banner">
      <BannerComponent />
    </section>

    <!-- Services Preview Section -->
    <section class="services-preview">
      <div class="container">
        <div class="section-header">
          <h2>Nossos Serviços</h2>
          <p>Descubra os melhores tratamentos para o homem moderno</p>
        </div>

        <!-- Enquanto carrega, a grade mantém a altura dos cards para a página não pular -->
        <div class="services-grid" :class="{ 'services-grid--loading': isLoading }">
          <LoadingSpinner v-if="isLoading" message="Carregando serviços..." />
          <template v-else>
            <div
              v-for="service in featuredServices"
              :key="service.id"
              class="service"
              @click="selectService(service)"
            >
              <div class="service-icon">
                <i :class="service.icon" aria-hidden="true"></i>
              </div>
              <h3>{{ service.name }}</h3>
              <p class="service-description">{{ service.description }}</p>
              <div class="service-details">
                <span class="duration">{{ service.duration }} min</span>
                <span class="price">{{ formatPrice(service.price) }}</span>
              </div>
              <button @click="handleBookingAlert" class="btn btn--primary service-btn">
                <i class="fas fa-calendar" aria-hidden="true"></i>
                Agendar
              </button>
            </div>
          </template>
        </div>

        <div class="section-cta">
          <router-link to="/servicos" class="btn btn--outline"> Ver Todos os Serviços </router-link>
        </div>
      </div>
    </section>

    <!-- About Preview Section -->
    <section class="about-preview">
      <div class="container">
        <div class="about-grid">
          <div class="about-content">
            <span class="section-tag">Desde 2009</span>
            <h2>Tradição e Qualidade</h2>
            <p class="lead">
              Há mais de 16 anos dedicados à arte da barbearia clássica, combinando técnicas
              tradicionais com um toque moderno.
            </p>
            <ul class="features-list">
              <li>
                <i class="fas fa-check-circle" aria-hidden="true"></i>
                Profissionais experientes e qualificados
              </li>
              <li>
                <i class="fas fa-check-circle" aria-hidden="true"></i>
                Produtos premium e equipamentos modernos
              </li>
              <li>
                <i class="fas fa-check-circle" aria-hidden="true"></i>
                Ambiente acolhedor e sofisticado
              </li>
              <li>
                <i class="fas fa-check-circle" aria-hidden="true"></i>
                Atendimento personalizado
              </li>
            </ul>
            <div class="about-actions">
              <router-link to="/about" class="btn btn--primary"> Nossa História </router-link>
              <router-link to="/contato" class="btn btn--outline"> Fale Conosco </router-link>
            </div>
          </div>
          <div class="about-image">
            <img
              :src="barberBannerImg"
              alt="Interior da barbearia"
              width="1920"
              height="1281"
              loading="lazy"
            />
            <div class="stats-overlay">
              <div class="stat-item">
                <span class="stat-number">3000+</span>
                <span class="stat-label">Clientes</span>
              </div>
              <div class="stat-item">
                <span class="stat-number">16+</span>
                <span class="stat-label">Anos</span>
              </div>
              <div class="stat-item">
                <span class="stat-number">96%</span>
                <span class="stat-label">Satisfação</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Team Preview Section -->
    <section class="team-preview">
      <div class="container">
        <div class="section-header">
          <h2>Nossa Equipe</h2>
          <p>Conheça os profissionais que fazem a diferença</p>
        </div>

        <div class="team-grid">
          <div v-for="member in teamMembers" :key="member.id" class="team-card">
            <div class="member-photo">
              <img
                :src="member.photo"
                :alt="member.name"
                width="1920"
                height="1281"
                loading="lazy"
              />
            </div>
            <div class="member-info">
              <h3>{{ member.name }}</h3>
              <p class="member-role">{{ member.role }}</p>
              <div class="member-specialties">
                <span
                  v-for="specialty in member.specialties.slice(0, 2)"
                  :key="specialty"
                  class="specialty-tag"
                >
                  {{ specialty }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div class="section-cta">
          <router-link to="/about" class="btn btn--outline"> Conhecer Toda a Equipe </router-link>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section class="testimonials">
      <div class="container">
        <div class="section-header">
          <h2>O que Nossos Clientes Dizem</h2>
          <p>Depoimentos reais de quem confia no nosso trabalho</p>
        </div>

        <div class="testimonials-grid">
          <div v-for="testimonial in testimonials" :key="testimonial.id" class="testimonial-card">
            <div class="testimonial-content">
              <div class="rating" role="img" aria-label="5 de 5 estrelas">
                <i v-for="n in 5" :key="n" class="fas fa-star" aria-hidden="true"></i>
              </div>
              <p>{{ testimonial.text }}</p>
            </div>
            <div class="testimonial-author">
              <div class="author-avatar">
                <img
                  :src="testimonial.avatar"
                  :alt="testimonial.name"
                  width="1920"
                  height="1281"
                  loading="lazy"
                />
              </div>
              <div class="author-info">
                <h4>{{ testimonial.name }}</h4>
                <span>{{ testimonial.service }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="container">
        <div class="cta-content">
          <h2>Pronto para Renovar seu Visual?</h2>
          <p>Agende agora mesmo e experimente nossos serviços premium</p>
          <div class="cta-actions">
            <button @click="handleBookingAlert" class="btn btn--on-accent btn--lg">
              <i class="fas fa-calendar-check" aria-hidden="true"></i>
              Agendar Horário
            </button>
            <a
              href="https://wa.me/5511987654321"
              class="btn btn--whatsapp btn--lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i class="fab fa-whatsapp" aria-hidden="true"></i>
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useBookingStore } from '@/stores/booking'
import { useNotificationStore } from '@/stores/notification'
import { useServicesStore } from '@/stores/services'
import { useContentStore } from '@/stores/content'
import BannerComponent from '@/components/BannerComponent.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import { formatPrice } from '@/utils/format'

// Importar as imagens
import barberBannerImg from '@/assets/images/barber-banner.jpg'

const router = useRouter()
const bookingStore = useBookingStore()
const notificationStore = useNotificationStore()

// Stores de conteúdo
const servicesStore = useServicesStore()
const { services, isLoading } = storeToRefs(servicesStore)

const contentStore = useContentStore()
const { teamMembers, testimonials } = storeToRefs(contentStore)

// Apenas 3 serviços em destaque na home
const featuredServices = computed(() => services.value.slice(0, 3))

// Selecionar serviço e redirecionar
const selectService = (service) => {
  bookingStore.setService(service)
  notificationStore.showSuccess(`Serviço "${service.name}" selecionado!`)
  router.push('/booking')
}

// Função para emitir alert de função não implementada
const handleBookingAlert = () => {
  notificationStore.showInfo('Função Não implementada')
}

// Carregar dados ao montar o componente
onMounted(() => {
  if (services.value.length === 0) {
    servicesStore.fetchServices()
  }
})
</script>

<style scoped lang="scss">
@use '@/assets/styles/scss/_variables.scss' as var;
@use '@/assets/styles/scss/_mixins.scss' as mx;

.container {
  @include mx.container;
}

// Section Headers
.section-header {
  text-align: center;
  margin-bottom: 3rem;

  h2 {
    font-family: var.$font-family-secondary;
    font-size: 2.5rem;
    color: var.$text-primary;
    margin-bottom: 1rem;

    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }

  p {
    font-size: 1.1rem;
    color: var.$text-muted; // 5,89:1 sobre $bg-light
    max-width: 600px;
    margin: 0 auto;
  }
}

// Services Preview Section
.services-preview {
  padding: 5rem 0;
  background: var.$bg-light;
}

.services-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 3rem;

  // Responsividade com flexbox
  @include mx.down(var.$bp-md - 1px) {
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  }

  // Mesma distribuição de antes: space-around até 1024px e space-evenly até 1200px
  @media (min-width: var.$bp-md) and (max-width: 1024px) {
    justify-content: space-around;
  }

  @media (min-width: 1025px) and (max-width: 1200px) {
    justify-content: space-evenly;
  }

  // Enquanto os serviços carregam, reserva a altura da grade pronta (3 cards do mock),
  // medida em cada layout. Entre 968 e 1099px as descrições quebram de outro jeito e
  // sobra uma diferença de até 57px.
  &--loading {
    justify-content: flex-start; // spinner no topo; as margens auto dele centralizam na horizontal
    align-items: flex-start;
    min-height: 458.5625px; // 3 por linha

    // a 968px ainda cabem 3 cards (3 × 280px + 2 × 32px = 904px de contêiner)
    @include mx.down(var.$bp-lg - 1px) {
      min-height: 949.125px; // 2 linhas
    }

    @include mx.down(var.$bp-md - 1px) {
      min-height: 1423.6875px; // empilhados
    }

    @include mx.down(var.$bp-sm) {
      min-height: 1510.6875px; // empilhados, com duração e preço em coluna
    }

    .loading-container {
      width: 100%;
    }
  }
}

// Coluna flex: duração, preço e botão ficam alinhados na base de todos os cards
.service {
  display: flex;
  flex-direction: column;
  background: var.$accent-light;
  padding: 2rem;
  border-radius: var.$radius-2xl;
  box-shadow: var.$shadow-md;
  transition:
    transform 0.4s var.$ease,
    box-shadow 0.4s var.$ease,
    border-color 0.4s var.$ease;
  cursor: pointer;
  text-align: center;
  flex: 1;
  min-width: 280px;
  max-width: 350px;
  border: 1px solid rgba(var.$secondary, 0.1);
  position: relative;
  overflow: hidden;

  // Barra superior animada
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: var.$gradient-primary;
    transform: scaleX(0);
    transition: transform var.$duration-base var.$ease;
  }

  &:hover {
    transform: translateY(-10px);
    box-shadow: var.$shadow-lg;
    border-color: rgba(var.$secondary, 0.3);

    &::before {
      transform: scaleX(1);
    }

    .service-icon {
      transform: scale(1.1);
      box-shadow: 0 8px 25px rgba(var.$secondary, 0.3);
    }
  }

  @include mx.down(var.$bp-md - 1px) {
    width: 100%;
    max-width: 400px;
    padding: 2rem 1.5rem;
  }

  .service-icon {
    width: 80px;
    height: 80px;
    background: var.$gradient-primary;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 2rem;
    transition:
      transform var.$duration-base var.$ease,
      box-shadow var.$duration-base var.$ease;
    box-shadow: 0 4px 15px rgba(var.$secondary, 0.2);

    i {
      font-size: 2rem;
      color: var.$accent-light;
    }
  }

  h3 {
    font-size: 1.5rem;
    color: var.$text-primary;
    margin-bottom: 1rem;
    font-weight: 700;
    font-family: var.$font-family-secondary;
  }

  .service-description {
    color: var.$text-gray;
    margin-bottom: 2rem;
    line-height: 1.6;
    font-size: 1rem;
  }

  .service-details {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: auto;
    margin-bottom: 2rem;
    padding: 1.2rem;
    background: var.$bg-light;
    border-radius: var.$radius-lg;
    border-left: 4px solid var.$btn-primary-bg;

    @media (max-width: 480px) {
      flex-direction: column;
      gap: 0.5rem;
      text-align: center;
    }

    .duration {
      color: var.$tertiary;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .price {
      color: var.$btn-primary-bg;
      font-weight: bold;
      font-size: 1.3rem;
      font-family: var.$font-family-secondary;
    }
  }

  .service-btn {
    width: 100%;
    padding: 1rem;
    font-size: 1rem;
  }
}

// About Preview Section
.about-preview {
  padding: 5rem 0;
  background: var.$accent-light;
}

.about-grid {
  display: flex;
  gap: 4rem;
  align-items: center;
  flex-wrap: wrap;

  @include mx.down(var.$bp-lg) {
    flex-direction: column;
    gap: 3rem;
  }

  @include mx.down(var.$bp-md) {
    gap: 2rem;
  }
}

.about-content {
  flex: 1;
  min-width: 300px;

  // Texto escuro sobre o laranja: 6,26:1
  .section-tag {
    display: inline-block;
    background: var.$secondary;
    color: var.$primary;
    padding: 0.5rem 1rem;
    border-radius: var.$radius-pill;
    font-size: 0.9rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }

  h2 {
    font-family: var.$font-family-secondary;
    font-size: 2.5rem;
    color: var.$text-primary;
    margin-bottom: 1.5rem;
  }

  .lead {
    font-size: 1.2rem;
    color: var.$tertiary;
    line-height: 1.6;
    margin-bottom: 2rem;
  }
}

.features-list {
  list-style: none;
  padding: 0;
  margin: 0 0 2rem 0;

  li {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.75rem 0;
    color: var.$tertiary;

    i {
      color: var.$success;
      font-size: 1.1rem;
    }
  }
}

.about-actions {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }

  @media (max-width: 480px) {
    width: 100%;
  }
}

.about-image {
  position: relative;
  flex: 1;
  min-width: 300px;

  img {
    width: 100%;
    height: auto; // a proporção vem dos atributos width/height
    border-radius: var.$radius-xl;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }
}

.stats-overlay {
  position: absolute;
  bottom: 2rem;
  left: 2rem;
  right: 2rem;
  background: rgba(var.$accent-light, 0.95);
  backdrop-filter: blur(10px);
  border-radius: var.$radius-xl;
  padding: 2rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  border: 1px solid var.$border-color;

  // Abaixo da foto, para não cobrir metade dela
  @include mx.down(var.$bp-md) {
    position: static;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    margin-top: 1rem;
    border-radius: var.$radius-lg;
  }

  .stat-item {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;

    .stat-number {
      font-size: 2rem;
      font-weight: bold;
      color: var.$btn-primary-bg;
      font-family: var.$font-family-secondary;

      @media (max-width: 768px) {
        font-size: 1.8rem;
      }
    }

    .stat-label {
      font-size: 0.9rem;
      color: var.$text-gray;
      font-weight: 500;
    }
  }
}

// Team Preview Section
.team-preview {
  padding: 5rem 0;
  background: var.$bg-light;
}

.team-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 3rem;

  @include mx.down(var.$bp-md - 1px) {
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  }

  @media (min-width: var.$bp-md) and (max-width: 1024px) {
    justify-content: space-around;
  }
}

// Sem efeito de "levantar": o card não é clicável
.team-card {
  background: var.$accent-light;
  border-radius: var.$radius-2xl;
  overflow: hidden;
  box-shadow: var.$shadow-md;
  border: 1px solid var.$border-color;
  flex: 1;
  min-width: 280px;
  max-width: 350px;
  display: flex;
  flex-direction: column;

  @include mx.down(var.$bp-md - 1px) {
    width: 100%;
    max-width: 400px;
  }

  .member-photo {
    height: 250px;
    overflow: hidden;
    position: relative;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.4s ease;
    }

    &:hover img {
      transform: scale(1.05);
    }
  }

  .member-info {
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    flex-grow: 1;

    h3 {
      font-size: 1.4rem;
      color: var.$text-primary;
      margin: 0;
      font-weight: 700;
      font-family: var.$font-family-secondary;
    }

    .member-role {
      color: var.$btn-primary-bg;
      font-weight: 600;
      margin: 0;
      font-size: 1rem;
    }
  }
}

.member-specialties {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: auto; // Empurra as tags para o final do card

  .specialty-tag {
    background: var.$bg-light;
    color: var.$tertiary;
    padding: 0.4rem 0.8rem;
    border-radius: var.$radius-pill;
    font-size: 0.85rem;
    font-weight: 500;
    border: 1px solid var.$border-color;
  }
}

// Testimonials Section
.testimonials {
  padding: 5rem 0;
  background: var.$accent-light;
}

.testimonials-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;

  @include mx.down(var.$bp-md - 1px) {
    flex-direction: column;
    align-items: center;
  }

  @media (min-width: var.$bp-md) and (max-width: 1024px) {
    justify-content: space-around;
  }
}

// Sem efeito de "levantar": o depoimento não é clicável
.testimonial-card {
  background: var.$bg-light;
  padding: 2.5rem;
  border-radius: var.$radius-2xl;
  box-shadow: var.$shadow-md;
  border: 1px solid var.$border-color;
  flex: 1;
  min-width: 320px;
  max-width: 400px;
  display: flex;
  flex-direction: column;

  @include mx.down(var.$bp-md - 1px) {
    width: 100%;
    max-width: 450px;
  }

  .testimonial-content {
    margin-bottom: 2rem;
    flex-grow: 1;

    .rating {
      margin-bottom: 1.5rem;
      display: flex;
      gap: 0.25rem;

      i {
        color: var.$warning;
        font-size: 1.1rem;
      }
    }

    p {
      font-style: italic;
      color: var.$tertiary;
      line-height: 1.7;
      margin: 0;
      font-size: 1.1rem;
      position: relative;

      &::before {
        content: '"';
        color: var.$btn-primary-bg;
        font-size: 3rem;
        font-family: serif;
        position: absolute;
        left: -1rem;
        top: -0.5rem;
        opacity: 0.3;
      }
    }
  }

  .testimonial-author {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding-top: 1rem;
    border-top: 1px solid var.$border-color;

    .author-avatar {
      width: 55px;
      height: 55px;
      border-radius: 50%;
      overflow: hidden;
      flex-shrink: 0;
      border: 2px solid var.$btn-primary-bg;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .author-info {
      flex-grow: 1;
      display: flex;
      flex-direction: column;

      h4 {
        color: var.$text-primary;
        margin: 0 0 0.25rem 0;
        font-weight: 600;
        font-size: 1.1rem;
      }

      span {
        color: var.$text-gray;
        font-size: 0.9rem;
        font-weight: 500;
      }
    }
  }
}

// CTA Section
// Texto $primary sobre o laranja, sem opacidade: 6,26:1 no início do gradiente e 4,99:1 no fim
.cta-section {
  padding: 5rem 0;
  background: var.$gradient-primary;
  color: var.$primary;
  text-align: center;

  .cta-content {
    h2 {
      font-family: var.$font-family-secondary;
      font-size: 2.5rem;
      margin-bottom: 1rem;

      @media (max-width: 768px) {
        font-size: 2rem;
      }
    }

    p {
      font-size: 1.2rem;
      margin-bottom: 2rem;
    }
  }

  .cta-actions {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1.5rem;
    flex-wrap: wrap;

    // Os dois botões com a mesma largura no celular
    @include mx.down(var.$bp-md) {
      flex-direction: column;
      align-items: stretch;
      width: 100%;
      gap: 1rem;
    }
  }
}

.section-cta {
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 0;
}

// Tablet
@media (min-width: var.$bp-md + 1px) and (max-width: 1024px) {
  .about-grid {
    gap: 3rem;
  }
}
</style>
