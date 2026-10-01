import { CartType, PeriodSummery } from "@/lib/definision";

import { getSimulatedDate } from "@/lib/simulated-date";

export function getOrdersTrend(carts: CartType[]): PeriodSummery[] {

    const grouped = new Map<string, { date: Date, orders: number, revenue: number }>();

    for (const cart of carts) {
        const key = cart.date.toISOString().split('T')[0];
        const existing = grouped.get(key) ?? { date: cart.date, orders: 0, revenue: 0 };
        grouped.set(key, {
            date: existing.date,
            orders: existing.orders + 1,
            revenue: existing.revenue + cart.total
        })
    }

    const result = Array.from(grouped.values()).sort((a, b) => a.date.getTime() - b.date.getTime());

    return result;
}


export function getValueInRange(data: PeriodSummery[], start: Date, end: Date): Omit<PeriodSummery, 'date'> {

    return data.filter(item => item.date >= start && item.date <= end)
        .reduce((acc, cur) => ({
            orders: acc.orders + cur.orders,
            revenue: acc.revenue + cur.revenue,
        }), { orders: 0, revenue: 0 })
}
