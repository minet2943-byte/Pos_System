import { apiRequest } from './api.js'

export function getProducts() {
  return apiRequest('/products')
}
