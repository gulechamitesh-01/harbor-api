import type { OrderLine } from './orders'

const priceCents: Record<string, number> = {
  'rope-10m': 1800,
  'anchor-small': 6400,
  'life-vest': 3500,
  'deck-lamp': 2200,
}

/** Ten or more of one item gets 10% off that line. */
const BULK_QUANTITY = 10
const BULK_DISCOUNT = 0.1

export function linePrice(line: OrderLine): number {
  const unit = priceCents[line.sku]
  if (unit === undefined) throw new Error(`No price for ${line.sku}`)
  const full = unit * line.quantity
  return line.quantity >= BULK_QUANTITY ? Math.round(full * (1 - BULK_DISCOUNT)) : full
}

/** Loyal customers get 10% off the whole order, after any bulk discounts. */
const LOYALTY_DISCOUNT = 0.1

export interface PriceOptions {
  loyal?: boolean
}

export function priceOrder(lines: OrderLine[], options: PriceOptions = {}): number {
  const subtotal = lines.reduce((sum, line) => sum + linePrice(line), 0)
  return options.loyal ? Math.round(subtotal * (1 - LOYALTY_DISCOUNT)) : subtotal
}
