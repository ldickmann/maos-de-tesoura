<template>
  <div class="booking-page">
    <div class="booking-container">
      <h1>Agende seu Horário</h1>
      <p class="subtitle">
        Siga os passos abaixo para garantir o seu horário conosco.
      </p>

      <div v-if="bookingStore.selectedService" class="booking-flow">
        <!-- Etapa 1: Resumo do Serviço -->
        <div class="step">
          <h2>1. Serviço Selecionado</h2>
          <div class="service-summary">
            <h3>{{ bookingStore.selectedService.title }}</h3>
            <p>{{ bookingStore.selectedService.price }}</p>
          </div>
        </div>

        <!-- Etapa 2: Seleção de Profissional -->
        <div class="step">
          <h2>2. Escolha o Profissional</h2>
          <div class="professional-selection">
            <div
              v-for="pro in professionals"
              :key="pro.id"
              class="professional-card"
              :class="{ selected: selectedProfessional?.id === pro.id }"
              @click="selectProfessional(pro)"
            >
              <p class="pro-name">{{ pro.name }}</p>
            </div>
          </div>
        </div>

        <!-- Etapa 3: Seleção de Data e Hora -->
        <div v-if="selectedProfessional" class="step">
          <h2>3. Escolha a Data e Hora</h2>
          <input type="date" v-model="selectedDate" @change="onDateChange" class="date-input" />

          <div v-if="selectedDate" class="time-selection">
             <div
              v-for="time in availableTimes"
              :key="time"
              class="time-slot"
              :class="{ selected: selectedTime === time }"
              @click="selectTime(time)"
            >
              {{ time }}
            </div>
          </div>
        </div>

        <!-- Etapa 4: Confirmação -->
        <div v-if="selectedTime" class="step">
            <h2>4. Confirmação</h2>
            <div class="confirmation-summary">
                <p><strong>Serviço:</strong> {{ bookingStore.selectedService.title }}</p>
                <p><strong>Profissional:</strong> {{ selectedProfessional.name }}</p>
                <p><strong>Data:</strong> {{ selectedDate }}</p>
                <p><strong>Hora:</strong> {{ selectedTime }}</p>
                <p><strong>Preço:</strong> {{ bookingStore.selectedService.price }}</p>
            </div>
            <button @click="confirmBooking" class="confirm-button">Confirmar Agendamento</button>
        </div>
      </div>
      <div v-else class="no-service">
        <p>
          Por favor,
          <router-link to="/servicos">volte à página de serviços</router-link>
          para selecionar um serviço primeiro.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useBookingStore } from '@/stores/booking'
import { useRouter } from 'vue-router'

const bookingStore = useBookingStore()
const router = useRouter()

const selectedProfessional = ref(null)
const selectedDate = ref('')
const selectedTime = ref('')

// Mock data for professionals and times
const professionals = ref([
  { id: 1, name: 'João Silva' },
  { id: 2, name: 'Carlos Souza' },
  { id: 3, name: 'Pedro Marques' },
])
const availableTimes = ref([
  '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'
])

const selectProfessional = (professional) => {
  selectedProfessional.value = professional
  bookingStore.setProfessional(professional)
  // Reset date/time if professional changes
  selectedDate.value = ''
  selectedTime.value = ''
  bookingStore.setDate(null)
  bookingStore.setTime(null)
}

const onDateChange = () => {
  bookingStore.setDate(selectedDate.value)
  // Reset time if date changes
  selectedTime.value = ''
  bookingStore.setTime(null)
}

const selectTime = (time) => {
  selectedTime.value = time
  bookingStore.setTime(time)
}

const confirmBooking = () => {
  const details = bookingStore.selectedService
  alert(
    `Agendamento Confirmado!\n\nServiço: ${details.title}\nProfissional: ${bookingStore.selectedProfessional.name}\nData: ${bookingStore.selectedDate}\nHora: ${bookingStore.selectedTime}\nPreço: ${details.price}`
  )
  bookingStore.resetBooking()
  router.push('/')
}

// Redirect if no service is selected when component is mounted
onMounted(() => {
  if (!bookingStore.selectedService) {
    // Optional: redirect immediately
    // router.push('/servicos');
  }
  // Set min date for date input to today
  const today = new Date().toISOString().split('T')[0];
  document.querySelector('.date-input')?.setAttribute('min', today);
})
</script>

<style scoped lang="scss">
.booking-page {
  padding: 88px 2rem 2rem;
  background-color: #f9f9f9;
  min-height: 100vh;
  font-family: 'Hanken Grotesk', sans-serif;
}

.booking-container {
  max-width: 800px;
  margin: 0 auto;
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

h1 {
  text-align: center;
  font-family: 'Bungee Hairline', sans-serif;
  font-size: 2.5rem;
  color: #212121;
}

.subtitle {
  text-align: center;
  color: #6c6c6c;
  margin-bottom: 3rem;
}

.step {
  margin-bottom: 2.5rem;
}

.step h2 {
  font-family: 'Archivo Black', sans-serif;
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 1rem;
  border-bottom: 2px solid #ff7b42;
  padding-bottom: 0.5rem;
  display: inline-block;
}

.service-summary {
  background: #ffefe8;
  padding: 1rem;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.service-summary h3 {
  font-size: 1.2rem;
  color: #333;
  margin: 0;
}

.service-summary p {
  font-size: 1.2rem;
  font-weight: bold;
  color: #ff7b42;
  margin: 0;
}

.professional-selection {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
}

.professional-card {
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  transition:
    transform 0.2s,
    box-shadow 0.2s,
    border-color 0.2s;
}

.professional-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.professional-card.selected {
  border-color: #ff7b42;
  background-color: #ff7b42;
  color: white;
  font-weight: bold;
}

.pro-name {
  margin: 0;
  font-size: 1.1rem;
}

.no-service {
  text-align: center;
  padding: 2rem;
}

.no-service a {
  color: #ff7b42;
  font-weight: bold;
  text-decoration: none;
}

.date-input {
  width: 100%;
  padding: 0.8rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 1.5rem;
}

.time-selection {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  gap: 0.8rem;
}

.time-slot {
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
}

.time-slot:hover {
  border-color: #ff7b42;
}

.time-slot.selected {
  background-color: #ff7b42;
  color: white;
  font-weight: bold;
  border-color: #ff7b42;
}

.confirmation-summary {
    background: #f0fff8;
    border-left: 5px solid #28a745;
    padding: 1.5rem;
    margin-top: 1rem;
    border-radius: 0 8px 8px 0;
}

.confirmation-summary p {
    margin: 0.5rem 0;
    font-size: 1.1rem;
}

.confirm-button {
    width: 100%;
    padding: 1rem;
    font-size: 1.2rem;
    font-weight: bold;
    color: white;
    background-color: #28a745;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    margin-top: 1.5rem;
    transition: background-color 0.3s;
}

.confirm-button:hover {
    background-color: #218838;
}
</style>
