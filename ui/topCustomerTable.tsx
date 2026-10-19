import { TopCustomer } from "@/lib/definision";
import clsx from "clsx";
import Image from "next/image";

export default function TopCustomerTable({ topCustomer, rowKey, className }: { topCustomer: TopCustomer[], rowKey: keyof TopCustomer, className?: string }) {

    const option = topCustomer?.[0] ? Object.keys(topCustomer[0]) : [];


    return (
        <div className={clsx("w-full space-y-8 border-solid border-2 border-primary/30 rounded-lg text-center shadow-xl shadow-primary/10 p-4", className)}>
            <p className="text-gray-400">Top 10 Customers</p>
            <div className="w-full max-h-50 overflow-auto scrollbar-thin">
                <table className="w-full">
                    <thead className="bg-background bg-linear-to-r from-primary/50 to-primary/50 h-10 top-0 sticky z-10">
                        <tr>
                            {option.map((item, index) => <th key={index} className="text-start px-4">{item}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {topCustomer.map((customer, index) => {
                            const { image, ...rest } = customer;
                            return <tr key={String(customer[rowKey])} className="even:bg-primary/10 h-8">
                                <td className="px-3"><Image src={image} alt={`${customer.firstName}${customer.lastName}`} width={30} height={30} /></td>
                                {Object.values(rest).map((item, index) =>
                                    <td key={index} className="text-start px-4">{item}</td>)}</tr>
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}