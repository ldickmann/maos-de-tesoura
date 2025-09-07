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
    {
      id: 1,
      name: 'João Silva',
      specialties: [1, 2, 3, 4],
      photo: '/images/professional-1.jpg',
      experience: '5 anos',
      rating: 4.9,
      available: true,
    },
    {
      id: 2,
      name: 'Pedro Santos',
      specialties: [1, 3],
      photo: '/images/professional-2.jpg',
      experience: '8 anos',
      rating: 4.8,
      available: true,
    },
    {
      id: 3,
      name: 'Carlos Oliveira',
      specialties: [1, 2, 3, 4],
      photo: '/images/professional-3.jpg',
      experience: '3 anos',
      rating: 4.7,
      available: true,
    },
  ])

  const availableTimes = ref([
    '09:00',
    '09:30',
    '10:00',
    '10:30',
    '11:00',
    '11:30',
    '14:00',
    '14:30',
    '15:00',
    '15:30',
    '16:00',
    '16:30',
    '17:00',
    '17:30',
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

  // Função para obter profissionais disponíveis para um serviço específico
  const getAvailableProfessionals = (serviceId) => {
    if (!serviceId) return professionals.value
    return professionals.value.filter((p) => p.specialties.includes(serviceId))
  }

  // Função para obter horários disponíveis para um profissional em uma data
  const getAvailableSlots = (professionalId, date) => {
    if (!professionalId || !date) return availableTimes.value

    // Aqui você poderia implementar lógica para filtrar horários ocupados
    // Por enquanto retorna todos os horários disponíveis
    return availableTimes.value
  }

  // Função para verificar se um horário está disponível
  const isTimeSlotAvailable = (professionalId, date, time) => {
    // Implementar lógica de verificação de disponibilidade
    // Por enquanto sempre retorna true
    return true
  }

  // Função para obter profissional por ID
  const getProfessionalById = (id) => {
    return professionals.value.find((p) => p.id === id)
  }

  // Função para validar se todas as seleções estão completas
  const isBookingComplete = computed(() => {
    return !!(
      selectedService.value &&
      selectedProfessional.value &&
      selectedDate.value &&
      selectedTime.value &&
      clientName.value &&
      clientPhone.value
    )
  })

  // Função para obter resumo do agendamento
  const getBookingSummary = computed(() => {
    if (!isBookingComplete.value) return null

    return {
      service: selectedService.value?.name,
      professional: selectedProfessional.value?.name,
      date: new Date(selectedDate.value).toLocaleDateString('pt-BR'),
      time: selectedTime.value,
      duration: selectedService.value?.duration,
      price: selectedService.value?.price,
      client: {
        name: clientName.value,
        phone: clientPhone.value,
        email: clientEmail.value,
      },
    }
  })

  // Actions
  function setService(service) {
    selectedService.value = service
    if (
      selectedProfessional.value &&
      !selectedProfessional.value.specialties.includes(service.id)
    ) {
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
    professionals,
    availableTimes,
    bookingData,
    availableProfessionals,
    getAvailableProfessionals,
    getAvailableSlots,
    isTimeSlotAvailable,
    getProfessionalById,
    isBookingComplete,
    getBookingSummary,
    setService,
    setProfessional,
    setDate,
    setTime,
    resetBooking,
    submitBooking,
  }
})
