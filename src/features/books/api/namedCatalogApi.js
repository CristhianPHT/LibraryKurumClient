import { baseRequest } from '@/shared/api/baseClient'

/** @typedef {{ id: number, nombre: string }} NamedCatalogItem */

/**
 * Catálogo genérico `{ id, nombre }` contra el backend.
 * Centraliza rutas, claves de respuesta y normalización.
 */
export function createNamedCatalogApi({
  listKey,
  createIdKey,
  endpoints,
}) {
  return {
    /** @returns {Promise<NamedCatalogItem[]>} */
    async getAll(page = 1) {
      const response = await baseRequest(endpoints.list(page))
      return extractList(response, listKey)
    },

    /** @returns {Promise<NamedCatalogItem>} */
    async create(data) {
      const response = await baseRequest(endpoints.create, {
        method: 'POST',
        data,
      })
      return normalizeCreate(response, data, createIdKey)
    },

    /** @returns {Promise<NamedCatalogItem>} */
    async update(id, data) {
      const response = await baseRequest(endpoints.item(id), {
        method: 'PUT',
        data: { id, nombre: data.nombre },
      })
      return normalizeUpdate(response, id, data)
    },

    async remove(id) {
      await baseRequest(endpoints.item(id), {
        method: 'DELETE',
      })
    },
  }
}

/** @param {unknown} response */
function extractList(response, listKey) {
  const raw = response?.[listKey]
  if (!Array.isArray(raw)) {
    return []
  }
  return raw.map(normalizeItem).filter(Boolean)
}

/** @param {unknown} item @returns {NamedCatalogItem | null} */
export function normalizeItem(item) {
  if (!item || typeof item !== 'object') {
    return null
  }

  const id = item.id ?? item.Id
  const nombre = item.nombre ?? item.Nombre

  if (id == null || nombre == null) {
    return null
  }

  return { id, nombre }
}

/** @returns {NamedCatalogItem} */
function normalizeCreate(response, input, createIdKey) {
  const id = response?.[createIdKey]
  if (id != null) {
    return { id, nombre: input.nombre }
  }

  return normalizeItem(response) ?? { id: input.id, nombre: input.nombre }
}

/** @returns {NamedCatalogItem} */
function normalizeUpdate(response, id, input) {
  const nombre =
    response?.['Nombre actual'] ??
    response?.nombre ??
    input.nombre

  return { id, nombre }
}
