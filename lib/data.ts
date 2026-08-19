import { cartType } from '@/app/lib/definision';


     

export async function fetchCartsData() {

    try {
        const res = await fetch('https://dummyjson.com/carts', {
            next: { revalidate: 60 }
        });

        if (!res.ok) {
            throw new Error('Faild to fetch carts')
        }

        const { carts } = await res.json();

        const totalOrders = carts.length;

        const totalRevenue = carts.length ? carts.reduce((sum: number, cart: cartType) => sum + cart.total, 0) : 0

        const uniqId = Array.from(new Map(carts.map((cart: cartType) => [cart.userId, cart])).values())
        const totalCustomers = uniqId.length


        return {
            totalOrders,
            totalCustomers,
            totalRevenue
        }

    } catch(err) {
        console.log('Database error',err)
    }

}
