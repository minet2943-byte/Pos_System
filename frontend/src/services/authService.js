import { apiRequest } from './api.js'

export function login(credentials) {
  return apiRequest('/auth/login', {
    body: JSON.stringify(credentials),
    method: 'POST',
  })
}
