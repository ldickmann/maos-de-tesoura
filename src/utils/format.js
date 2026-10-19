/**
 * Formatação de valores para exibição
 */

const priceFormatter = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })

// 25 → "R$ 25,00"
export const formatPrice = (value) => priceFormatter.format(value)
