import { selectedImgType } from "./selectedImage";

export type CartProductType = {
    id: string,
    name: string,
    description: string,
    category: string,
    brand: string,
    selectedImage: selectedImgType,
    quantity: number,
    price: number,
}