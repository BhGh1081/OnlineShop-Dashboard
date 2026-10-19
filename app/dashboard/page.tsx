import { getRawCarts } from "@/services/carts";
import { getRawUsers } from "@/services/users";
import { CardWraper } from "../../ui/card";
import { getOrdersTrend } from "@/lib/orders-trend";
import { getCartsSummery } from "@/services/carts";
import RevenueOverview from "@/component/revenueOverview";
import { getTopCustomer } from "@/services/getTopCustomer";
import TopCustomerTable from "@/ui/topCustomerTable";


export default async function Dashboard() {

    const [cartRes, users] = await Promise.all([
        getRawCarts(),
        getRawUsers()
    ])


    const totalUsers = users?.total ?? null;

    const periodSummery = cartRes ? getOrdersTrend(cartRes.carts) : null;

    const cartsData = cartRes ? getCartsSummery(cartRes.carts) : null;

    const topCustomer = cartRes && users ? getTopCustomer(cartRes.carts, users.users, 10) : null;





    return (
        <div className="h-full space-y-20 overflow-auto scrollbar-none">
            <CardWraper cartsData={cartsData} totalUsers={totalUsers} periodSummery={periodSummery} />
            {periodSummery ?
                <RevenueOverview periodSummery={periodSummery} /> :
                <div className="w-full h-[40%] space-y-8 border-solid border-2 border-primary/30 rounded-lg text-center shadow-xl shadow-primary/10 py-4 pr-4">
                    <p className="text-gray-400">Revenue Overview</p>
                    <p className="text-xl">Data Unavailable</p>
                </div>}
            {topCustomer ?
                <TopCustomerTable topCustomer={topCustomer} rowKey="userId" /> : <p>nodata</p>
            }
        </div>
    )
}
