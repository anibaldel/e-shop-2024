'use client';

import { Order, Product, User } from "@prisma/client";
import { useEffect, useState } from "react";
import { Heading } from "../components";
import { formatNumber, formatPrice } from "@/utils";

interface Props {
    orders: Order[];
    products: Product[];
    users: User[]
}

type SummaryType = {
    [key: string]: {
        label: string;
        digit: number
    }
}

export const Summary = ({orders, products, users}:Props) => {
    const [summaryData, setSummaryData] = useState<SummaryType>({
        sale: {
            label: 'Total Ventas',
            digit: 0
        },
        products: {
            label: 'Total Productos',
            digit: 0
        },
        orders: {
            label: 'Total Ordenes',
            digit: 0
        },
        paidOrders: {
            label: 'Ordenes Pagadas',
            digit: 0
        },
        unpaidOrders: {
            label: 'Ordenes no pagadas',
            digit: 0
        },
        users: {
            label: 'Total Usuarios',
            digit: 0
        }
    })

    useEffect(()=> {
        setSummaryData((prev)=> {
            let tempData = {...prev}
            const totalSale = orders.reduce((acc, item)=>{
                if(item.status === 'pagado') {
                    return acc + item.amount
                } else {
                    return acc
                }
            },0)
            const paidOrders = orders.filter(order=> {
                return order.status === 'pagado'
            })
            const unpaidOrders = orders.filter(order=> {
                return order.status === 'pendiente'
            })

            tempData.sale.digit = totalSale;
            tempData.orders.digit = orders.length;
            tempData.paidOrders.digit = paidOrders.length;
            tempData.unpaidOrders.digit = unpaidOrders.length;
            tempData.products.digit = products.length;
            tempData.users.digit = users.length;

            return tempData
        })
    }, [orders, products, users])
    const summaryKeys = Object.keys(summaryData)
  return (
    <div className="max-w-[1150px] m-auto">
        <div className="mb-4 mt-8">
            <Heading title="Estadísticas" center/>
        </div>
        <div className="grid grid-cols-2 gap-3 max-h-50vh overflow-y-auto">
            {
                summaryKeys && summaryKeys.map((key)=> (
                    <div key={key} className="rounded-xl border-2 p-4 flex flex-col items-center gap-2 transition">
                        <div className="text-xl md:text-3xl font-bold">
                            {
                                summaryData[key].label === 'Total Ventas' 
                                    ? <>{formatPrice(summaryData[key].digit)}</>
                                    : <>{formatNumber(summaryData[key].digit)}</>
                            }
                        </div>
                        <div>{summaryData[key].label}</div>
                    </div>
                ))
            }
        </div>
    </div>
  )
}
