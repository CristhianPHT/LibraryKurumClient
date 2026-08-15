/** Texto visible de un ítem de catálogo `{ id, nombre }`. */
export function getCatalogName(item) {
  return item?.nombre ?? ''
}
