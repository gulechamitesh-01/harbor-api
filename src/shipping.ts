import type { Order } from './orders'

const BASE_CENTS = 800
const PER_ITEM_CENTS = 150

/** What it costs to ship an order, in cents. */
export function shippingCost(order: Order): number {
  const items = order.lines.reduce((sum, line) => sum + line.quantity, 0)
  return BASE_CENTS + items * PER_ITEM_CENTS
}

/** How many days until the order arrives. */
export function estimateDelivery(order: Order): number {
  const items = order.lines.reduce((sum, line) => sum + line.quantity, 0)
  return items > 20 ? 5 : 3
}
