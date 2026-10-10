import { CartType, PeriodSummery } from "@/lib/definision";

export function getOrdersTrend(carts: CartType[]): PeriodSummery[] {
    const grouped = new Map<string, { date: Date; orders: number; revenue: number; userIds: Set<number> }>();

    for (const cart of carts) {
        const key = cart.date.toISOString().split("T")[0];
        const existing = grouped.get(key) ?? {
            date: cart.date,
            orders: 0,
            revenue: 0,
            userIds: new Set<number>(),
        };

        existing.orders += 1;
        existing.revenue += cart.total;
        existing.userIds.add(cart.userId);
        grouped.set(key, existing);
    }

    return Array.from(grouped.values())
        .sort((a, b) => a.date.getTime() - b.date.getTime())
        .map(({ date, orders, revenue, userIds }) => ({
            date,
            orders,
            revenue,
            customers: userIds.size,
            userIds: Array.from(userIds),
        }));
}

export function getValueInRange(data: PeriodSummery[], start: Date, end: Date): Omit<PeriodSummery, "date"> {
    
    const uniqueCustomers = new Set<number>();
    let orders = 0;
    let revenue = 0;

    for (const item of data) {
        if (item.date < start || item.date > end) continue;

        orders += item.orders;
        revenue += item.revenue;

        for (const userId of item.userIds) {
            uniqueCustomers.add(userId);
        }
    }

    return {
        orders,
        revenue,
        customers: uniqueCustomers.size,
        userIds: Array.from(uniqueCustomers),  //for customer page
    }
}
