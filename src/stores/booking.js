import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useBookingStore = defineStore('booking', () => {
  const selectedService = ref(null)
  const selectedProfessional = ref(null)
  const selectedDate = ref(null)
  const selectedTime = ref(null)

  function setService(service) {
    selectedService.value = service
  }

  function setProfessional(professional) {
    selectedProfessional.value = professional
  }

  function setDate(date) {
    selectedDate.value = date
  }

  function setTime(time) {
    selectedTime.value = time
  }

  function resetBooking() {
    selectedService.value = null
    selectedProfessional.value = null
    selectedDate.value = null
    selectedTime.value = null
  }

  return {
    selectedService,
    selectedProfessional,
    selectedDate,
    selectedTime,
    setService,
    setProfessional,
    setDate,
    setTime,
    resetBooking,
  }
})
