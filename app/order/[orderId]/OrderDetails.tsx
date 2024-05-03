'use client';

import { Heading } from "@/app/components";
import Status from "@/app/components/Status";
import { formatPrice } from "@/utils";
import { Order } from "@prisma/client"
import { MdAccessTimeFilled, MdDone } from "react-icons/md";
import moment from "moment";
import 'moment/locale/es';
import { OrderItem } from "./OrderItem";

interface Props {
    order: Order
}

export const OrderDetails = ({order}:Props) => {
    // const router = useRouter();
  return (
    <div className="max-w-[1150px] mt-auto flex flex-col gap-2">
        <div className="mt-8">
            <Heading title="Detalles de la orden" />
        </div>
        <div>Ordern ID: {order.id}</div>
        <div>Monto total:{" "}<span className="font-bold">{formatPrice(order.amount)}</span></div>
        <div className="flex gap-2 items-center">
            <div>Estado de pago</div>
            <div>
                {order.status === 'pendiente' ? (
                    <Status
                        text="pendiente"
                        icon={MdAccessTimeFilled}
                        bg="bg-slate-200"
                        color="text-slate-700"
                    />
                ) : order.status === 'pagado' ? (
                    <Status
                        text="pagado"
                        icon={MdDone}
                        bg="bg-green-200"
                        color="text-green-700"   
                    />) : (<></>)
                }
            </div>
        </div>
        <div className="flex gap-2 items-center">
            <div>Estado de entrega</div>
            <div>
                {order.deliveryStatus === 'pendiente' ? (
                    <Status
                        text="pendiente"
                        icon={MdAccessTimeFilled}
                        bg="bg-slate-200"
                        color="text-slate-700"
                    />
                ) : order.deliveryStatus === 'despachado' ? (
                    <Status
                        text="despachado"
                        icon={MdDone}
                        bg="bg-green-200"
                        color="text-green-700"   
                    />) : (<></>)
                }
            </div>
        </div>
        <div>Fecha: {moment(order.createDate).fromNow()}</div>
        <div>
            <h2 className="font-semibold mt-4 mb-2">
                Productos ordenados
            </h2>
            <div className="grid grid-cols-5 text-xs gap-4 pb-2 items-center">
                <div className="col-span-2 justify-self-start">PRODUCTO</div>
                <div className="justify-self-center">PRECIO</div>
                <div className="justify-self-center">CANT.</div>
                <div className="justify-self-end">TOTAL</div>
            </div>
            {order.products && order.products.map(item=> (
                <>
                    <OrderItem key={item.id} item={item} />
                </>
            ))}
        </div>
    </div>
  )
}
