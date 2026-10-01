import { CartsResponse, CartSummery, CartType } from '@/lib/definision';
import { getSimulatedDate } from '@/lib/simulated-date';


export async function getRawCarts(): Promise<CartsResponse | null> {

    try {
        const res = await fetch('https://dummyjson.com/carts?limit=0', {
            next: { revalidate: 60 }
        })
        if(!res.ok) return null

        const result = await res.json() as CartsResponse;

        result.carts.forEach((cart) => {(cart as CartType).date =  getSimulatedDate(cart.id)})

        return result;

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