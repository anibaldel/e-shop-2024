import { getCurrentUser } from '@/actions';
import prisma from '@/libs/prismadb';
import { NextResponse } from 'next/server';


export async function PUT(request: Request) {
    const currentUser = await getCurrentUser();

    if(!currentUser) {
        return NextResponse.error();
    }

    if(currentUser.role !== 'ADMIN') {
        return new NextResponse('No autorizado', { status: 401 });
    }

    const body = await request.json();
    const {id, ...rest} = body

    const order = await prisma.order.update({
        where: {id: id},
        data: {...rest}
    })

    return NextResponse.json(order);
}