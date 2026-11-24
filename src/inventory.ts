const stock = new Map<string, number>([
  ['rope-10m', 40],
  ['anchor-small', 12],
  ['life-vest', 75],
  ['deck-lamp', 30],
])

export function stockLevel(sku: string): number {
  return stock.get(sku) ?? 0
}

/** Holds stock for an order. Throws when there is not enough left. */
export function reserveStock(sku: string, quantity: number): void {
  const left = stockLevel(sku)
  if (quantity > left) throw new Error(`Only ${left} of ${sku} left`)
  stock.set(sku, left - quantity)
}

/** Puts stock back, for a cancelled order or a return. */
export function releaseStock(sku: string, quantity: number): void {
  stock.set(sku, stockLevel(sku) + quantity)
}

export function restock(sku: string, quantity: number): void {
  if (quantity <= 0) throw new Error('Restock quantity must be positive')
  releaseStock(sku, quantity)
}
