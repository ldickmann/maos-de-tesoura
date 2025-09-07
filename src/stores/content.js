import { ref } from 'vue'
import { defineStore } from 'pinia'
import cardImage from '@/assets/images/image-1-card.jpg'

const teamData = [
  {
    id: 1,
    name: 'João Silva',
    role: 'Barbeiro Master',
    photo: cardImage,
    specialties: ['Cortes Clássicos', 'Barbas Tradicionais'],
  },
  {
    id: 2,
    name: 'Pedro Santos',
    role: 'Barbeiro Sênior',
    photo: cardImage,
    specialties: ['Cortes Modernos', 'Design de Barba'],
  },
  {
    id: 3,
    name: 'Carlos Oliveira',
    role: 'Barbeiro Especialista',
    photo: cardImage,
    specialties: ['Cortes Jovens', 'Estilos Contemporâneos'],
  },
]

const testimonialsData = [
  {
    id: 1,
    name: 'Ricardo Santos',
    service: 'Corte + Barba',
    avatar: cardImage,
    text: 'Excelente atendimento! O João entende exatamente o que eu quero. Sempre saio satisfeito.',
  },
  {
    id: 2,
    name: 'Marcos Silva',
    service: 'Corte Moderno',
    avatar: cardImage,
    text: 'Ambiente top e profissionais qualificados. Recomendo para todos os amigos!',
  },
  {
    id: 3,
    name: 'André Costa',
    service: 'Barba Tradicional',
    avatar: cardImage,
    text: 'A melhor barbearia da região. Atendimento personalizado e resultado impecável.',
  },
]

export const useContentStore = defineStore('content', () => {
  const teamMembers = ref(teamData)
  const testimonials = ref(testimonialsData)

  return { teamMembers, testimonials }
})
