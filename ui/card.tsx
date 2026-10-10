import { ArrowTrendingDownIcon, ArrowTrendingUpIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import { ShoppingBagIcon, UsersIcon, CurrencyDollarIcon, UserIcon } from "@heroicons/react/16/solid";
import { roundNumber } from "../lib/formatted";
import { CartSummery, PeriodSummery } from "@/lib/definision";
import { subDays } from 'date-fns';
import { getValueInRange } from "@/lib/orders-trend";




export function Card({ title, total, prevValue, type }:
    { title: string, total: number | null, prevValue: number | null, type: 'order' | 'customer' | 'revenue' | 'user' }) {

    let trend, present;

    if (total && prevValue) {
        trend = total > prevValue;
        present = (((total - prevValue) * 100) / prevValue).toFixed(2);
    }


    const iconMap = {
        order: ShoppingBagIcon,
        customer: UsersIcon,
        revenue: CurrencyDollarIcon,
        user: UserIcon
    }

    const Icon = iconMap[type]

    return (
        <div className="w-full flex flex-col gap-2 border-solid border-2 border-primary/30 rounded-lg shadow-lg shadow-primary/10 p-2 md:p-3">
            <div className="flex gap-2 whitespace-nowrap">
                <Icon className="w-5 h-5 text-gray-400" />
                <p className="text-gray-400">Total {title}</p>
            </div>


            <div className="flex h-full items-center justify-between">
                {total === null ?
                    <p className="text-[.9rem] text-pink-400 leading-none">Data unavalible</p> :
                    <>
                        <div className="flex items-center gap-2">
                            <p className="font-bold text-[1.5rem]">{type === 'revenue' ? '$' + roundNumber(total) : total}</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="flex  items-center">
                                <ArrowTrendingDownIcon className={clsx('w-7 h-7 text-red-400', trend ? 'hidden' : 'block')} />
                                <ArrowTrendingUpIcon className={clsx('w-7 h-7 text-green-400', trend ? 'block' : 'hidden')} />
                                <p className={clsx('text-[.8rem]', trend ? 'text-green-400' : 'text-red-400')}>{present}%</p>
                            </div>
                            <p className={clsx('text-[.8rem]', trend ? 'text-green-500' : 'text-red-400 ml-4')}>(vs last mounth)</p>
                        </div>
                    </>
                }
            </div>

        </div>
    )
}


export async function CardWraper({ cartsData, totalUsers, periodSummery }: { cartsData: CartSummery | null, totalUsers: number | null, periodSummery: PeriodSummery[] | null }) {

    let currentValue, previouseValue = null;

    const today = new Date();

    const aMounthAgo = subDays(today, 30);
    const twoMounthAgo = subDays(today, 60);

    if (periodSummery) {
        currentValue = getValueInRange(periodSummery, aMounthAgo, today);
        previouseValue = getValueInRange(periodSummery, twoMounthAgo, aMounthAgo);
    }

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
            <Card title="Orders" total={currentValue?.orders ?? null} prevValue={previouseValue?.orders ?? null} type="order" />
            <Card title="User" total={totalUsers}  prevValue={223} type="user" />
            <Card title="Custommer" total={currentValue?.customers ?? null} prevValue={previouseValue?.customers ?? null} type="customer" />
            <Card title="Revenue" total={currentValue?.revenue ?? null}  prevValue={previouseValue?.revenue ?? null} type="revenue" />
        </div>
    )
}