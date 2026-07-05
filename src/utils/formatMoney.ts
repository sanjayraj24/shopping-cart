export function formatMoney(pence: number) {
  const pounds = pence / 100
  return `£ ${pounds.toFixed(2)}`
}
