import { ref } from 'vue'
import { defineStore } from 'pinia'

const teamData = [
  {
    id: 1,
    name: 'João Silva',
    role: 'Barbeiro Master',
    photo: '/images/image-1-card.jpg',
    specialties: ['Cortes Clássicos', 'Barbas Tradicionais'],
  },
  {
    id: 2,
    name: 'Pedro Santos',
    role: 'Barbeiro Sênior',
    photo: '/images/image-1-card.jpg',
    specialties: ['Cortes Modernos', 'Design de Barba'],
  },
  {
    id: 3,
    name: 'Carlos Oliveira',
    role: 'Barbeiro Especialista',
    photo: '/images/image-1-card.jpg',
    specialties: ['Cortes Jovens', 'Estilos Contemporâneos'],
  },
]

const testimonialsData = [
  {
    id: 1,
    name: 'Ricardo Santos',
    service: 'Corte + Barba',
    avatar: '/images/image-1-card.jpg',
    text: 'Excelente atendimento! O João entende exatamente o que eu quero. Sempre saio satisfeito.',
  },
  {
    id: 2,
    name: 'Marcos Silva',
    service: 'Corte Moderno',
    avatar: '/images/image-1-card.jpg',
    text: 'Ambiente top e profissionais qualificados. Recomendo para todos os amigos!',
  },
  {
    id: 3,
    name: 'André Costa',
    service: 'Barba Tradicional',
    avatar: '/images/image-1-card.jpg',
    text: 'A melhor barbearia da região. Atendimento personalizado e resultado impecável.',
  },
]

export const useContentStore = defineStore('content', () => {
  const teamMembers = ref(teamData)
  const testimonials = ref(testimonialsData)

  // No futuro, pode ter actions para buscar esses dados de uma API
  // async function fetchTeam() { ... }
  // async function fetchTestimonials() { ... }

  return { teamMembers, testimonials }
})