// Books API service

import { baseRequest } from '@srd/api/baseClient'

export function getBooksByUser(nickname) { // Libros públicos de un usuario
  return baseRequest(`/users/${nickname}/books`, {
    auth: false,
  })
}

// export function getBooksByPage(page) { // Últimos libros publicados (falta completar)
//   return baseRequest(`/books/${page}`, {
//     auth: false,
//   })
// }

export function getBook(slug) { // Obtener un libro mediante su slug
  return baseRequest(`/books/${slug}`)
}

export function getMyBooks() { // .Todos los libros del usuario
  return baseRequest('/me/books', {
    auth: true,
  })
}

export function getMySufleBooks() { // .Todos los libros con imagen del usuario
  return baseRequest('/me/sufle_books', {
    auth: true,
  })
}

export function createBook(data) { // Subir un libro
  return baseRequest('/books', {
    method: 'POST',
    data,
    auth: true,
  })
}

export function createBookByUser(data) { // Crea relación entre libro y usuario (transacción)
  return baseRequest('/me/books_by_user', {
    method: 'POST',
    data,
    auth: true,
  })
}