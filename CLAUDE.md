# harbor-api

Orders and inventory for Harbor Labs.

## Commands

- `npm run typecheck` checks the types. Run it before you say a change is done.

## Conventions

- Money is always whole cents, never a decimal number.
- Stock only changes through `src/inventory.ts`. Orders call it; they never touch the stock map.
- One file per area: `orders.ts`, `inventory.ts`, `pricing.ts`.
