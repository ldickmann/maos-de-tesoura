/**
 * Sistema de validação para formulários
 */

export const validateBooking = (bookingData) => {
  const errors = {}

  // Validar serviço
  if (!bookingData.service) {
    errors.service = 'Por favor, selecione um serviço'
  }

  // Validar profissional
  if (!bookingData.professional) {
    errors.professional = 'Por favor, selecione um profissional'
  }

  // Validar data
  if (!bookingData.date) {
    errors.date = 'Por favor, selecione uma data'
  } else {
    const selectedDate = new Date(bookingData.date)
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    if (selectedDate < today) {
      errors.date = 'A data não pode ser no passado'
    }

    // Verificar se não é domingo
    if (selectedDate.getDay() === 0) {
      errors.date = 'Não atendemos aos domingos'
    }
  }

  // Validar horário
  if (!bookingData.time) {
    errors.time = 'Por favor, selecione um horário'
  }

  // Validar dados do cliente
  if (!bookingData.clientName || bookingData.clientName.trim().length < 2) {
    errors.clientName = 'Nome deve ter pelo menos 2 caracteres'
  }

  if (!bookingData.clientPhone) {
    errors.clientPhone = 'Telefone é obrigatório'
  } else if (!/^\(\d{2}\)\s\d{4,5}-\d{4}$/.test(bookingData.clientPhone)) {
    errors.clientPhone = 'Formato de telefone inválido. Use: (11) 99999-9999'
  }

  if (!bookingData.clientEmail) {
    errors.clientEmail = 'Email é obrigatório'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(bookingData.clientEmail)) {
    errors.clientEmail = 'Email inválido'
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}

export const validateContact = (contactData) => {
  const errors = {}

  if (!contactData.name || contactData.name.trim().length < 2) {
    errors.name = 'Nome deve ter pelo menos 2 caracteres'
  }

  if (!contactData.email) {
    errors.email = 'Email é obrigatório'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactData.email)) {
    errors.email = 'Email inválido'
  }

  if (!contactData.message || contactData.message.trim().length < 10) {
    errors.message = 'Mensagem deve ter pelo menos 10 caracteres'
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}

export const formatPhone = (phone) => {
  const cleaned = phone.replace(/\D/g, '')

  if (cleaned.length === 11) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`
  } else if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)}-${cleaned.slice(6)}`
  }

  return phone
}
