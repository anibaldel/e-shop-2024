import { getCurrentUser } from "@/actions";
import { CartProductType } from "@/app/interfaces";
import { NextResponse } from "next/server";
import prisma from '@/libs/prismadb';

const calculateOrderAmount = (items: CartProductType[])=> {
    const totalPrice = items.reduce((acc, item)=> {
        const itemTotal = item.price * item.quantity;
        return acc + itemTotal;
    }, 0 )
    return totalPrice;
}

export async function POST(request: Request) {
    const currentUser = await getCurrentUser();

    if(!currentUser) {
        return NextResponse.json({message: 'No autorizado'}, {status: 401})
    }

    const body = await request.json();
    const { items } = body;
    const total = calculateOrderAmount(items.cartProducts)
    const orderData = {
        user: {connect: {id: currentUser.id}},
        amount: total,
        currency: 'bs',
        status: 'pendiente',
        deliveryStatus: 'pendiente',
        products: items.cartProducts,
        address: items.address
    }
    const order = await prisma.order.create({
        data: orderData
    })

    return NextResponse.json(order)
}