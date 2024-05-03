import getOrderById from "@/actions/getOrderById";
import Container from "@/app/components/Container";
import { OrderDetails } from "./OrderDetails";
import NullData from "@/app/components/NullData";

interface Props {
    orderId?: string;
}

export default async function OrderPage({params}:{params: Props}) {
  const order = await getOrderById(params);
  if(!order) return <NullData title="No hay orden"></NullData> 
  return (
    <div className="p-8">
      <Container>
        <OrderDetails order= {order}/>
      </Container>
    </div>
  );
}