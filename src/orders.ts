import { reserveStock, releaseStock } from './inventory'
import { priceOrder } from './pricing'

export interface OrderLine {
  sku: string
  quantity: number
}

export interface Order {
  id: string
  customerId: string
  lines: OrderLine[]
  status: 'open' | 'paid' | 'shipped' | 'cancelled'
  totalCents: number
}

const orders = new Map<string, Order>()
let nextId = 1

/** Creates an order and holds stock for every line. */
export function createOrder(customerId: string, lines: OrderLine[]): Order {
  if (lines.length === 0) throw new Error('An order needs at least one line')
  for (const line of lines) reserveStock(line.sku, line.quantity)
  const order: Order = {
    id: `ord_${nextId++}`,
    customerId,
    lines,
    status: 'open',
    totalCents: priceOrder(lines),
  }
  orders.set(order.id, order)
  return order
}

/** Cancels an open order and gives its stock back. */
export function cancelOrder(id: string): Order {
  const order = getOrder(id)
  if (order.status !== 'open') throw new Error(`Order ${id} is already ${order.status}`)
  for (const line of order.lines) releaseStock(line.sku, line.quantity)
  order.status = 'cancelled'
  return order
}

export function markPaid(id: string): Order {
  const order = getOrder(id)
  if (order.status !== 'open') throw new Error(`Order ${id} is already ${order.status}`)
  order.status = 'paid'
  return order
}

export function getOrder(id: string): Order {
  const order = orders.get(id)
  if (!order) throw new Error(`No order ${id}`)
  return order
}
