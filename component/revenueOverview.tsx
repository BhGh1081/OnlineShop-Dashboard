'use client';

import { PeriodSummery } from "@/lib/definision";
import { formatCurrency } from "@/lib/formatted";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function RevenueOverview({ periodSummery }: { periodSummery: PeriodSummery[] }) {



    return (
        <div className="w-full h-[40%] space-y-8 border-solid border-2 border-primary/30 rounded-lg text-center shadow-xl shadow-primary/10 py-4 pr-4">
            <p className="text-gray-400">Revenue Overview</p>
            <ResponsiveContainer width='100%' height='80%'>
                <LineChart data={periodSummery}>
                    <CartesianGrid strokeDasharray='3 3' stroke="gray" opacity='50%' />
                    <XAxis dataKey='date' tick={{fontSize: 12}} strokeWidth='3' tickFormatter={(value) => value.toISOString().split('T')[0]} />
                    <YAxis dataKey='revenue' tick={{fontSize:12}} strokeWidth='3'/>
                    <Tooltip contentStyle={{borderRadius: 5, opacity:'70%'}} labelFormatter={(value) => (value).toISOString().split('T')[0]} formatter={(value) => formatCurrency(Number(value))}/>
                    <Line type='monotone' dataKey='revenue' stroke="#8b5cf6" strokeWidth='3' dot={false} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}