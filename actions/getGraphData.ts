'use server';

import moment from "moment";
import prisma from '@/libs/prismadb';

export default async function getGraphData() {
    try {
        // Recibir el principio y el final del ranfo de la data (7 dias atras hasta hoy)
        const startDate = moment().subtract(6, "days").startOf("day");
        const endDate = moment().endOf("day");

        // Consultar la data de la base de datos para recibir la orden por fecha
        const result = await prisma.order.groupBy({
            by: ["createDate"],
            where: {
                createDate: {
                    gte: startDate.toDate(),
                    lte: endDate.toDate(),
                },
                status: "pagado"
            },
            _sum: {
                amount: true
            }
        });

        // Inicializar un objeto para agregar la data por dia
        const aggregatedData: {
            [day: string] : { day: string, date: string, totalAmount: number }
        } = {};

        // Crear un clon de la fecha de inicio para iterar cada dia
        const currentDate = startDate.clone();

        // Iterar cada dia en el rango
        while( currentDate <= endDate ) {
            // Obtener la fecha en formato string (ej. "Lunes")
            const day = currentDate.format("dddd");
            console.log("day<<<" , day, currentDate);

            // Inicializar la data agregada para el dia con el dia, fecha y Monto total
            aggregatedData[day] = {
                day,
                date: currentDate.format("YYYY-MM-DD"),
                totalAmount: 0,
            };
            // Mover al siguiente dia
            currentDate.add(1, "days");
        }

        // Calcualr el monto total por dia sumando los montos de la orden

        result.forEach((entry)=> {
            const day = moment(entry.createDate).format("dddd");
            const amount = entry._sum.amount || 0;
            aggregatedData[day].totalAmount += amount;
        });

        // Convertir el objeto aggregatedData a un array y clasificarlo por fecha
        const formattedData = Object.values(aggregatedData).sort((a,b)=> moment(a.date).diff(moment(b.date)));

        // Regresar el formato de data
        return formattedData;
    } catch (error:any) {
        throw new Error(error)
    }

}