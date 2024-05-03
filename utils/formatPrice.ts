export const formatPrice =(amount: number)=> {
    return new Intl.NumberFormat("es-BO", {
        style: "currency",
        currency: "BOB",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount)
}