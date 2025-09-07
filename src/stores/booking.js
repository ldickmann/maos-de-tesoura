import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useNotificationStore } from './notification'
import { validateBooking } from '@/utils/validation'

export const useBookingStore = defineStore('booking', () => {
  const notificationStore = useNotificationStore()

  // Estados do agendamento
  const selectedService = ref(null)
  const selectedProfessional = ref(null)
  const selectedDate = ref(null)
  const selectedTime = ref(null)

  // Dados do cliente
  const clientName = ref('')
  const clientPhone = ref('')
  const clientEmail = ref('')
  const clientNotes = ref('')

  // Estados de controle
  const isLoading = ref(false)
  const errors = ref({})

  // Dados que viriam de uma API (profissionais e horários)
  const professionals = ref([
    { id: 1, name: 'João Silva', specialties: [1, 2, 3, 4] },
    { id: 2, name: 'Pedro Santos', specialties: [1, 3] },
    { id: 3, name: 'Carlos Oliveira', specialties: [1, 2, 3, 4] },
  ])

  const availableTimes = ref([
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
  ])

  // Computadas
  const bookingData = computed(() => ({
    service: selectedService.value,
    professional: selectedProfessional.value,
    date: selectedDate.value,
    time: selectedTime.value,
    client: {
      name: clientName.value,
      phone: clientPhone.value,
      email: clientEmail.value,
      notes: clientNotes.value,
    },
  }))

  const availableProfessionals = computed(() => {
    if (!selectedService.value) return professionals.value
    return professionals.value.filter((p) => p.specialties.includes(selectedService.value.id))
  })

  // Actions
  function setService(service) {
    selectedService.value = service
    if (selectedProfessional.value && !selectedProfessional.value.specialties.includes(service.id)) {
      selectedProfessional.value = null
    }
  }

  function setProfessional(professional) {
    selectedProfessional.value = professional
  }

  function setDate(date) {
    selectedDate.value = date
    selectedTime.value = null // Reseta a hora quando a data muda
  }

  function setTime(time) {
    selectedTime.value = time
  }

  function resetBooking() {
    selectedService.value = null
    selectedProfessional.value = null
    selectedDate.value = null
    selectedTime.value = null
    clientName.value = ''
    clientPhone.value = ''
    clientEmail.value = ''
    clientNotes.value = ''
    errors.value = {}
  }

  async function submitBooking() {
    errors.value = {}
    const result = validateBooking(bookingData.value)
    if (!result.isValid) {
      errors.value = result.errors
      notificationStore.showError('Por favor, corrija os erros no formulário.')
      return false
    }

    isLoading.value = true
    try {
      // Simula chamada à API
      await new Promise((resolve) => setTimeout(resolve, 2000))
      notificationStore.showSuccess('Agendamento confirmado com sucesso!')
      resetBooking()
      return true
    } catch (e) {
      notificationStore.showError('Falha ao realizar o agendamento. Tente novamente.')
      console.error(e)
      return false
    } finally {
      isLoading.value = false
    }
  }

  return {
    selectedService,
    selectedProfessional,
    selectedDate,
    selectedTime,
    clientName,
    clientPhone,
    clientEmail,
    clientNotes,
    isLoading,
    errors,
    professionals, // Expondo para a view
    availableTimes, // Expondo para a view
    bookingData,
    availableProfessionals,
    setService,
    setProfessional,
    setDate,
    setTime,
    resetBooking,
    submitBooking,
  }
})
