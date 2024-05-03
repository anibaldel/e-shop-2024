import Container from "@/app/components/Container";
import { ProductDetails } from "./ProductDetails";
import { ListRating } from "./ListRating";
import getProductById from "@/actions/getProductById";
import NullData from "@/app/components/NullData";
import { AddRating } from "./AddRating";
import { getCurrentUser } from "@/actions";

interface Props {
    params: {
        productId: string;
    }
}

export default async function ProductPage({params}:Props) {
    
  const product = await getProductById(params);
  const user = await getCurrentUser();
  
  if(!product) return <NullData title="no existe el producto con ese id" />
  return (
    <div className="p-8">
      <Container>
        <ProductDetails product= {product}/>
        <div className="flex flex-col mt-20 gap-4">
          <AddRating product={product} user={user}/>
          <ListRating product={product} />
        </div>
      </Container>
    </div>
  );
}