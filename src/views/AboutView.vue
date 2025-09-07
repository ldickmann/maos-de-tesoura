<template>
  <div class="about-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-background">
        <img :src="bannerImage" alt="Interior da barbearia" />
        <div class="hero-overlay"></div>
      </div>
      <div class="hero-content">
        <h1 class="hero-title">Nossa História</h1>
        <p class="hero-subtitle">Mais de 16 anos dedicados à arte da barbearia clássica</p>
        <div class="hero-stats">
          <div class="stat-item">
            <span class="stat-number">16+</span>
            <span class="stat-label">Anos de Tradição</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">5000+</span>
            <span class="stat-label">Clientes Satisfeitos</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">10+</span>
            <span class="stat-label">Profissionais</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Story Section -->
    <section class="story-section">
      <div class="container">
        <div class="story-grid">
          <div class="story-text">
            <h2>A Tradição que Faz a Diferença</h2>
            <p class="lead">
              Fundada em 2009, a Mãos de Tesoura nasceu do sonho de resgatar a tradição da barbearia
              clássica, combinando técnicas ancestrais com um toque moderno.
            </p>
            <p>
              Nossa filosofia é simples: cada cliente merece um atendimento personalizado e de
              excelência. Acreditamos que um bom corte vai além da técnica – é uma experiência que
              eleva a autoestima e a confiança.
            </p>
            <p>
              Com uma equipe de profissionais apaixonados e experientes, oferecemos não apenas
              serviços, mas momentos de relaxamento e cuidado pessoal em um ambiente acolhedor e
              sofisticado.
            </p>

            <div class="values">
              <h3>Nossos Valores</h3>
              <ul class="values-list">
                <li>
                  <i class="fas fa-star"></i>
                  <span
                    ><strong>Excelência:</strong> Busca constante pela perfeição em cada
                    serviço</span
                  >
                </li>
                <li>
                  <i class="fas fa-heart"></i>
                  <span><strong>Cuidado:</strong> Atendimento personalizado e respeitoso</span>
                </li>
                <li>
                  <i class="fas fa-handshake"></i>
                  <span
                    ><strong>Confiança:</strong> Relacionamento duradouro com nossos clientes</span
                  >
                </li>
                <li>
                  <i class="fas fa-leaf"></i>
                  <span
                    ><strong>Sustentabilidade:</strong> Produtos de qualidade e responsabilidade
                    ambiental</span
                  >
                </li>
              </ul>
            </div>
          </div>

          <div class="story-stats">
            <div class="stat-card">
              <div class="stat-number">10+</div>
              <div class="stat-label">Anos de Experiência</div>
            </div>
            <div class="stat-card">
              <div class="stat-number">5000+</div>
              <div class="stat-label">Clientes Satisfeitos</div>
            </div>
            <div class="stat-card">
              <div class="stat-number">3</div>
              <div class="stat-label">Profissionais Especialistas</div>
            </div>
            <div class="stat-card">
              <div class="stat-number">98%</div>
              <div class="stat-label">Satisfação dos Clientes</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Team Section -->
    <section class="team-section">
      <div class="container">
        <h2 class="section-title">Nossa Equipe</h2>
        <p class="section-subtitle">
          Conheça os profissionais que fazem a diferença na Mãos de Tesoura
        </p>

        <div class="team-grid">
          <div v-for="member in teamMembers" :key="member.id" class="team-card">
            <div class="member-photo">
              <img :src="member.photo" :alt="member.name" />
            </div>
            <div class="member-info">
              <h3>{{ member.name }}</h3>
              <p class="member-role">{{ member.role }}</p>
              <p class="member-description">{{ member.description }}</p>
              <div class="member-specialties">
                <h4>Especialidades:</h4>
                <ul>
                  <li v-for="specialty in member.specialties" :key="specialty">
                    {{ specialty }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Mission Section -->
    <section class="mission-section">
      <div class="container">
        <div class="mission-content">
          <h2>Nossa Missão</h2>
          <p class="mission-text">
            "Proporcionar uma experiência única de cuidado masculino, onde tradição e modernidade se
            encontram para valorizar a individualidade de cada cliente, sempre com excelência,
            respeito e atenção aos detalhes."
          </p>

          <div class="mission-pillars">
            <div class="pillar">
              <div class="pillar-icon">
                <i class="fas fa-cut"></i>
              </div>
              <h3>Tradição</h3>
              <p>Técnicas clássicas preservadas e aperfeiçoadas ao longo dos anos</p>
            </div>

            <div class="pillar">
              <div class="pillar-icon">
                <i class="fas fa-rocket"></i>
              </div>
              <h3>Inovação</h3>
              <p>Sempre em busca de novas tendências e produtos de qualidade</p>
            </div>

            <div class="pillar">
              <div class="pillar-icon">
                <i class="fas fa-users"></i>
              </div>
              <h3>Comunidade</h3>
              <p>Construindo relacionamentos duradouros com nossos clientes</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="container">
        <div class="cta-content">
          <h2>Pronto para Conhecer Nossa Barbearia?</h2>
          <p>
            Venha experimentar nossos serviços e descobrir por que somos referência em cuidado
            masculino.
          </p>
          <div class="cta-buttons">
            <button @click="handleBookingAlert" class="btn-primary">
              <i class="fas fa-calendar-plus"></i>
              Agendar Horário
            </button>
            <router-link to="/contato" class="btn-secondary">
              <i class="fas fa-map-marker-alt"></i>
              Nos Visite
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useNotificationStore } from '@/stores/notification'
import bannerImage from '@/assets/images/barber-banner.jpg'
import cardImage from '@/assets/images/image-1-card.jpg'

const notificationStore = useNotificationStore()

const handleBookingAlert = () => {
  notificationStore.showInfo('Função Não implementada')
}

const teamMembers = ref([
  {
    id: 1,
    name: 'João Silva',
    role: 'Barbeiro Master',
    photo: cardImage,
    description:
      'Fundador da Mãos de Tesoura, com mais de 15 anos de experiência. Especialista em cortes clássicos e modernos.',
    specialties: ['Cortes Clássicos', 'Barbas Tradicionais', 'Consultoria de Estilo'],
  },
  {
    id: 2,
    name: 'Pedro Santos',
    role: 'Barbeiro Sênior',
    photo: cardImage,
    description:
      'Formado pela escola de barbearia tradicional, Pedro é conhecido por sua precisão e atenção aos detalhes.',
    specialties: ['Cortes Modernos', 'Design de Barba', 'Tratamentos Capilares'],
  },
  {
    id: 3,
    name: 'Carlos Oliveira',
    role: 'Barbeiro Especialista',
    photo: cardImage,
    description:
      'Jovem talento com grande paixão pela arte da barbearia. Sempre atualizado com as últimas tendências.',
    specialties: ['Cortes Jovens', 'Estilos Contemporâneos', 'Sobrancelha Masculina'],
  },
])
</script>

<style scoped lang="scss">
@use 'sass:color';
@use '@/assets/styles/scss/_variables.scss' as var;
.about-page {
  padding-top: 88px;
  font-family: 'Hanken Grotesk', sans-serif;
}

.container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 2rem;

  @media (max-width: 768px) {
    padding: 0 1rem;
  }
}

// Hero Section
.hero-section {
  position: relative;
  height: 100vh;
  min-height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  @media (max-width: 768px) {
    height: 80vh;
    min-height: 500px;
  }
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: brightness(0.6) contrast(1.1);
  }
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    135deg,
    rgba(0, 0, 0, 0.6) 0%,
    rgba(0, 0, 0, 0.3) 50%,
    rgba(0, 0, 0, 0.6) 100%
  );
  z-index: 2;
}

.hero-content {
  position: relative;
  z-index: 3;
  text-align: center;
  color: white;
  max-width: 800px;
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
}

.hero-title {
  font-family: 'Archivo Black', sans-serif;
  font-size: 4rem;
  color: white;
  margin-bottom: 1rem;
  line-height: 1.1;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
  text-transform: uppercase;
  letter-spacing: 2px;

  @media (max-width: 768px) {
    font-size: 2.8rem;
    letter-spacing: 1px;
  }

  @media (max-width: 480px) {
    font-size: 2.2rem;
  }
}

.hero-subtitle {
  font-size: 1.5rem;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
  margin-bottom: 3rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
  font-weight: 300;

  @media (max-width: 768px) {
    font-size: 1.2rem;
    margin-bottom: 2rem;
  }
}

.hero-stats {
  display: flex;
  justify-content: center;
  gap: 3rem;
  margin-top: 2rem;

  @media (max-width: 768px) {
    gap: 2rem;
    flex-wrap: wrap;
  }

  @media (max-width: 480px) {
    gap: 1rem;
  }
}

.stat-item {
  text-align: center;

  .stat-number {
    display: block;
    font-family: 'Archivo Black', sans-serif;
    font-size: 2.5rem;
    color: #e67e22;
    font-weight: bold;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
    line-height: 1;

    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }

  .stat-label {
    display: block;
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.8);
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-top: 0.5rem;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);

    @media (max-width: 768px) {
      font-size: 0.8rem;
    }
  }
}

// Story Section
.story-section {
  padding: 5rem 0;
  background: white;
}

.story-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 4rem;
  align-items: start;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
}

.story-text {
  h2 {
    font-family: 'Archivo Black', sans-serif;
    font-size: 2.5rem;
    color: #212121;
    margin-bottom: 1.5rem;

    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }

  .lead {
    font-size: 1.2rem;
    color: #495057;
    line-height: 1.6;
    margin-bottom: 1.5rem;
    font-weight: 500;
  }

  p {
    color: #6c757d;
    line-height: 1.7;
    margin-bottom: 1.5rem;
  }
}

.values {
  margin-top: 2.5rem;

  h3 {
    color: #212121;
    margin-bottom: 1.5rem;
    font-size: 1.4rem;
    font-weight: 600;
  }
}

.values-list {
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    margin-bottom: 1rem;

    i {
      color: #ff7b42;
      font-size: 1.1rem;
      margin-top: 0.2rem;
      flex-shrink: 0;
    }

    span {
      color: #495057;
      line-height: 1.5;

      strong {
        color: #212121;
      }
    }
  }
}

.story-stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;

  @media (max-width: 968px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
}

.stat-card {
  background: linear-gradient(135deg, #ff7b42 0%, #e66b32 100%);
  color: white;
  padding: 2rem 1.5rem;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 8px 25px rgba(255, 123, 66, 0.2);

  .stat-number {
    font-size: 2.5rem;
    font-weight: 700;
    font-family: 'Archivo Black', sans-serif;
    margin-bottom: 0.5rem;
  }

  .stat-label {
    font-size: 0.9rem;
    opacity: 0.9;
    font-weight: 500;
  }
}

// Team Section
.team-section {
  padding: 5rem 0;
  background: #f8f9fa;
}

.section-title {
  font-family: 'Archivo Black', sans-serif;
  font-size: 2.5rem;
  color: #212121;
  text-align: center;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
}

.section-subtitle {
  text-align: center;
  color: #6c757d;
  font-size: 1.1rem;
  margin-bottom: 3rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.team-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-8px);
  }
}

.member-photo {
  height: 250px;
  overflow: hidden;
  background: #f0f0f0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.member-info {
  padding: 2rem;

  h3 {
    font-size: 1.5rem;
    color: #212121;
    margin-bottom: 0.5rem;
    font-weight: 600;
  }

  .member-role {
    color: #ff7b42;
    font-weight: 600;
    font-size: 1rem;
    margin-bottom: 1rem;
  }

  .member-description {
    color: #6c757d;
    line-height: 1.6;
    margin-bottom: 1.5rem;
  }
}

.member-specialties {
  h4 {
    color: #212121;
    font-size: 1rem;
    margin-bottom: 0.75rem;
    font-weight: 600;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;

    li {
      background: #f8f9fa;
      color: #495057;
      padding: 0.4rem 0.8rem;
      border-radius: 20px;
      font-size: 0.85rem;
      font-weight: 500;
      border: 1px solid #dee2e6;
    }
  }
}

// Mission Section
.mission-section {
  padding: 5rem 0;
  background: linear-gradient(135deg, #212121 0%, #495057 100%);
  color: white;
}

.mission-content {
  text-align: center;

  h2 {
    font-family: 'Archivo Black', sans-serif;
    font-size: 2.5rem;
    margin-bottom: 2rem;

    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }
}

.mission-text {
  font-size: 1.3rem;
  line-height: 1.6;
  max-width: 800px;
  margin: 0 auto 3rem;
  font-style: italic;
  opacity: 0.95;
}

.mission-pillars {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.pillar {
  text-align: center;
  padding: 2rem;

  .pillar-icon {
    width: 80px;
    height: 80px;
    margin: 0 auto 1.5rem;
    background: linear-gradient(135deg, #ff7b42 0%, #e66b32 100%);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;

    i {
      font-size: 2rem;
      color: white;
    }
  }

  h3 {
    font-size: 1.3rem;
    margin-bottom: 1rem;
    font-weight: 600;
  }

  p {
    opacity: 0.9;
    line-height: 1.6;
    margin: 0;
  }
}

// CTA Section
.cta-section {
  padding: 4rem 0;
  background: white;
}

.cta-content {
  text-align: center;

  h2 {
    font-family: 'Archivo Black', sans-serif;
    font-size: 2.2rem;
    color: #212121;
    margin-bottom: 1rem;

    @media (max-width: 768px) {
      font-size: 1.8rem;
    }
  }

  p {
    color: #6c757d;
    font-size: 1.1rem;
    margin-bottom: 2rem;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }
}

.cta-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn-primary,
.btn-secondary {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1.1rem;
  text-decoration: none;
  transition: all 0.3s ease;

  i {
    font-size: 1.2rem;
  }
}

.btn-primary {
  background: linear-gradient(135deg, #ff7b42 0%, #e66b32 100%);
  color: white;

  &:hover {
    background: linear-gradient(135deg, #e66b32 0%, #d55a22 100%);
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(255, 123, 66, 0.4);
  }
}

.btn-secondary {
  background: transparent;
  color: #ff7b42;
  border: 2px solid #ff7b42;

  &:hover {
    background: #ff7b42;
    color: white;
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(255, 123, 66, 0.3);
  }
}

@media (max-width: 768px) {
  .cta-buttons {
    flex-direction: column;
    align-items: center;

    .btn-primary,
    .btn-secondary {
      width: 100%;
      max-width: 280px;
      justify-content: center;
    }
  }
}
</style>
