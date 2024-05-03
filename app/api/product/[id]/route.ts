import { getCurrentUser } from "@/actions";
import { NextResponse } from "next/server";
import prisma from '@/libs/prismadb';

export async function DELETE(request: Request, {params}: {params: {id: string}}) {
    const currentUser = await getCurrentUser();

    if(!currentUser) {
        return NextResponse.error();
    }

    if(currentUser.role !== 'ADMIN') {
        return new NextResponse('No autorizado', { status: 401 });
    }

    const product = await prisma.product.delete({
        where: {
            id: params.id
        }
    });

    return NextResponse.json(product);
}