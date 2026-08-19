export function formatCurrency (value: number) {

const format = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0
}).format(value)

return format;

}
