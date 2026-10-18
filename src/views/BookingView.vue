<template>
  <div class="booking-page">
    <LoadingSpinner v-if="isLoading" message="Processando agendamento..." />

    <ErrorMessage v-else-if="bookingError" :message="bookingError" @retry="resetBookingError" />

    <div v-else class="booking-container">
      <h1>Agende seu Horário</h1>
      <p class="subtitle">Siga os passos abaixo para garantir o seu horário conosco.</p>

      <div v-if="bookingStore.selectedService" class="booking-flow">
        <!-- Etapa 1: Resumo do Serviço -->
        <div class="step">
          <h2>1. Serviço Selecionado</h2>
          <div class="service-summary">
            <div>
              <h3>{{ bookingStore.selectedService.name }}</h3>
              <p class="service-description">{{ bookingStore.selectedService.description }}</p>
              <p class="service-duration">
                Duração: {{ bookingStore.selectedService.duration }} min
              </p>
            </div>
            <p class="service-price">{{ formatPrice(bookingStore.selectedService.price) }}</p>
          </div>
        </div>

        <!-- Etapa 2: Seleção de Profissional -->
        <div class="step">
          <h2 id="etapa-profissional">2. Escolha o Profissional</h2>
          <div
            class="professional-selection"
            role="group"
            aria-labelledby="etapa-profissional"
            :aria-describedby="errors.professional ? 'professional-error' : undefined"
          >
            <button
              v-for="pro in availableProfessionals"
              :key="pro.id"
              type="button"
              class="professional-card"
              :class="{
                selected: bookingStore.selectedProfessional?.id === pro.id,
                error: errors.professional,
              }"
              :aria-pressed="bookingStore.selectedProfessional?.id === pro.id"
              @click="selectProfessional(pro)"
            >
              <span v-if="pro.avatar" class="pro-avatar">
                <img :src="pro.avatar" alt="" width="60" height="60" loading="lazy" />
              </span>
              <span class="pro-name">{{ pro.name }}</span>
            </button>
          </div>
          <div v-if="errors.professional" id="professional-error" class="form-error" role="alert">
            {{ errors.professional }}
          </div>
        </div>

        <!-- Etapa 3: Seleção de Data e Hora -->
        <div v-if="bookingStore.selectedProfessional" class="step">
          <h2>3. Escolha a Data e Hora</h2>

          <div class="date-section">
            <label for="booking-date" class="form-label">Data</label>
            <input
              id="booking-date"
              type="date"
              v-model="selectedDate"
              @change="onDateChange"
              class="form-input"
              :class="{ error: errors.date }"
              :aria-invalid="!!errors.date"
              :aria-describedby="errors.date ? 'date-error' : undefined"
              :min="minDate"
            />
            <div v-if="errors.date" id="date-error" class="form-error" role="alert">
              {{ errors.date }}
            </div>
          </div>

          <div v-if="selectedDate" class="time-section">
            <span id="horario-label" class="form-label">Horário disponível</span>
            <div
              class="time-selection"
              role="group"
              aria-labelledby="horario-label"
              :aria-describedby="errors.time ? 'time-error' : undefined"
            >
              <button
                v-for="time in getAvailableTimesForSelectedDate()"
                :key="time"
                type="button"
                class="time-slot"
                :class="{
                  selected: bookingStore.selectedTime === time,
                  error: errors.time,
                }"
                :aria-pressed="bookingStore.selectedTime === time"
                @click="selectTime(time)"
              >
                {{ time }}
              </button>
            </div>
            <div v-if="errors.time" id="time-error" class="form-error" role="alert">
              {{ errors.time }}
            </div>
            <div v-if="getAvailableTimesForSelectedDate().length === 0" class="no-times">
              Não há horários disponíveis para esta data.
            </div>
          </div>
        </div>

        <!-- Etapa 4: Dados do Cliente -->
        <div v-if="bookingStore.selectedTime" class="step">
          <h2>4. Seus Dados</h2>
          <form @submit.prevent="validateAndConfirm" class="client-form">
            <div class="form-group">
              <label for="client-name" class="form-label">Nome Completo</label>
              <input
                id="client-name"
                type="text"
                v-model="bookingStore.clientName"
                class="form-input"
                :class="{ error: errors.clientName }"
                :aria-invalid="!!errors.clientName"
                :aria-describedby="errors.clientName ? 'client-name-error' : undefined"
                placeholder="Digite seu nome completo"
              />
              <div v-if="errors.clientName" id="client-name-error" class="form-error" role="alert">
                {{ errors.clientName }}
              </div>
            </div>

            <div class="form-group">
              <label for="client-phone" class="form-label">Telefone</label>
              <input
                id="client-phone"
                type="tel"
                v-model="bookingStore.clientPhone"
                @input="formatPhoneInput"
                class="form-input"
                :class="{ error: errors.clientPhone }"
                :aria-invalid="!!errors.clientPhone"
                :aria-describedby="errors.clientPhone ? 'client-phone-error' : undefined"
                placeholder="(11) 99999-9999"
                maxlength="15"
              />
              <div
                v-if="errors.clientPhone"
                id="client-phone-error"
                class="form-error"
                role="alert"
              >
                {{ errors.clientPhone }}
              </div>
            </div>

            <div class="form-group">
              <label for="client-email" class="form-label">Email</label>
              <input
                id="client-email"
                type="email"
                v-model="bookingStore.clientEmail"
                class="form-input"
                :class="{ error: errors.clientEmail }"
                :aria-invalid="!!errors.clientEmail"
                :aria-describedby="errors.clientEmail ? 'client-email-error' : undefined"
                placeholder="seu.email@exemplo.com"
              />
              <div
                v-if="errors.clientEmail"
                id="client-email-error"
                class="form-error"
                role="alert"
              >
                {{ errors.clientEmail }}
              </div>
            </div>

            <div class="form-group">
              <label for="client-notes" class="form-label">Observações (opcional)</label>
              <textarea
                id="client-notes"
                v-model="bookingStore.clientNotes"
                class="form-textarea"
                placeholder="Alguma preferência ou observação especial?"
                rows="3"
              ></textarea>
            </div>
          </form>
        </div>

        <!-- Etapa 5: Confirmação -->
        <div v-if="bookingStore.isComplete" class="step">
          <h2>5. Confirmação</h2>
          <div class="confirmation-summary">
            <h3>Resumo do Agendamento</h3>
            <div class="summary-grid">
              <div class="summary-item">
                <strong>Serviço:</strong>
                <span>{{ bookingStore.selectedService.name }}</span>
              </div>
              <div class="summary-item">
                <strong>Profissional:</strong>
                <span>{{ bookingStore.selectedProfessional.name }}</span>
              </div>
              <div class="summary-item">
                <strong>Data:</strong>
                <span>{{ formatDate(bookingStore.selectedDate) }}</span>
              </div>
              <div class="summary-item">
                <strong>Horário:</strong>
                <span>{{ bookingStore.selectedTime }}</span>
              </div>
              <div class="summary-item">
                <strong>Duração:</strong>
                <span>{{ bookingStore.selectedService.duration }} minutos</span>
              </div>
              <div class="summary-item">
                <strong>Cliente:</strong>
                <span>{{ bookingStore.clientName }}</span>
              </div>
              <div class="summary-item">
                <strong>Telefone:</strong>
                <span>{{ bookingStore.clientPhone }}</span>
              </div>
              <div class="summary-item total">
                <strong>Total:</strong>
                <span>{{ formatPrice(bookingStore.selectedService.price) }}</span>
              </div>
            </div>
          </div>
          <button @click="confirmBooking" class="confirm-button" :disabled="isLoading">
            <i class="fas fa-check" aria-hidden="true"></i>
            Confirmar Agendamento
          </button>
        </div>
      </div>

      <div v-else class="no-service">
        <div class="no-service-content">
          <i class="fas fa-calendar-times" aria-hidden="true"></i>
          <h2>Nenhum serviço selecionado</h2>
          <p>Para fazer um agendamento, você precisa primeiro escolher um serviço.</p>
          <router-link to="/servicos" class="btn btn--primary empty-btn">
            <i class="fas fa-cut" aria-hidden="true"></i>
            Ver Serviços Disponíveis
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useBookingStore } from '@/stores/booking'
import { useNotificationStore } from '@/stores/notification'
import { useRouter } from 'vue-router'
import { validateBooking, formatPhone } from '@/utils/validation'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import ErrorMessage from '@/components/ErrorMessage.vue'
import { formatPrice } from '@/utils/format'

const bookingStore = useBookingStore()
const notificationStore = useNotificationStore()
const router = useRouter()

// Estados locais
const isLoading = ref(false)
const bookingError = ref(null)
const selectedDate = ref('')
const errors = ref({})

// Computadas
const minDate = computed(() => {
  const today = new Date()
  return today.toISOString().split('T')[0]
})

const availableProfessionals = computed(() => {
  if (!bookingStore.selectedService) return []
  return bookingStore.getAvailableProfessionals(bookingStore.selectedService.id)
})

// Métodos
const selectProfessional = (professional) => {
  bookingStore.setProfessional(professional)
  // Reset date/time if professional changes
  selectedDate.value = ''
  bookingStore.setDate(null)
  bookingStore.setTime(null)

  // Clear professional error
  if (errors.value.professional) {
    delete errors.value.professional
  }
}

const onDateChange = () => {
  bookingStore.setDate(selectedDate.value)
  // Reset time if date changes
  bookingStore.setTime(null)

  // Clear date error
  if (errors.value.date) {
    delete errors.value.date
  }
}

const selectTime = (time) => {
  bookingStore.setTime(time)

  // Clear time error
  if (errors.value.time) {
    delete errors.value.time
  }
}

const getAvailableTimesForSelectedDate = () => {
  if (!selectedDate.value || !bookingStore.selectedProfessional) return []
  return bookingStore.getAvailableSlots(bookingStore.selectedProfessional.id, selectedDate.value)
}

const formatPhoneInput = (event) => {
  const value = event.target.value
  const formatted = formatPhone(value)
  bookingStore.clientPhone = formatted

  // Clear phone error while typing
  if (errors.value.clientPhone && formatted.length > 10) {
    delete errors.value.clientPhone
  }
}

const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString + 'T00:00:00')
  return date.toLocaleDateString('pt-BR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

const validateAndConfirm = () => {
  const validation = validateBooking(bookingStore.bookingData)

  if (!validation.isValid) {
    errors.value = validation.errors
    notificationStore.showError('Por favor, corrija os erros no formulário')
    return
  }

  errors.value = {}
  confirmBooking()
}

const confirmBooking = async () => {
  try {
    isLoading.value = true

    // Simular chamada à API
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Mostrar sucesso
    notificationStore.showSuccess(
      `Agendamento confirmado para ${formatDate(bookingStore.selectedDate)} às ${bookingStore.selectedTime}!`,
      { duration: 8000 },
    )

    // Reset e redirect
    bookingStore.resetBooking()
    router.push('/')
  } catch (error) {
    notificationStore.showError('Erro ao confirmar agendamento. Tente novamente.')
    bookingError.value = 'Ocorreu um erro ao confirmar seu agendamento. Por favor, tente novamente.'
    console.error('Booking error:', error)
  } finally {
    isLoading.value = false
  }
}

const resetBookingError = () => {
  bookingError.value = null
}

// Capturar erros de módulos não encontrados
window.addEventListener(
  'error',
  (event) => {
    if (event.message && event.message.includes('Failed to fetch dynamically imported module')) {
      bookingError.value =
        'Não foi possível carregar alguns recursos da página. Por favor, tente novamente mais tarde.'
      notificationStore.showError('Erro ao carregar módulos da aplicação')
    }
  },
  true,
)
</script>

<style scoped lang="scss">
@use '@/assets/styles/scss/_variables.scss' as var;
@use '@/assets/styles/scss/_mixins.scss' as mx;

// O topo compensa exatamente a altura do header
.booking-page {
  padding: var.$header-height 2rem 2rem;
  background-color: var.$bg-light;
  min-height: 100vh;
  font-family: var.$font-family-tertiary;

  @include mx.down(var.$bp-lg) {
    padding-top: var.$header-height-mobile;
  }
}

.booking-container {
  max-width: 900px;
  margin: 0 auto;
  background: var.$accent-light;
  padding: 2rem;
  border-radius: var.$radius-lg;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

h1 {
  text-align: center;
  font-family: var.$font-family-secondary;
  font-size: 2.5rem;
  color: var.$text-primary;
  margin-bottom: 0.5rem;
}

.subtitle {
  text-align: center;
  color: var.$text-gray;
  margin-bottom: 3rem;
  font-size: 1.1rem;
}

.step {
  margin-bottom: 2.5rem;
  padding: 1.5rem;
  background: var.$bg-subtle;
  border-radius: 8px;
  border-left: 4px solid var.$secondary;
}

.step h2 {
  font-family: var.$font-family-primary;
  font-size: 1.4rem;
  color: var.$text-primary;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.service-summary {
  background: var.$secondary-tint-2;
  padding: 1.5rem;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  border: 1px solid var.$secondary-border-light;
}

.service-summary h3 {
  font-size: 1.3rem;
  color: var.$text-primary;
  margin: 0 0 0.5rem 0;
}

.service-description {
  color: var.$text-gray;
  margin: 0.25rem 0;
  font-size: 0.9rem;
}

.service-duration {
  color: var.$text-gray;
  font-size: 0.85rem;
  margin: 0.25rem 0;
}

.service-price {
  font-size: 1.5rem;
  font-weight: bold;
  color: var.$secondary;
  margin: 0;
  text-align: right;
}

.professional-selection {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.professional-card {
  width: 100%;
  padding: 1.5rem;
  border: 2px solid var.$border-color;
  border-radius: var.$radius-md;
  text-align: center;
  cursor: pointer;
  transition:
    transform var.$duration-base var.$ease,
    box-shadow var.$duration-base var.$ease,
    border-color var.$duration-base var.$ease,
    background-color var.$duration-base var.$ease,
    color var.$duration-base var.$ease;
  background: var.$accent-light;
  color: inherit;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
    border-color: var.$secondary;
  }

  // Texto escuro sobre o laranja: 6,26:1
  &.selected {
    border-color: var.$secondary;
    background-color: var.$secondary;
    color: var.$btn-primary-text;
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(var.$secondary, 0.3);
  }

  &.error {
    border-color: var.$danger;
  }
}

.pro-avatar {
  display: block;
  width: 60px;
  height: 60px;
  margin: 0 auto 1rem;
  border-radius: 50%;
  overflow: hidden;
  background: var.$bg-placeholder;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.pro-name {
  display: block;
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
}

.date-section,
.time-section {
  margin-bottom: 1.5rem;
}

.time-selection {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 0.8rem;
  margin-top: 1rem;
}

.time-slot {
  padding: 0.8rem;
  border: 2px solid var.$border-color;
  border-radius: 6px;
  background: transparent;
  color: inherit;
  text-align: center;
  cursor: pointer;
  transition:
    border-color var.$duration-fast var.$ease,
    background-color var.$duration-fast var.$ease,
    color var.$duration-fast var.$ease;
  font-weight: 500;

  &:hover {
    border-color: var.$secondary;
    background: var.$secondary-tint;
  }

  // Texto escuro sobre o laranja: 6,26:1
  &.selected {
    background-color: var.$secondary;
    color: var.$btn-primary-text;
    border-color: var.$secondary;
  }

  &.error {
    border-color: var.$danger;
  }
}

.client-form {
  display: grid;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.confirmation-summary {
  background: linear-gradient(135deg, var.$success-bg 0%, var.$success-bg-2 100%);
  border: 1px solid var.$success-border;
  border-radius: 8px;
  padding: 2rem;
  margin-bottom: 1.5rem;
}

.confirmation-summary h3 {
  color: var.$success-text;
  margin-bottom: 1.5rem;
  font-size: 1.3rem;
}

.summary-grid {
  display: grid;
  gap: 0.8rem;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid var.$info-light;

  &.total {
    border-bottom: none;
    border-top: 2px solid var.$success;
    padding-top: 1rem;
    margin-top: 0.5rem;
    font-size: 1.1rem;

    span {
      color: var.$success;
      font-weight: bold;
      font-size: 1.2rem;
    }
  }
}

.confirm-button {
  width: 100%;
  padding: 1rem 2rem;
  font-size: 1.2rem;
  font-weight: bold;
  color: var.$accent-light;
  background: linear-gradient(135deg, var.$success 0%, var.$success-light 100%);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition:
    transform var.$duration-base var.$ease,
    box-shadow var.$duration-base var.$ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover:not(:disabled) {
    background: linear-gradient(135deg, var.$success-hover 0%, var.$success-dark 100%);
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(var.$success, 0.3);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
}

.no-service {
  text-align: center;
  padding: 3rem 2rem;
}

.no-service-content {
  max-width: 400px;
  margin: 0 auto;
}

.no-service-content i {
  font-size: 4rem;
  color: var.$secondary;
  margin-bottom: 1rem;
}

.no-service-content h2 {
  color: var.$text-strong;
  margin-bottom: 1rem;
}

.no-service-content p {
  color: var.$text-soft;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.empty-btn {
  padding: 1rem 2rem;
}

.no-times {
  text-align: center;
  color: var.$text-soft;
  font-style: italic;
  padding: 1rem;
  background: var.$bg-light;
  border-radius: 6px;
  margin-top: 1rem;
}

@media (max-width: 768px) {
  .booking-page {
    padding: var.$header-height-mobile 1rem 1rem;
  }

  .booking-container {
    padding: 1.5rem;
  }

  h1 {
    font-size: 2rem;
  }

  .step {
    padding: 1rem;
    margin-bottom: 2rem;
  }

  .service-summary {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }

  .professional-selection {
    grid-template-columns: 1fr;
  }

  .time-selection {
    grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  }

  .summary-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
  }
}
</style>
