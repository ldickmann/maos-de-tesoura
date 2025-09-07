<template>
  <div class="services-page">
    <div class="page-header">
      <h1>Nossos Serviços</h1>
      <p>Oferecemos uma gama completa de serviços para o homem moderno.</p>
    </div>

    <div class="services-container">
      <div v-for="service in services" :key="service.id" class="service-card">
        <div class="card-content">
          <div class="card-header">
            <div class="service-info">
              <h3 class="card-title">{{ service.name }}</h3>
              <div class="service-meta">
                <span class="duration">
                  <i class="fas fa-clock"></i>
                  {{ service.duration }} min
                </span>
                <span class="card-price">R$ {{ service.price.toFixed(2) }}</span>
              </div>
            </div>
          </div>

          <p class="card-description">{{ service.description }}</p>

          <div v-if="service.expanded" class="card-details">
            <div class="details-content">
              <h4>O que inclui:</h4>
              <ul class="service-includes">
                <li v-for="item in service.includes" :key="item">
                  <i class="fas fa-check"></i>
                  {{ item }}
                </li>
              </ul>

              <div v-if="service.benefits" class="benefits">
                <h4>Benefícios:</h4>
                <p>{{ service.benefits }}</p>
              </div>
            </div>
          </div>

          <div class="card-actions">
            <button
              class="details-button"
              @click="toggleDetails(service)"
              :aria-expanded="service.expanded"
            >
              <i :class="service.expanded ? 'fas fa-chevron-up' : 'fas fa-chevron-down'"></i>
              {{ service.expanded ? 'Ver Menos' : 'Ver Detalhes' }}
            </button>
            <button
              class="book-button"
              @click="handleBookingAlert"
            >
              <i class="fas fa-calendar-plus"></i>
              Agendar Agora
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Seção de Informações Adicionais -->
    <div class="additional-info">
      <div class="info-grid">
        <div class="info-card">
          <div class="info-icon">
            <i class="fas fa-shield-alt"></i>
          </div>
          <h3>Garantia de Qualidade</h3>
          <p>Profissionais experientes e produtos premium para o melhor resultado.</p>
        </div>

        <div class="info-card">
          <div class="info-icon">
            <i class="fas fa-clock"></i>
          </div>
          <h3>Pontualidade</h3>
          <p>Respeitamos seu tempo. Atendimento sempre no horário agendado.</p>
        </div>

        <div class="info-card">
          <div class="info-icon">
            <i class="fas fa-heart"></i>
          </div>
          <h3>Satisfação Garantida</h3>
          <p>Não ficou satisfeito? Refazemos o serviço sem custo adicional.</p>
        </div>
      </div>

      <div class="cta-section">
        <h2>Pronto para transformar seu visual?</h2>
        <p>Agende agora mesmo e experimente nossos serviços premium.</p>
        <button @click="handleBookingAlert" class="cta-button">
          <i class="fas fa-calendar-check"></i>
          Ver Horários Disponíveis
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useBookingStore } from '@/stores/booking'
import { useNotificationStore } from '@/stores/notification'
import { useServicesStore } from '@/stores/services'
import LoadingSpinner from '@/components/LoadingSpinner.vue'

const router = useRouter()
const bookingStore = useBookingStore()
const notificationStore = useNotificationStore()

const isBooking = ref(null)

// Usar os serviços do store, mas com dados expandidos para a página
const services = ref([
  {
    id: 1,
    name: 'Corte Masculino',
    duration: 30,
    price: 25.0,
    description:
      'Corte tradicional masculino com tesoura ou máquina, lavagem e finalização profissional.',
    includes: [
      'Consultoria personalizada',
      'Lavagem com produtos premium',
      'Corte com tesoura ou máquina',
      'Finalização com pomada ou cera',
      'Orientações de cuidado',
    ],
    benefits:
      'Nossos mestres barbeiros criam o corte perfeito que combina com seu estilo e formato de rosto, garantindo um resultado profissional que dura mais tempo.',
    expanded: false,
  },
  {
    id: 2,
    name: 'Barba',
    duration: 20,
    price: 15.0,
    description:
      'Aparar e modelar barba com precisão, usando técnicas profissionais e produtos especializados.',
    includes: [
      'Análise do formato do rosto',
      'Alinhamento e modelagem',
      'Uso de navalha profissional',
      'Hidratação com óleos especiais',
      'Finalização com balm aromático',
    ],
    benefits:
      'Deixe sua barba com aspecto profissional, macia e saudável. Nossos produtos especiais garantem hidratação e um aroma incrível.',
    expanded: false,
  },
  {
    id: 3,
    name: 'Corte + Barba',
    duration: 45,
    price: 35.0,
    description: 'Combo completo com corte de cabelo e design de barba para um visual harmonioso.',
    includes: [
      'Corte de cabelo completo',
      'Design de barba personalizado',
      'Lavagem e tratamento',
      'Produtos premium',
      'Orientação de manutenção',
      'Desconto especial no combo',
    ],
    benefits:
      'A combinação perfeita para um visual impecável. Economize tempo e dinheiro com nosso pacote mais popular.',
    expanded: false,
  },
  {
    id: 4,
    name: 'Sobrancelha',
    duration: 15,
    price: 10.0,
    description: 'Design de sobrancelha masculina com técnicas precisas para realçar o olhar.',
    includes: [
      'Análise do formato ideal',
      'Remoção de pelos excessivos',
      'Alinhamento profissional',
      'Finalização com gel fixador',
      'Dicas de manutenção',
    ],
    benefits:
      'Sobrancelhas bem feitas fazem toda a diferença no visual masculino, proporcionando um olhar mais marcante e expressivo.',
    expanded: false,
  },
])

const toggleDetails = (service) => {
  service.expanded = !service.expanded
}

const handleBookingAlert = () => {
  alert('Função Não implementada')
}

const bookService = async (service) => {
  try {
    isBooking.value = service.id

    // Simular delay para melhor UX
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Definir o serviço no store usando a estrutura correta
    const bookingService = {
      id: service.id,
      name: service.name,
      duration: service.duration,
      price: service.price,
      description: service.description,
    }

    bookingStore.setService(bookingService)

    // Mostrar feedback de sucesso
    notificationStore.showSuccess(`Serviço "${service.name}" selecionado! Redirecionando...`)

    // Redirect após um pequeno delay
    setTimeout(() => {
      router.push('/booking')
    }, 800)
  } catch (error) {
    notificationStore.showError('Erro ao selecionar serviço. Tente novamente.')
    console.error('Service selection error:', error)
  } finally {
    setTimeout(() => {
      isBooking.value = null
    }, 1000)
  }
}
</script>

<style scoped lang="scss">
.services-page {
  padding: 88px 0 2rem;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  min-height: 100vh;
  font-family: 'Hanken Grotesk', sans-serif;
}

.page-header {
  text-align: center;
  margin: 2rem auto 4rem;
  max-width: 1440px;
  padding: 0 2rem;

  h1 {
    font-size: 3rem;
    font-family: 'Archivo Black', sans-serif;
    color: #212121;
    margin-bottom: 1rem;

    @media (max-width: 768px) {
      font-size: 2.5rem;
    }
  }

  p {
    font-size: 1.2rem;
    color: #6c757d;
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.6;
  }
}

.services-container {
  max-width: 1440px;
  margin: 0 auto 4rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  padding: 0 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    padding: 0 1rem;
    max-width: 100%;
  }

  @media (max-width: 480px) {
    padding: 0 0.5rem;
  }
}

.service-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 123, 66, 0.1);

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.12);
    border-color: rgba(255, 123, 66, 0.2);
  }
}

.card-content {
  padding: 2rem;
}

.card-header {
  margin-bottom: 1.5rem;
}

.service-info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.card-title {
  font-size: 1.5rem;
  font-family: 'Archivo Black', sans-serif;
  color: #212121;
  margin: 0;
  line-height: 1.2;
}

.service-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .duration {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #6c757d;
    font-size: 0.9rem;
    font-weight: 500;

    i {
      color: #ff7b42;
    }
  }

  .card-price {
    font-size: 1.5rem;
    font-weight: 700;
    color: #ff7b42;
    background: linear-gradient(135deg, #ff7b42 0%, #e66b32 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
}

.card-description {
  color: #495057;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  font-size: 1rem;
}

.card-details {
  margin: 1.5rem 0;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 12px;
  border-left: 4px solid #ff7b42;
}

.details-content {
  h4 {
    color: #212121;
    margin-bottom: 1rem;
    font-weight: 600;
    font-size: 1.1rem;
  }
}

.service-includes {
  list-style: none;
  padding: 0;
  margin: 0 0 1.5rem 0;

  li {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.5rem 0;
    color: #495057;

    i {
      color: #28a745;
      font-size: 0.9rem;
      flex-shrink: 0;
    }
  }
}

.benefits {
  border-top: 1px solid #dee2e6;
  padding-top: 1rem;

  h4 {
    color: #212121;
    margin-bottom: 0.75rem;
  }

  p {
    color: #495057;
    margin: 0;
    line-height: 1.5;
    font-style: italic;
  }
}

.card-actions {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;

  @media (max-width: 480px) {
    flex-direction: column;
  }
}

.details-button,
.book-button {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-family: 'Hanken Grotesk', sans-serif;
  text-decoration: none;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
}

.details-button {
  flex: 1;
  background: transparent;
  color: #6c757d;
  border: 2px solid #dee2e6;

  &:hover:not(:disabled) {
    background: #f8f9fa;
    border-color: #ff7b42;
    color: #ff7b42;
  }

  &[aria-expanded='true'] {
    background: #fff5f2;
    border-color: #ff7b42;
    color: #ff7b42;
  }
}

.book-button {
  flex: 2;
  background: linear-gradient(135deg, #ff7b42 0%, #e66b32 100%);
  color: white;
  border: 2px solid transparent;

  &:hover:not(:disabled) {
    background: linear-gradient(135deg, #e66b32 0%, #d55a22 100%);
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(255, 123, 66, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
}

// Seção de informações adicionais
.additional-info {
  max-width: 1440px;
  margin: 0 auto;
  padding: 4rem 2rem 0;
}

.info-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 4rem;

  @media (max-width: 968px) {
    flex-direction: column;
    gap: 1.5rem;
  }
}

.info-card {
  text-align: center;
  padding: 2rem;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;
  flex: 1;
  min-width: 280px;
  max-width: 350px;

  &:hover {
    transform: translateY(-4px);
  }
}

.info-icon {
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

.info-card h3 {
  color: #212121;
  margin-bottom: 1rem;
  font-weight: 600;
  font-size: 1.2rem;
}

.info-card p {
  color: #6c757d;
  line-height: 1.6;
  margin: 0;
}

.cta-section {
  text-align: center;
  padding: 3rem 2rem;
  background: linear-gradient(135deg, #212121 0%, #495057 100%);
  border-radius: 20px;
  color: white;

  h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
    font-family: 'Archivo Black', sans-serif;

    @media (max-width: 768px) {
      font-size: 1.5rem;
    }
  }

  p {
    font-size: 1.1rem;
    margin-bottom: 2rem;
    opacity: 0.9;
    max-width: 500px;
    margin-left: auto;
    margin-right: auto;
  }
}

.cta-button {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #ff7b42 0%, #e66b32 100%);
  color: white;
  text-decoration: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(135deg, #e66b32 0%, #d55a22 100%);
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(255, 123, 66, 0.4);
  }

  i {
    font-size: 1.2rem;
  }
}

// Animações
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.service-card {
  animation: fadeInUp 0.6s ease-out;
}

.service-card:nth-child(1) {
  animation-delay: 0.1s;
}
.service-card:nth-child(2) {
  animation-delay: 0.2s;
}
.service-card:nth-child(3) {
  animation-delay: 0.3s;
}
.service-card:nth-child(4) {
  animation-delay: 0.4s;
}

.card-details {
  animation: fadeInUp 0.4s ease-out;
}
</style>
