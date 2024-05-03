import { getCurrentUser } from "@/actions";
import { Review } from "@prisma/client";
import { NextResponse } from "next/server";
import prisma from '@/libs/prismadb';


export async function POST(request: Request) {
    const currentUser = await getCurrentUser();

    if(!currentUser) {
        return new Response("Unauthorized", { status: 401 })
    }

    const body = await request.json();
    const {comment, rating, product, userId} = body

    const deliveredOrder = currentUser?.orders.some(order=> order.products.find(item => 
        item.id === product.id) &&  order.deliveryStatus === 'entregado')

    const userReview = product.reviews.find((review:Review)=> {
        return review.userId === userId
    })

    if(userReview || !deliveredOrder) {
        return NextResponse.error()
    }

    const review = await prisma?.review.create({
        data: {
            comment,
            rating,
            productId: product.id,
            userId
        }
    })
    return NextResponse.json(review)
}