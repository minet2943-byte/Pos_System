export function formatCurrency(value, currency = 'USD') {
  return new Intl.NumberFormat('en-US', {
    currency,
    style: 'currency',
  }).format(value)
}
