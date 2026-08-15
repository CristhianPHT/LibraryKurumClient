import { useCallback, useEffect, useState } from 'react'

/**
 * Estado CRUD para un catálogo `{ id, nombre }`.
 *
 * @param {{
 *   getAll: (page?: number) => Promise<Array<{ id: number, nombre: string }>>,
 *   create: (data: { nombre: string }) => Promise<{ id: number, nombre: string }>,
 *   update: (id: number, data: { nombre: string }) => Promise<{ id: number, nombre: string }>,
 *   remove: (id: number) => Promise<void>,
 *   page?: number,
 * }} catalogApi
 */
export function useCatalog({
  getAll,
  create: createItem,
  update: updateItem,
  remove: removeItem,
  page = 1,
}) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await getAll(page)
      setItems(Array.isArray(data) ? data : [])
    } catch (err) {
      setError(err)
      setItems([])
    } finally {
      setLoading(false)
    }
  }, [getAll, page])

  useEffect(() => {
    fetchItems()
  }, [fetchItems])

  const create = useCallback(
    async (data) => {
      try {
        setError(null)
        const created = await createItem(data)
        setItems((current) => [...current, created])
        return created
      } catch (err) {
        setError(err)
        throw err
      }
    },
    [createItem],
  )

  const update = useCallback(
    async (id, data) => {
      try {
        setError(null)
        const updated = await updateItem(id, data)
        setItems((current) =>
          current.map((item) =>
            item.id === id ? updated : item,
          ),
        )
        return updated
      } catch (err) {
        setError(err)
        throw err
      }
    },
    [updateItem],
  )

  const remove = useCallback(
    async (id) => {
      try {
        setError(null)
        await removeItem(id)
        setItems((current) =>
          current.filter((item) => item.id !== id),
        )
      } catch (err) {
        setError(err)
        throw err
      }
    },
    [removeItem],
  )

  return {
    items,
    loading,
    error,
    create,
    update,
    remove,
    refresh: fetchItems,
  }
}
