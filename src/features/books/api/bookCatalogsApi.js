import { createNamedCatalogApi } from './namedCatalogApi'

export const bookTypesApi = createNamedCatalogApi({
  listKey: 'Libro tipos',
  createIdKey: 'libro tipo id',
  endpoints: {
    create: '/books/tipe',
    list: (page) => `/books/tipe/all/${page}`,
    item: (id) => `/books/tipe/${id}`,
  },
})

export const bookStatesApi = createNamedCatalogApi({
  listKey: 'Libro estados',
  createIdKey: 'libro estado id',
  endpoints: {
    create: '/books/state',
    list: (page) => `/books/state/all/${page}`,
    item: (id) => `/books/state/${id}`,
  },
})
