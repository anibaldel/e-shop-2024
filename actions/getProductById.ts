'use server'; 

import prisma from '@/libs/prismadb';

interface Iparams {
    productId: string;
}

export default async function getProductById(params: Iparams) {
    try {
        const {productId} = params;

        const product = await prisma.product.findUnique({
            where: {
                id: productId
            },
            include: {
                reviews: {
                    include: {
                        user: true
                    },
                    orderBy: {
                        createDate: 'desc'
                    }
                }
            }
        });
        if(!product) return null;

        return product
    } catch (error) {
        throw new Error('Failed to get product');
    }
}