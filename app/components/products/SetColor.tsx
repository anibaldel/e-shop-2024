'use client';

import { CartProductType, selectedImgType } from "@/app/interfaces";

interface Props {
    images: selectedImgType[];
    cartProduct: CartProductType;
    handColorSelect: (value: selectedImgType) => void;
}
export const SetColor = ({images, cartProduct, handColorSelect }:Props) => {
  return (
    <div className="flex gap-4 items-center">
        <span className="font-semibold">COLOR: </span>
        <div className="flex gap-1">
            {
                images.map((image)=> (
                    <div 
                        key={image.color} 
                        onClick={()=> handColorSelect(image)}
                        className={`h-7 w-7 rounded-full border-teal-500 flex items-center justify-center 
                            ${cartProduct.selectedImage.color === image.color ? "border-[1.5px]" : "border-none"}`}
                        >
                        <div style={{background: image.colorCode}} className="h-5 w-5 rounded-full border-[1.2px] border-slate-300 cursor-pointer">

                        </div>
                    </div>
                ))
            }
        </div>
    </div>
  )
}
