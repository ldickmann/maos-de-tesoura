import { ref } from 'vue'
import { defineStore } from 'pinia'

// Mock de dados que viriam de uma API
const servicesData = [
  {
    id: 1,
    name: 'Corte Masculino',
    duration: 30,
    price: 25.0,
    description: 'Corte tradicional com tesoura ou máquina, lavagem e finalização.',
    icon: 'fas fa-cut',
    includes: [
      'Consultoria personalizada',
      'Lavagem com produtos premium',
      'Corte com tesoura ou máquina',
      'Finalização com pomada ou cera',
    ],
    benefits: 'Um corte perfeito que combina com seu estilo e formato de rosto.',
  },
  {
    id: 2,
    name: 'Barba',
    duration: 20,
    price: 15.0,
    description: 'Aparar e modelar barba com precisão e produtos especializados.',
    icon: 'fas fa-user-tie',
    includes: [
      'Alinhamento e modelagem',
      'Uso de navalha profissional',
      'Hidratação com óleos especiais',
      'Finalização com balm aromático',
    ],
    benefits: 'Deixe sua barba com aspecto profissional, macia e saudável.',
  },
  {
    id: 3,
    name: 'Corte + Barba',
    duration: 45,
    price: 35.0,
    description: 'Combo completo para um visual harmonioso e com desconto.',
    icon: 'fas fa-star',
    includes: [
      'Corte de cabelo completo',
      'Design de barba personalizado',
      'Lavagem e tratamento',
      'Desconto especial no combo',
    ],
    benefits: 'A combinação perfeita para um visual impecável, economizando tempo e dinheiro.',
  },
  {
    id: 4,
    name: 'Sobrancelha',
    duration: 15,
    price: 10.0,
    description: 'Design de sobrancelha masculina para realçar o olhar.',
    icon: 'fas fa-eye',
    includes: [
      'Análise do formato ideal',
      'Remoção de pelos excessivos',
      'Alinhamento profissional',
    ],
    benefits: 'Sobrancelhas bem feitas proporcionam um olhar mais marcante e expressivo.',
  },
]

export const useServicesStore = defineStore('services', () => {
  const services = ref([])
  const isLoading = ref(false)
  const error = ref(null)

  async function fetchServices() {
    isLoading.value = true
    error.value = null
    try {
      // Simula uma chamada de API
      await new Promise((resolve) => setTimeout(resolve, 1000))
      services.value = servicesData
    } catch (e) {
      error.value = 'Falha ao carregar os serviços.'
      console.error(e)
    } finally {
      isLoading.value = false
    }
  }

  return { services, isLoading, error, fetchServices }
})