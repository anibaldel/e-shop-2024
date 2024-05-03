import { Order, User } from "@prisma/client";

export type ExtendedOrder = Order & {
    user : User
}