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
              <h2 class="card-title">{{ service.name }}</h2>
              <div class="service-meta">
                <span class="duration">
                  <i class="fas fa-clock" aria-hidden="true"></i>
                  {{ service.duration }} min
                </span>
                <span class="card-price">{{ formatPrice(service.price) }}</span>
              </div>
            </div>
          </div>

          <p class="card-description">{{ service.description }}</p>

          <div v-if="service.expanded" class="card-details">
            <div class="details-content">
              <h3>O que inclui:</h3>
              <ul class="service-includes">
                <li v-for="item in service.includes" :key="item">
                  <i class="fas fa-check" aria-hidden="true"></i>
                  {{ item }}
                </li>
              </ul>

              <div v-if="service.benefits" class="benefits">
                <h3>Benefícios:</h3>
                <p>{{ service.benefits }}</p>
              </div>
            </div>
          </div>

          <div class="card-actions">
            <button
              class="btn details-button"
              @click="toggleDetails(service)"
              :aria-expanded="service.expanded"
            >
              <i
                :class="service.expanded ? 'fas fa-chevron-up' : 'fas fa-chevron-down'"
                aria-hidden="true"
              ></i>
              {{ service.expanded ? 'Ver Menos' : 'Ver Detalhes' }}
            </button>
            <button class="btn btn--primary book-button" @click="handleBookingAlert">
              <i class="fas fa-calendar-plus" aria-hidden="true"></i>
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
            <i class="fas fa-shield-alt" aria-hidden="true"></i>
          </div>
          <h3>Garantia de Qualidade</h3>
          <p>Profissionais experientes e produtos premium para o melhor resultado.</p>
        </div>

        <div class="info-card">
          <div class="info-icon">
            <i class="fas fa-clock" aria-hidden="true"></i>
          </div>
          <h3>Pontualidade</h3>
          <p>Respeitamos seu tempo. Atendimento sempre no horário agendado.</p>
        </div>

        <div class="info-card">
          <div class="info-icon">
            <i class="fas fa-heart" aria-hidden="true"></i>
          </div>
          <h3>Satisfação Garantida</h3>
          <p>Não ficou satisfeito? Refazemos o serviço sem custo adicional.</p>
        </div>
      </div>

      <div class="cta-section">
        <h2>Pronto para transformar seu visual?</h2>
        <p>Agende agora mesmo e experimente nossos serviços premium.</p>
        <button @click="handleBookingAlert" class="btn btn--primary btn--lg cta-button">
          <i class="fas fa-calendar-check" aria-hidden="true"></i>
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
import { formatPrice } from '@/utils/format'

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
  notificationStore.showInfo('Função Não implementada')
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
@use '@/assets/styles/scss/_variables.scss' as var;
@use '@/assets/styles/scss/_mixins.scss' as mx;
.services-page {
  padding: var.$header-height 0 2rem;
  background: linear-gradient(135deg, var.$bg-light 0%, var.$bg-light-2 100%);
  min-height: 100vh;
  font-family: var.$font-family-tertiary;

  @include mx.down(var.$bp-lg) {
    padding-top: var.$header-height-mobile;
  }
}

.page-header {
  text-align: center;
  margin: 2rem auto 4rem;
  max-width: 1440px;
  padding: 0 2rem;

  h1 {
    font-size: 3rem;
    font-family: var.$font-family-primary;
    color: var.$primary;
    margin-bottom: 1rem;

    @include mx.down(var.$bp-md) {
      font-size: 2.5rem;
    }
  }

  p {
    font-size: 1.2rem;
    color: var.$text-muted; // 5,89:1 sobre $bg-light
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.6;
  }
}

.services-container {
  max-width: 1440px;
  margin: 0 auto 4rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  padding: 0 2rem;

  @include mx.down(var.$bp-md) {
    padding: 0 1rem;
  }

  // Celular só abaixo de 768: no tablet ficam 2 colunas
  @include mx.down(var.$bp-md - 1px) {
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    max-width: 100%;
  }

  @include mx.down(var.$bp-sm) {
    padding: 0 0.5rem;
  }

  @media (min-width: var.$bp-md) and (max-width: 1200px) {
    justify-content: space-evenly;
  }
}

.service-card {
  background: var.$accent-light;
  border-radius: var.$radius-2xl;
  overflow: hidden;
  box-shadow: var.$shadow-md;
  transition:
    transform 0.4s var.$ease,
    box-shadow 0.4s var.$ease,
    border-color 0.4s var.$ease;
  border: 1px solid rgba(var.$secondary, 0.1);
  flex: 1;
  min-width: 350px;
  max-width: 450px;
  display: flex;
  flex-direction: column;
  position: relative;

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
  }

  @include mx.down(var.$bp-md - 1px) {
    width: 100%;
    max-width: 500px;
    min-width: 300px;
  }

  @include mx.down(var.$bp-sm) {
    min-width: 280px;
  }
}

.card-content {
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
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
  font-family: var.$font-family-primary;
  color: var.$primary;
  margin: 0;
  line-height: 1.2;
}

.service-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.2rem;
  background: var.$bg-light;
  border-radius: var.$radius-lg;
  border-left: 4px solid var.$secondary;

  @include mx.down(var.$bp-sm) {
    flex-direction: column;
    gap: 0.5rem;
    text-align: center;
  }

  .duration {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var.$text-gray;
    font-size: 0.9rem;
    font-weight: 600;

    i {
      color: var.$secondary;
    }
  }

  .card-price {
    font-size: 1.5rem;
    font-weight: 700;
    color: var.$secondary;
    font-family: var.$font-family-primary;
  }
}

.card-description {
  color: var.$text-body;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  font-size: 1rem;
}

.card-details {
  margin: 1.5rem 0;
  padding: 1.5rem;
  background: var.$bg-light;
  border-radius: var.$radius-lg;
  border-left: 4px solid var.$secondary;
}

.details-content {
  h3 {
    color: var.$primary;
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
    color: var.$text-body;

    i {
      color: var.$success;
      font-size: 0.9rem;
      flex-shrink: 0;
    }
  }
}

.benefits {
  border-top: 1px solid var.$border-color;
  padding-top: 1rem;

  h3 {
    color: var.$primary;
    margin-bottom: 0.75rem;
  }

  p {
    color: var.$text-body;
    margin: 0;
    line-height: 1.5;
    font-style: italic;
  }
}

// Quando os dois botões não cabem lado a lado, "Agendar Agora" desce inteiro para a linha de baixo
.card-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: auto; // Empurra os botões para o final do card
  padding-top: 1rem;

  @include mx.down(var.$bp-sm) {
    flex-direction: column;
    gap: 0.75rem;
  }
}

// Base flexível (a largura do rótulo) e sem quebra: os rótulos ficam em uma linha
.details-button,
.book-button {
  padding: 0.75rem 1.5rem;
  font-size: 0.95rem;
  white-space: nowrap;
}

.details-button {
  flex: 1 1 auto;
  background: transparent;
  color: var.$text-gray;
  border: 2px solid var.$border-color;

  &:hover:not(:disabled) {
    background: var.$bg-light;
    border-color: var.$secondary;
    color: var.$secondary;
  }

  &[aria-expanded='true'] {
    background: var.$secondary-tint;
    border-color: var.$secondary;
    color: var.$secondary;
  }
}

.book-button {
  flex: 2 1 auto;
  border: 2px solid transparent; // mesma altura do botão de detalhes, que tem borda
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

  @include mx.down(var.$bp-md - 1px) {
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  }

  @media (min-width: var.$bp-md) and (max-width: 1024px) {
    justify-content: space-evenly;
  }
}

// Sem efeito de hover: o card não é clicável
.info-card {
  text-align: center;
  padding: 2.5rem 2rem;
  background: var.$accent-light;
  border-radius: var.$radius-2xl;
  box-shadow: var.$shadow-md;
  flex: 1;
  min-width: 280px;
  max-width: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid rgba(var.$secondary, 0.1);

  @include mx.down(var.$bp-md - 1px) {
    width: 100%;
    max-width: 400px;
  }

  h3 {
    color: var.$primary;
    margin-bottom: 1rem;
    font-weight: 700;
    font-size: 1.3rem;
    font-family: var.$font-family-primary;
  }

  p {
    color: var.$text-gray;
    line-height: 1.7;
    margin: 0;
    flex-grow: 1;
    font-size: 1rem;
  }
}

.info-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 2rem;
  background: var.$gradient-primary;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 15px rgba(var.$secondary, 0.2);
  flex-shrink: 0;

  i {
    font-size: 2rem;
    color: var.$accent-light;
  }
}

.cta-section {
  @include mx.on-dark-surface;
  text-align: center;
  padding: 3rem 2rem;
  background: linear-gradient(135deg, var.$primary 0%, var.$text-body 100%);
  border-radius: var.$radius-2xl;
  color: var.$accent-light;

  h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
    font-family: var.$font-family-primary;

    @include mx.down(var.$bp-md) {
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
  gap: 0.75rem;

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

// fill-mode backwards: durante o atraso o card já fica no estado inicial da animação.
// Não usar both/forwards: o transform final ficaria preso e anularia o hover do card.
.service-card {
  animation: fadeInUp 0.6s ease-out backwards;
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
  animation: fadeInUp 0.4s ease-out backwards;
}
</style>
