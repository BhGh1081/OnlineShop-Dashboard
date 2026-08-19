import { ArrowTrendingDownIcon, ArrowTrendingUpIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import { ShoppingBagIcon, UsersIcon, CurrencyDollarIcon, UserIcon } from "@heroicons/react/16/solid";
import { formatCurrency } from "../lib/formatted";
import { fetchCartsData, fetchUsersData } from "../lib/data";


export function Card({ title, total, value, prevValue, type }:
    { title: string, total: number, value: number, prevValue: number, type: 'order' | 'customer' | 'revenue' | 'user' }) {

    const trend = value > prevValue;
    const present = (((value - prevValue) * 100) / prevValue).toFixed(2);

    const num = formatCurrency(total);

    const iconMap = {
        order: ShoppingBagIcon,
        customer: UsersIcon,
        revenue: CurrencyDollarIcon,
        user: UserIcon
    }

    const Icon = iconMap[type]

    return (
        <div className="w-full flex flex-col gap-2 border-solid border-2 border-black/20 rounded-lg p-2 md:p-3">
            <div className="flex gap-2 whitespace-nowrap">
                <Icon className="w-5 h-5 text-gray-400" />
                <p className="text-gray-400">Total {title}</p>
            </div>


            <div className="flex h-full items-center justify-between">
                {!total ?
                    <p className="text-[.9rem] text-pink-400 leading-none">Data unavalible</p> :
                    <>
                        <p className="font-bold text-[1.5rem]">{type === 'revenue' ? '$' + num : num}</p>

                        <div className="flex flex-col md:flex-row items-center ">
                            <ArrowTrendingDownIcon className={clsx('w-7 h-7 text-red-500', trend ? 'hidden' : 'block')} />
                            <ArrowTrendingUpIcon className={clsx('w-7 h-7 text-green-500', trend ? 'block' : 'hidden')} />
                            <p className={clsx('text-[.8rem]', trend ? 'text-green-500' : 'text-red-500')}>{present}%</p>
                        </div>
                    </>
                }
            </div>

        </div>
    )
}


export async function CardWraper() {

    const data = await fetchCartsData();
    //const totalUsers = await fetchUsersData();

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
            <Card title="Orders" total={data!.totalOrders} value={15} prevValue={9} type="order" />
            <Card title="User" total={35} value={3670} prevValue={2890} type="user" />
            <Card title="Custommer" total={data!.totalCustomers} value={2334345} prevValue={2334785} type="customer" />
            <Card title="Revenue" total={data!.totalRevenue} value={23423} prevValue={21453} type="revenue" />
        </div>
    )
}