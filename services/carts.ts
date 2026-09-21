import { CartsResponse, CartSummery, CartType } from '@/lib/definision';


export async function getRawCarts(): Promise<CartsResponse | null> {

    try {
        const res = await fetch('https://dummyjson.com/carts?limit=0', {
            next: { revalidate: 60 }
        })
        if(!res.ok) return null

        const carts = await res.json() as CartsResponse;

        return carts;

    }catch(error){
        return null
    }
}


export function getCartsSummery(carts: CartType[]): CartSummery {

    let totalRevenue = 0;

    let uniqUserId = new Set<number>()

    for (const cart of carts) {
        totalRevenue += cart.total;
        uniqUserId.add(cart.userId);
    }

    const totalCustomers = uniqUserId.size;


    return {
        totalOrders : carts.length,
        totalCustomers,
        totalRevenue
    }
}