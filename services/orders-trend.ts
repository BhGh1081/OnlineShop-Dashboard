import {CartType, ChartDataPoint } from "@/lib/definision";

import { getSimulatedDate } from "@/lib/simulated-date";

export function getOrdersTrend(carts: CartType[]): ChartDataPoint[] {

    const grouped = new Map<string, { orders: number, revenue: number }>();

    for (const cart of carts) {
        const date = getSimulatedDate(cart.id);
        const existing = grouped.get(date) ?? { orders: 0, revenue: 0 };
        grouped.set(date, {
            orders: existing.orders + 1,
            revenue: existing.revenue + cart.total
        })
    }

    const result = Array.from(grouped.entries()).map(([date, data]) => ({
        date,
        orders: data.orders,
        revenue: data.revenue
    })).sort((a, b) => a.date.localeCompare(b.date));

    return result;
}
