<template>
  <main>
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

        <div class="services-grid">
          <div
            v-for="service in featuredServices"
            :key="service.id"
            class="service-card"
            @click="selectService(service)"
          >
            <div class="service-icon">
              <i :class="service.icon"></i>
            </div>
            <h3>{{ service.name }}</h3>
            <p class="service-description">{{ service.description }}</p>
            <div class="service-details">
              <span class="duration">{{ service.duration }} min</span>
              <span class="price">R$ {{ service.price.toFixed(2) }}</span>
            </div>
            <button class="service-btn">
              <i class="fas fa-calendar"></i>
              Agendar
            </button>
          </div>
        </div>

        <div class="section-cta">
          <router-link to="/servicos" class="btn-outline-primary">
            Ver Todos os Serviços
          </router-link>
        </div>
      </div>
    </section>

    <!-- About Preview Section -->
    <section class="about-preview">
      <div class="container">
        <div class="about-grid">
          <div class="about-content">
            <span class="section-tag">Desde 1999</span>
            <h2>Tradição e Qualidade</h2>
            <p class="lead">
              Há mais de 20 anos dedicados à arte da barbearia clássica, combinando técnicas
              tradicionais com um toque moderno.
            </p>
            <ul class="features-list">
              <li>
                <i class="fas fa-check-circle"></i>
                Profissionais experientes e qualificados
              </li>
              <li>
                <i class="fas fa-check-circle"></i>
                Produtos premium e equipamentos modernos
              </li>
              <li>
                <i class="fas fa-check-circle"></i>
                Ambiente acolhedor e sofisticado
              </li>
              <li>
                <i class="fas fa-check-circle"></i>
                Atendimento personalizado
              </li>
            </ul>
            <div class="about-actions">
              <router-link to="/about" class="btn-primary"> Nossa História </router-link>
              <router-link to="/contato" class="btn-secondary"> Fale Conosco </router-link>
            </div>
          </div>
          <div class="about-image">
            <img src="/images/barber-banner.jpg" alt="Interior da barbearia" />
            <div class="stats-overlay">
              <div class="stat-item">
                <span class="stat-number">5000+</span>
                <span class="stat-label">Clientes</span>
              </div>
              <div class="stat-item">
                <span class="stat-number">25+</span>
                <span class="stat-label">Anos</span>
              </div>
              <div class="stat-item">
                <span class="stat-number">98%</span>
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
              <img :src="member.photo" :alt="member.name" />
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
          <router-link to="/about" class="btn-outline-primary">
            Conhecer Toda a Equipe
          </router-link>
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
              <div class="rating">
                <i v-for="n in 5" :key="n" class="fas fa-star"></i>
              </div>
              <p>"{{ testimonial.text }}"</p>
            </div>
            <div class="testimonial-author">
              <div class="author-avatar">
                <img :src="testimonial.avatar" :alt="testimonial.name" />
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
            <router-link to="/booking" class="btn-primary btn-large">
              <i class="fas fa-calendar-check"></i>
              Agendar Horário
            </router-link>
            <a href="https://wa.me/5511987654321" class="btn-whatsapp" target="_blank">
              <i class="fab fa-whatsapp"></i>
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <FooterComponent />
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useBookingStore } from '@/stores/booking'
import { useNotificationStore } from '@/stores/notification'
import BannerComponent from '@/components/BannerComponent.vue'
import FooterComponent from '@/components/layouts/FooterComponent.vue'

const router = useRouter()
const bookingStore = useBookingStore()
const notificationStore = useNotificationStore()

// Serviços em destaque
const featuredServices = ref([
  {
    id: 1,
    name: 'Corte Completo',
    description: 'Corte moderno com lavagem e finalização',
    duration: 30,
    price: 25.0,
    icon: 'fas fa-cut',
  },
  {
    id: 2,
    name: 'Barba + Bigode',
    description: 'Design e modelagem profissional',
    duration: 25,
    price: 20.0,
    icon: 'fas fa-user-tie',
  },
  {
    id: 3,
    name: 'Combo Completo',
    description: 'Corte + Barba com desconto especial',
    duration: 45,
    price: 35.0,
    icon: 'fas fa-star',
  },
])

// Equipe (dados resumidos)
const teamMembers = ref([
  {
    id: 1,
    name: 'João Silva',
    role: 'Barbeiro Master',
    photo: '/images/image-1-card.jpg',
    specialties: ['Cortes Clássicos', 'Barbas Tradicionais'],
  },
  {
    id: 2,
    name: 'Pedro Santos',
    role: 'Barbeiro Sênior',
    photo: '/images/image-1-card.jpg',
    specialties: ['Cortes Modernos', 'Design de Barba'],
  },
  {
    id: 3,
    name: 'Carlos Oliveira',
    role: 'Barbeiro Especialista',
    photo: '/images/image-1-card.jpg',
    specialties: ['Cortes Jovens', 'Estilos Contemporâneos'],
  },
])

// Depoimentos
const testimonials = ref([
  {
    id: 1,
    name: 'Ricardo Santos',
    service: 'Corte + Barba',
    avatar: '/images/image-1-card.jpg',
    text: 'Excelente atendimento! O João entende exatamente o que eu quero. Sempre saio satisfeito.',
  },
  {
    id: 2,
    name: 'Marcos Silva',
    service: 'Corte Moderno',
    avatar: '/images/image-1-card.jpg',
    text: 'Ambiente top e profissionais qualificados. Recomendo para todos os amigos!',
  },
  {
    id: 3,
    name: 'André Costa',
    service: 'Barba Tradicional',
    avatar: '/images/image-1-card.jpg',
    text: 'A melhor barbearia da região. Atendimento personalizado e resultado impecável.',
  },
])

// Selecionar serviço e redirecionar
const selectService = (service) => {
  bookingStore.setService(service)
  notificationStore.showSuccess(`Serviço "${service.name}" selecionado!`)
  router.push('/booking')
}
</script>

<style scoped lang="scss">
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

// Section Headers
.section-header {
  text-align: center;
  margin-bottom: 3rem;

  h2 {
    font-family: 'Archivo Black', sans-serif;
    font-size: 2.5rem;
    color: #212121;
    margin-bottom: 1rem;

    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }

  p {
    font-size: 1.1rem;
    color: #6c757d;
    max-width: 600px;
    margin: 0 auto;
  }
}

// Services Preview Section
.services-preview {
  padding: 5rem 0;
  background: #f8f9fa;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.service-card {
  background: white;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  cursor: pointer;
  text-align: center;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }

  .service-icon {
    width: 80px;
    height: 80px;
    background: linear-gradient(135deg, #ff7b42 0%, #e66b32 100%);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1.5rem;

    i {
      font-size: 2rem;
      color: white;
    }
  }

  h3 {
    font-size: 1.4rem;
    color: #212121;
    margin-bottom: 1rem;
    font-weight: 600;
  }

  .service-description {
    color: #6c757d;
    margin-bottom: 1.5rem;
    line-height: 1.5;
  }

  .service-details {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    padding: 1rem;
    background: #f8f9fa;
    border-radius: 8px;

    .duration {
      color: #495057;
      font-weight: 500;
    }

    .price {
      color: #ff7b42;
      font-weight: bold;
      font-size: 1.2rem;
    }
  }

  .service-btn {
    width: 100%;
    padding: 0.875rem;
    background: linear-gradient(135deg, #ff7b42 0%, #e66b32 100%);
    color: white;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;

    &:hover {
      background: linear-gradient(135deg, #e66b32 0%, #d55a22 100%);
    }
  }
}

// About Preview Section
.about-preview {
  padding: 5rem 0;
  background: white;
}

.about-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
}

.about-content {
  .section-tag {
    display: inline-block;
    background: #ff7b42;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.9rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }

  h2 {
    font-family: 'Archivo Black', sans-serif;
    font-size: 2.5rem;
    color: #212121;
    margin-bottom: 1.5rem;
  }

  .lead {
    font-size: 1.2rem;
    color: #495057;
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
    color: #495057;

    i {
      color: #28a745;
      font-size: 1.1rem;
    }
  }
}

.about-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.about-image {
  position: relative;

  img {
    width: 100%;
    border-radius: 16px;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }
}

.stats-overlay {
  position: absolute;
  bottom: 2rem;
  left: 2rem;
  right: 2rem;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  justify-content: space-around;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);

  .stat-item {
    text-align: center;

    .stat-number {
      display: block;
      font-size: 1.8rem;
      font-weight: bold;
      color: #ff7b42;
    }

    .stat-label {
      font-size: 0.9rem;
      color: #6c757d;
      font-weight: 500;
    }
  }
}

// Team Preview Section
.team-preview {
  padding: 5rem 0;
  background: #f8f9fa;
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.team-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-4px);
  }

  .member-photo {
    height: 250px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .member-info {
    padding: 1.5rem;

    h3 {
      font-size: 1.3rem;
      color: #212121;
      margin-bottom: 0.5rem;
      font-weight: 600;
    }

    .member-role {
      color: #ff7b42;
      font-weight: 500;
      margin-bottom: 1rem;
    }
  }
}

.member-specialties {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;

  .specialty-tag {
    background: #f8f9fa;
    color: #495057;
    padding: 0.25rem 0.75rem;
    border-radius: 12px;
    font-size: 0.85rem;
    font-weight: 500;
  }
}

// Testimonials Section
.testimonials {
  padding: 5rem 0;
  background: white;
}

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
}

.testimonial-card {
  background: #f8f9fa;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);

  .testimonial-content {
    margin-bottom: 1.5rem;

    .rating {
      margin-bottom: 1rem;

      i {
        color: #ffc107;
        margin-right: 0.25rem;
      }
    }

    p {
      font-style: italic;
      color: #495057;
      line-height: 1.6;
      margin: 0;
    }
  }

  .testimonial-author {
    display: flex;
    align-items: center;
    gap: 1rem;

    .author-avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .author-info {
      h4 {
        color: #212121;
        margin: 0 0 0.25rem 0;
        font-weight: 600;
      }

      span {
        color: #6c757d;
        font-size: 0.9rem;
      }
    }
  }
}

// CTA Section
.cta-section {
  padding: 5rem 0;
  background: linear-gradient(135deg, #ff7b42 0%, #e66b32 100%);
  color: white;
  text-align: center;

  .cta-content {
    h2 {
      font-family: 'Archivo Black', sans-serif;
      font-size: 2.5rem;
      margin-bottom: 1rem;

      @media (max-width: 768px) {
        font-size: 2rem;
      }
    }

    p {
      font-size: 1.2rem;
      margin-bottom: 2rem;
      opacity: 0.9;
    }
  }

  .cta-actions {
    display: flex;
    justify-content: center;
    gap: 1rem;
    flex-wrap: wrap;
  }
}

// Common Button Styles
.btn-primary {
  background: linear-gradient(135deg, #ff7b42 0%, #e66b32 100%);
  color: white;
  padding: 0.875rem 1.5rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: linear-gradient(135deg, #e66b32 0%, #d55a22 100%);
    transform: translateY(-2px);
  }

  &.btn-large {
    padding: 1rem 2rem;
    font-size: 1.1rem;
  }
}

.btn-secondary {
  background: transparent;
  color: #ff7b42;
  padding: 0.875rem 1.5rem;
  border: 2px solid #ff7b42;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: #ff7b42;
    color: white;
    transform: translateY(-2px);
  }
}

.btn-outline-primary {
  background: transparent;
  color: #ff7b42;
  padding: 0.875rem 1.5rem;
  border: 2px solid #ff7b42;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    background: #ff7b42;
    color: white;
    transform: translateY(-2px);
  }
}

.btn-whatsapp {
  background: #25d366;
  color: white;
  padding: 1rem 2rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: #128c7e;
    transform: translateY(-2px);
  }
}

.section-cta {
  text-align: center;
}

// Responsive adjustments
@media (max-width: 768px) {
  .container {
    padding: 0 1rem;
  }

  .about-grid,
  .services-grid,
  .team-grid,
  .testimonials-grid {
    grid-template-columns: 1fr;
  }

  .cta-actions {
    flex-direction: column;
    align-items: center;
  }

  .about-actions {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>
