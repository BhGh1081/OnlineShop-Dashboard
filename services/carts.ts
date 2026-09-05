import { cartType } from '@/lib/definision';


     

export async function fetchCartsData() {

    try {
        const res = await fetch('https://dummyjson.com/carts?limit=0', {
            next: { revalidate: 60 }
        });

        if (!res.ok) {
            throw new Error('Faild to fetch carts')
        }

        const {carts, total}  = await res.json();

        const totalOrders = total;

        let totalRevenue = 0;

        let uniqUserId = new Set()

        for (const cart of carts as cartType[]) {
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
        console.log('Database error',err)
    }

}
