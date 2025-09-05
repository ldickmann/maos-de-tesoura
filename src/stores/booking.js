import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useBookingStore = defineStore('booking', () => {
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

  // Computadas
  const isComplete = computed(() => {
    return (
      selectedService.value &&
      selectedProfessional.value &&
      selectedDate.value &&
      selectedTime.value &&
      clientName.value &&
      clientPhone.value &&
      clientEmail.value
    )
  })

  const bookingData = computed(() => ({
    service: selectedService.value,
    professional: selectedProfessional.value,
    date: selectedDate.value,
    time: selectedTime.value,
    clientName: clientName.value,
    clientPhone: clientPhone.value,
    clientEmail: clientEmail.value,
    clientNotes: clientNotes.value,
  }))

  // Serviços disponíveis
  const services = ref([
    {
      id: 1,
      name: 'Corte Masculino',
      duration: 30,
      price: 25.0,
      description: 'Corte tradicional masculino',
    },
    {
      id: 2,
      name: 'Barba',
      duration: 20,
      price: 15.0,
      description: 'Aparar e modelar barba',
    },
    {
      id: 3,
      name: 'Corte + Barba',
      duration: 45,
      price: 35.0,
      description: 'Combo completo',
    },
    {
      id: 4,
      name: 'Sobrancelha',
      duration: 15,
      price: 10.0,
      description: 'Design de sobrancelha',
    },
  ])

  // Profissionais disponíveis
  const professionals = ref([
    {
      id: 1,
      name: 'João Silva',
      specialties: [1, 2, 3, 4],
      avatar: '/images/professional-1.jpg',
    },
    {
      id: 2,
      name: 'Pedro Santos',
      specialties: [1, 3],
      avatar: '/images/professional-2.jpg',
    },
    {
      id: 3,
      name: 'Carlos Oliveira',
      specialties: [1, 2, 3, 4],
      avatar: '/images/professional-3.jpg',
    },
  ])

  // Horários disponíveis
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

  // Actions
  function setService(service) {
    selectedService.value = service
    // Reset professional if not compatible
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
    // Reset time when date changes
    selectedTime.value = null
  }

  function setTime(time) {
    selectedTime.value = time
  }

  function setClientData(data) {
    clientName.value = data.name || ''
    clientPhone.value = data.phone || ''
    clientEmail.value = data.email || ''
    clientNotes.value = data.notes || ''
  }

  function setErrors(newErrors) {
    errors.value = newErrors
  }

  function clearErrors() {
    errors.value = {}
  }

  function setLoading(loading) {
    isLoading.value = loading
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
    isLoading.value = false
  }

  // Getters
  function getAvailableProfessionals() {
    if (!selectedService.value) return professionals.value

    return professionals.value.filter((prof) => prof.specialties.includes(selectedService.value.id))
  }

  function getAvailableTimesForDate(date) {
    // Aqui futuramente integrar com API para verificar horários ocupados
    // Por enquanto retorna todos os horários
    return availableTimes.value
  }

  return {
    // Estados
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

    // Dados
    services,
    professionals,
    availableTimes,

    // Computadas
    isComplete,
    bookingData,

    // Actions
    setService,
    setProfessional,
    setDate,
    setTime,
    setClientData,
    setErrors,
    clearErrors,
    setLoading,
    resetBooking,
    getAvailableProfessionals,
    getAvailableTimesForDate,
  }
})
