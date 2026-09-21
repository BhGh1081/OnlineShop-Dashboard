import { getRawCarts } from "@/services/carts";
import { getUsers } from "@/services/users";
import { CardWraper } from "../../ui/card";
import {getOrdersTrend } from "@/services/orders-trend";
import { getCartsSummery } from "@/services/carts";
import RevenueOverview from "@/component/revenueOverview";
import { CartSummery, ChartDataPoint } from "@/lib/definision";


export default async function Dashboard() {

    let chartData: ChartDataPoint[] | undefined;
    let cartsData : CartSummery | null = null;

    // const result = await getRawCarts();

    
        const [cartRes, totalUsers] = await Promise.all([
            getRawCarts(),
            getUsers()
        ]) 

    if (cartRes) {
        chartData = getOrdersTrend(cartRes.carts);
        cartsData = getCartsSummery(cartRes.carts);
    }


    return (
        <div className="h-full space-y-10">
            <CardWraper cartsData={cartsData} totalUsers={totalUsers} />
            {chartData ?
                <RevenueOverview chartData={chartData} /> :
                <div className="w-full h-[40%] space-y-8 border-solid border-2 border-primary/30 rounded-lg text-center shadow-xl shadow-primary/10 py-4 pr-4">
                    <p className="text-gray-400">Revenue Overview</p>
                    <p className="text-xl">Data Unavailable</p>
                </div>}
        </div>
    )
}
