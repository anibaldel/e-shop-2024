'use server';

import prisma from '@/libs/prismadb';

export default async function getOrdersByUserId(userId: string) {
    try {
        const orders = await prisma.order.findMany({
            include: {
                user: true
            },
            orderBy: {
                createDate: 'desc'
            },
            where: {
                userId
            }
        })

        return orders
    } catch (error) {
        throw new Error('Error getting orders')
    }
}