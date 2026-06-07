import { apiRequest } from './api.js'

export function createSale(payload) {
  return apiRequest('/sales', {
    body: JSON.stringify(payload),
    method: 'POST',
  })
}
