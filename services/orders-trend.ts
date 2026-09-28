import {CartType, ChartDataPoint } from "@/lib/definision";

import { getSimulatedDate } from "@/lib/simulated-date";

export function getOrdersTrend(carts: CartType[]): ChartDataPoint[] {

    const grouped = new Map<string, {date: Date, orders: number, revenue: number }>();

    for (const cart of carts) {
        const date = getSimulatedDate(cart.id);
        const key = date.toISOString().split('T')[0];
        const existing = grouped.get(key) ?? {date, orders: 0, revenue: 0 };
        grouped.set(key, {
            date: existing.date,
            orders: existing.orders + 1,
            revenue: existing.revenue + cart.total
        })
    }

    const result = Array.from(grouped.entries()).map(([date, data]) => ({
        date: data.date,
        orders: data.orders,
        revenue: data.revenue
    })).sort((a, b) => a.date.getTime() - b.date.getTime());

    return result;
}
