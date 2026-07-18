// Books API service

import { baseRequest } from '@srd/api/baseClient'

export function getMyBooks() {
  return baseRequest('/me/books', {
    auth: true,
  })
}

export function createBook(data) {
  return baseRequest('/books', {
    method: 'POST',
    data,
    auth: true,
  })
}

export function getBook(id) {
  return baseRequest(`/books/${id}`)
}