import { CartsResponse} from '@/lib/definision';


export type CartsSummary = {
    totalOrders: number,
    totalCustomers: number,
    totalRevenue: number
}

export async function getAllCarts(): Promise<CartsSummary | null> {

    try {
        const res = await fetch('https://dummyjson.com/carts?limit=0', {
            next: { revalidate: 60 }
        });

        if (!res.ok) {
            return null
        }

        const {carts, total}  = await res.json() as CartsResponse;

        const totalOrders = total;

        let totalRevenue = 0;

        let uniqUserId = new Set<number>()

        for (const cart of carts) {
            totalRevenue += cart.total;
            uniqUserId.add(cart.userId);
        }

        const totalCustomers = uniqUserId.size;


        return {
            totalOrders,
            totalCustomers,
            totalRevenue
        }

    } catch(err) {
        return null;
    }

}
