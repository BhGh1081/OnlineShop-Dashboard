import { getRawCarts } from "@/services/carts";
import { getRawUsers } from "@/services/users";
import { CardWraper } from "../../ui/card";
import { getOrdersTrend } from "@/services/orders-trend";
import { getCartsSummery } from "@/services/carts";
import RevenueOverview from "@/component/revenueOverview";
import { CartSummery, PeriodSummery } from "@/lib/definision";


export default async function Dashboard() {

    let periodSummery: PeriodSummery[] | undefined;

    let cartsData: CartSummery | null = null;

    let totalUsers: number | null = null;

    const [cartRes, users] = await Promise.all([
        getRawCarts(),
        getRawUsers()
    ])

    if(users) {
        totalUsers = users.total;
    }

    if (cartRes) {
        periodSummery = getOrdersTrend(cartRes.carts);
        cartsData = getCartsSummery(cartRes.carts);
    }


    return (
        <div className="h-full space-y-10">
            <CardWraper cartsData={cartsData} totalUsers={totalUsers} periodSummery={periodSummery} />
            {periodSummery ?
                <RevenueOverview periodSummery={periodSummery} /> :
                <div className="w-full h-[40%] space-y-8 border-solid border-2 border-primary/30 rounded-lg text-center shadow-xl shadow-primary/10 py-4 pr-4">
                    <p className="text-gray-400">Revenue Overview</p>
                    <p className="text-xl">Data Unavailable</p>
                </div>}
        </div>
    )
}
