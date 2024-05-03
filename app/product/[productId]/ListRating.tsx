'use client';

import { Avatar, Heading } from "@/app/components";
import { Rating } from "@mui/material";
import moment from "moment";
import 'moment/locale/es';

interface Props {
    product: any;
}

export const ListRating = ({product}:Props) => {
    if(product.reviews.length === 0 ) return null;
  return (
    <div>
        <Heading title="Reseñas del producto" />
        <div className="text-sm mt-2">
            {product.reviews && product.reviews.map((review:any)=> (
                <div key={review.id} className="max-w-[300px]">
                    <div className="flex gap-2 items-center">
                        <Avatar src={review?.user.image}/>
                        <div className="font-semibold">{review?.user.name}</div>
                        <div className="font-light">{moment(review.createdDate).fromNow()}</div>
                    </div>
                    <div className="mt-2">
                        <Rating value={review.rating} readOnly/>
                        <div className="ml-2">{review.comment}</div>
                        <hr className="mt-4 mb-4"/>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}
