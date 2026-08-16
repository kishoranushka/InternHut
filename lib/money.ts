/** Money is always stored as integer paise in the database to avoid float rounding issues. */

export function formatRupees(priceInPaise: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(priceInPaise / 100);
}

export function rupeesToPaise(rupees: number) {
  return Math.round(rupees * 100);
}
